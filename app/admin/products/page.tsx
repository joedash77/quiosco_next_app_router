import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize // muestra el intervalo de datos de la pagina, ej page = 2 - 1 = 1 * 10 = se saltea los primeros 10, y asi
  const products = await prisma.product.findMany({
    take: pageSize, // Un limite de la cantidad de datos que se puede traer de la BD
    skip: skip, // Se saltea la n cantidad de datos que le asignemos
    include: {
      category: true
    }
  })


  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>> // Infiere todo lo que va a retornar el tipo de la funcion getProducts

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) { // Nos sirve para saber desde la URL en que pagina estamos "?search=1,2...", o sea el query String

  const page = +searchParams.page || 1
  const pageSize = 10

  if(page < 0) redirect('/admin/products')

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()
  const [ products, totalProducts ] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if(page > totalPages) redirect('/admin/products')


  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5 ">
        <Link
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >Crear Producto</Link>


        <ProductSearchForm />
      </div>

      <ProductTable
        products={products}
      />

      <ProductsPagination 
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
