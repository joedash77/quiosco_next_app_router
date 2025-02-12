import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })

  return products
}

export default async function MainPage({params} : { params : { category : string}}) {
  const products = await getProducts(params.category)
  console.log(products)
  return (
    <>

      <Heading>
        Elige y personaliza tu pedido a continuación
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
      </div>
    </>
  )
}
