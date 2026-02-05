/**
 * Image URL utilities for handling dynamic images from external server
 */

// Get base URL from environment variables with fallback
const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable or fallback
    return process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:3001';
  } else {
    // Server-side: use environment variable or fallback
    return process.env.IMAGE_URL || process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:3001';
  }
};

/**
 * Construct project cover image URL safely
 * @param coverImage - The cover image filename
 * @param fallback - Fallback image path
 * @returns Full URL to the project cover image
 */
export const getProjectImageUrl = (coverImage?: string, fallback: string = '/images/blog-covers/default-project.jpg'): string => {
  if (!coverImage) return fallback;
  
  const baseUrl = getBaseUrl();
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const imagePath = `/images/blog-covers/${coverImage.replace(/^\//, '')}`;
  
  return `${cleanBaseUrl}${imagePath}`;
};

/**
 * Construct project logo URL safely
 * @param logo - The logo filename
 * @param fallback - Fallback image path
 * @returns Full URL to the project logo
 */
export const getProjectLogoUrl = (logo?: string, fallback: string = '/images/blog-covers/default-logo.png'): string => {
  if (!logo) return fallback;
  
  const baseUrl = getBaseUrl();
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const logoPath = `/images/blog-covers/${logo.replace(/^\//, '')}`;
  
  return `${cleanBaseUrl}${logoPath}`;
};

/**
 * Construct blog cover image URL safely
 * @param coverImage - The blog cover image filename
 * @param fallback - Fallback image path
 * @returns Full URL to the blog cover image
 */
export const getBlogImageUrl = (coverImage?: string, fallback: string = '/images/blog/blog_details-img01.jpg'): string => {
  if (!coverImage) return fallback;
  
  const baseUrl = getBaseUrl();
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const imagePath = `/images/blog-covers/${coverImage.replace(/^\//, '')}`;
  
  return `${cleanBaseUrl}${imagePath}`;
};

/**
 * Generic image URL constructor for any image type
 * @param imagePath - The image path (e.g., 'blog-covers/image.jpg', 'logos/logo.png')
 * @param fallback - Fallback image path
 * @returns Full URL to the image
 */
export const getImageUrl = (imagePath?: string, fallback: string = '/images/blog-covers/default-project.jpg'): string => {
  if (!imagePath) return fallback;
  
  const baseUrl = getBaseUrl();
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanImagePath = imagePath.replace(/^\//, '');
  
  return `${cleanBaseUrl}/images/${cleanImagePath}`;
};

/**
 * Get the base URL for debugging purposes
 * @returns The current base URL being used
 */
export const getCurrentBaseUrl = (): string => {
  return getBaseUrl();
};
