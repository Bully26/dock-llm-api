import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import redis from '../redis.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: join(__dirname, '../.env') });


const validApiKeys = process.env.API_KEY?.split(',') || [];
const adminApiKey = process.env.ADMIN_KEY;

export default async function authRateLimit(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const apiKey = authHeader.split(' ')[1];

    if (apiKey === adminApiKey) {
      req.userTier = 'admin';
      req.apiKey = apiKey;
      return next();
    }

    if (!validApiKeys.includes(apiKey)) {
      return res.status(403).json({ error: 'Invalid API key' });
    }

 
    const redisKey = `rate:${apiKey}:${new Date().getUTCMinutes()}`;
    const current = await redis.incr(redisKey);

    if (current === 1) {
      await redis.expire(redisKey,process.env.redis_key_exp_sec); 
    }

    if (current > Number(process.env.rate_limit_per_exp_sec)) {
      return res.status(429).json({ error: 'Rate limit exceeded. few sec' });
    }

    req.userTier = 'normal';
    req.apiKey = apiKey;

    next();
  } catch (err) {
    console.error('AuthRateLimit error:', err);
    res.status(500).json({ error: 'Server error in auth middleware' });
  }
}
