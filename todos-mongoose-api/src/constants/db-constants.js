
const defaultHost = '127.0.0.1'; // works with IPv4 and IPv6
const host = process.env.MONGO_HOST ?? defaultHost;
const port = process.env.MONGO_PORT ?? 27017;
const database = process.env.MONGO_DB ?? 'db2';
export const mongodbURI = `mongodb://${host}:${port}/${database}`;