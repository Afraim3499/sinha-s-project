import { getPostData, getAllPostSlugs } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InsightsSubscribe } from "@/components/ui/insights-subscribe";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: `/insights/${resolvedParams.slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [{ url: post.heroImage }],
      type: "article",
      url: `/insights/${resolvedParams.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);

  if (!post) return <div>Post not found</div>; // Safety check

  // Dynamic FAQ Extraction for AEO
  const faqMatches = Array.from(post.content.matchAll(/\*\*Q: (.*?)\*\*\s*\n\s*A: (.*?)\n/g)) as RegExpMatchArray[];
  const faqs = faqMatches.map((match: RegExpMatchArray) => ({
    "@type": "Question",
    "name": match[1].trim(),
    "acceptedAnswer": {
      "@type": "Answer",
      "text": match[2].trim()
    }
  }));

  // JSON-LD for Search Engines
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.heroImage,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "Sinha Sourcing Hub Ltd"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sinha Sourcing Hub Ltd",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sinhasourcinghub.com/logo.png"
      }
    }
  };

  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  } : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sinhasourcinghub.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": "https://sinhasourcinghub.com/insights"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://sinhasourcinghub.com/insights/${resolvedParams.slug}`
      }
    ]
  };

  return (
    <article className="pt-24 min-h-screen bg-background pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      
      {/* 1. BREADCRUMBS & TOP NAVIGATION */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <Link href="/insights" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Insights
        </Link>
      </div>

      {/* 2. TITLE SECTION (Full Width) */}
      <header className="container mx-auto px-4 md:px-8 mb-12">
        <div className="max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{post.category}</span>
            <span className="w-8 h-px bg-stone-200" />
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
              <Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 border-l border-stone-200 pl-4 ml-4">
              <Clock className="w-3 h-3" /> {post.readingTime}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-12">
            {post.title}
          </h1>
        </div>
      </header>

      {/* 3. SUB-HEADER (1:1 Layout: Excerpt & Image) */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-stone-100 items-stretch">
          {/* Excerpt Block */}
          <div className="p-10 md:p-16 lg:p-24 bg-stone-50 flex flex-col justify-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-stone-700 leading-relaxed font-light italic">
              &ldquo;{post.excerpt}&rdquo;
            </p>
          </div>
          {/* Hero Image Block */}
          <div className="relative aspect-square lg:aspect-auto">
            <Image 
              src={post.heroImage || "/hero-pd.webp"} 
              alt={post.title || "Blog Post Hero Image"} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* 4. MAIN ARTICLE CONTENT */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Executive Summary / Key Takeaways Box */}
          <div className="mb-20 p-10 bg-accent/5 border-l-2 border-accent/20 flex flex-col md:flex-row gap-10 items-start">
            <div className="shrink-0 pt-1">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Tag className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h4 className="font-serif font-bold italic text-xl mb-4 text-accent">Strategic Overview</h4>
              <p className="text-stone-600 font-light leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>

          <div className="blog-content-premium">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* TAGS */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-24 pt-12 border-t border-stone-100 flex flex-wrap gap-3">
              {post.tags.map((tag: string, i: number) => (
                <span key={tag ? `${tag}-${i}` : i} className="px-4 py-2 bg-stone-50 text-[10px] font-bold uppercase tracking-widest text-stone-500 border border-stone-100">
                  # {tag}
                </span>
              ))}
            </div>
          )}

          {/* FINAL CTA */}
          <div className="mt-24 p-12 md:p-20 bg-stone-950 text-white text-center relative overflow-hidden">
             <div className="relative z-10 space-y-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Next Steps</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold italic">Ready to discuss your project?</h3>
                <p className="text-white/60 font-light max-w-lg mx-auto">
                  Whether you are at concept stage or looking for more dependable production support, we can review your requirements and advise on the next step.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="premium" size="lg" className="px-12 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                    <Link href="/contact">Start Your Inquiry</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="px-12 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none text-white border-white/20 hover:bg-white/5" asChild>
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
             </div>
          </div>

          {/* NEWSLETTER SUBSCRIBE */}
          <InsightsSubscribe />

          {/* RELATED POSTS - "Read more like this" */}
          <RelatedPosts currentSlug={resolvedParams.slug} category={post.category} />
        </div>
      </div>
    </article>
  );
}

async function RelatedPosts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const { getSortedPostsData } = await import("@/lib/blog");
  type BlogPostWithId = Awaited<ReturnType<typeof getSortedPostsData>>[0];
  const allPosts = await getSortedPostsData();
  
  // Try to find posts in the same category first, then fallback to any recent posts
  let related = allPosts.filter((p: BlogPostWithId) => p.slug !== currentSlug && p.category === category).slice(0, 3);
  
  if (related.length < 3) {
    const remaining = 3 - related.length;
    const additional = allPosts
      .filter((p: BlogPostWithId) => p.slug !== currentSlug && !related.find((r: BlogPostWithId) => r.slug === p.slug))
      .slice(0, remaining);
    related = [...related, ...additional];
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-32 pt-24 border-t border-stone-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Expand Your Knowledge</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold italic mt-4">Read more like this</h2>
        </div>
        <Button variant="link" className="text-[10px] font-bold uppercase tracking-widest text-accent p-0 h-auto" asChild>
          <Link href="/insights">View all insights <ArrowLeft className="w-3 h-3 rotate-180 ml-2" /></Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {related.map((post: BlogPostWithId) => (
          <Link key={post.slug} href={`/insights/${post.slug}`} className="group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-6">
              <Image 
                src={post.heroImage || "/hero-pd.webp"} 
                alt={post.title || "Related Post Image"} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-foreground/40">
                <Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'short' })}
              </div>
              <h3 className="text-xl font-serif font-bold group-hover:text-accent transition-colors leading-snug italic">
                {post.title}
              </h3>
              <p className="text-foreground/60 text-sm font-light line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
