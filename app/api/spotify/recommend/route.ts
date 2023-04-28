import { connect } from '@/lib/mongo';
import { ITrack, Track } from '@/models/Track';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    await connect();

    try {
        const track: ITrack = await request.json();

        const trackExists = await Track.exists({ id: track.id });

        if (trackExists) {
            await Track.updateOne({ id: track.id }, { $inc: { recommendations: 1 } });

            return NextResponse.json({ message: `Song with id ${track.id} got incremented recommendation` });
        }

        await Track.create(track);

        return NextResponse.json({ message: `Song with id ${track.id} was recommended successfully` });
    }
    catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}