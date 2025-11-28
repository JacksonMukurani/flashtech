import React from 'react';
import { AdUnitProps } from '../types';

export const AdPlaceholder: React.FC<AdUnitProps> = ({ type }) => {
  if (type === 'banner') {
    return (
      <div className="w-full bg-slate-800 border border-slate-700 p-4 my-4 flex flex-col items-center justify-center text-slate-500 rounded-lg animate-pulse">
        <span className="text-xs font-mono uppercase tracking-widest mb-1">Advertisement</span>
        <div className="h-8 w-3/4 bg-slate-700 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 bg-slate-900 border-y border-slate-700 my-8 flex flex-col items-center justify-center text-slate-500">
      <span className="text-xs font-mono uppercase tracking-widest mb-2">Sponsored Content</span>
      <div className="text-center p-4">
        <h3 className="text-xl font-bold text-slate-300 mb-2">Cloud Infrastructure Summit 2025</h3>
        <p className="text-sm">Join the leading DevOps professionals in San Francisco.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-500 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};
