"use client";

import React, { useState, useEffect } from "react";
import type { Grid, Energy } from "@/types";
import GenerationCard from "@/components/GenerationCard";

async function fetchData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/api/live`
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
    const intervalId = setInterval(updateData, 20000);
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
                <h1 className="text-5xl">Live</h1>
                <p>{data.period}</p>
              </div>

              <div className="grid grid-cols-3 mb-8 mx-auto md:w-1/2 gap-2">
                <div className="text-center border border-black dark:border-white py-2 rounded-l-lg">
                  <p className="text-xl">{data.demmand.toFixed()} GW</p>
                  <p>Demmand</p>
                </div>

                <div className="text-center border border-black dark:border-white py-2">
                  <p className="text-xl">
                    {data.interconnectors.importPercent}%
                  </p>
                  <p>Imports</p>
                </div>

                <div className="text-center border border-black dark:border-white py-2 rounded-r-lg">
                  <p className="text-xl">
                    {((data.generation / data.demmand) * 100).toFixed()}%
                  </p>
                  <p>Generation</p>
                </div>
              </div>

              <h2 className="text-xl mb-2">
                Fossil Fuels {data.fossil.percent}%{" "}
                <span className="text-sm">
                  {data.fossil.total.toFixed()} GW
                </span>
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                {data.fossil.sources.map((energy: Energy) => (
                  <GenerationCard
                    key={energy.name}
                    name={energy.name}
                    gw={energy.gw}
                    percent={energy.percent}
                  />
                ))}
              </div>

              <h2 className="text-xl mb-2">
                Cleaner Energy {data.clean.percent}%{" "}
                <span className="text-sm">{data.clean.total.toFixed()} GW</span>
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                {data.clean.sources.map((energy: Energy) => (
                  <GenerationCard
                    key={energy.name}
                    name={energy.name}
                    gw={energy.gw}
                    percent={energy.percent}
                  />
                ))}
              </div>

              <h2 className="text-xl mb-2">
                Imports {data.interconnectors.importTotal.toFixed()} GW /
                Exports {data.interconnectors.exportTotal.toFixed()} GW
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
                {data.interconnectors.sources.map((energy: Energy) => (
                  <GenerationCard
                    key={energy.name}
                    name={energy.name}
                    gw={energy.gw}
                    percent={energy.percent}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
