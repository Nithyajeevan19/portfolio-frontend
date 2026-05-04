import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// Re-insert Invoice Management which was accidentally deleted
const invoiceProject = {
  slug: "invoice-management",
  title: "Invoice Management — Streamlining Financial Workflows",
  client: "FinFlow Systems",
  category: "Fintech / SaaS",
  services: "Product Design, Frontend Development",
  year: 2025,
  cover_image:
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1800&q=80",
  description:
    "The Invoice Management system was created to simplify and digitize traditional billing workflows.",
  the_context:
    "The Invoice Management system was created to simplify and digitize traditional billing workflows. Many businesses rely on manual processes or fragmented tools, resulting in inefficiencies and lack of visibility.",
  the_challenge:
    "The key challenge was designing a system that handles complex financial data while remaining simple and intuitive. Presenting invoices, payments, and client data in a clear and structured way required careful UI/UX decisions.",
  the_approach:
    "A dashboard-centric approach was used to surface critical information efficiently. Modular components were built for scalability, and workflows were optimized to reduce friction in invoice creation and tracking. The interface was designed to minimize cognitive load and improve usability.",
  the_impact:
    "The system improves efficiency in managing financial workflows by centralizing invoice operations. It demonstrates the ability to design scalable SaaS products with real-world business value.",
  impact_metric_1: "+60%",
  impact_label_1: "Faster invoice processing",
  impact_metric_2: "-40%",
  impact_label_2: "Reduction in manual effort",
  live_site_link: "https://invoice-management-ashen.vercel.app/",
  gallery: [
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
  ],
  sort_order: 5,
  featured: true,
};

async function restore() {
  const { data, error } = await supabase
    .from("case_studies")
    .upsert([invoiceProject], { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Error restoring:", error);
  } else {
    console.log("Restored Invoice Management:", data[0].title);
  }

  // Confirm final state
  const { data: all } = await supabase
    .from("case_studies")
    .select("id, slug, title")
    .order("sort_order", { ascending: true });

  console.log("\nFinal projects in DB:");
  all?.forEach((p) => console.log(` - [${p.slug}] ${p.title}`));
}

restore();
