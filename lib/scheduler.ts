import cron from 'node-cron';
import { NextApiRequest, NextApiResponse } from 'next';

// This function will be called by the scheduler
async function generateAndPublishBlog() {
  try {
    console.log('🔵 Running scheduled blog generation...');
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/generate-blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cron-secret': process.env.CRON_SECRET || 'your-secret-key',
      },
    });
    const data = await response.json();
    console.log('✅ Blog post generated:', data);
    return data;
  } catch (error) {
    console.error('❌ Error in scheduled blog generation:', error);
    throw error;
  }
}

// Initialize the scheduler
export function startScheduler() {
  // Run every 3 days at 10:00 AM
  cron.schedule('0 10 */3 * *', async () => {
    console.log('⏰ Running scheduled blog generation...');
    await generateAndPublishBlog();
  });

  console.log('🔄 Blog generation scheduler started');
}