"use client";

import React, { useState, useEffect } from "react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {data.map((energy: any) => (
                  <GenerationCard
                    key={energy.psrType}
                    name={energy.psrType}
                    gw={energy.twentyFourHourUsage / 1000}
                    percent={energy.twentyFourHourPercentage}
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
