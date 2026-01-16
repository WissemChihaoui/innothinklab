import { getDatabase } from './dbConnect';

export async function getCategoryBySlugOrName(identifier: string) {
  try {
    const db = await getDatabase();
    const category = await db.collection('categories').findOne({
      $or: [
        { slug: identifier },
        { name: identifier }
      ]
    });
    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function getTagBySlugOrName(identifier: string) {
  try {
    const db = await getDatabase();
    const tag = await db.collection('tags').findOne({
      $or: [
        { slug: identifier },
        { name: identifier }
      ]
    });
    return tag;
  } catch (error) {
    console.error('Error fetching tag:', error);
    return null;
  }
}

export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export async function getCategoryWithPostCount() {
  try {
    const db = await getDatabase();
    const categoriesWithCount = await db
      .collection('categories')
      .aggregate([
        {
          $lookup: {
            from: 'blogposts',
            localField: '_id',
            foreignField: 'category',
            as: 'posts'
          }
        },
        {
          $project: {
            name: 1,
            slug: 1,
            postCount: { $size: { $filter: { input: '$posts', cond: { $eq: ['$$this.status', 'published'] } } } }
          }
        },
        { $sort: { name: 1 } }
      ])
      .toArray();
    
    return categoriesWithCount;
  } catch (error) {
    console.error('Error fetching categories with post count:', error);
    return [];
  }
}

export async function getTagsWithPostCount() {
  try {
    const db = await getDatabase();
    const tagsWithCount = await db
      .collection('tags')
      .aggregate([
        {
          $lookup: {
            from: 'blogposts',
            localField: '_id',
            foreignField: 'tags',
            as: 'posts'
          }
        },
        {
          $project: {
            name: 1,
            slug: 1,
            postCount: { $size: { $filter: { input: '$posts', cond: { $eq: ['$$this.status', 'published'] } } } }
          }
        },
        { $sort: { name: 1 } }
      ])
      .toArray();
    
    return tagsWithCount;
  } catch (error) {
    console.error('Error fetching tags with post count:', error);
    return [];
  }
}
