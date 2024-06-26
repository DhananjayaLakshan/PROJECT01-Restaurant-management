import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { BsFillHousesFill } from "react-icons/bs";
import { IoDocumentTextSharp } from "react-icons/io5";

export default function DashSideBar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items className=" ">
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=restaurant">
            <Sidebar.Item
              active={tab === "restaurant"}
              icon={BsFillHousesFill}
              labelColor="dark"
              as="div"
            >
              Restaurant
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=package">
            <Sidebar.Item
              active={tab === "package"}
              icon={IoDocumentTextSharp}
              as="div"
            >
              Package
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
