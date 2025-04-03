const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const categorias = [
    { nombre: 'Entrantes', descripcion: 'Platos para empezar' },
    { nombre: 'Principales', descripcion: 'Platos principales' },
    { nombre: 'Postres', descripcion: 'Dulces y postres' },
    { nombre: 'Bebidas', descripcion: 'Bebidas y refrescos' }
  ]

  for (const categoria of categorias) {
    await prisma.categoria.create({
      data: categoria
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 