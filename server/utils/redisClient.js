import redis from 'redis'

// Create a Redis client
const redisClient = redis.createClient();

// Handle connection errors
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Connect to Redis
(async () => {
    await redisClient.connect();
    console.log('Connected to Redis');
})();

export default redisClient; 
