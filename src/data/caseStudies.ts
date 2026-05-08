/**
 * Static case study data — single source of truth.
 * To add/edit projects, update this file directly.
 */

export interface CaseStudy {
  id: string;
  slug: string;
  project_title: string;
  client_name: string;
  category: string;
  services: string;
  year: number;
  featured: boolean;
  cover_image: string;
  inner_cover_image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  impact_metric_1: string;
  impact_label_1: string;
  impact_metric_2: string;
  impact_label_2: string;
  live_site_link: string;
  gallery: { url: string; title: string }[];
  tech_stack: string[];
  timeline: string;
  role: string;
  objective: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "sweet-magic",
    slug: "sweet-magic",
    project_title: "SweetMagic Kitchen",
    client_name: "SweetMagic Kitchen",
    category: "Food & Recipe",
    services: "UI/UX Design, Frontend Development",
    year: 2025,
    featured: true,
    cover_image:
      "https://res.cloudinary.com/dqkbvljmo/image/upload/v1778236415/Screenshot_2026-05-08_160313_p859vr.png",
    inner_cover_image:
      "https://res.cloudinary.com/dqkbvljmo/image/upload/v1778236223/Screenshot_2026-05-08_160003_mhru3c.png",
    description:
      "A modern recipe platform built for discovery — clean, fast, and designed to make cooking feel effortless.",
    challenge:
      "Recipe platforms drown users in content. The challenge was making discovery feel instant and browsing feel enjoyable — without sacrificing visual richness.",
    solution:
      "A minimal design system built around strong typography, clear categorisation, and performance-first image loading — so the food always takes centre stage.",
    results:
      "Users find what they want faster, with a browsing experience that feels more editorial than search engine.",
    impact_metric_1: "+40%",
    impact_label_1: "Faster navigation",
    impact_metric_2: "2×",
    impact_label_2: "Content discovery speed",
    live_site_link: "https://sweetmagic-website-783c4e.netlify.app/",
    gallery: [
      {
        url: "https://res.cloudinary.com/dqkbvljmo/image/upload/v1778237425/Screenshot_2026-05-08_162005_d889qk.png",
        title: "Recipe Discovery & Grid Layout"
      },
      {
        url: "https://res.cloudinary.com/dqkbvljmo/image/upload/v1778236990/Screenshot_2026-05-08_161256_sez1xt.png",
        title: "Administrative Control Center"
      },
      {
        url: "https://res.cloudinary.com/dqkbvljmo/image/upload/v1778258541/devnest_project_yuddgj.jpg",
        title: "Mobile Responsiveness"
      }

    ],
    tech_stack: ["React", "Vite", "Framer Motion", "Cloudinary"],
    timeline: "8 Weeks",
    role: "Lead Product Designer",
    objective: "Redefine digital recipe discovery for the modern home cook.",
  },
  {
    id: "medcare-plus",
    slug: "medcare-plus",
    project_title: "MedCare+ AI Healthcare Portal",
    client_name: "MedCare Health",
    category: "Healthcare / SaaS",
    services: "UI/UX Design, Full-Stack Development, AI Integration",
    year: 2026,
    featured: true,
    cover_image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    inner_cover_image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
    description:
      "An AI-powered healthcare portal that turns a broken booking experience into a frictionless, trust-first patient journey.",
    challenge:
      "Patients were abandoning complex booking flows before completing appointments. The system needed to feel clinical in quality but human in experience.",
    solution:
      "A step-by-step booking flow paired with a floating AI triage assistant — built in Next.js with a glassmorphism UI that communicates calm and competence.",
    results:
      "Appointment completion rates improved significantly, with patients rating the experience near-perfect from day one.",
    impact_metric_1: "< 2 Days",
    impact_label_1: "Average wait time",
    impact_metric_2: "4.9 / 5",
    impact_label_2: "Patient satisfaction",
    live_site_link: "https://ai-assisted-healthca-93mj.bolt.host",
    gallery: [
      {
        url: "https://res.cloudinary.com/dhgkvhtol/image/upload/v1778259063/Screenshot_2026-05-08_222041_odm937.png",
        title: "AI Patient Triage Interface"
      },
      {
        url: "https://res.cloudinary.com/dhgkvhtol/image/upload/v1778258731/Screenshot_2026-05-08_221228_mvjyzx.png",
        title: "Appointment Booking"
      },
      {
        url: "https://res.cloudinary.com/dhgkvhtol/image/upload/v1778259037/Screenshot_2026-05-08_222014_uanihi.png",
        title: "Mobile Responsive"
      },
      
    ],
    tech_stack: ["Next.js", "OpenAI", "Tailwind CSS", "Supabase"],
    timeline: "14 Weeks",
    role: "Full-Stack Engineer & Designer",
    objective: "Simplify the complexity of AI-driven patient triage and appointment management.",
  },
  {
    id: "invoice-management",
    slug: "invoice-management",
    project_title: "Invoice Management System",
    client_name: "FinFlow Systems",
    category: "Fintech / SaaS",
    services: "Product Design, Frontend Development",
    year: 2025,
    featured: true,
    cover_image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    inner_cover_image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    description:
      "Replacing scattered spreadsheets with a unified, data-driven billing platform — built for finance teams that move fast.",
    challenge:
      "Financial data was fragmented across tools, creating errors and blind spots. The brief was a single platform that made billing, payments, and insights visible at a glance.",
    solution:
      "A dashboard-first product with modular invoice management, payment tracking, and AI-driven financial insights — all designed to reduce decision lag and manual overhead.",
    results:
      "Billing workflows that once took hours now run in minutes, with full financial visibility from the moment you log in.",
    impact_metric_1: "2×",
    impact_label_1: "Faster invoice processing",
    impact_metric_2: "+45%",
    impact_label_2: "Financial visibility",
    live_site_link: "https://invoice-management-ruddy.vercel.app/",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        title: "Financial Analytics Dashboard"
      },
      {
        url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&q=80",
        title: "Modular Invoice Builder"
      },
      {
        url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
        title: "Global Transaction History"
      }
    ],
    tech_stack: ["React", "TanStack Table", "Radix UI", "Node.js"],
    timeline: "10 Weeks",
    role: "Product Designer",
    objective: "Consolidate fragmented financial workflows into a high-performance SaaS dashboard.",
  },
];
