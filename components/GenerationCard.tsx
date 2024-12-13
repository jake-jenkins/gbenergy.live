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
              ? "bg-emerald-100 dark:bg-emerald-900 rounded-lg flex flex-col items-center justify-center p-4"
              : "bg-rose-100 dark:bg-rose-900 rounded-lg flex flex-col items-center justify-center p-4"
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
