import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import Redis from 'ioredis';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: join(__dirname, '../.env') });

const redis = new Redis({
  host:  'redis',
  port: 6379,
});

export default redis;
