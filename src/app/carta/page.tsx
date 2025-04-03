import { prisma } from '../../lib/prisma'
import PlatoCard from '../../components/PlatoCard'

async function getPlatos() {
  const platos = await prisma.plato.findMany({
    include: {
      categoria: true
    }
  })
  return platos
}

export default async function CartaPage() {
  const platos = await getPlatos()
  
  // Agrupar platos por categoría
  const platosPorCategoria = platos.reduce((acc, plato) => {
    if (!acc[plato.categoria.nombre]) {
      acc[plato.categoria.nombre] = []
    }
    acc[plato.categoria.nombre].push(plato)
    return acc
  }, {} as Record<string, typeof platos>)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Nuestra Carta</h1>
      
      {Object.entries(platosPorCategoria).map(([categoria, platos]) => (
        <div key={categoria} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{categoria}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platos.map((plato) => (
              <PlatoCard
                key={plato.id}
                nombre={plato.nombre}
                descripcion={plato.descripcion}
                precio={plato.precio}
                imagen={plato.imagen}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 