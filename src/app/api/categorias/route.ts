import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany()
    return NextResponse.json(categorias)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las categorías' }, { status: 500 })
  }
} 