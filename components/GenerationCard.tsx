import { Energy } from "@/types";

export default function GenerationCard({
  obj
}: {
  obj: Energy
}) {
  return (
    <>
      {obj.kw != 0 ? (
        <div
          className={
            obj.kw > 0
              ? "bg-emerald-100 dark:bg-emerald-900 rounded-lg flex flex-col items-center justify-center p-4"
              : "bg-rose-100 dark:bg-rose-900 rounded-lg flex flex-col items-center justify-center p-4"
          }
        >
          <p className="font-semibold text-sm">{obj.name} </p>
          <p className="text-lg">{obj.pc}</p>
          <p className="text-sm"> {obj.kw.toFixed(2)} GW</p>
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-900 p-1 flex flex-col items-center justify-center rounded-lg">
          <p className="text-sm text-opacity-90">{obj.name}</p>
          <p className="text-lg">{obj.pc}</p>
          <p className="text-sm"> {obj.kw.toFixed(2)} GW</p>
        </div>
      )}
    </>
  );
}
