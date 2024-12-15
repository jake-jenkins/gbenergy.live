import { DailyGrid } from "@/actions"

export async function GET() {
    const res = await DailyGrid()
    return Response.json(res)
}