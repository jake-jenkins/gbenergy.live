"use client";

import React, { useState, useEffect } from "react";
import type { Grid, Energy } from "@/types";
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
  const [data, setData] = useState<Grid | undefined>(undefined);
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
        <div className="flex items-center justify-center min-h-dvh">
          Loading...
        </div>
      ) : (
        <>
          {data && (
            <>
              <h1 className="text-2xl">
                Demmand: {(data.totals.demmand / 1000).toFixed(2)} GW
              </h1>
              <p className="mb-8">{data.period}</p>

              <h2 className="text-xl mb-2">
                Fossil Fuels {(data.totals.fossil / 1000).toFixed(2)} GW
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                
              {data.fossil.map((energy: Energy) => (
                  <GenerationCard key={energy.name} obj={energy} demmand={(data.totals.demmand / 1000)} />
                ))}

              </div>

              <h2 className="text-xl mb-2">
                Carbon neutral {(data.totals.clean / 1000).toFixed(2)} GW
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
              {data.clean.map((energy: Energy) => (
                  <GenerationCard key={energy.name} obj={energy} demmand={(data.totals.demmand / 1000)} />
                ))}
              </div>

              <h2 className="text-xl mb-2">
                Imports {(data.totals.import / 1000).toFixed(2)} GW
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">

              {data.imports.map((energy: Energy) => (
                  <GenerationCard key={energy.name} obj={energy} demmand={(data.totals.demmand / 1000)} />
                ))}

              </div>

              <h2 className="text-xl mb-2">
                Exports {(data.totals.export / 1000).toFixed(2)} GW
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">

              {data.exports.map((energy: Energy) => (
                  <GenerationCard key={energy.name} obj={energy} demmand={(data.totals.demmand / 1000)} />
                ))}

              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
