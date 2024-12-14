import { SourceObj } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateDB(data: SourceObj) {
  await prisma.gridLive.create({
    data
  });
}

async function makeDataObject(): Promise<SourceObj> {
  const coeff = 1000 * 60 * 5;
  const date = new Date();
  const timeTo = new Date(Math.floor(date.getTime() / coeff) * coeff);
  const timeFromMs = date.getTime();
  const timeFrom = new Date(timeFromMs - 5 * 60 * 1000);

  const res = await fetch(
    `https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELINST/stream?publishDateTimeFrom=${timeFrom.toISOString()}&publishDateTimeTo=${timeTo.toISOString()}&fuelType=COAL&fuelType=CCGT&fuelType=OCGT&fuelType=NUCLEAR&fuelType=OIL&fuelType=WIND&fuelType=NPSHYD&fuelType=PS&fuelType=BIOMASS&fuelType=OTHER&fuelType=INTFR&fuelType=INTIRL&fuelType=INTNED&fuelType=INTEW&fuelType=INTNEM&fuelType=INTIFA2&fuelType=INTNSL&fuelType=INTELEC&fuelType=INTVKL&fuelType=INTGRNL`
  );
  const generation = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sources: any = {};

  for (const source of generation) {
    sources[source.fuelType] = source.generation;
  }

  sources.UPDATE = generation[0].startTime;
  sources.FOSSILTOTAL = sources.OCGT + sources.CCGT + sources.OIL + sources.COAL;
  sources.GREENTOTAL = sources.WIND + sources.PS + sources.NPSHYD + sources.NUCLEAR + sources.BIOMASS;
  sources.IMPORTTOTAL = sources.INTFR + sources.INTFR + sources.INTNEM + sources.INTVKL + sources.INTNSL;
  sources.EXPORTTOTAL = 0;
  sources.GENERATIONTOTAL = sources.FOSSILTOTAL + sources.GREENTOTAL;
  sources.DEMMANDTOTAL = sources.FOSSILTOTAL + sources.GREENTOTAL + sources.IMPORTTOTAL;
  sources.PERIOD = "";
  return sources;
}

export async function GET() {
  const sources = await makeDataObject();

  updateDB(sources)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e: Error) => {
      console.log(e)
      await prisma.$disconnect();
      process.exit(1);
    });

  return Response.json({ message: "Updated" })
}