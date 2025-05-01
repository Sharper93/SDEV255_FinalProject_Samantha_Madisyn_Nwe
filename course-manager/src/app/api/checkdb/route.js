// app/api/checkdb/route.js

// path to db connection
import { dbConnect } from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    return NextResponse.json({ message: 'DB Connected' });
}