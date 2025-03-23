
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
        // Configure marked options with valid properties according to MarkedOptions type
        marked.setOptions({
          breaks: true,
          gfm: true,
          // Note: We're removing 'headerIds' and 'tables' as they don't exist in MarkedOptions type
          // Tables will still be rendered as gfm is set to true (GitHub Flavored Markdown)
          mangle: false
        });

        try {
          // Convert markdown to HTML and sanitize
          const rawHtml = await marked.parse(content);
          const sanitizedHtml = DOMPurify.sanitize(rawHtml);
          
          // Set the inner HTML
          contentRef.current.innerHTML = sanitizedHtml;
          
          // Add some basic styling for tables if they exist
          const tables = contentRef.current.querySelectorAll('table');
          if (tables.length > 0) {
            tables.forEach(table => {
              table.classList.add('w-full', 'border-collapse', 'my-4');
              
              // Style table headers
              const headers = table.querySelectorAll('th');
              headers.forEach(header => {
                header.classList.add('border', 'p-2', 'bg-muted', 'text-left');
              });
              
              // Style table cells
              const cells = table.querySelectorAll('td');
              cells.forEach(cell => {
                cell.classList.add('border', 'p-2');
              });
            });
          }
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
