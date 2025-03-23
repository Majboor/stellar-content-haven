
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPost } from '@/services/blogService';
import Layout from '@/components/layout/Layout';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { 
    data: post, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => fetchBlogPost(slug || ''),
    enabled: !!slug,
  });

  // Set page title and meta description
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Digital Software Planet`;
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.description);
      }
    }
    
    return () => {
      document.title = 'Digital Software Planet';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Digital Software Planet Blog');
      }
    };
  }, [post]);

  // Redirect to home if post not found
  useEffect(() => {
    if (!isLoading && !post && error) {
      navigate('/');
    }
  }, [post, isLoading, error, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <article className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-6"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Button>
            
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex items-center gap-2 mb-8">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-20" />
            </div>
            
            <Skeleton className="h-[30vh] w-full mb-8" />
            
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/6" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/6" />
            </div>
          </div>
        </article>
      </Layout>
    );
  }

  if (!post) {
    return null; // Will redirect in the useEffect above
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Button>
          
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-8">
            <time dateTime={post.timestamp}>
              {formatDate(post.timestamp)}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
          
          {post.imageUrl && (
            <div className="relative aspect-video mb-10 overflow-hidden rounded-lg">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <MarkdownRenderer content={post.content} />
          
          {post.sourceUrl && (
            <div className="mt-10 pt-6 border-t">
              <a 
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                View original source
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
