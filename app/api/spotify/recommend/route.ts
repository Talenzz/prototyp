import { pb } from '@/lib/pocketbase';
import { ISong, SongModel } from '@/models/Song';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const song: ISong = await request.json();

    if (!song) return NextResponse.json({ error: "Song is empty" }, { status: 400 });

    // first check, if song already exists => update total_recommendations
    const records = await pb.collection("songs").getList<SongModel>(1, 50, {
        filter: `name="${song.name}"`
    });
    if (records.items.length > 0) {
        try {
            const songRecord = await pb.collection("songs").getFirstListItem<SongModel>(`name="${song.name}"`);
            await pb.collection("songs").update(songRecord.id, {
                tags: songRecord.tags.concat(song.tags),
                total_recommendations: songRecord.total_recommendations + 1
            });
            return NextResponse.json({ message: "Song recommended" }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
    }

    // create new song
    try {
        await pb.collection("songs").create<ISong>(song);
        return NextResponse.json({ message: "Song recommended" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
