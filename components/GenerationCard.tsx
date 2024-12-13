export default function GenerationCard({
  name,
  gw,
  percent,
  demmand,
}: {
  name: string,
  gw: number,
  percent?: string
  demmand?: number;
}) {
  return (
    <>
      {gw != 0 ? (
        <div
          className={
            gw > 0
              ? "border-2 border-emerald-500 dark:border-emerald-900 rounded-lg flex flex-col items-center justify-center p-4"
              : "border-2 border-rose-500 dark:border-rose-900 rounded-lg flex flex-col items-center justify-center p-4"
          }
        >
          <p className="text-2xl">{demmand ? <>{(gw / demmand * 100).toFixed()}</> : <>{percent}</>}%</p>
          <p className="font-medium text-md text-center">{name}</p>
          <p className="text-sm"> {gw.toFixed(2)} GW</p>
        </div>
      ) : null}
    </>
  );
}
