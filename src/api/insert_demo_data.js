import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const demoCaseStudy = {
  title: "Aura Luxury Timepieces",
  client: "Aura Switzerland",
  slug: "aura-luxury-timepieces",
  category: "Luxury",
  description:
    "A digital experience for the launch of Aura's Heritage collection, blending tradition with cutting-edge interactivity.",
  content: "Detailed case study content about the Aura project...",
  cover_image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80",
  services: "Brand Strategy, Interactive Web, Motion Design",
  year: 2024,
  featured: true,
  sort_order: 1,
  tags: ["Luxury", "WebGL", "Next.js"],
  gallery: [
    "https://images.unsplash.com/photo-1547996160-81dfa63595ee?w=800&q=80",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
  ],
};

async function insertData() {
  console.log("Inserting demo case study...");
  const { data, error } = await supabase
    .from("case_studies")
    .upsert([demoCaseStudy], { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Successfully inserted demo case study:", data);
  }
}

insertData();
