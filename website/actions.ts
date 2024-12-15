export async function DailyGrid() {
    const dataReq = await fetch("https://data.elexon.co.uk/bmrs/api/v1/generation/actual/per-type/day-total?format=json", {
        next: { revalidate: 300 }
    })
    const data = await dataReq.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.sort((a: any, b: any) => a.twentyFourHourUsage - b.twentyFourHourUsage).reverse();
}