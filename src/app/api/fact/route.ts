import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Interfaz para la respuesta de la API de Cats Facts
interface CatFactExternalResponse {
  fact: string;
  length: number;
}

export async function GET() {
  try {
    // Petición asíncrona a Cat Facts
    const response = await fetch('https://catfact.ninja/fact');
    
    if (!response.ok) {
      throw new Error('Fallo al conectar con CatFactAPI');
    }

    const data: CatFactExternalResponse = await response.json();

    // Inserta un nuevo registro en la Base de Datos
    const sql = 'INSERT INTO cat_facts_history(fact_text) VALUES($1) RETURNING *';
    const values = [data.fact];
    await query(sql, values);

    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    console.error('Error en /api/fact:', error);
    return NextResponse.json(
      { error: 'Error del servidor al procesar la solicitud' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
  });
}