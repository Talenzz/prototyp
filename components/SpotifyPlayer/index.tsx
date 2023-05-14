import { type HTMLAttributes } from "react";

interface SpotifyProps extends HTMLAttributes<HTMLIFrameElement> {
    [key: string]: any;
    id: string;
    wide?: boolean;
    width?: number | string;
    height?: number | string;
    allow?: string;
}

export const Spotify = ({
    id,
    style = {backgroundColor: "#1A1B1E"},
    wide = true,
    width = wide ? "100%" : 300,
    height = wide ? 160 : 380,
    allow = "encrypted-media",
    ...props
}: SpotifyProps) => {
    // https://open.spotify.com/track/1KFxcj3MZrpBGiGA8ZWriv?si=f024c3aa52294aa1

    // https://open.spotify.com/track/2MuWTIM3b0YEAskbeeFE1i?si=b480ef30ed434952
    // https://open.spotify.com/track/3lyHyxVE8JHvNz75wBmExR?si=522fdca9109c48cc
    return (
        <iframe
            title="Spotify Web Player"
            src={`https://open.spotify.com/embed/track/${id}`}
            width={width}
            height={height}
            allow={allow}
            style={{
                borderRadius: 8,
                ...style,
            }}
            {...props}
        />
    );
};
