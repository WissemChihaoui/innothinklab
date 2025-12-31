import cron from 'node-cron';
import { RateLimitTracker } from './rateLimitTracker';

const tracker = new RateLimitTracker('gemini-api', 15, 60000);

async function generateBlogPost() {
  try {
    // Check rate limit before making request
    if (!tracker.canMakeRequest()) {
      const waitTime = tracker.getTimeUntilReset();
      console.log(`⏳ Rate limit reached. Waiting ${Math.ceil(waitTime / 1000)}s...`);
      await new Promise(resolve => setTimeout(resolve, waitTime + 1000));
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    console.log('🤖 Triggering AI blog generation...');
    console.log(`📊 Remaining requests: ${tracker.getRemainingRequests()}/15`);
    
    tracker.incrementCount();

    const response = await fetch(`${baseUrl}/api/generate-blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Blog post generated successfully:', data.data.title);
      console.log(`   Slug: ${data.data.slug}`);
      console.log(`   Category: ${data.data.category}`);
      console.log(`   Reading time: ${data.data.readingTime} min`);
    } else {
      console.error('❌ Failed to generate blog post:', data.error);
      if (data.isRateLimit) {
        console.log('💡 Suggestion:', data.suggestion);
      }
    }
  } catch (error) {
    console.error('❌ Error triggering blog generation:', error);
  }
}

export function initCronJobs() {
  // Run once a day at 13:35 (1:35 PM)
  cron.schedule('35 13 * * *', () => {
    console.log('📅 Scheduled blog generation started');
    generateBlogPost();
  });

  console.log('⏰ Cron jobs initialized');
  console.log('   - Daily blog generation at 13:35 (1:35 PM)');
  console.log('   - Rate limit: 15 requests per minute');
}

export { generateBlogPost };