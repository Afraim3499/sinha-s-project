import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Sinha Sourcing Hub Ltd",
  description: "Terms and conditions governing the use of the Sinha Sourcing Hub website.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
  return (
    <div className="pt-24 bg-background min-h-screen">
      <section className="py-24 border-b border-border bg-stone-50">
        <div className="container mx-auto px-4 md:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors mb-12">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <div className="max-w-4xl space-y-8">
            <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
               <span className="w-8 h-px bg-accent/30" />
               Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Terms of Service
            </h1>
            <p className="text-lg text-foreground/60 leading-relaxed font-light">
              Last Updated: March 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
           <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:font-light prose-p:leading-relaxed text-foreground/80">
             <p>Welcome to Sinha Sourcing Hub Ltd. By accessing our website, you agree to these terms.</p>
             
             <h3>1. Website Use</h3>
             <p>This website acts as an informational profile of our sourcing and supply chain management capabilities. Use of the site does not constitute a formal commercial agreement until specifically contracted off-site.</p>
             
             <h3>2. Intellectual Property</h3>
             <p>The content, design, and structure of this website are the property of Sinha Sourcing Hub Ltd. Commercial reproduction is prohibited without consent.</p>

             <h3>3. Service Provision</h3>
             <p>While we outline specific service structures (e.g., Product Development, Factory Sourcing), actual service delivery is subject to formal agreement and project review. We reserve the right to decline inquiries we cannot adequately support.</p>

             <h3>4. Liability</h3>
             <p>Information on this site is provided for general guidance. Operational realities in manufacturing change constantly; our website content does not supersede specific contract terms.</p>

             <h3>5. Jurisdiction</h3>
             <p>Sinha Sourcing Hub Ltd is registered in England and Wales. These terms fall under English law.</p>
           </div>
        </div>
      </section>
    </div>
  )
}
