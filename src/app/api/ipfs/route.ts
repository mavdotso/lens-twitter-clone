import { pinata } from '@/lib/pinata';
import { NextResponse } from 'next/server';

export const bodyParser = false;

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file = data.get('file') as File;
        const uploadData = await pinata.upload.file(file);
        return NextResponse.json(uploadData, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const response = await pinata.listFiles();
        return NextResponse.json(response[0]);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
