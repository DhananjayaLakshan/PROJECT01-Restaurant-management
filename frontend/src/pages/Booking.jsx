import { Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import JsPDF from "jspdf";

export default function Booking() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
  });
  const [packageData, setPackageData] = useState({});
  const [TotalBill, setTotalBill] = useState(0);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get(`/api/package?packageId=${id}`);
        setPackageData(data[0]);
        setTotalBill(data[0].packagePrice);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackages();
  }, [id]);

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkInDate = new Date(formData.checkInDate);
      const checkOutDate = new Date(formData.checkOutDate);
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalBill((diffDays - 1) * packageData.packagePrice);
    }
  }, [formData.checkInDate, formData.checkOutDate, packageData.packagePrice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const generatePDF = () => {
    const pdf = new JsPDF();

    pdf.setFontSize(22);
    pdf.text("Booking Confirmation", 20, 20);

    pdf.setFontSize(16);
    pdf.text(`Package Name: ${packageData.packageName}`, 20, 40);
    pdf.text(`Price Per Night: Rs.${packageData.packagePrice}`, 20, 50);
    pdf.text(`Check-In Date: ${formData.checkInDate}`, 20, 60);
    pdf.text(`Check-Out Date: ${formData.checkOutDate}`, 20, 70);
    pdf.text(`Total Bill: Rs.${TotalBill}`, 20, 80);

    pdf.save("booking-confirmation.pdf");
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <form className="flex flex-col gap-4 bg-white p-5">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Package Booking
        </h1>

        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <Label value="Package Name" />
          <TextInput
            type="text"
            required
            id="packageName"
            className="flex-1"
            value={packageData.packageName || ""}
            disabled
          />

          <Label value="Price" />
          <TextInput
            type="text"
            required
            id="packagePrice"
            className="flex-1"
            value={"Rs." + packageData.packagePrice}
            disabled
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <Label value="Checkin Date" />
          <TextInput
            type="date"
            required
            id="checkInDate"
            className="flex-1"
            value={formData.checkInDate}
            onChange={handleChange}
          />

          <Label value="Checkout Date" />
          <TextInput
            type="date"
            required
            id="checkOutDate"
            className="flex-1"
            value={formData.checkOutDate}
            onChange={handleChange}
          />
        </div>

        <Label value="Total Bill Amount" />
        <TextInput
          type="text"
          required
          id="totalBill"
          className="flex-1"
          value={"Rs." + TotalBill}
          disabled
        />

        <div className="flex justify-between">
          <div>
            <Link to="/packages">
              <Button type="button" color="dark">
                Back
              </Button>
            </Link>
          </div>
          <div>
            <Button type="submit" color="blue" onClick={generatePDF}>
              Book
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
