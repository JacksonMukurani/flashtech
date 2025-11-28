import React, { useEffect } from 'react';
import { NewsArticle } from '../types';
import { X, ExternalLink, Share2, BarChart3, ShieldCheck, Database, Link as LinkIcon } from 'lucide-react';

interface NewsDetailProps {
  article: NewsArticle;
  onClose: () => void;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ article, onClose }) => {
  
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full sm:max-w-2xl h-[90vh] sm:h-auto sm:max-h-[85vh] bg-slate-900 sm:rounded-2xl border-t sm:border border-slate-700 shadow-2xl flex flex-col transform transition-transform duration-300 animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-start bg-slate-900 sticky top-0 z-10 sm:rounded-t-2xl">
            <div className="pr-8">
                 <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase mb-2 bg-blue-900/30 text-blue-400 border border-blue-800/50">
                    {article.category}
                 </span>
                 <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight font-sans">
                    {article.post_title}
                 </h2>
            </div>
            <button 
                onClick={onClose}
                className="p-2 -mr-2 -mt-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 space-y-6 bg-slate-900">
            
            {/* Key Fact - The Hook */}
            <div className="bg-gradient-to-r from-blue-900/20 to-slate-900 border border-blue-800/50 rounded-xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <BarChart3 className="w-24 h-24 text-blue-400" />
                </div>
                <div className="flex items-center text-blue-400 mb-2 relative z-10">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    <h3 className="font-mono font-bold uppercase tracking-wider text-xs">Critical Metric</h3>
                </div>
                <p className="text-xl sm:text-2xl font-light text-white relative z-10 leading-relaxed">
                    {article.content.key_fact}
                </p>
            </div>

            {/* Analysis Points */}
            <div>
                <h3 className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-4 flex items-center border-b border-slate-800 pb-2">
                    <Database className="w-4 h-4 mr-2" /> Technical Analysis
                </h3>
                <div className="space-y-4">
                    {article.content.analysis_points.map((point, idx) => (
                        <div key={idx} className="flex items-start group">
                            <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-800 group-hover:bg-blue-900/30 border border-slate-700 group-hover:border-blue-800/50 text-slate-400 group-hover:text-blue-400 flex items-center justify-center text-xs font-mono mr-3 mt-0.5 transition-colors">
                                {idx + 1}
                            </span>
                            <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                                {point}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sources / Grounding */}
            <div className="pt-2">
                <h3 className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-3 flex items-center border-b border-slate-800 pb-2">
                    <ShieldCheck className="w-3 h-3 mr-2" /> Verified Sources
                </h3>
                <div className="flex flex-col gap-2">
                    {article.grounding_urls && article.grounding_urls.length > 0 ? (
                        article.grounding_urls.map((url, idx) => (
                        <a 
                            key={idx} 
                            href={url.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg group transition-all"
                        >
                            <div className="flex items-center overflow-hidden">
                                <LinkIcon className="w-3 h-3 text-slate-500 mr-3 flex-shrink-0" />
                                <span className="text-sm text-blue-400 group-hover:text-blue-300 truncate font-mono">
                                    {url.title}
                                </span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400 ml-2 flex-shrink-0" />
                        </a>
                    ))) : (
                         <span className="text-slate-600 text-sm italic p-2">Internal knowledge base generation.</span>
                    )}
                </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 sm:rounded-b-2xl flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>DOC ID: {article.id.slice(0,8)}</span>
            <button className="flex items-center px-3 py-1.5 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white">
                <Share2 className="w-3 h-3 mr-2" /> Share
            </button>
        </div>
      </div>
    </div>
  );
};