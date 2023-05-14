import { pb } from "@/lib/pocketbase";
import { ISong } from "@/models/Song";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const genres = request.nextUrl.searchParams.getAll('genres');
    const tags = request.nextUrl.searchParams.getAll('tags');
    // implement later
    const sorting = request.nextUrl.searchParams.get('sorting') || 'newest';
    const start = Number(request.nextUrl.searchParams.get('start')) || 1;

    // if genres or tags is empty, return error
    if (genres.length === 0) {
        return NextResponse.json({ error: 'genres is empty' }, { status: 400 })
    }

    // ref: https://github.com/pocketbase/pocketbase/discussions/1823#discussioncomment-4935299, 
    // https://github.com/pocketbase/pocketbase/discussions/230#discussioncomment-3232141
    const genreQuery = genres.map(genre => `genres ~ "${genre}"`).join(' || ');
    const tagQuery = tags.map(tag => `tags ~ "${tag}"`).join(' || ');

    const filterQuery = tags.length > 0 ? `(${genreQuery}) && (${tagQuery})` : `(${genreQuery})`;

    const songsRecord = await pb.collection("songs").getList<ISong>(start, 50, {
        filter: filterQuery,
    });

    // could also return ListResult<ISong> to better evaluate the next pages and total count on client-side
    const songs = songsRecord.items;

    return NextResponse.json(songs);
}
