import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from './Sidebar';
import DocContent from './DocContent';
import { docCategories } from './docData';

export default function DocsLayout() {
  const { categoryId, articleId } = useParams();
  const navigate = useNavigate();

  const category = docCategories.find(c => c.id === categoryId);

  if (!category) {
    navigate('/docs');
    return null;
  }

  return (
    // ADDED the identical gradient here to the root div to match DocsLanding
    <div className="min-h-screen bg-[#0a0a0a] font-[Poppins] flex flex-col selection:bg-[#FF6B00] selection:text-white bg-[radial-gradient(ellipse_at_top,_rgba(255,107,0,0.15),_transparent_50%)]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden h-screen pt-20">

// Inside DocsLayout.jsx
        <Sidebar
          category={category}
          activeDoc={articleId} 
          onNavigate={(id) => navigate(`/docs/${category.id}/${id}`)}
          onBack={() => navigate('/docs')}
        />

        {/* REMOVED the off-center gradient from the main tag */}
        <main className="flex-1 overflow-y-auto">
          <DocContent category={category} articleId={articleId} />
        </main>

      </div>
    </div>
  );
}