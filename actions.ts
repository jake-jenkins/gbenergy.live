import { fossil, green, interconnectors } from "./constants";
import { Energy, Generation, Grid } from "./types";

export async function GridAPI(): Promise<Grid> {
    const coeff = 1000 * 60 * 5;
    const date = new Date();
    const timeTo = new Date(Math.floor(date.getTime() / coeff) * coeff);
    const timeFromMs = date.getTime();
    const timeFrom = new Date(timeFromMs - 5 * 60 * 1000);

    const res = await fetch(`https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELINST/stream?publishDateTimeFrom=${timeFrom.toISOString()}&publishDateTimeTo=${timeTo.toISOString()}&fuelType=COAL&fuelType=CCGT&fuelType=OCGT&fuelType=NUCLEAR&fuelType=OIL&fuelType=WIND&fuelType=NPSHYD&fuelType=PS&fuelType=BIOMASS&fuelType=OTHER&fuelType=INTFR&fuelType=INTIRL&fuelType=INTNED&fuelType=INTEW&fuelType=INTNEM&fuelType=INTIFA2&fuelType=INTNSL&fuelType=INTELEC&fuelType=INTVKL&fuelType=INTGRNL`,
        { next: { revalidate: 300 } })
    const generation: Generation = await res.json();

    const updated = new Date(generation[0].startTime);

    const gas = (generation.find(fuel => fuel.fuelType === "CCGT")?.generation || 0) + (generation.find(fuel => fuel.fuelType === "OCGT")?.generation || 0);
    const coal = (generation.find(fuel => fuel.fuelType === "COAL")?.generation || 0);
    const oil = generation.find(fuel => fuel.fuelType === "OIL")?.generation || 0;
    const fossilTotal = gas + coal + oil;

    const wind = (generation.find(fuel => fuel.fuelType === "WIND")?.generation || 0) + (generation.find(fuel => fuel.fuelType === "OTHER")?.generation || 0);
    const solar = 0;
    const nuclear = generation.find(fuel => fuel.fuelType === "NUCLEAR")?.generation || 0;
    const biomass = generation.find(fuel => fuel.fuelType === "BIOMASS")?.generation || 0;
    const hydro = generation.find(fuel => fuel.fuelType === "NPSHYD")?.generation || 0;
    const cleanTotal = wind + solar + nuclear + biomass + hydro;

    const pumped = generation.find(fuel => fuel.fuelType === "PS")?.generation || 0;
    const other = generation.find(fuel => fuel.fuelType === "OTHER")?.generation || 0;

    const france = (generation.find(fuel => fuel.fuelType === "INTFR")?.generation || 0) + (generation.find(fuel => fuel.fuelType === "INTIFA2")?.generation || 0);
    const ireland = (generation.find(fuel => fuel.fuelType === "INTIRL")?.generation || 0) + (generation.find(fuel => fuel.fuelType === "INTGRNL")?.generation || 0) + (generation.find(fuel => fuel.fuelType === "INTEW")?.generation || 0);
    const belgium = generation.find(fuel => fuel.fuelType === "INTNEM")?.generation || 0;
    const denmark = generation.find(fuel => fuel.fuelType === "INTVKL")?.generation || 0;
    const norway = generation.find(fuel => fuel.fuelType === "INTNSL")?.generation || 0;
    const intTotal = france + ireland + belgium + denmark + norway;

    const demmand = fossilTotal + cleanTotal + intTotal;

    const energyObj = {
        fossil: {
            gas,
            coal,
            oil,
            total: fossilTotal
        },
        clean: {
            wind,
            solar,
            nuclear,
            biomass,
            hydro,
            total: cleanTotal
        },
        storage: {
            pumped
        },
        other,
        interconnectors: {
            france,
            ireland,
            belgium,
            denmark,
            norway,
            total: intTotal
        }
    }

    const importsArray: Energy[] = [];
    let importTotal = 0;

    const exportsArray: Energy[] = [];
    let exportTotal = 0;

    interconnectors.map((country) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const energyUse = (energyObj.interconnectors as any)[country]
        if (energyUse > 0) {
            importsArray.push({
                name: country,
                kw: (energyUse / 1000),
                pc: (energyUse / demmand * 100).toFixed(1) + "%"
            })
            importTotal = importTotal + energyUse;
        }
        else {
            exportsArray.push({
                name: country,
                kw: (energyUse / 1000),
                pc: (energyUse / demmand * 100).toFixed(1) + "%"
            })
            exportTotal = exportTotal + energyUse;
        }
    });

    const cleanArray: Energy[] = []
    let cleanTotalB = 0;

    green.map((fuel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const energyUse = (energyObj.clean as any)[fuel]
        cleanArray.push({
            name: fuel,
            kw: (energyUse / 1000),
            pc: (energyUse / demmand * 100).toFixed(1) + "%"
        })
        cleanTotalB = cleanTotalB + energyUse;
    })

    const fossilArray: Energy[] = [];
    let fossilTotalB = 0;

    fossil.map((fuel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const energyUse = (energyObj.fossil as any)[fuel]
        fossilArray.push({
            name: fuel,
            kw: (energyUse / 1000),
            pc: (energyUse / demmand * 100).toFixed(1) + "%"
        })
        fossilTotalB = fossilTotalB + energyUse;
    })

    const response = {
        period: `${updated.getHours()}:${updated.getMinutes()} - ${updated.getHours()}:${(updated.getMinutes() + 5)}`,
        clean: cleanArray,
        fossil: fossilArray,
        imports: importsArray,
        exports: exportsArray,
        totals: {
            demmand: importTotal + cleanTotalB + fossilTotalB,
            import: importTotal,
            export: exportTotal,
            clean: cleanTotalB,
            fossil: fossilTotalB
        }
    }

    return response;
}