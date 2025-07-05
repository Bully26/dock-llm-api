import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import Redis from 'ioredis';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from one level up
dotenv.config({ path: join(__dirname, '../.env') });

// Initialize Redis
const redis = new Redis({
  host:  'redis',
  port: 6379,
});

export default redis;
