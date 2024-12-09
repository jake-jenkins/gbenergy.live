import { Grid } from "@/actions"

export async function GET() {
    const res = await Grid()
    return Response.json(res)
}