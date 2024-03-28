import { useState, useEffect } from "react";
import { TextInput } from "flowbite-react";
import RestaurantCard from "../components/RestaurantCard";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRestaurants = async (query) => {
      try {
        const { data } = await axios.get(
          `/api/restaurant?restaurantName=${query}`
        );
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants(searchQuery);
  }, [searchQuery]);

  return (
    <div className="mt-10 ml-10 mb-48">
      <div className="w-96 mx-auto mb-10">
        <form>
          <TextInput
            type="text"
            placeholder="Search By Restaurant Name..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}