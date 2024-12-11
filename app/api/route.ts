import { GridAPI } from "@/actions"

export async function GET() {
    const res = await GridAPI()
    return Response.json(res)
}