
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
    if (contentRef.current) {
      // Configure marked options
      marked.setOptions({
        breaks: true,
        gfm: true,
      });

      // Convert markdown to HTML and sanitize
      const rawHtml = marked.parse(content);
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      
      // Set the inner HTML
      contentRef.current.innerHTML = sanitizedHtml;

      // Initialize any interactive elements or syntax highlighting
      // This is where you would add code highlighting, etc.
    }
  }, [content]);

  return (
    <div 
      ref={contentRef} 
      className={`prose prose-lg prose-neutral dark:prose-invert mx-auto ${className}`}
    />
  );
};

export default MarkdownRenderer;
