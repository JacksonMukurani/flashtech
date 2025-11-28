export interface ArticleContent {
  key_fact: string;
  analysis_points: string[];
}

export interface NewsArticle {
  id: string;
  post_title: string;
  notification_teaser: string;
  publish_date: string;
  category: string;
  content: ArticleContent;
  source_citations: string[];
  grounding_urls?: { uri: string; title: string }[];
}

export interface AdUnitProps {
  type: 'banner' | 'interstitial';
}
