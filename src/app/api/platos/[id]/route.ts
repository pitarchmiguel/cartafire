import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const plato = await prisma.plato.findUnique({
      where: { id: parseInt(params.id) },
      include: { categoria: true },
    })

    if (!plato) {
      return NextResponse.json({ error: 'Plato no encontrado' }, { status: 404 })
    }

    return NextResponse.json(plato)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener el plato' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const plato = await prisma.plato.update({
      where: { id: parseInt(params.id) },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        precio: parseFloat(body.precio),
        imagen: body.imagen,
        categoriaId: parseInt(body.categoriaId),
      },
      include: { categoria: true },
    })

    return NextResponse.json(plato)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar el plato' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.plato.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ message: 'Plato eliminado correctamente' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar el plato' },
      { status: 500 }
    )
  }
} 