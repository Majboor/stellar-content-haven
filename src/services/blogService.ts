
import { toast } from "@/components/ui/use-toast";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  timestamp: string;
  author: string;
  readingTime: string;
  imageUrl: string;
  sourceUrl?: string;
}

interface BlogPostApiItem {
  content: string;
  meta_tags: {
    title: string;
    description: string;
  };
  slug: string;
  timestamp: string;
  url?: string;
  mode?: string;
}

export interface BlogPostResponse {
  slug: string;
  content: string;
  title: string;
  description: string;
  url?: string;
  timestamp: string;
}

export const fetchBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`https://microsoftdsp.techrealm.online/content?slug=${slug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.status}`);
    }
    
    // The API returns an array of blog posts
    const data: BlogPostApiItem[] = await response.json();
    
    // Check if we have any results
    if (!data || data.length === 0) {
      throw new Error('No blog post found with the given slug');
    }
    
    // Use the first item in the array
    const postData = data[0];
    
    // Transform the API response to our BlogPost interface
    // Use the exact meta title from the API
    return {
      id: postData.slug,
      slug: postData.slug,
      title: postData.meta_tags.title,
      description: postData.meta_tags.description,
      content: postData.content,
      timestamp: postData.timestamp,
      sourceUrl: postData.url,
      author: "techrealm.pk",
      readingTime: calculateReadingTime(postData.content),
      imageUrl: getRandomImageUrl(postData.slug),
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    toast({
      title: "Error fetching content",
      description: "Unable to load the requested content. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

export const fetchRecentBlogPosts = async (): Promise<BlogPost[]> => {
  // In a real application, this would fetch from an API
  // For now, we'll return mock data
  return [
    {
      id: "1",
      slug: "your-product-slug",
      title: "Digital Software Planet Blog",
      description: "Explore the latest insights from the Digital Software Planet blog.",
      content: "...",
      timestamp: new Date().toISOString(),
      author: "techrealm.pk",
      readingTime: "5 min read",
      imageUrl: getRandomImageUrl("1"),
    },
    {
      id: "2",
      slug: "getting-started",
      title: "Getting Started with Digital Software Planet",
      description: "Learn how to begin your journey with Digital Software Planet.",
      content: "...",
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      author: "techrealm.pk",
      readingTime: "3 min read",
      imageUrl: getRandomImageUrl("2"),
    },
    {
      id: "3",
      slug: "best-practices",
      title: "Best Practices for Software Development",
      description: "Discover the top recommended practices for modern software development.",
      content: "...",
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      author: "techrealm.pk",
      readingTime: "7 min read",
      imageUrl: getRandomImageUrl("3"),
    }
  ];
};

// Helper function to calculate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};

// Helper function to get a placeholder image
const getRandomImageUrl = (seed: string): string => {
  // Use a consistent seed for the same post to get the same image
  return `https://picsum.photos/seed/${seed}/800/400`;
};
