import { Grid } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const usage = await prisma.gridLive.findMany({
        orderBy: {
            UPDATE: 'desc',
        },
        take: 1,
    });

    const data = usage[0];

    const franceTotal = data.INTELEC + data.INTIFA2 + data.INTFR;
    const irishTotal = data.INTGRNL + data.INTEW + data.INTIRL;
    const gasTotal = data.CCGT + data.OCGT;

    const cleanSources =
        [
            {
                name: "Biomass",
                gw: data.BIOMASS / 1000,
                percent: parseInt((data.BIOMASS / data.DEMMANDTOTAL * 100).toFixed())
            },
            {
                name: "Wind",
                gw: data.WIND / 1000,
                percent: parseInt((data.WIND / data.DEMMANDTOTAL * 100).toFixed())
            },
            {
                name: "Pumped Storage",
                gw: data.PS / 1000,
                percent: parseInt((data.PS / data.DEMMANDTOTAL * 100).toFixed())
            },
            {
                name: "Nuclear",
                gw: data.NUCLEAR / 1000,
                percent: parseInt((data.NUCLEAR / data.DEMMANDTOTAL * 100).toFixed())
            },
            {
                name: "Hydro",
                gw: data.NPSHYD  / 1000,
                percent: parseInt((data.NPSHYD / data.DEMMANDTOTAL * 100).toFixed())
            },
            {
                name: "Other",
                gw: data.OTHER / 1000,
                percent: parseInt((data.OTHER / data.DEMMANDTOTAL * 100).toFixed())
            },
        ]

    const fossilSources = [
        {
            name: "Gas",
            gw: gasTotal / 1000,
            percent: parseInt((gasTotal / data.DEMMANDTOTAL * 100).toFixed())
        },
        {
            name: "Oil",
            gw: data.OIL / 1000,
            percent: parseInt((data.OIL / data.DEMMANDTOTAL * 100).toFixed())
        },
        {
            name: "Coal",
            gw: data.COAL / 1000,
            percent: parseInt((data.COAL / data.DEMMANDTOTAL * 100).toFixed())
        },
    ]

    const interconnectorsSources = [
        {
            name: "Ireland",
            gw: irishTotal / 1000,
            percent: irishTotal > 0 ? parseInt((irishTotal / data.DEMMANDTOTAL * 100).toFixed()) : 0
        },
        {
            name: "France",
            gw: franceTotal / 1000,
            percent: franceTotal > 0 ? parseInt((franceTotal / data.DEMMANDTOTAL * 100).toFixed()) : 0
        },
        {
            name: "Norway",
            gw: data.INTNSL / 1000,
            percent: data.INTNSL > 0 ? parseInt((data.INTNSL / data.DEMMANDTOTAL * 100).toFixed()) : 0
        },
        {
            name: "Denmark",
            gw: data.INTVKL / 1000,
            percent: data.INTVKL > 0 ? parseInt((data.INTVKL / data.DEMMANDTOTAL * 100).toFixed()) : 0
        },
        {
            name: "Belgium",
            gw: data.INTNEM / 1000,
            percent: data.INTNEM > 0 ? parseInt((data.INTNEM / data.DEMMANDTOTAL * 100).toFixed()) : 0
        },
    ]

    const response: Grid = {
        period: data.PERIOD,
        demmand: data.DEMMANDTOTAL / 1000,
        generation: data.GENERATIONTOTAL / 1000,
        clean: {
            total: data.GREENTOTAL / 1000,
            percent: parseInt((data.GREENTOTAL / data.DEMMANDTOTAL * 100).toFixed()),
            sources: cleanSources.sort((a, b) => a.gw - b.gw).reverse()
        },
        fossil: {
            total: data.FOSSILTOTAL / 1000,
            percent: parseInt((data.FOSSILTOTAL / data.DEMMANDTOTAL * 100).toFixed()),
            sources: fossilSources.sort((a, b) => a.gw - b.gw).reverse()
        },
        interconnectors: {
            importTotal: data.IMPORTTOTAL / 1000,
            importPercent: parseInt((data.IMPORTTOTAL / data.DEMMANDTOTAL * 100).toFixed()),
            exportTotal: data.EXPORTTOTAL / 1000,
            sources: interconnectorsSources.sort((a, b) => a.gw - b.gw).reverse()
        }
    }

    return Response.json(response)
}