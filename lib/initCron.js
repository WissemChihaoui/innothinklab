// Initialize cron jobs when the application starts
const { initCronJobs } = require('./cronJobs');

console.log('🚀 Starting Innothinklabs application...');
console.log('📅 Initializing scheduled tasks...');

// Start the cron jobs
initCronJobs();

console.log('✅ Scheduled tasks initialized successfully!');
console.log('   - Daily blog generation at 9:00 AM');
console.log('   - Rate limit: 15 requests per minute');
