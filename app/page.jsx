import { Grid } from "@/actions";
import GenerationCard from "@/components/GenerationCard";

export default async function Home() {
  const energy = await Grid();

  return (
    <>
      <h2 className="text-2xl mb-2">Generation | {energy.totals.generation}</h2>
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
        {energy.fuel.map((source) => (
          <GenerationCard
            key={source.id}
            name={source.name}
            value={source.generation}
          />
        ))}
      </div>

      <h2 className="text-2xl mb-2">
        Imports: {energy.totals.import}
      </h2>
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-2 mb-4">
        {energy.interconnectors.imports.map((source) => (
          <GenerationCard
            key={source.id}
            name={source.name}
            value={source.generation}
          />
        ))}
      </div>

      <h2 className="text-2xl mb-2">
        Exports:{" "}
        {energy.totals.export}
      </h2>
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-2">
        {energy.interconnectors.exports.map((source) => (
          <GenerationCard
            key={source.id}
            name={source.name}
            value={source.generation}
          />
        ))}
      </div>

      <h2 className="text-2xl mt-8 mb-4">
        Total load {energy.totals.total} GW
      </h2>
      <p className="mb-4">Updated: {energy.updated}</p>
    </>
  );
}
