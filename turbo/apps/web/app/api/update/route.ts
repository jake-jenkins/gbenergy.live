import { SourceObj } from "@/types";
import { PrismaClient } from "@prisma/client";
import { formatTime } from "@/lib/util"

const WINDOW = 5;

const prisma = new PrismaClient();

async function updateDB(data: SourceObj) {
  await prisma.gridLive.upsert({
    where: {
      UPDATE: data.UPDATE,
    },
    update: {
      ...data
    },
    create: {
      ...data
    },
  });
}

function isImport(generation: number) {
  if (generation > 0) {
    return generation;
  }
  return 0;
}

function isExport(generation: number) {
  if (generation < 0) {
    return generation;
  }
  return 0;
}

async function makeDataObject(): Promise<SourceObj> {
  const coeff = 1000 * 60 * WINDOW;

  const currentTime = new Date();
  
  // Nearest window start
  const publishDateTimeTo = new Date(Math.floor(currentTime.getTime() / coeff) * coeff);
  // Start of current window
  const publishDateTimeFrom = new Date(currentTime.getTime() - coeff);

  const res = await fetch(
    `https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELINST/stream?publishDateTimeFrom=${publishDateTimeFrom.toISOString()}&publishDateTimeTo=${publishDateTimeTo.toISOString()}&fuelType=COAL&fuelType=CCGT&fuelType=OCGT&fuelType=NUCLEAR&fuelType=OIL&fuelType=WIND&fuelType=NPSHYD&fuelType=PS&fuelType=BIOMASS&fuelType=OTHER&fuelType=INTFR&fuelType=INTIRL&fuelType=INTNED&fuelType=INTEW&fuelType=INTNEM&fuelType=INTIFA2&fuelType=INTNSL&fuelType=INTELEC&fuelType=INTVKL&fuelType=INTGRNL`
  );
  const generation = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sources: any = {};

  const startPeriod = new Date(generation[0].startTime);
  const endPeriod = new Date(startPeriod);
  endPeriod.setMinutes(startPeriod.getMinutes() + WINDOW)

  for (const source of generation) {
    sources[source.fuelType] = source.generation;
  }

  sources.UPDATE = generation[0].startTime;
  sources.FOSSILTOTAL = sources.OCGT + sources.CCGT + sources.OIL + sources.COAL;
  sources.GREENTOTAL = sources.WIND + sources.PS + sources.NPSHYD + sources.NUCLEAR + sources.BIOMASS;
  sources.IMPORTTOTAL = isImport(sources.INTFR) + isImport(sources.INTVKL) + isImport(sources.INTNSL) + isImport(sources.INTNEM) + isImport(sources.INTIFA2) + isImport(sources.INTELEC) + isImport(sources.INTGRNL) + isImport(sources.INTNED) + isImport(sources.INTIRL) + isImport(sources.INTEW);
  sources.EXPORTTOTAL = isExport(sources.INTFR) + isExport(sources.INTVKL) + isExport(sources.INTNSL) + isExport(sources.INTNEM) + isExport(sources.INTIFA2) + isExport(sources.INTELEC) + isExport(sources.INTGRNL) + isExport(sources.INTNED) + isExport(sources.INTIRL) + isExport(sources.INTEW);
  sources.GENERATIONTOTAL = sources.FOSSILTOTAL + sources.GREENTOTAL;
  sources.DEMMANDTOTAL = sources.FOSSILTOTAL + sources.GREENTOTAL + sources.IMPORTTOTAL;
  sources.PERIOD = `${formatTime(startPeriod)} - ${formatTime(endPeriod)}`
  return sources;
}

export async function GET() {
  const sources = await makeDataObject();

  updateDB(sources)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e: Error) => {
      console.log(e.stack)
      await prisma.$disconnect();
      process.exit(1);
    });

  return Response.json({ message: "Updated" })
}