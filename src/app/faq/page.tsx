import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Sinha Sourcing Hub Ltd",
  description: "Direct answers to common sourcing questions about our process, capabilities, categories, and working models.",
  alternates: {
    canonical: "/faq",
  },
}

export default function FAQPage() {
  const categories = [
    { id: "sourcing", title: "Global Sourcing & Factories" },
    { id: "development", title: "Product Development & Sampling" },
    { id: "production", title: "Manufacturing & MOQs" },
    { id: "quality", title: "Quality Control & Compliance" },
    { id: "logistics", title: "Logistics & Lead Times" },
    { id: "sustainability", title: "Sustainability & Ethical Sourcing" },
    { id: "pricing", title: "Pricing & Commercials" }
  ]

  const faqs = [
    // SOURCING
    {
      category: "sourcing",
      q: "Where do you manage primary production?",
      a: "Our primary manufacturing base is Bangladesh, supported by established networks across wider South Asia and China. We select the specific region based on the technical complexity, material requirements, and scale of your project."
    },
    {
      category: "sourcing",
      q: "How do you vet your manufacturing partners?",
      a: "We perform rigorous multi-stage vetting. This includes on-site capability assessments, verification of compliance certifications (WRAP, BSCI, SEDEX), review of past production quality, and financial stability checks."
    },
    {
      category: "sourcing",
      q: "Do you have local teams on the ground?",
      a: "Yes. Our strength lies in our direct presence. We maintain dedicated operational teams in key manufacturing hubs to oversee development, monitor production lines, and conduct final quality inspections."
    },
    {
      category: "sourcing",
      q: "Can you help find a factory for specialized products?",
      a: "Absolutely. Whether it's high-tech outerwear, custom footwear components, or sustainable home textiles, we utilize our extensive supplier database to match your specific technical needs with the right factory capability."
    },
    {
      category: "sourcing",
      q: "Do you facilitate plant tours or factory audits?",
      a: "Yes, we encourage transparency. We can coordinate on-site visits for your team once a project is active, allowing you to see the production environment, meet the hub leads, and verify the facility standards firsthand."
    },
    {
      category: "sourcing",
      q: "How do you navigate geopolitical or market disruptions?",
      a: "We utilize multi-country sourcing strategies to mitigate localized risks. Our hub leads monitor regional stability and supply chain movements daily, allowing us to pivot production or material sourcing should a disruption occur."
    },

    // DEVELOPMENT
    {
      category: "development",
      q: "Do you provide technical design and Tech Pack support?",
      a: "Yes. If your design intent is still conceptual, our development team can create comprehensive Tech Packs. This includes detailed specifications, BOMs, measurement charts, and construction callouts."
    },
    {
      category: "development",
      q: "How many sampling rounds are typically included?",
      a: "We generally aim for two main development rounds: Proto Sample and Salesman Sample (SMS). However, we stay involved through Pre-Production (PP) samples to ensure every detail is locked before bulk begins."
    },
    {
      category: "development",
      q: "Can you help with pattern making and sizing charts?",
      a: "Yes. We can develop patterns from scratch or refine your existing digital files (DXF/AAMA). We also provide expert guidance on international sizing standards (UK, EU, US)."
    },
    {
      category: "development",
      q: "Do you handle color matching and lab dips?",
      a: "Yes. We coordinate color development using Pantone references or physical swatches. Our partner mills provide lab dips for approval, ensuring your brand colors are consistent across different fabrics and production lots."
    },
    {
      category: "development",
      q: "Can you source custom trims and hardware?",
      a: "Absolutely. We have a dedicated network for custom buttons, zippers, metalware, and labels. We ensure all hardware meets durability and chemical safety standards (like nickel-free and lead-free requirements)."
    },

    // PRODUCTION
    {
      category: "production",
      q: "What are your standard Minimum Order Quantities (MOQs)?",
      a: "MOQs are dictated by the factory tier and material requirements. For basic apparel, MOQs often begin at 1,000–2,500 units per style. For specialized or premium products, we can often negotiate lower volumes (300–500 units) with our boutique partners."
    },
    {
      category: "production",
      q: "Do you handle small-batch production for boutique brands?",
      a: "Yes. While our core business is scale-based, we maintain a 'Boutique Pipeline' for premium brands that require high craftsmanship in smaller volumes (MOQs starting around 300 units)."
    },
    {
      category: "production",
      q: "What is your typical bulk production lead time?",
      a: "Bulk production typically ranges from 60 to 90 days after PP sample approval. This includes 30-45 days for material procurement and 25-45 days for actual cutting, sewing, and finishing."
    },
    {
      category: "production",
      q: "How do you manage production during peak holidays?",
      a: "We forecast capacity 6-12 months in advance. By securing 'reserved lines' with our key factories well before peak seasons (like pre-Eid or pre-CNY), we ensure our clients' delivery slots are protected."
    },
    {
      category: "production",
      q: "Can you handle complex multi-operation manufacturing?",
      a: "Yes. Our factories are equipped for complex operations including bonding, laser-cutting, specialized embroidery, and heavy-duty industrial washing for denim and outerwear."
    },

    // QUALITY
    {
      category: "quality",
      q: "What is your QC inspection standard?",
      a: "We primarily utilize the AQL 2.5/4.0 standard (Acceptable Quality Level) for bulk shipments. However, we can perform 100% inspection for high-value items or boutique projects that require an even higher degree of security."
    },
    {
      category: "quality",
      q: "Do you provide third-party lab testing for materials?",
      a: "Yes. We coordinate with accredited laboratories (like SGS, ITS, or BV) to perform fiber analysis, color fastness tests, shrinkage tests, and chemical safety checks (REACH/CPSIA)."
    },
    {
      category: "quality",
      q: "Do you oversee social and ethical compliance?",
      a: "Absolutely. We do not work with factories that fail our ethical audit. We monitor for safe working conditions, fair labor practices, and adherence to local health and safety regulations."
    },
    {
      category: "quality",
      q: "How do you maintain quality in large-scale runs?",
      a: "Consistency is maintained through strict in-line checkpoints at every 10% of the production run. This allows our hub leads to catch and correct any deviation in stitching, tension, or finishing early, rather than waiting for final inspection."
    },
    {
      category: "quality",
      q: "Do you verify fabric composition and weight (GSM)?",
      a: "Yes. Every bulk fabric lot is tested for weight (GSM), width, and shrinkage before cutting. This ensures the handfeel and performance of the final garment match the approved development samples."
    },

    // LOGISTICS
    {
      category: "logistics",
      q: "What are your standard shipping terms (Incoterms)?",
      a: "We primarily operate on FOB (Free on Board) terms, where we manage production up to the port of origin. However, we can also offer Ex-Works (EXW) or assist in coordinating DDP for specific regions."
    },
    {
      category: "logistics",
      q: "Do you provide freight forwarding services?",
      a: "We are not a freight forwarder, but we work with a network of trusted logistics partners. We coordinate all export documentation to ensure a smooth handover to your sea or air carrier."
    },
    {
      category: "logistics",
      q: "Can you help with customs and tariff classifications?",
      a: "Yes. We can provide HS codes for your products and advise on regional trade agreements (like GSP or EBA) that might reduce import duties."
    },
    {
      category: "logistics",
      q: "How do you handle consolidated or LCL shipments?",
      a: "For brands with smaller volumes across multiple styles, we can coordinate 'Less than Container Load' (LCL) shipments or air-freight consolidation to optimize your logistics spend."
    },
    {
      category: "logistics",
      q: "Do you manage export licenses and certificates of origin?",
      a: "Yes. We handle all mandatory exports including GSP certificates, Form-A, and specialized category licenses, ensuring your goods cross borders without documentation delays."
    },

    // SUSTAINABILITY
    {
      category: "sustainability",
      q: "Which environmental certifications can you verify?",
      a: "We can help source and verify products with GOTS (Organic), GRS (Recycled), OEKO-TEX Standard 100, and FSC certifications. We ensure that every claim is backed by a valid Transaction Certificate (TC)."
    },
    {
      category: "sustainability",
      q: "Do you support 'Circular Economy' initiatives?",
      a: "Yes. We work with mills that utilize recycled textile waste and can help brands develop monomaterial designs that are easier to recycle at the end of their life."
    },
    {
      category: "sustainability",
      q: "Is your supply chain fully transparent?",
      a: "We offer 'Tier 1' transparency as standard and can provide 'Tier 2' (the fabric mill) and 'Tier 3' (the yarn/fiber source) transparency for brands that require deep traceability."
    },
    {
      category: "sustainability",
      q: "How do you verify the authenticity of recycled content?",
      a: "Every recycled lot is cross-checked with Global Recycled Standard (GRS) documentation. We track the Transaction Certificates from the fiber generator to the final garment factory."
    },
    {
      category: "sustainability",
      q: "Do you work with water-saving dyeing and finishing facilities?",
      a: "Yes. We prioritize facilities using low-liquor-ratio machines, EIM (Environmental Impact Measuring) software for denim, and closed-loop water treatment systems to minimize effluent discharge."
    },

    // PRICING
    {
      category: "pricing",
      q: "How do you structure your sourcing fees?",
      a: "Depending on the project's scale and consistency, we operate on either a commission-based model (on FOB value) or a flat project management fee. We discuss and fix this structure early in our engagement."
    },
    {
      category: "pricing",
      q: "Do you provide 'Open Costing'?",
      a: "Yes. For our strategic partners, we operate on a transparent 'Open Book' basis. You see the breakdown of raw materials, CM (Cut & Make), and our management overhead."
    },
    {
      category: "pricing",
      q: "What are your standard payment terms?",
      a: "Standard terms for production are often 30% deposit with the balance payable upon OQC (Final Inspection) and before shipment. For sample developments, we usually require 100% payment upfront."
    },
    {
      category: "pricing",
      q: "Are there any hidden management or coordination fees?",
      a: "No. Our pricing is inclusive of hub management, standard QC, and production oversight as per the agreed service level. Any third-party costs (like external lab tests) are quoted at cost."
    },
    {
      category: "pricing",
      q: "Can you provide landed cost estimates early in the process?",
      a: "Yes. While final pricing depends on the bulk fabric order, we can provide reasonably accurate estimates based on your sample developments and projected freight rates."
    }
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <div className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. HERO (Locked to Viewport) */}
      <section className="relative h-screen flex items-center pt-24 overflow-hidden border-b border-border bg-stone-50">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors mb-24 lg:mb-32">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <div className="max-w-5xl space-y-12">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
               <span className="w-12 h-px bg-accent/30" />
               Knowledge Base
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] tracking-tight text-stone-900">
              Direct answers to <br className="hidden lg:block"/>
              <span className="italic font-normal">strategic sourcing questions.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-light max-w-2xl border-l border-accent/10 pl-10">
              From MOQs to sustainability audits — we value transparency at every stage of the sourcing cycle.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
           <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-accent">Start Browsing</span>
           <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* 2. FAQS (Categorized) */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-4 md:px-8">
           <div className="space-y-40">
              {categories.map((category) => (
                <div key={category.id} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                   {/* Sidebar / Category Info */}
                   <div className="lg:col-span-4 sticky top-32">
                      <div className="space-y-6">
                         <div className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Section / {category.id}</div>
                         <h2 className="text-3xl md:text-4xl font-serif font-bold italic tracking-tight">{category.title}</h2>
                         <div className="w-12 h-px bg-accent/30" />
                      </div>
                   </div>

                   {/* Accordion List */}
                   <div className="lg:col-span-8">
                      <Accordion type="single" collapsible className="w-full space-y-4">
                         {faqs
                           .filter(f => f.category === category.id)
                           .map((faq, i) => (
                             <AccordionItem key={i} value={`${category.id}-${i}`} className="border border-stone-100 bg-stone-50/30 px-6 md:px-10 py-2 group overflow-hidden transition-all duration-300 hover:bg-white hover:border-accent/20">
                                <AccordionTrigger className="text-left font-serif text-xl md:text-2xl font-bold italic hover:no-underline transition-colors py-6 data-[state=open]:text-accent">
                                   {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-foreground/70 font-light text-lg leading-relaxed pb-8 max-w-2xl">
                                   {faq.a}
                                </AccordionContent>
                             </AccordionItem>
                           ))}
                      </Accordion>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-40 bg-stone-950 text-white text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(180,140,80,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-12 relative z-10">
           <div className="flex flex-col items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Strategic Consultation</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-[1.1] tracking-tight">
                Still have operational <br /> questions?
              </h2>
           </div>
           <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto">
             If your specific requirement isn&apos;t covered above, our hub leads are available to review your project direction directly.
           </p>
           <div className="pt-10 flex flex-col md:flex-row justify-center gap-6">
              <Button variant="premium" size="lg" className="px-20 h-16 text-[11px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                 <Link href="/contact">Message Hub Lead</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
  )
}
