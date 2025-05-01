// app/api/checkdb/route.js

import { dbConnect } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    return NextResponse.json({ message: 'DB Connected' });
}
