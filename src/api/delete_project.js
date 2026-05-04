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

async function listAndDelete() {
  // First list all projects so we can confirm what exists
  const { data: all } = await supabase
    .from("case_studies")
    .select("id, slug, title, category")
    .order("sort_order", { ascending: true });

  console.log("Current projects in DB:");
  all?.forEach((p) => console.log(` - [${p.slug}] ${p.title} (${p.category})`));

  // Delete the orbital/saas entry
  const { data, error } = await supabase
    .from("case_studies")
    .delete()
    .or("slug.ilike.%orbital%,title.ilike.%orbital%,category.ilike.%saas%")
    .select();

  if (error) {
    console.error("Error deleting:", error);
  } else if (data.length === 0) {
    console.log("\nNo matching project found to delete.");
  } else {
    console.log("\nDeleted:");
    data.forEach((p) => console.log(` - [${p.slug}] ${p.title}`));
  }
}

listAndDelete();
