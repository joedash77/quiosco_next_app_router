import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: { // Se trae tambien los productos de las ordenes
            orderProducts: {
                include: { // Se trae los productos que se ordenaron y que estan relacionados con orderProducts
                    product: true
                }
            }
        }
    })
    return Response.json(orders)
}