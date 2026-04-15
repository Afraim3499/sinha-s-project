import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Layers, Factory, Globe, ShieldCheck, Clock, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
// motion removed — this is a server component
import { getSortedPostsData } from "@/lib/blog"
import BlogExplorer from "@/components/blog/BlogExplorer"

export const metadata: Metadata = {
  title: "Insights & Guidance | Sinha Sourcing Hub Ltd",
  description: "Read sourcing and product development insights, including guidance on sampling, quality, supplier selection, and production planning.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Insights & Guidance | Sinha Sourcing Hub Ltd",
    description: "Expert guidance on global sourcing, apparel production, and supply chain strategy.",
    images: [{ url: "/posts/bangladesh-vs-vietnam.png" }],
  },
}

export default async function InsightsPage() {
  const breadcrumbSchema = {
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
      }
    ]
  };

  const posts = await getSortedPostsData();

  const categories = [
    { title: "Product Development", icon: <Layers className="w-4 h-4" /> },
    { title: "Sampling & Fit", icon: <FileText className="w-4 h-4" /> },
    { title: "Factory Sourcing", icon: <Factory className="w-4 h-4" /> },
    { title: "Materials & Trims", icon: <Globe className="w-4 h-4" /> },
    { title: "Quality Control", icon: <ShieldCheck className="w-4 h-4" /> },
    { title: "Compliance & Responsibility", icon: <BookOpen className="w-4 h-4" /> },
    { title: "Production Planning", icon: <Clock className="w-4 h-4" /> }
  ]

  const featuredPathways = [
    {
      title: "Technical Expertise",
      description: "Reducing sampling rounds by 50% with vertical tech-packs.",
      link: "/insights/tech-pack-efficiency-guide",
      tag: "Process"
    },
    {
      title: "Operational Efficiency",
      description: "How we saved a UK brand 15 days on their production cycle.",
      link: "/insights/case-study-reducing-lead-time",
      tag: "Case Study"
    },
    {
      title: "Market Dynamics",
      description: "Comparing landed costs: Bangladesh vs. Vietnam vs. India.",
      link: "/insights/ultimate-guide-bangladesh-vs-vietnam",
      tag: "Strategy"
    }
  ]

  return (
    <div className="bg-background min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* 1. HERO — Editorial Split Layout (Locked to Viewport) */}
      <section className="relative min-h-screen flex items-center md:items-end overflow-hidden border-b border-border bg-stone-950 pt-32 pb-16 md:pt-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/posts/bangladesh-vs-vietnam.png"
            alt="Sourcing insights editorial"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/95 to-stone-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full md:pb-24">
          {/* Back Link */}
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-accent transition-colors mb-12 lg:mb-16 group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-2 transition-transform" /> Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center md:items-end">
            {/* Left: Typography */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
                <span className="w-12 h-px bg-accent/40" />
                Insights & Expert Guidance
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight text-white">
                A knowledge base for <br className="hidden md:block"/>
                <span className="italic font-normal text-white/50">strategic sourcing.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/40 leading-relaxed font-light max-w-xl">
                From tech-pack optimization to global landed-cost strategies — practical insights for brands building more profitable supply chains.
              </p>

              {/* Stats Row */}
              <div className="flex gap-12 pt-4">
                <div>
                  <div className="text-3xl md:text-4xl font-serif font-bold text-accent">{posts.length}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Published Articles</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-serif font-bold text-accent">7</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Topic Categories</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-serif font-bold text-accent">25+</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Right: Featured Article Card */}
            <div className="lg:col-span-5">
              {posts.length > 0 && (
                <Link href={`/insights/${posts[0].slug}`} className="block group">
                  <div className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={posts[0].heroImage || "/hero-pd.webp"}
                        alt={posts[0].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
                      <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest bg-accent text-white px-3 py-1">
                        Latest
                      </span>
                    </div>
                    <div className="p-6 md:p-8 space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{posts[0].category}</span>
                      <h3 className="text-lg md:text-xl font-serif font-bold text-white leading-snug group-hover:text-accent transition-colors">{posts[0].title}</h3>
                      <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/30">
                        <span>{posts[0].readingTime}</span>
                        <span className="flex items-center gap-2 text-accent group-hover:gap-4 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
           <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-accent">Explore</span>
           <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* 2. REFINED FEATURED PATHWAYS */}
      <section className="py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/hero-factory.webp" alt="Insights Background" fill className="object-cover scale-105" sizes="100vw" />
          <div className="absolute inset-0 bg-stone-950/80" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPathways.map((pathway) => (
              <Link key={pathway.link} href={pathway.link} className="p-10 border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-accent/40 transition-all group backdrop-blur-sm">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-6 block">{pathway.tag}</span>
                 <h3 className="text-2xl font-serif font-bold italic mb-4">{pathway.title}</h3>
                 <p className="text-white/40 font-light text-sm mb-8 leading-relaxed">{pathway.description}</p>
                 <div className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 transition-all group-hover:gap-5">
                    Read Insight <ArrowRight className="w-3 h-3 text-accent" />
                 </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LATEST POSTS & BROWSE (EXPLORER) */}
      <section id="articles-start" className="py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Knowledge Discovery</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold italic mt-4">Articles & Navigational Guides</h2>
          </div>
          
          <BlogExplorer posts={posts} categories={categories} />
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 bg-stone-950 text-center border-t border-white/5 text-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl space-y-10">
           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Practical Next Steps</span>
           <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight">
             Looking for answers to specific <br />
             <span className="text-white/50">operational questions?</span>
           </h2>
           <div className="pt-8 flex flex-col sm:flex-row justify-center gap-6">
              <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                 <Link href="/faq">Review our Sourcing FAQ</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none text-white border-white/20 hover:bg-white/5" asChild>
                 <Link href="/contact">Inquire with our Team</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
  )
}
