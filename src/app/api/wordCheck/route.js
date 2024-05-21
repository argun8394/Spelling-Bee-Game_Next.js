import { NextRequest, NextResponse } from "next/server";
import { wordCheck } from "@/helpers/data";

export const GET = async (req, res) => {

    try {
        const word = req.headers.get('word');
        const lang = req.headers.get('lang');

        await wordCheck(word, lang)
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse(`Error: ${error?.message}`, {
            status: 400,
        });
    }
}

export const config = {
    api: {
        externalResolver: true,
    },
};