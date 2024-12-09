import { sourceData } from "./constants";
import { Generation, GenerationSource } from "./types";

export async function Grid() {
    const coeff = 1000 * 60 * 5;
    const date = new Date();
    const timeTo = new Date(Math.floor(date.getTime() / coeff) * coeff);
    const timeFromMs = date.getTime();
    const timeFrom = new Date(timeFromMs - 5 * 60 * 1000);

    const res = await fetch(`https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELINST/stream?publishDateTimeFrom=${timeFrom.toISOString()}&publishDateTimeTo=${timeTo.toISOString()}&fuelType=COAL&fuelType=CCGT&fuelType=OCGT&fuelType=NUCLEAR&fuelType=OIL&fuelType=WIND&fuelType=NPSHYD&fuelType=PS&fuelType=BIOMASS&fuelType=OTHER&fuelType=INTFR&fuelType=INTIRL&fuelType=INTNED&fuelType=INTEW&fuelType=INTNEM&fuelType=INTIFA2&fuelType=INTNSL&fuelType=INTELEC&fuelType=INTVKL&fuelType=INTGRNL`, { next: { revalidate: 300 } })
    const generation: Generation = await res.json();
    const generationTime = new Date(generation[0].startTime);

    const fuels: any = [];
    const imports: any = [];
    const exports: any = [];

    let total = 0;
    let generationTotal = 0;
    let importTotal = 0;
    let exportTotal = 0;

    generation.map((source: GenerationSource) => {
        if (sourceData[source.fuelType].type === "Interconnector") {
            if (source.generation > 0) {
                imports.push({
                    id: source.fuelType,
                    name: sourceData[source.fuelType].name,
                    type: sourceData[source.fuelType].type,
                    generation: (source.generation / 1000).toFixed(2)
                })
                importTotal = importTotal + source.generation;
            }
            else {
                exports.push({
                    id: source.fuelType,
                    name: sourceData[source.fuelType].name,
                    type: sourceData[source.fuelType].type,
                    generation: (source.generation / 1000).toFixed(2)
                })
                exportTotal = exportTotal + source.generation;
            }
            total = total + source.generation;
        }
        else {
            fuels.push({
                id: source.fuelType,
                name: sourceData[source.fuelType].name,
                type: sourceData[source.fuelType].type,
                generation: (source.generation / 1000).toFixed(2)
            })
            total = total + source.generation
            if (source.generation > 0) {
                generationTotal = generationTotal + source.generation
            }

        }
    })

    const sortedFules = fuels.sort((a: any, b: any) => b.generation - a.generation)

    return {
        fuel: sortedFules,
        interconnectors: { imports, exports },
        totals: {
            generation: (generationTotal / 1000).toFixed(2),
            import: (importTotal / 1000).toFixed(2),
            export: (exportTotal / 1000).toFixed(2),
            total: (total / 1000).toFixed(2)
        },
        updated: generationTime.toLocaleTimeString()
    }
}