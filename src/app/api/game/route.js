import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/helpers/data";

export const dynamic = 'force-dynamic';

export const GET = async (req, res) => {

    try {
        const lang = req.headers.get('lang');

        const data = await getData(lang)

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error('Error failed word:', err);
        return NextResponse.json({ error: 'Failed to fetch data!' }, { status: 404 });
    }
}

