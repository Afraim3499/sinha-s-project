"use client"

import { Button } from "@/components/ui/button"
import { 
  Search, 
  Settings, 
  Factory, 
  PencilRuler, 
  Eye, 
  Container, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  ClipboardCheck,
  Globe
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from "framer-motion"
import React from "react"

export default function ProcessPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    restDelta: 0.001
  })

  // Deep Parallax Effect for the Hero Section
  const yParallax = useTransform(scrollYProgress, [0, 0.2], [0, 150])

  const [expandedPhase, setExpandedPhase] = React.useState<string | null>(null)

  const steps = [
    {
      num: "01",
      title: "Discovery & Scope",
      subtitle: "Project Review",
      desc: "We begin with a deep-dive into your brand's DNA, category requirements, and commercial objectives. We identify constraints early to ensure a viable path forward.",
      details: "Our discovery phase involves a series of technical consultations where we audit your current supply chain bottlenecks and define the exact 'Success Criteria' for the upcoming production cycles. We look at historical data, material availability, and speed-to-market requirements.",
      dna: ["Category Review", "Budget Scoping", "Timeline Mapping", "Technical Handover"],
      icon: <Search className="w-6 h-6" />,
      color: "emerald"
    },
    {
      num: "02",
      title: "Strategic Blueprint",
      subtitle: "Development Planning",
      desc: "Mapping the operational architecture. We organise material sourcing, tech pack refinement, and sample priorities before a single stitch is made.",
      details: "The blueprint phase is where we translate your vision into a production-ready manifest. We finalize the Bill of Materials (BOM), lock in the lead times for raw materials, and establish the 'Critical Path' that all stakeholders will follow.",
      dna: ["Tech Pack Validation", "Material Vetting", "MoQ Optimisation", "Risk Mitigation"],
      icon: <Settings className="w-6 h-6" />,
      color: "blue"
    },
    {
      num: "03",
      title: "Network Alignment",
      subtitle: "Factory & Supplier Pairing",
      desc: "Leveraging our audited network in South Asia and China. We pair your project with partners based on technical skill, ethical compliance (SEDEX/BSCI), and capacity.",
      details: "Alignment is about more than proximity. We run a matrix-based matching system that weighs factory skillsets against your specific fabric types and volume. Every partner on our shortlist is vetted for social compliance and sustainability targets.",
      dna: ["Ethical Audit Review", "Capacity Check", "Technical Capabilities", "Supplier Shortlist"],
      icon: <Factory className="w-6 h-6" />,
      color: "accent"
    },
    {
      num: "04",
      title: "Precision Prototyping",
      subtitle: "Sampling & Costing",
      desc: "The transition from concept to physical form. We coordinate iterative samples and bulk costing to ensure quality and commercial viability are perfectly balanced.",
      details: "Sampling is the ultimate proof of concept. Our technicians work directly with pattern makers to ensure the 'hand-feel' and fit are exactly as intended. We perform cost-engineering at this stage to ensure your margin targets are met without compromising build quality.",
      dna: ["Proto/SMS Support", "Bulk Quote Finalisation", "Lab Dips & Testing", "Trim Selection"],
      icon: <PencilRuler className="w-6 h-6" />,
      color: "purple"
    },
    {
      num: "05",
      title: "Production Oversight",
      subtitle: "Oversight & Quality",
      desc: "Active human oversight. We monitor production cycles and perform rigorous quality inspections (AQL 2.5/4.0) to ensure the bulk matches the gold seal sample.",
      details: "Our inspectors are your eyes on the ground. We perform During Production (DUPRO) and Final Random Inspections (FRI). Any deviation from the 'Gold Seal' sample is flagged and corrected immediately, ensuring a 99%+ quality pass rate.",
      dna: ["Inline Inspection", "Final QC Check", "AQL Standards", "Status Updates"],
      icon: <Eye className="w-6 h-6" />,
      color: "amber"
    },
    {
      num: "06",
      title: "Delivery Readiness",
      subtitle: "Logistics & Handover",
      desc: "Ensuring cross-border efficiency. We coordinate the final documentation, packing lists, and shipment status so your stock arrives ready for market.",
      details: "The final mile is handled with administrative precision. We manage the consolidation of goods, review all export documentation for compliance, and provide a single-view tracking status until the goods are handed over to your freight forwarder.",
      dna: ["Packing List (PL)", "Commercial Invoice", "Freight Coordination", "Delivery Finalisation"],
      icon: <Container className="w-6 h-6" />,
      color: "stone"
    }
  ]

  return (
    <div className="bg-[#fcfbf9] min-h-screen text-stone-900 selection:bg-accent selection:text-white pb-32">
      {/* 0. Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* 1. CINEMATIC HERO (The 'Overhaul' Fix) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-stone-950 text-white">
        {/* Background Visual Layer */}
        <motion.div 
          style={{ y: yParallax }}
          className="absolute inset-0 z-0"
        >
           <Image 
             src="/images/process/technical-overview.png" 
             alt="Technical process architecture" 
             fill 
             priority
             className="object-cover brightness-[0.4] saturate-[0.8] scale-110" 
           />
           {/* Sophisticated Overlay for Text Contrast */}
           <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/40 to-stone-950" />
           <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-stone-950 to-transparent" />
        </motion.div>
        
        {/* Content Overlay */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-4 text-[13px] font-bold uppercase tracking-[0.6em] text-accent mb-12 bg-white/5 backdrop-blur-2xl px-10 py-4 rounded-none border-l border-r border-accent/40 shadow-2xl"
          >
             <Zap className="w-4 h-4 animate-pulse" />
             Strategic Sourcing Architecture
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-4xl md:text-9xl lg:text-[9rem] font-serif font-black leading-[0.85] tracking-tight text-white mb-16"
          >
            Sourcing <br />
            <span className="italic font-normal text-stone-500 block mt-4">Architected.</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="max-w-3xl mx-auto space-y-12"
          >
            <p className="text-xl md:text-3xl text-stone-300 leading-relaxed font-light italic">
              &quot;We don&apos;t just build products; we architect the operational infrastructure that sustains your brand&apos;s growth.&quot;
            </p>
            
            <div className="flex items-center justify-center gap-8 pt-8">
               <div className="w-12 h-px bg-stone-700" />
               <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-accent">Technical Masterclass</p>
               <div className="w-12 h-px bg-stone-700" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-16 flex flex-col items-center gap-4 opacity-40"
        >
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Initialize Descent</p>
           <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </section>

      {/* 2. THE INFOGRAPHIC JOURNEY (Transitioning to Light Journey) */}
      <section className="py-32 relative bg-[#fcfbf9]">
        <div className="container mx-auto px-4 md:px-8">
           
           <div className="space-y-32 md:space-y-48">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  id={`phase-${step.num}`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start scroll-mt-32 md:scroll-mt-48"
                >
                   {/* Left Panel: Background Number (Solid Visibility) */}
                   <div className="lg:col-span-1 hidden lg:block sticky top-48">
                      <div className="text-[7rem] font-serif font-black text-stone-300 leading-none select-none italic pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
                        {step.num}
                      </div>
                      <div className="w-16 h-2 bg-accent/40 mt-6" />
                   </div>

                   {/* Middle Panel: Narrative Content */}
                   <div className="lg:col-span-6 space-y-12 py-4">
                      <div className="space-y-6">
                        <h2 className="text-[14px] font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-5">
                           <span className="w-10 h-px bg-accent/50" />
                           {step.subtitle}
                        </h2>
                        <h3 className="text-4xl md:text-7xl font-serif font-bold text-stone-950 tracking-tight">
                          <span className="lg:hidden text-stone-200 mr-4 font-black italic">{step.num}</span>
                          {step.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-8">
                        <p className="text-xl md:text-3xl text-stone-600 font-light leading-relaxed border-l-4 border-accent pl-10 md:pl-16 py-8 bg-stone-50/40 rounded-r-[3rem] shadow-sm">
                          {step.desc}
                        </p>
                        
                        <AnimatePresence>
                          {expandedPhase === step.num && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-10 md:pl-16 pt-6"
                            >
                               <div className="bg-white border border-stone-100 p-10 md:p-14 rounded-[3rem] shadow-xl relative mt-4">
                                  <div className="absolute top-0 left-10 w-px h-full bg-accent/10" />
                                  <p className="text-stone-500 text-lg md:text-2xl font-light leading-relaxed italic relative z-10">
                                     {step.details}
                                  </p>
                               </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="inline-flex flex-wrap gap-4 pl-10 md:pl-16 pt-8">
                         <Button 
                           variant="outline" 
                           onClick={() => setExpandedPhase(expandedPhase === step.num ? null : step.num)}
                           className="rounded-none md:rounded-full h-14 px-12 text-[13px] uppercase font-black tracking-[0.2em] bg-white border-stone-300 hover:border-accent hover:bg-stone-950 hover:text-white transition-all duration-500 shadow-xl hover:translate-y-[-4px]"
                         >
                           {expandedPhase === step.num ? "Close Architecture" : "Technical Breakdown"} 
                           <ChevronRight className={`w-4 h-4 ml-3 transition-transform duration-500 ${expandedPhase === step.num ? "rotate-90" : ""}`} />
                         </Button>
                      </div>
                   </div>

                   {/* Right Panel: Technical DNA */}
                   <div className="lg:col-span-5 pt-8 lg:pt-24">
                      <div className="bg-white border-2 border-stone-100 rounded-[3.5rem] p-10 md:p-16 shadow-[0_48px_96px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                         {/* Icon Decoration */}
                         <div className="absolute -top-10 -right-10 p-16 max-md:text-accent/10 max-md:scale-110 text-stone-100/30 transition-all duration-700 group-hover:text-accent/10 group-hover:scale-110 pointer-events-none">
                            {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { 
                              className: "w-56 h-56" 
                            })}
                         </div>
                         
                         <div className="relative z-10 space-y-16">
                            <div className="space-y-10">
                               <h4 className="flex items-center gap-4 text-[14px] font-bold uppercase tracking-[0.4em] text-stone-600 border-b-2 border-stone-50 pb-8">
                                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                                  Phase DNA
                               </h4>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {step.dna.map((entry, i) => (
                                    <div key={i} className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-widest text-stone-900 max-md:bg-white max-md:border-accent/40 max-md:shadow-lg bg-[#faf9f6]/80 p-6 rounded-3xl border border-stone-200 group-hover:border-accent/40 transition-all shadow-sm hover:shadow-lg hover:bg-white">
                                       <div className="w-2.5 h-2.5 rounded-full bg-accent max-md:scale-125 group-hover:scale-125 transition-transform shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
                                       {entry}
                                    </div>
                                  ))}
                               </div>
                            </div>

                            <div className="pt-12 border-t-2 border-stone-50 flex items-center justify-between">
                               <div className="flex items-center gap-6">
                                  <div className="w-16 h-16 rounded-3xl bg-accent/5 text-accent flex items-center justify-center shadow-inner">
                                     <ClipboardCheck className="w-8 h-8" />
                                  </div>
                                  <div>
                                     <p className="text-[11px] font-bold uppercase tracking-widest text-stone-500 mb-2">Governance</p>
                                     <p className="text-[14px] font-black uppercase tracking-[0.1em] text-stone-900 italic">Sinha Standard v2.0</p>
                                  </div>
                               </div>
                               <Globe className="w-7 h-7 text-stone-200" />
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>

        </div>
      </section>

      {/* 3. THE INFOGRAPHIC CTA */}
      <section className="container mx-auto px-4 md:px-8 mt-48 mb-48">
         <div className="bg-stone-950 rounded-[3rem] md:rounded-[5rem] py-32 md:py-64 px-8 md:px-12 text-center text-white relative overflow-hidden group shadow-[0_64px_128px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 opacity-20 contrast-[1.5] grayscale pointer-events-none">
               <Image src="/images/process/technical-overview.png" alt="Sourcing architecture" fill className="object-cover max-md:scale-100 scale-110 group-hover:scale-100 transition-transform duration-[12000ms]" />
            </div>
            
            <div className="relative z-10 max-w-5xl mx-auto space-y-20">
               <span className="text-[13px] font-bold uppercase tracking-[0.6em] text-accent block px-10 py-4 bg-white/5 border border-white/10 rounded-none w-fit mx-auto shadow-2xl backdrop-blur-2xl">Precision & Scalability</span>
               <h2 className="text-5xl md:text-9xl font-serif font-bold italic leading-[0.9] tracking-tighter">
                 Complex sourcing, <br className="hidden md:block" />
                 <span className="text-stone-500">mastered through art.</span>
               </h2>
               <p className="text-white/40 text-xl md:text-4xl font-light leading-relaxed italic max-w-3xl mx-auto">
                 &quot;Architecture is not just about lines; it&apos;s about the strength of the foundation. We build your supply chain to last.&quot;
               </p>
               <div className="pt-16 flex flex-col md:flex-row items-center justify-center gap-10">
                  <Button variant="outline" size="lg" className="px-24 h-20 text-[12px] uppercase font-black tracking-[0.5em] border-white/20 text-white hover:bg-accent hover:text-stone-950 hover:border-accent transition-all rounded-none backdrop-blur-md shadow-2xl" asChild>
                     <Link href="/contact">Architect Your Project</Link>
                  </Button>
               </div>
            </div>
         </div>
      </section>

      <section className="pt-32 pb-32 text-center border-t border-stone-50 bg-white">
         <p className="text-stone-400 text-[12px] font-bold uppercase tracking-[0.6em] mb-16 px-4">SINHA SOURCING HUB LTD — GLOBAL ARCHITECTURE &amp; OPERATIONS CENTRE</p>
         <Link href="/" className="inline-flex items-center gap-6 text-stone-900 hover:text-accent transition-all group">
            <span className="h-px w-24 bg-stone-300 group-hover:bg-accent transition-all duration-700" />
            <span className="text-sm font-black uppercase tracking-[0.3em]">Return to Base</span>
            <span className="h-px w-24 bg-stone-300 group-hover:bg-accent transition-all duration-700" />
         </Link>
      </section>
    </div>
  )
}
