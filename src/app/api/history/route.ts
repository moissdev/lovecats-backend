import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Interfaz para el objeto de de una curiosidad para el historial
interface CatFactRow {
  id: number;
  fact_text: string;
  created_at: Date;
}

// Función para obtener las curiosidades en el historial
export async function GET() {
  try {
    const result = await query(
      'SELECT id, fact_text, created_at FROM cat_facts_history ORDER BY created_at DESC LIMIT 10'
    );
    
    const history: CatFactRow[] = result.rows;

    return NextResponse.json(history, {
      status: 200
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'No se pudo obtener el historial' }, 
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
  });
}