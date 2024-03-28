import { Card } from "flowbite-react";
export default function RestaurantCard({ restaurant }) {
  return (
    <Card className="max-w-sm" imgSrc={restaurant.image} horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {restaurant.restaurantName}
      </h5>

      <p>
        <b>Location: </b> {restaurant.location}
      </p>
      <p>
        <b>Owner: </b> {restaurant.ownerName}
      </p>

      <p className="font-normal text-gray-700 dark:text-gray-400">
        {restaurant.description}
      </p>
    </Card>
  );
}
