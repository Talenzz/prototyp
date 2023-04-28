import { createClient } from "redis";

export function getClient(connect: boolean = true) {
    const client = createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        }
    });

    if (connect) client.connect();

    return client;
}
