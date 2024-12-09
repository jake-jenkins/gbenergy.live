export default function GenerationCard({name, value}: {name: string, value: number}) {
    return (
      <>
      {
        value != 0 ? (<div className={value > 0 ? "bg-emerald-100 dark:bg-emerald-900 p-1 text-center rounded-lg" : "bg-rose-100 dark:bg-rose-900 p-1 text-center rounded-lg"}>
          <b>{name}</b>
          <br /> {value.toFixed(2)} GW
        </div>): null
      }
      </>
    )
}