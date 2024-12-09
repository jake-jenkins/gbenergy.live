"use client";

import React, { useState, useEffect } from "react";
import type { AppEnergySource, GridAPIResponse } from "@/types";
import GenerationCard from "@/components/GenerationCard";

async function fetchData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default function PeriodicUpdatePage() {
  const [data, setData] = useState<GridAPIResponse | undefined>(undefined);
  // const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const updateData = async () => {
    try {
      const newData = await fetchData();
      if (newData) {
        setData(newData);
        // setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateData();
    const intervalId = setInterval(updateData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <>
          {data && (
            <>
              <h2 className="text-2xl mb-2">
                UK Generation: {data.totals.generation} GW
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                {data.fuel.map((source: AppEnergySource) => (
                  <GenerationCard
                    key={source.id}
                    name={source.name}
                    value={source.generation}
                  />
                ))}
              </div>

              <h2 className="text-2xl mb-2">
                Imports: {data.totals.import} GW
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-4">
                {data.interconnectors.imports.map((source: AppEnergySource) => (
                  <GenerationCard
                    key={source.id}
                    name={source.name}
                    value={source.generation}
                  />
                ))}
              </div>

              <h2 className="text-2xl mb-2">
                Exports: {data.totals.export} GW
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2">
                {data.interconnectors.exports.map((source: AppEnergySource) => (
                  <GenerationCard
                    key={source.id}
                    name={source.name}
                    value={source.generation}
                  />
                ))}
              </div>

              <h2 className="text-2xl mt-8 mb-4">
                Total load {data.totals.total} GW
              </h2>
              <p className="mb-4">
                Actual state at{" "}
                {new Date(data.updated).toLocaleTimeString().slice(0, 5)}
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
