import { NextRequest, NextResponse } from "next/server";
import { wordCheck } from "@/helpers/data";

export const GET = async (req, res) => {

    try {
        const word = req.headers.get('word');

        console.log('re.body', word)
        const data = await wordCheck(word)
        // console.log(data)
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error('Error checking word:', err);
        return NextResponse.json({ error: 'Failed to check word!' }, { status: 404 });
    }
}