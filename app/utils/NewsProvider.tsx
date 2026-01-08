import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NEWS_CACHE_KEY = "cached_news_v3";
const NEWS_TIMESTAMP_KEY = "cached_news_ts_v3";
const DEFAULT_REFRESH_MINUTES = 5;

export type NewsItem = {
  title: string;
  description: string;
  link: string;
  image?: string | null;
  localImage?: string | null;
  source: string;
};

type FeedMap = Record<string, string[]>;

type ProviderProps = {
  children: React.ReactNode;
  feeds: FeedMap | null;
  overlay?: boolean;
  refreshMinutes?: number;
  limit?: number;
};

type ContextType = {
  items: NewsItem[];
  refresh: () => Promise<void>;
};

const NewsContext = createContext<ContextType | null>(null);

// =========================================================
// CACHE
// =========================================================
async function saveCache(list: NewsItem[]) {
  await AsyncStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(list));
  await AsyncStorage.setItem(NEWS_TIMESTAMP_KEY, Date.now().toString());
}

async function loadCache(): Promise<NewsItem[] | null> {
  const json = await AsyncStorage.getItem(NEWS_CACHE_KEY);
  return json ? JSON.parse(json) : null;
}

async function isExpired(minutes: number) {
  const ts = await AsyncStorage.getItem(NEWS_TIMESTAMP_KEY);
  if (!ts) return true;
  return Date.now() - Number(ts) > minutes * 60 * 1000;
}

// =========================================================
// PROVIDER
// =========================================================
export function NewsProvider({
  children,
  feeds,
  overlay = false,
  refreshMinutes = DEFAULT_REFRESH_MINUTES,
  limit,
}: ProviderProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const lock = useRef(false);

  const refresh = async () => {
    if (lock.current || !feeds) return;
    lock.current = true;

    try {
      const body = { news: feeds, limit, shuffle: true };
      const res = await fetch("https://jpdash20.vercel.app/api/player/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      const news: NewsItem[] = (data.items || []).map((n: any) => ({
        ...n,
        localImage: n.image || null, // se quiser, pode baixar/cachear imagem local
      }));

      const final = overlay ? news : news.filter((n) => n.localImage);

      setItems(final);
      await saveCache(final);
    } catch (err) {
      console.log("Erro NewsProvider refresh:", err);
    } finally {
      lock.current = false;
    }
  };

  useEffect(() => {
    (async () => {
      if (!feeds || Object.keys(feeds).length === 0) {
        setItems([]);
        return;
      }

      const cached = await loadCache();
      if (cached?.length) setItems(cached);

      if (!cached || (await isExpired(refreshMinutes))) {
        await refresh();
      }
    })();
  }, [JSON.stringify(feeds), overlay]);
  return (
    <NewsContext.Provider value={{ items, refresh }}>
      {children}
    </NewsContext.Provider>
  );
}

export const useNews = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNews must be inside NewsProvider");
  return ctx;
};
