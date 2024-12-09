export default function GenerationCard({name, value}: {name: string, value: number}) {
    return (
      <>
      {
        value != 0 ? (<div className={value > 0 ? "bg-emerald-100 p-1 text-center rounded-lg" : "bg-amber-100 p-1 text-center rounded-lg"}>
          <b>{name}</b>
          <br /> {value} GW
        </div>): null
      }
      </>
    )
}