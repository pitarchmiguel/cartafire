import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    await prisma.plato.delete({
      where: { id }
    })
    return NextResponse.json({ message: 'Plato eliminado correctamente' })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar el plato' }, { status: 500 })
  }
} 