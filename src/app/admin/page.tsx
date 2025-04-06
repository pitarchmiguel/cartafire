'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Plato {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoria: {
    nombre: string
  }
}

export default function AdminPage() {
  const [platos, setPlatos] = useState<Plato[]>([])
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    categoriaId: ''
  })

  useEffect(() => {
    // Cargar platos y categorías
    fetchPlatos()
    fetchCategorias()
  }, [])

  const fetchPlatos = async () => {
    const response = await fetch('/api/platos')
    const data = await response.json()
    setPlatos(data)
  }

  const fetchCategorias = async () => {
    const response = await fetch('/api/categorias')
    const data = await response.json()
    setCategorias(data)
  }

  // Agrupar platos por categoría
  const platosPorCategoria = platos.reduce((acc, plato) => {
    if (!acc[plato.categoria.nombre]) {
      acc[plato.categoria.nombre] = []
    }
    acc[plato.categoria.nombre].push(plato)
    return acc
  }, {} as Record<string, Plato[]>)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/platos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setShowForm(false)
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: '',
        categoriaId: ''
      })
      fetchPlatos()
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este plato?')) {
      const response = await fetch(`/api/platos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPlatos()
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showForm ? 'Cancelar' : 'Añadir Plato'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                step="0.01"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                value={formData.categoriaId}
                onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL de la imagen</label>
              <input
                type="text"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Guardar Plato
            </button>
          </div>
        </form>
      )}

      <div className="space-y-12">
        {Object.entries(platosPorCategoria).map(([categoria, platos]) => (
          <div key={categoria}>
            <h2 className="text-2xl font-semibold mb-6">{categoria}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platos.map((plato) => (
                <div key={plato.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="relative h-48 w-full mb-4">
                    <Image
                      src={plato.imagen}
                      alt={plato.nombre}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                      unoptimized={true}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{plato.nombre}</h3>
                  <p className="text-gray-600 mb-2">{plato.descripcion}</p>
                  <p className="text-lg font-bold mb-2">{plato.precio}€</p>
                  <button
                    onClick={() => handleDelete(plato.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 