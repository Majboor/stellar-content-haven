
import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMarkdown = async () => {
      if (contentRef.current) {
        // Configure marked options
        marked.setOptions({
          breaks: true,
          gfm: true,
        });

        try {
          // Convert markdown to HTML and sanitize
          // Use await to handle the Promise correctly
          const rawHtml = await marked.parse(content);
          const sanitizedHtml = DOMPurify.sanitize(rawHtml);
          
          // Set the inner HTML
          contentRef.current.innerHTML = sanitizedHtml;
          
          // Initialize any interactive elements or syntax highlighting
          // This is where you would add code highlighting, etc.
        } catch (error) {
          console.error('Error parsing markdown:', error);
          if (contentRef.current) {
            contentRef.current.innerHTML = '<p>Error rendering content</p>';
          }
        }
      }
    };

    renderMarkdown();
  }, [content]);

  return (
    <div 
      ref={contentRef} 
      className={`prose prose-lg prose-neutral dark:prose-invert mx-auto ${className}`}
    />
  );
};

export default MarkdownRenderer;
