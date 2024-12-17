export async function GET() {
    const sql_query = `SELECT * FROM  "f93d1835-75bc-43e5-84ad-12472b180a98" ORDER BY "DATETIME" DESC LIMIT 1`;
    const req = await fetch(
        `https://api.neso.energy/api/3/action/datastore_search_sql?sql=${encodeURI(sql_query)}`,
        { cache: 'no-store' }
    );
    const res = await req.json();
    const data = res.result.records[0];

    const fossilArray = [
        {
            name: "Coal",
            gw: parseInt(data.COAL),
            percent: parseInt(data.COAL_perc),
        },
        {
            name: "Gas",
            gw: parseInt(data.GAS),
            percent: parseInt(data.GAS_perc),
        },
    ];

    const renewArray = [
        {
            name: "Solar",
            gw: parseInt(data.SOLAR),
            percent: parseInt(data.SOLAR_perc),
        },
        {
            name: "Wind",
            gw: parseInt(data.WIND),
            percent: parseInt(data.WIND_perc),
        },
        {
            name: "Hydro",
            gw: parseInt(data.HYDRO),
            percent: parseInt(data.HYDRO_perc),
        },
    ];

    const lowCarbonArray = [
        {
            name: "Nuclear",
            gw: parseInt(data.NUCLEAR),
            percent: parseInt(data.NUCLEAR_perc),
        },
        {
            name: "Biomass",
            gw: parseInt(data.BIOMASS),
            percent: parseInt(data.BIOMASS_perc),
        },
        {
            name: "Storage",
            gw: parseInt(data.STORAGE),
            percent: parseInt(data.STORAGE_perc),
        },
    ];

    const otherArray = [
        {
            name: "Other",
            gw: parseInt(data.OTHER),
            percent: parseInt(data.OTHER_perc),
        },
        {
            name: "Imports",
            gw: parseInt(data.IMPORTS),
            percent: parseInt(data.IMPORTS_perc),
        },
    ];

    const response = {
        time: data.DATETIME,
        fossil: {
            total: parseInt(data.FOSSIL),
            percent: parseInt(data.FOSSIL_perc),
            sources: fossilArray.sort((a, b) => a.gw - b.gw).reverse(),
        },
        renewables: {
            total: parseInt(data.RENEWABLE),
            percent: parseInt(data.RENEWABLE_perc),
            sources: renewArray.sort((a, b) => a.gw - b.gw).reverse(),
        },
        lowCarbon: {
            total: parseInt(data.LOW_CARBON),
            percent: parseInt(data.LOW_CARBON_perc) - parseInt(data.RENEWABLE_perc),
            sources: lowCarbonArray.sort((a, b) => a.gw - b.gw).reverse(),
        },
        other: {
            total: parseInt(data.OTHER) + parseInt(data.IMPORTS),
            percent: parseInt(data.OTHER_perc) + parseInt(data.IMPORTS_perc),
            sources: otherArray.sort((a, b) => a.gw - b.gw).reverse(),
        },
    };
    return Response.json(response)
}