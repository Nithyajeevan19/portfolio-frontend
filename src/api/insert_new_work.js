import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newProjects = [
  {
    slug: 'sweet-magic',
    title: 'SweetMagic — Designing Effortless Recipe Discovery',
    client: 'SweetMagic Kitchen',
    category: 'Food & Recipe',
    services: 'UI/UX Design, Frontend Development',
    year: 2025,
    cover_image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1800&q=80',
    description: 'SweetMagic was conceived as a modern recipe platform in a space saturated with cluttered and outdated experiences.',
    the_context: 'SweetMagic was conceived as a modern recipe platform in a space saturated with cluttered and outdated experiences. Most existing solutions prioritized volume over usability, making it difficult for users to quickly discover relevant recipes. The opportunity was to create a clean, visually engaging platform that simplifies exploration and enhances the overall cooking experience.',
    the_challenge: 'The primary challenge was balancing rich visual content with performance and usability. Recipe platforms rely heavily on imagery, but excessive content can lead to clutter and slow loading times. Ensuring a fast, responsive experience while maintaining high-quality visuals and intuitive navigation was critical.',
    the_approach: 'A minimal and structured design system was implemented to reduce cognitive load. Clear categorization, strong typography, and consistent spacing were used to guide users naturally. Responsive layouts ensured seamless usage across devices, while performance optimizations improved loading speed without compromising visual quality.',
    the_impact: 'SweetMagic delivers a frictionless recipe discovery experience, allowing users to explore content quickly and efficiently. The platform demonstrates how thoughtful design and performance optimization can transform a content-heavy application into a seamless and engaging product.',
    impact_metric_1: '+40%',
    impact_label_1: 'Improved user navigation efficiency',
    impact_metric_2: '2x',
    impact_label_2: 'Faster content discovery',
    live_site_link: 'https://sweetmagic-website-783c4e.netlify.app/',
    gallery: [
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=80',
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    ],
    sort_order: 2,
    featured: true,
  },
  {
    slug: 'cozy-culinary',
    title: 'Cozy Culinary Canvas — Crafting a Warm Digital Experience',
    client: 'Culinary Canvas Studio',
    category: 'Food & Lifestyle',
    services: 'UI/UX Design, Frontend Development',
    year: 2025,
    cover_image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1800&q=80',
    description: 'Cozy Culinary Canvas was designed to create an immersive and emotionally engaging food experience.',
    the_context: 'Cozy Culinary Canvas was designed to create an immersive and emotionally engaging food experience. Unlike traditional recipe platforms focused purely on functionality, this project aimed to combine storytelling with usability, making users feel inspired while exploring content.',
    the_challenge: 'The challenge was to design a visually rich interface without sacrificing clarity and performance. Creating a cozy and warm aesthetic required careful balance to ensure the interface remained intuitive, accessible, and fast across all devices.',
    the_approach: 'A design-first approach was used, focusing on warm tones, soft layouts, and high-quality imagery. Strong visual hierarchy and whitespace were used to guide users naturally. Components were designed to be reusable and scalable, ensuring consistency throughout the platform.',
    the_impact: 'The platform delivers a highly engaging browsing experience, encouraging users to explore and interact with content more deeply. By blending aesthetics with usability, it demonstrates the power of experience-driven design in increasing user engagement.',
    impact_metric_1: '+55%',
    impact_label_1: 'Increase in user engagement',
    impact_metric_2: '+30%',
    impact_label_2: 'Improved session duration',
    live_site_link: 'https://cozy-culinary-canvas-main.vercel.app/',
    gallery: [
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80',
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80',
    ],
    sort_order: 3,
    featured: true,
  },
  {
    slug: 'ipl-auction',
    title: 'IPL Auction — Real-Time Bidding Simulation',
    client: 'Gavel Auction Platform',
    category: 'Sports Tech',
    services: 'UI/UX Design, Frontend Development',
    year: 2025,
    cover_image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1800&q=80',
    description: 'The IPL Auction platform was developed to simulate the excitement and strategy of real-world cricket auctions.',
    the_context: 'The IPL Auction platform was developed to simulate the excitement and strategy of real-world cricket auctions. The goal was to create an interactive system where users could experience live bidding, team building, and competitive decision-making.',
    the_challenge: 'The biggest challenge was handling real-time interactions and complex state updates. Auction systems require instant feedback, accurate bid tracking, and smooth user experience under rapid interactions, making state management a critical factor.',
    the_approach: 'A component-based architecture was implemented to manage dynamic states efficiently. Real-time bidding logic was designed to handle updates, validations, and user actions seamlessly. The UI was optimized for clarity, ensuring users can quickly understand auction status and make decisions.',
    the_impact: 'The platform successfully replicates a real IPL auction experience, showcasing advanced frontend capabilities including real-time updates, state management, and interactive UI design. It stands out as a technically strong and engaging product.',
    impact_metric_1: 'Real-time',
    impact_label_1: 'Dynamic bidding system',
    impact_metric_2: '+70%',
    impact_label_2: 'User interaction rate',
    live_site_link: 'https://www.iplauction.fun/',
    gallery: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=1200&q=80',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
    ],
    sort_order: 4,
    featured: true,
  },
  {
    slug: 'invoice-management',
    title: 'Invoice Management — Streamlining Financial Workflows',
    client: 'FinFlow Systems',
    category: 'Fintech / SaaS',
    services: 'Product Design, Frontend Development',
    year: 2025,
    cover_image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1800&q=80',
    description: 'The Invoice Management system was created to simplify and digitize traditional billing workflows.',
    the_context: 'The Invoice Management system was created to simplify and digitize traditional billing workflows. Many businesses rely on manual processes or fragmented tools, resulting in inefficiencies and lack of visibility.',
    the_challenge: 'The key challenge was designing a system that handles complex financial data while remaining simple and intuitive. Presenting invoices, payments, and client data in a clear and structured way required careful UI/UX decisions.',
    the_approach: 'A dashboard-centric approach was used to surface critical information efficiently. Modular components were built for scalability, and workflows were optimized to reduce friction in invoice creation and tracking. The interface was designed to minimize cognitive load and improve usability.',
    the_impact: 'The system improves efficiency in managing financial workflows by centralizing invoice operations. It demonstrates the ability to design scalable SaaS products with real-world business value.',
    impact_metric_1: '+60%',
    impact_label_1: 'Faster invoice processing',
    impact_metric_2: '-40%',
    impact_label_2: 'Reduction in manual effort',
    live_site_link: 'https://invoice-management-ashen.vercel.app/',
    gallery: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80',
    ],
    sort_order: 5,
    featured: true,
  }
];

async function insertData() {
  console.log("Inserting new work...");
  const { data, error } = await supabase
    .from("case_studies")
    .upsert(newProjects, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Successfully inserted new projects:", data.length);
  }
}

insertData();
