import Image from 'next/image'
import Link from 'next/link'
import InfoModal from '../components/InfoModal'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="/hero.jpg"
          alt="Cafetería"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Bienvenido a Nuestra Cafetería</h1>
            <p className="text-xl mb-8">Descubre nuestra selección de platos y bebidas</p>
            <Link 
              href="/carta" 
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Ver Carta
            </Link>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <InfoModal />
    </div>
  )
} 