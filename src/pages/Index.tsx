
import { useQuery } from '@tanstack/react-query';
import { fetchRecentBlogPosts } from '@/services/blogService';
import Layout from '@/components/layout/Layout';
import BlogCard from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: fetchRecentBlogPosts,
  });

  const featuredPost = posts?.[0];
  const recentPosts = posts?.slice(1);

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background pointer-events-none" />
        <div className="container px-4 py-16 md:py-24 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
              Digital Software Planet
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Insights and innovations from the digital software world
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href="#featured">
                  Latest Articles
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <a href="https://techrealm.pk" target="_blank" rel="noopener noreferrer">
                  About techrealm.pk
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="py-16 md:py-24 bg-accent/30">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="animate-slide-up mb-6 md:mb-0">
              <h2 className="font-display text-3xl md:text-4xl font-medium">Featured Content</h2>
              <p className="text-muted-foreground mt-2">Explore our latest insights and articles</p>
            </div>
            <Button asChild variant="outline" className="group animate-slide-up">
              <a href="#recent" className="flex items-center gap-2">
                View all articles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {isLoading ? (
            <div className="h-64 bg-muted animate-pulse rounded-lg" />
          ) : error ? (
            <div className="text-center p-12 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Unable to load content</h3>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          ) : featuredPost ? (
            <BlogCard post={featuredPost} variant="featured" />
          ) : null}
        </div>
      </section>

      <section id="recent" className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-12 animate-slide-up">Recent Articles</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-12 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Unable to load content</h3>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          ) : recentPosts?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">Check back soon for new content</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-6 animate-slide-up">
              About Digital Software Planet
            </h2>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up animate-delay-100">
              We provide expert insights, analysis and resources for the ever-evolving world of software development.
              Our platform is built to help professionals and enthusiasts stay updated with the latest trends and innovations.
            </p>
            <Button asChild size="lg" className="rounded-full px-6 animate-slide-up animate-delay-200">
              <a href="https://techrealm.pk" target="_blank" rel="noopener noreferrer">
                Learn more about techrealm.pk
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
