import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from '@prisma/client' // Permite ingresar la información de products y categories

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.category.createMany({ // Crear multiples registros
            data: categories // Ingresa las categorias dentro de la tabla de categorias
        }) 
        await prisma.product.createMany({
            data: products
        })
    } catch (error) {
        console.log(error)
    }
}

main()
    .then( async () => {
        await prisma.$disconnect() // Si todo sale bien, esperamos a que prisma se desconecte
    })
    .catch( async (e) => {
        console.log(e)
        await prisma.$disconnect() // Si sale mal, pasamos el error y desconectamos prisma
        process.exit(1)
    })