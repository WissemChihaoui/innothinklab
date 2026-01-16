// Test script for blog filtering functionality
// Run this with: node test-blog-filtering.js

const { getAllBlogs, getAllCategories, getAllTags } = require('./lib/blogServices');

async function testBlogFiltering() {
  console.log('🧪 Testing Blog Filtering System\n');

  try {
    // Test 1: Get all categories and tags
    console.log('📂 Getting categories and tags...');
    const categories = await getAllCategories();
    const tags = await getAllTags();
    
    console.log(`Found ${categories.length} categories:`);
    categories.forEach(cat => console.log(`  - ${cat.name} (${cat.slug})`));
    
    console.log(`\nFound ${tags.length} tags:`);
    tags.forEach(tag => console.log(`  - ${tag.name} (${tag.slug})`));

    // Test 2: Get all blogs (no filter)
    console.log('\n📄 Getting all blogs (no filter)...');
    const allBlogs = await getAllBlogs();
    console.log(`Found ${allBlogs.totalBlogs} total blogs`);

    // Test 3: Filter by category (using slug)
    if (categories.length > 0) {
      const testCategory = categories[0];
      console.log(`\n🏷️  Filtering by category: ${testCategory.name} (${testCategory.slug})`);
      const categoryBlogs = await getAllBlogs({ category: testCategory.slug });
      console.log(`Found ${categoryBlogs.totalBlogs} blogs in category "${testCategory.name}"`);
    }

    // Test 4: Filter by tag (using slug)
    if (tags.length > 0) {
      const testTag = tags[0];
      console.log(`\n🏷️  Filtering by tag: ${testTag.name} (${testTag.slug})`);
      const tagBlogs = await getAllBlogs({ tag: testTag.slug });
      console.log(`Found ${tagBlogs.totalBlogs} blogs with tag "${testTag.name}"`);
    }

    // Test 5: Test pagination
    console.log('\n📄 Testing pagination...');
    const page1 = await getAllBlogs({ page: 1, limit: 3 });
    const page2 = await getAllBlogs({ page: 2, limit: 3 });
    
    console.log(`Page 1: ${page1.blogs.length} blogs (Total: ${page1.totalBlogs})`);
    console.log(`Page 2: ${page2.blogs.length} blogs (Total: ${page2.totalBlogs})`);

    console.log('\n✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testBlogFiltering();
}

module.exports = { testBlogFiltering };
