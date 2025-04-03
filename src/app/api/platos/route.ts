import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const platos = await prisma.plato.findMany({
      include: {
        categoria: true
      }
    })
    return NextResponse.json(platos)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los platos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, descripcion, precio, imagen, categoriaId } = body

    const plato = await prisma.plato.create({
      data: {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        imagen,
        categoriaId: parseInt(categoriaId)
      }
    })

    return NextResponse.json(plato)
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el plato' }, { status: 500 })
  }
} 