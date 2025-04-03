import Image from 'next/image'

interface PlatoCardProps {
  nombre: string
  descripcion: string
  precio: number
  imagen: string
}

export default function PlatoCard({ nombre, descripcion, precio, imagen }: PlatoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={imagen}
          alt={nombre}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          unoptimized={true}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{nombre}</h3>
        <p className="text-gray-600 mb-4">{descripcion}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">{precio.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  )
} 