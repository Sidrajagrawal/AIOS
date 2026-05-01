import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function DocContent({ category, articleId }) {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!articleId) return;

    setLoading(true);
    fetch(`/docs/${category.id}-${articleId}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then((text) => {
        console.log(text);
        
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent('# 404\nDocument not found. Please select a valid article.');
        setLoading(false);
      });
  }, [category.id, articleId]);

  if (!articleId) {
    return (
      <div className="max-w-4xl mx-auto p-12">
        <h1 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          {category.title}
        </h1>
        <div className="space-y-4">
          {category.articles.map(article => (
            <div
              key={article.id}
              onClick={() => navigate(`/docs/${category.id}/${article.id}`)}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <ArrowRight className="w-5 h-5 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
              <span className="text-gray-300 font-medium group-hover:text-white">{article.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="p-12 text-[#FF6B00] animate-pulse">Loading documentation...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-12 pb-24">
      <div className="prose prose-invert prose-orange max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div className="rounded-lg overflow-hidden border border-white/10 my-6 shadow-2xl">
                  <div className="bg-[#121212] px-4 py-2 text-xs font-mono text-gray-400 border-b border-white/10">
                    {match[1].toUpperCase()}
                  </div>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ margin: 0, background: '#000000', padding: '1.5rem' }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="bg-[#FF6B00]/20 text-[#FF6B00] px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}