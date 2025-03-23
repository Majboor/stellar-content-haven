
import { Link } from 'react-router-dom';
import { BlogPost } from '@/services/blogService';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
  className?: string;
  index?: number;
}

const BlogCard = ({ post, variant = 'default', className = '', index = 0 }: BlogCardProps) => {
  const isFeatured = variant === 'featured';
  
  // Calculate animation delay based on index
  const animationDelay = `animate-delay-${(index % 5) * 100}`;

  return (
    <Link to={`/${post.slug}`} className={className}>
      <Card className={`overflow-hidden border border-border/50 transition-all duration-300 h-full 
        ${isFeatured ? 'hover:shadow-lg' : 'hover:shadow-md'} 
        hover:border-border/80 animate-scale-in ${animationDelay}`}
      >
        <div className={`relative ${isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'} overflow-hidden bg-muted`}>
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardContent className={`${isFeatured ? 'p-6' : 'p-4'} space-y-3`}>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={post.timestamp}>{formatDate(post.timestamp)}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          
          <h3 className={`font-display font-medium line-clamp-2 
            ${isFeatured ? 'text-2xl' : 'text-lg'}`}
          >
            {post.title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {post.description}
          </p>
          
          {isFeatured && (
            <div className="pt-2">
              <span className="text-primary text-sm font-medium inline-flex items-center">
                Read article
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                  <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
