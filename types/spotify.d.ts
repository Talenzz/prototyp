export interface ITrackSearchResult {
    tracks: {
        href: string;
        items: ITrack[];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
}

export interface ITrack {
    album: IAlbum;
    artists: IArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

interface IImage {
    height?: number;
    url: string;
    width?: number;
}

export interface IAlbum {
    album_group: string;
    album_type: string;
    artists: IArtist[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
    genres?: string[];
}

export interface IArtist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
    genres?: string[];
    images?: IImage[];
    popularity?: number;
    followers?: {
        href?: string;
        total: number;
    };
}
