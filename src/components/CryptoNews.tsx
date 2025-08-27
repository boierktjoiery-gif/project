import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, ExternalLink, Newspaper, Globe, Zap, AlertCircle } from 'lucide-react';
import { ThemeClasses } from '../types';

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;        // ISO string after normalization
  description: string;
  guid: string;
  source: string;         // filled during normalization
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;    // humanized ("2 hours ago")
  category: 'market' | 'defi' | 'regulation' | 'technology';
  impact: 'positive' | 'negative' | 'neutral';
  url: string;
}

interface CryptoNewsProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
}

type SourceStatus = {
  name: string;
  ok: boolean;
  count: number;
  error?: string;
};

const CryptoNews: React.FC<CryptoNewsProps> = ({ darkMode, themeClasses }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<SourceStatus[]>([]);

  // ---------------------------
  // Config: add/remove feeds here
  // ---------------------------
  const FEEDS = [
    { name: 'Cointelegraph', url: 'https://cointelegraph.com/rss' },
    { name: 'CoinDesk',      url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
    { name: 'Decrypt',       url: 'https://decrypt.co/feed' },
    { name: 'The Block',     url: 'https://www.theblock.co/rss.xml' },
  ];

  // ---------------
  // Utilities
  // ---------------
  const sanitize = (html: string) => (html || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

  const toISO = (dateStr: string | null | undefined): string => {
    if (!dateStr) return new Date().toISOString();
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  };

  const humanizeAge = (iso: string): string => {
    const published = new Date(iso).getTime();
    const now = Date.now();
    const diffMs = Math.max(0, now - published);
    const mins = Math.floor(diffMs / (60 * 1000));
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // Map title/desc to category & impact (kept from your logic, extended a bit)
  const inferCategory = (text: string): NewsItem['category'] => {
    const t = text.toLowerCase();
    if (/(defi|yield|liquidity|protocol|amm|dex|staking|lending)/.test(t)) return 'defi';
    if (/(sec|regulation|legal|compliance|lawsuit|policy)/.test(t))       return 'regulation';
    if (/(blockchain|network|upgrade|technology|layer 2|l2|zk|rollup)/.test(t)) return 'technology';
    return 'market';
  };

  const inferImpact = (text: string): NewsItem['impact'] => {
    const t = text.toLowerCase();
    if (/(surge|rally|bullish|gains|soars|record high|etf approval|fund inflow)/.test(t)) return 'positive';
    if (/(crash|bearish|decline|falls|hack|exploit|outage|ban|lawsuit)/.test(t)) return 'negative';
    return 'neutral';
  };

  // ---------------------------
  // Parsing: RSS and Atom
  // ---------------------------
  const parseXML = (xmlText: string, source: string): RSSItem[] => {
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, 'text/xml');

      // If it's RSS (channel/item)
      const items = Array.from(xml.querySelectorAll('channel > item'));
      if (items.length) {
        return items.map((el, idx) => ({
          title: el.querySelector('title')?.textContent || `News Item ${idx + 1}`,
          link: el.querySelector('link')?.textContent || '#',
          pubDate: toISO(el.querySelector('pubDate')?.textContent || el.querySelector('dc\\:date, date')?.textContent || ''),
          description: el.querySelector('description')?.textContent || el.querySelector('content\\:encoded')?.textContent || '',
          guid: el.querySelector('guid')?.textContent || (el.querySelector('link')?.textContent || `item-${idx}`),
          source,
        }));
      }

      // If it's Atom (feed/entry)
      const entries = Array.from(xml.querySelectorAll('feed > entry'));
      if (entries.length) {
        return entries.map((el, idx) => {
          const linkEl = (el.querySelector('link[rel="alternate"]') || el.querySelector('link'));
          const href = linkEl?.getAttribute('href') || '#';
          const summary = el.querySelector('summary')?.textContent || el.querySelector('content')?.textContent || '';
          const id = el.querySelector('id')?.textContent || href || `entry-${idx}`;
          const updated = el.querySelector('updated')?.textContent || el.querySelector('published')?.textContent || '';
          return {
            title: el.querySelector('title')?.textContent || `News Item ${idx + 1}`,
            link: href,
            pubDate: toISO(updated),
            description: summary,
            guid: id,
            source,
          };
        });
      }

      // Fallback empty
      return [];
    } catch (e) {
      console.error('XML parse error', e);
      return [];
    }
  };

  // ------------------------------------
  // Networking with layered fallbacks
  // ------------------------------------
  const fetchText = async (url: string): Promise<string> => {
    const res = await fetch(url, { headers: { 'Accept': 'application/xml, text/xml, text/plain, application/rss+xml' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  };

  // Try: direct → allorigins → cors.is → r.jina.ai (plaintext) 
  const fetchWithFallbacks = async (srcUrl: string): Promise<string> => {
    const chains = [
      () => fetchText(srcUrl),
      () => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(srcUrl)}`).then(r => {
        if (!r.ok) throw new Error(`AllOrigins HTTP ${r.status}`);
        return r.json();
      }).then(j => {
        if (!j?.contents) throw new Error('AllOrigins: empty contents');
        return j.contents as string;
      }),
      () => fetch(`https://api.cors.is/get?url=${encodeURIComponent(srcUrl)}`).then(r => {
        if (!r.ok) throw new Error(`CORS.is HTTP ${r.status}`);
        return r.json();
      }).then(j => {
        if (!j?.contents) throw new Error('CORS.is: empty contents');
        return j.contents as string;
      }),
      // Last resort: r.jina.ai returns rendered text/markdown of the page; still parseable for some feeds or at least usable to extract titles/links via regex if needed
      () => fetchText(`https://r.jina.ai/http://r.jina.ai/http://r.jina.ai/http://` + srcUrl.replace(/^https?:\/\//, '')) // doubled to defeat some anti-hotlinking; harmless if ignored
        .catch(() => fetchText(`https://r.jina.ai/http://` + srcUrl.replace(/^https?:\/\//, ''))),
    ];

    let lastErr: any = null;
    for (const step of chains) {
      try {
        const text = await step();
        if (typeof text === 'string' && text.length > 0) return text;
      } catch (e) {
        lastErr = e;
        continue;
      }
    }
    throw lastErr || new Error('All fetch methods failed');
  };

  // ---------------------------
  // Core loader
  // ---------------------------
  const fetchCryptoNews = async () => {
    setLoading(true);
    const sourceResults: SourceStatus[] = [];
    const collected: RSSItem[] = [];

    for (const feed of FEEDS) {
      try {
        const xml = await fetchWithFallbacks(feed.url);
        const parsed = parseXML(xml, feed.name);

        // Basic cleanup + normalization
        parsed.forEach(item => {
          item.title = sanitize(item.title);
          item.description = sanitize(item.description);
          item.pubDate = toISO(item.pubDate);
          // Normalize GUIDs (some feeds give long querystrings)
          item.guid = (item.guid || item.link || '').slice(0, 512);
        });

        collected.push(...parsed);
        sourceResults.push({ name: feed.name, ok: true, count: parsed.length });
      } catch (err: any) {
        console.warn(`Feed failed: ${feed.name}`, err);
        sourceResults.push({ name: feed.name, ok: false, count: 0, error: String(err?.message || err) });
      }
    }

    // De-duplicate by GUID/link/title combo (in that order)
    const seen = new Set<string>();
    const deduped = collected.filter(item => {
      const key = item.guid || item.link || item.title;
      if (!key) return false;
      const k = key.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    // Sort by recency
    deduped.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    // Map to your NewsItem[] shape (cap to 20)
    let finalNews: NewsItem[] = deduped.slice(0, 20).map((item, index) => {
      const content = `${item.title} ${item.description}`;
      const category = inferCategory(content);
      const impact = inferImpact(content);
      const publishedAt = humanizeAge(item.pubDate);
      const summary = item.description.length > 160 ? item.description.slice(0, 160) + '…' :
                      item.description || 'Latest cryptocurrency news and market updates.';

      return {
        id: item.guid || `news-${index}`,
        title: item.title || `News Item ${index + 1}`,
        summary,
        source: item.source || 'Unknown',
        publishedAt,
        category,
        impact,
        url: item.link || '#',
      };
    });

    // Fallback sample items if everything failed
    if (finalNews.length === 0) {
      finalNews = [
        {
          id: 'fallback-1',
          title: 'Crypto markets mixed as traders await macro data',
          summary: 'Major assets trade sideways while altcoins show isolated strength ahead of upcoming economic releases.',
          source: 'Fallback',
          publishedAt: 'Just now',
          category: 'market',
          impact: 'neutral',
          url: '#',
        },
        {
          id: 'fallback-2',
          title: 'Layer-2 activity climbs on cheaper fees and new launches',
          summary: 'Throughput and user counts grow across L2s as ecosystems push new upgrades and incentives.',
          source: 'Fallback',
          publishedAt: '5 mins ago',
          category: 'technology',
          impact: 'positive',
          url: '#',
        },
        {
          id: 'fallback-3',
          title: 'Regulators weigh new guidance for stablecoin issuers',
          summary: 'Policy makers discuss reserve transparency and customer protection standards.',
          source: 'Fallback',
          publishedAt: '12 mins ago',
          category: 'regulation',
          impact: 'neutral',
          url: '#',
        },
      ];
    }

    setStatuses(sourceResults);
    setNews(finalNews);
    setLoading(false);
    setCurrentIndex(0);
  };

  // Initial + 5-minute refresh
  useEffect(() => {
    fetchCryptoNews();
    const interval = setInterval(fetchCryptoNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate every 8s
  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [news.length]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'market': return TrendingUp;
      case 'defi': return Zap;
      case 'regulation': return AlertCircle;
      case 'technology': return Globe;
      default: return Newspaper;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'market': return 'from-green-500 to-emerald-600';
      case 'defi': return 'from-purple-500 to-violet-600';
      case 'regulation': return 'from-orange-500 to-red-600';
      case 'technology': return 'from-blue-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return themeClasses.textSecondary;
    }
  };

  if (loading) {
    return (
      <div className={`${themeClasses.cardBg} rounded-3xl ${themeClasses.border} border overflow-hidden shadow-xl p-6`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className={`ml-3 ${themeClasses.textSecondary}`}>Loading crypto news...</span>
        </div>
      </div>
    );
  }

  const currentNews = news[currentIndex];

  return (
    <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl lg:rounded-3xl ${themeClasses.border} border overflow-hidden shadow-xl`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/30 to-purple-900/30' : 'from-blue-50 to-purple-50'} p-3 sm:p-4 border-b ${themeClasses.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${themeClasses.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold ${themeClasses.text} text-base sm:text-lg`}>Crypto News</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className={`text-xs ${themeClasses.textSecondary}`}>
                <span className="hidden sm:inline">Latest market updates and insights</span>
                <span className="sm:hidden">Market updates</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xs ${themeClasses.textSecondary}`}>
              <span className="hidden sm:inline">{currentIndex + 1} of {news.length}</span>
              <span className="sm:hidden">{currentIndex + 1}/{news.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured News */}
      <div className="p-4 sm:p-6">
        {currentNews && (
          <div className="space-y-3 sm:space-y-4">
            {/* Category and Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {(() => {
                  const CategoryIcon = getCategoryIcon(currentNews.category);
                  return (
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r ${getCategoryColor(currentNews.category)} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg`}>
                      <CategoryIcon className="w-4 h-4 text-white" />
                    </div>
                  );
                })()}
                <span className={`text-xs sm:text-sm font-medium ${themeClasses.text} capitalize`}>
                  {currentNews.category}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <Clock className={`w-3 h-3 ${themeClasses.textSecondary}`} />
                <span className={themeClasses.textSecondary}>{currentNews.publishedAt}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className={`text-base sm:text-lg font-bold ${themeClasses.text} leading-tight`}>
              {currentNews.title}
            </h3>

            {/* Summary */}
            <p className={`${themeClasses.textSecondary} text-xs sm:text-sm leading-relaxed`}>
              {currentNews.summary}
            </p>

            {/* Source and Impact */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${themeClasses.textSecondary}`}>Source:</span>
                <span className={`text-xs font-medium ${themeClasses.text}`}>{currentNews.source}</span>
              </div>
              <a
                href={currentNews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors w-fit"
              >
                <span className={`text-xs font-medium ${getImpactColor(currentNews.impact)} capitalize whitespace-nowrap`}>
                  {currentNews.impact} Impact
                </span>
                <ExternalLink className={`w-3 h-3 ${themeClasses.textSecondary}`} />
              </a>
            </div>

            {/* Engagement Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pt-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className={`${themeClasses.textSecondary}`}>Category:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                  {currentNews.category}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className={`text-xs font-medium ${getImpactColor(currentNews.impact)} capitalize whitespace-nowrap`}>
                  {currentNews.impact} sentiment
                </span>
              </div>
            </div>
          </div>
        )}

        {/* News Indicators */}
        <div className="flex items-center justify-center space-x-2 mt-4 sm:mt-6">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `bg-gradient-to-r ${themeClasses.gradient} shadow-lg scale-125`
                  : `${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
              }`}
            />
          ))}
        </div>

        {/* Quick Headlines */}
        <div className="mt-4 sm:mt-6 space-y-2">
          <h4 className={`text-xs sm:text-sm font-semibold ${themeClasses.text} mb-3`}>Other Headlines</h4>
          <div className="space-y-2">
            {news.slice(0, 3).filter((_, i) => i !== currentIndex).slice(0, 2).map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-left p-2 sm:p-3 rounded-lg sm:rounded-xl ${darkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'} border ${themeClasses.border} transition-all duration-200`}
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  {(() => {
                    const CategoryIcon = getCategoryIcon(item.category);
                    return (
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r ${getCategoryColor(item.category)} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <CategoryIcon className="w-3 h-3 text-white" />
                      </div>
                    );
                  })()}
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm font-medium ${themeClasses.text} line-clamp-2 leading-relaxed`}>
                      {item.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                      <span className={`text-xs ${themeClasses.textSecondary}`}>{item.source}</span>
                      <span className={`text-xs ${themeClasses.textSecondary} hidden sm:inline`}>•</span>
                      <span className={`text-xs ${themeClasses.textSecondary}`}>{item.publishedAt}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* API Status (now shows multiple feeds) */}
        <div className={`mt-4 sm:mt-6 bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-blue-900/20' : 'from-green-50 to-blue-50'} rounded-xl p-3 sm:p-4 border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-green-600" />
              <span className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                Sources: {statuses.map(s => `${s.name}${s.ok ? '' : '✕'}`).join(', ')}
              </span>
            </div>
            <div className={`text-xs ${themeClasses.textSecondary}`}>
              <span className="hidden sm:inline">Auto-refresh every 5 min</span>
              <span className="sm:hidden">Auto 5min</span>
            </div>
          </div>
          {/* Optional per-source line */}
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
            {statuses.map((s, i) => (
              <div key={i} className="text-xs flex items-center justify-between">
                <span className={`${s.ok ? 'text-green-600' : 'text-orange-600'}`}>{s.name}</span>
                <span className={`${themeClasses.textSecondary}`}>{s.ok ? `${s.count} items` : 'fallback used'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoNews;
