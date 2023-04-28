import { connect } from "@/lib/mongo";
import { Track } from "@/models/Track";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const genres = request.nextUrl.searchParams.getAll('genres');
    const tags = request.nextUrl.searchParams.getAll('tags');
    const start = request.nextUrl.searchParams.get('start');

    // if genres or tags is empty, return error
    if (genres.length === 0 || tags.length === 0) {
        return NextResponse.json({ error: 'genres or tags is empty' }, { status: 400 })
    }

    await connect();

    // Note: this endpoint uses a limit of 20 items. This is because of the possible performance issue of going through all the tracks and their tags and genres.
    // The tags and genres already have an index on them, but it's still a lot of data to go through. (might need to be tested)
    try {
        const startPosition = parseInt(start ?? "0");
        const numItemsToLoad = 20;

        const tracks = await Track.find({
            genres: { $in: genres },
            tags: { $in: tags },
        })
            .skip(startPosition)
            .limit(numItemsToLoad);


        return NextResponse.json(tracks);
    }
    catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
