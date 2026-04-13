import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Sinha Sourcing Hub Ltd",
  description: "Our privacy policy details how we handle your data with the same discipline we apply to sourcing.",
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <div className="pt-24 bg-background min-h-screen">
      <section className="py-24 border-b border-border bg-stone-50">
        <div className="container mx-auto px-6 md:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors mb-12">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <div className="max-w-4xl space-y-8">
            <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
               <span className="w-8 h-px bg-accent/30" />
               Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-foreground/60 leading-relaxed font-light">
              Last Updated: March 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
           <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:font-light prose-p:leading-relaxed text-foreground/80">
             <p>At Sinha Sourcing Hub Ltd, we treat your commercial and personal data with the same operational discipline we apply to our supply chain management.</p>
             
             <h3>1. Information We Collect</h3>
             <p>We may collect functional information necessary to evaluate your sourcing requirements, including contact details, company information, and product specifications voluntarily submitted through our inquiry forms.</p>
             
             <h3>2. How We Use Your Information</h3>
             <p>Data provided to us is used exclusively to evaluate project feasibility, communicate regarding our services, and facilitate commercial relationships. We do not sell or trade your data to third parties.</p>

             <h3>3. Technical Data</h3>
             <p>Our website may collect basic analytical data (such as browser type or pages visited) to ensure the site functions correctly and to improve user experience.</p>

             <h3>4. Data Security</h3>
             <p>We maintain standard commercial protections over the data submitted to us, understanding that product development details often carry commercial sensitivity.</p>

             <h3>5. Contact Us</h3>
             <p>For questions regarding how your data is handled, please contact us at info@sinhasourcinghub.com.</p>
           </div>
        </div>
      </section>
    </div>
  )
}
