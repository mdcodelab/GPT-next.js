"use client";
import { getAllTours } from "../utils/actions";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";

function ToursPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getAllTours(),
  });

  return (
    <>
      {isLoading ? (
        <span className="loading"></span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  );
}

export default ToursPage;
