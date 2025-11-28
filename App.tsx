import React, { useState, useEffect } from 'react';
import { fetchNewsBrief } from './services/geminiService';
import { NewsArticle } from './types';
import { NewsCard } from './components/NewsCard';
import { NewsDetail } from './components/NewsDetail';
import { AdPlaceholder } from './components/AdPlaceholder';
import { Zap, RefreshCw, Terminal, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMoreNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real serverless app, this would be pushing from Firestore.
      // Here we simulate the "Scheduler" by manually triggering the generation.
      const newArticle = await fetchNewsBrief();
      setArticles(prev => [newArticle, ...prev]);
    } catch (err) {
      setError("Unable to connect to intelligence feed. Check API Key.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadMoreNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-200">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Flash<span className="text-blue-500">Tech</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center px-2 py-1 bg-red-900/30 border border-red-900 rounded text-red-400 text-xs font-mono animate-pulse">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                LIVE FEED
            </div>
            <button 
                onClick={loadMoreNews} 
                disabled={loading}
                className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full transition-colors disabled:opacity-50"
                title="Simulate 15m Scheduler Update"
            >
                <RefreshCw className={`w-5 h-5 text-blue-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </header>

      {/* Main Content Feed */}
      <main className="max-w-md mx-auto px-4 py-6 sm:max-w-2xl">
        
        <div className="mb-6">
            <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Latest Briefs</h2>
            
            {error && (
                <div className="bg-red-900/20 border border-red-800 p-4 rounded-lg mb-4 flex items-center text-red-300 text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {error}
                </div>
            )}

            {articles.length === 0 && !loading && !error && (
                <div className="text-center py-10 text-slate-600">
                    <p>Initializing zero-latency stream...</p>
                </div>
            )}

            {articles.map((article, index) => (
                <React.Fragment key={article.id}>
                    <NewsCard 
                        article={article} 
                        onClick={setSelectedArticle} 
                    />
                    {/* Inject Ad every 3rd post */}
                    {(index + 1) % 3 === 0 && <AdPlaceholder type="banner" />}
                </React.Fragment>
            ))}

            {loading && (
                <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-5 animate-pulse">
                    <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-slate-700 rounded w-3/4 mb-3"></div>
                    <div className="h-20 bg-slate-700/50 rounded w-full"></div>
                </div>
            )}
        </div>

        <div className="flex justify-center mt-8 text-xs text-slate-600 font-mono">
            <p>Powered by Gemini 2.5 Flash-Lite & Search Grounding</p>
        </div>
      </main>

      {/* Modal/Detail View */}
      {selectedArticle && (
        <NewsDetail 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
        />
      )}

    </div>
  );
};

export default App;
