require('dotenv').config();
const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL);

const testimonials = [
  {
    name: "Eleanor Vance",
    company: "Aether Apparel",
    role: "Production Director",
    content: "Sinha Sourcing resolved a critical bottleneck in our structured outerwear line. Their factory vetting process caught technical gaps that three previous agents missed. Truly a masterclass in sourcing precision.",
    image_url: "https://i.pravatar.cc/150?u=eleanor"
  },
  {
    name: "Marcus Thorne",
    company: "Velora Group",
    role: "Supply Chain Head",
    content: "Managing high-volume orders across Bangladesh and China used to be a documentation nightmare. Sinha Hub transformed our delivery readiness with disciplined execution and zero-tolerance quality checks.",
    image_url: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    name: "Sophia Chen",
    company: "Lumina Home",
    role: "Lead Designer",
    content: "The bridge between my design intent and the final textile production was perfectly managed. They source materials with a technical understanding that aligns perfectly with our premium brand identity.",
    image_url: "https://i.pravatar.cc/150?u=sophia"
  },
  {
    name: "Julian Ross",
    company: "Apex Trainers",
    role: "Operations Manager",
    content: "Footwear sourcing is notoriously difficult due to construction complexity. Sinha's team oversaw our latest technical trainer rollout, handling multi-material sourcing and assembly with zero delays.",
    image_url: "https://i.pravatar.cc/150?u=julian"
  },
  {
    name: "Sarah Jenkins",
    company: "Eco-Stitch",
    role: "Founder",
    content: "Finding factories that actually adhere to sustainable standards isn't easy. Sinha Sourcing provided evidence-led vetting that gave us the confidence to scale our organic cotton range globally.",
    image_url: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "David Kalu",
    company: "Nomad Travel Gear",
    role: "Product Manager",
    content: "Sourced over 50,000 units of custom travel packs. The quality consistency from the first proto to the final bulk shipment was impeccable. Their local presence in Dhaka is a massive advantage.",
    image_url: "https://i.pravatar.cc/150?u=david"
  },
  {
    name: "Isabella Martinez",
    company: "Couture Axis",
    role: "Creative Director",
    content: "They don't just find factories; they build production roadmaps. Our complex eveningwear line required specialized machinery and high-skill labor—Sinha matched us with the perfect artisanal hub.",
    image_url: "https://i.pravatar.cc/150?u=isabella"
  },
  {
    name: "Thomas Wright",
    company: "Global Logistics Ltd",
    role: "Logistics Partner",
    content: "I've handled shipments for Sinha for years. Their documentation is always precise, and their handover process is the most organized we deal with in the South Asian corridor.",
    image_url: "https://i.pravatar.cc/150?u=thomas"
  }
];

async function seed() {
  console.log("Seeding testimonials...");
  try {
    for (const t of testimonials) {
      await sql`
        INSERT INTO testimonials (name, company, role, content, image_url, is_active)
        VALUES (${t.name}, ${t.company}, ${t.role}, ${t.content}, ${t.image_url}, true)
      `;
      console.log(`Added: ${t.name}`);
    }
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding:", err);
  } finally {
    await sql.end();
  }
}

seed();
