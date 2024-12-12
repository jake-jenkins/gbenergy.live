"use client";

import React, { useState, useEffect } from "react";
import type { Grid, Energy } from "@/types";
import GenerationCard from "@/components/GenerationCard";

async function fetchData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/api/daily`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default function Page() {
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const updateData = async () => {
    try {
      const newData = await fetchData();
      if (newData) {
        setData(newData);
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
                            <div className="text-center mb-6">
                <h1 className="text-5xl">24 Hours</h1>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                {data.map((energy: any) => (
                  <GenerationCard
                    key={energy.psrType}
                  name={energy.psrType}
                    gw={(energy.twentyFourHourUsage / 1000)}
                    percent={energy.twentyFourHourPercentage}
                  />
                ))}
              </div>

              {/* <h2 className="text-xl mb-2">
                Carbon neutral
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                {data.clean.map((energy: Energy) => (
                  <GenerationCard
                    key={energy.name}
                    obj={energy}
                    demmand={data.totals.demmand / 1000}
                  />
                ))}
              </div>

              <h2 className="text-xl mb-2">
                Imports
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                {data.imports.map((energy: Energy) => (
                  <GenerationCard
                    key={energy.name}
                    obj={energy}
                    demmand={data.totals.demmand / 1000}
                  />
                ))}
              </div>

              <h2 className="text-xl mb-2">
                Exports
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                {data.exports.map((energy: Energy) => (
                  <GenerationCard
                    key={energy.name}
                    obj={energy}
                    demmand={data.totals.demmand / 1000}
                  />
                ))}
              </div> */}
            </>
          )}
        </>
      )}
    </div>
  );
}
