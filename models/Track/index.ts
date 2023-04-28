import dayjs from 'dayjs';
import { Document, model, Model, models, Schema, Types } from 'mongoose';

export interface ITrack extends Document {
    /**
     * @description The spotify data of the song. Is static and automatically generated on the first recommendation.
     */
    spotify: {
        song: {
            name: string;
            id: string;
            uri: string;
            image: string;
        };
        artist: {
            name: string;
            id: string;
            uri: string;
        }[];
        album: {
            name: string;
            id: string;
            uri: string;
        };
    };

    /**
     * @description Genres are used to describe the song. They can be generated automatically by spotify or manually by users. If they are generated by spotify, ``multiple`` are allowed. If they are generated by users, only ``single`` is allowed.
     */
    genres: string[];
    /**
     * @description tags are used to describe the song, they are generated by users only
     * @example 
     * - "chill"
     * - "party"
     * - "sad"
     * - "happy"
     */
    tags: string[];

    /**
     * @description Specifies the amount of times the song has been recommended.
     * @todo If the user space is implemented, this is referenced by the user. This will create more specific statistics.
     */
    recommendations: number;
    /**
     * @description Specifies the amount of times the song has been liked.
     * @todo If the user space is implemented, this is referenced by the user. This will create more specific statistics.
     */
    liked: number;

    created: Date;
    updated: Date;
}

const TrackSchema: Schema = new Schema({
    spotify: {
        song: {
            name: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
            uri: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
        },
        artist: [{
            name: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
            uri: {
                type: String,
                required: true,
            },
        }],
        album: {
            name: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
            uri: {
                type: String,
                required: true,
            },
        }
    },
    genres: {
        type: [String],
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    recommendations: {
        type: Number,
        default: 0,
    },
    liked: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        default: new Date(dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]')),
    },
    updated: Date,
});

// create an index for the genres and tags for faster search
TrackSchema.index({ 'genres': 1 }, { unique: false })
TrackSchema.index({ 'tags': 1 }, { unique: false })

export const Track: Model<ITrack> = models.Track || model<ITrack>('Track', TrackSchema);