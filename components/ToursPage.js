"use client";
import { getAllTours } from "../utils/actions";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";
import { useState } from "react";

function ToursPage() {
    const[searchValue, setSearchValue]=useState("");

  const { data, isPending } = useQuery({
    queryKey: ["tours", searchValue],
    queryFn: () => getAllTours(searchValue),
  });

  return (
    <>
      <form className="max-w-lg mb-12 mx-auto">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Enter city or country here..."
            className="input input-bordered join-item w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          ></input>
          <button
            type="button"
            className="join-item btn btn-primary"
            disabled={isPending}
            onClick={() => setSearchValue("")}
          >
            {isPending ? "...Please wait" : "Reset"}
          </button>
        </div>
      </form>

      {isPending ? (
        <span className="loading"></span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  );
}

export default ToursPage;
