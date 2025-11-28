import React from 'react';
import { NewsArticle } from '../types';
import { Clock, ChevronRight, Zap } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  onClick: (article: NewsArticle) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  const timeAgo = (dateString: string) => {
    // Simulating time ago for demo purposes since API might return varying dates
    return "15m ago";
  };

  return (
    <div 
      onClick={() => onClick(article)}
      className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-4 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-mono font-bold bg-blue-900/50 text-blue-400 border border-blue-800">
          {article.category}
        </span>
        <div className="flex items-center text-slate-400 text-xs font-mono">
          <Clock className="w-3 h-3 mr-1" />
          {timeAgo(article.publish_date)}
        </div>
      </div>

      <h2 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors">
        {article.post_title}
      </h2>

      {/* Curiosity Teaser Display */}
      <div className="bg-slate-900/50 border-l-2 border-yellow-500 p-3 rounded-r mb-4">
        <p className="text-slate-300 text-sm italic">
          <span className="text-yellow-500 font-bold mr-2"><Zap className="w-3 h-3 inline" /> Teaser:</span>
          "{article.notification_teaser}"
        </p>
      </div>

      <div className="flex justify-end">
        <span className="text-blue-400 text-sm font-bold flex items-center group-hover:underline">
          Read Brief <ChevronRight className="w-4 h-4 ml-1" />
        </span>
      </div>
    </div>
  );
};
