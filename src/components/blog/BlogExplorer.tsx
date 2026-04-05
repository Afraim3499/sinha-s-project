"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type BlogPost } from "@/lib/blog";

interface BlogExplorerProps {
  posts: Omit<BlogPost, 'content'>[];
  categories: { title: string; icon: React.ReactNode }[];
}

export default function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory ? post.category === activeCategory : true;
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    if (activeCategory || searchQuery) return null;
    return posts[0];
  }, [posts, activeCategory, searchQuery]);

  const displayPosts = useMemo(() => {
    return featuredPost ? filteredPosts.slice(1) : filteredPosts;
  }, [filteredPosts, featuredPost]);

  return (
    <div className="space-y-24">
      {/* 1. SEARCH & FILTER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-stone-100">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search articles & guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-4 bg-stone-50 border border-stone-100 focus:outline-none focus:border-accent/40 text-sm font-light tracking-wide"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-accent"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeCategory === null
                ? "bg-stone-950 text-white"
                : "bg-stone-50 text-stone-400 hover:bg-stone-100"
            }`}
          >
            All Insights
          </button>
          {Array.from(new Set(posts.map((p) => p.category))).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? "bg-stone-950 text-white"
                  : "bg-stone-50 text-stone-400 hover:bg-stone-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. FEATURED POST (Shown only when no filter is active) */}
      {featuredPost && (
        <section className="relative group">
          <Link href={`/insights/${featuredPost.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-stone-100 overflow-hidden bg-white hover:border-accent/30 transition-colors shadow-sm hover:shadow-xl duration-700">
            <div className="relative aspect-square lg:aspect-auto overflow-hidden">
              <Image
                src={(featuredPost as BlogPost).heroImage || "/hero-pd.webp"}
                alt={featuredPost.title || "Featured Insight"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                priority
              />
              <div className="absolute top-8 left-8">
                <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2">
                  Featured Insight
                </span>
              </div>
            </div>
            <div className="p-10 md:p-16 lg:p-24 flex flex-col justify-center space-y-8">
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                <span>{featuredPost.category}</span>
                <span className="w-4 h-px bg-stone-200" />
                <span>{new Date(featuredPost.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight group-hover:text-accent transition-colors italic">
                {featuredPost.title}
              </h2>
              <p className="text-foreground/60 text-lg md:text-xl font-light leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="pt-4">
                <Button variant="premium" className="h-14 px-10 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none group-hover:bg-accent group-hover:text-white transition-all">
                  Read Full Article <ArrowRight className="w-3 h-3 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 3. POST GRID */}
      <section>
        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {displayPosts.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 border border-stone-100 mb-8">

                  <Image
                    src={(post as BlogPost).heroImage || '/hero-pd.webp'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-stone-950/90 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-foreground/40">
                    <Calendar className="w-3 h-3" /> {new Date((post as BlogPost).date).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
                    <span className="w-1 h-1 rounded-full bg-stone-300 mx-2" />
                    <Clock className="w-3 h-3" /> {(post as BlogPost).readingTime}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold group-hover:text-accent transition-colors leading-snug italic">
                    {post.title}
                  </h3>
                  <p className="text-foreground/60 text-sm font-light line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all text-accent">
                    Read Article <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-stone-200">
            <p className="text-stone-400 font-light italic text-xl">
              No matching articles found for &ldquo;{searchQuery}&rdquo;.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(null);
              }}
              className="mt-4 text-accent uppercase tracking-widest font-bold text-[10px]"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </section>

      {/* 4. REFINED BROWSE BY CATEGORY */}
      <section className="py-24 pt-32 border-t border-stone-100">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Categorized Learning</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold italic">Browse by Category</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => {
                // Find a matching post category if possible
                const matchingPost = posts.find(p => p.category.toLowerCase().includes(cat.title.toLowerCase().split(' ')[0].toLowerCase()));
                if (matchingPost) {
                  setActiveCategory(matchingPost.category);
                  window.scrollTo({ top: document.getElementById('articles-start')?.offsetTop || 1200, behavior: 'smooth' });
                } else {
                  // Fallback to just setting search to the title
                  setSearchQuery(cat.title);
                  window.scrollTo({ top: document.getElementById('articles-start')?.offsetTop || 1200, behavior: 'smooth' });
                }
              }}
              className="flex flex-col items-start bg-white p-10 border border-stone-100 hover:border-accent/40 hover:bg-stone-50 transition-all group text-left"
            >
              <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                {cat.icon}
              </div>
              <p className="text-stone-900 font-bold uppercase tracking-[0.2em] text-xs mb-2">{cat.title}</p>
              <span className="text-[10px] text-stone-400 font-light italic">Explore focus area →</span>
            </button>
          ))}
        </div>
      </section>

      {/* Anchor for scroll-to-top when filtering */}
      <div id="articles-start" className="absolute -top-24" />
    </div>
  );
}
