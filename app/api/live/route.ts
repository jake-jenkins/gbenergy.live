import { LiveGridAPI } from "@/actions"

export async function GET() {
    const res = await LiveGridAPI()
    return Response.json(res)
}