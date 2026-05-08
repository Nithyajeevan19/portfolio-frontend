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
  description: string;
  the_context: string;
  the_challenge: string;
  the_approach: string;
  the_impact: string;
  impact_metric_1: string;
  impact_label_1: string;
  impact_metric_2: string;
  impact_label_2: string;
  live_site_link: string;
  gallery: string[];
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
      "https://res.cloudinary.com/dhgkvhtol/image/upload/v1777886011/Screenshot_2026-05-04_144236_fpr6sr.png",

    // One punchy hook — shown on cards and hero
    description:
      "A modern recipe platform built for discovery — clean, fast, and designed to make cooking feel effortless.",

    // Removed from page — kept for SEO/meta only
    the_context:
      "Recipe platforms were cluttered, slow, and built for volume over usability. SweetMagic set out to fix that.",

    // 1–2 sentences — shown as "The Brief"
    the_challenge:
      "Recipe platforms drown users in content. The challenge was making discovery feel instant and browsing feel enjoyable — without sacrificing visual richness.",

    // 1–2 sentences — shown as "The Work"
    the_approach:
      "A minimal design system built around strong typography, clear categorisation, and performance-first image loading — so the food always takes centre stage.",

    // 1 sentence — shown in impact section
    the_impact:
      "Users find what they want faster, with a browsing experience that feels more editorial than search engine.",

    impact_metric_1: "+40%",
    impact_label_1: "Faster navigation",
    impact_metric_2: "2×",
    impact_label_2: "Content discovery speed",

    live_site_link: "https://sweetmagic-website-783c4e.netlify.app/",

    gallery: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    ],
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

    // One punchy hook
    description:
      "An AI-powered healthcare portal that turns a broken booking experience into a frictionless, trust-first patient journey.",

    // Kept for SEO/meta only
    the_context:
      "Healthcare booking was fragmented, slow, and built around the clinic — not the patient.",

    // 1–2 sentences — shown as "The Brief"
    the_challenge:
      "Patients were abandoning complex booking flows before completing appointments. The system needed to feel clinical in quality but human in experience.",

    // 1–2 sentences — shown as "The Work"
    the_approach:
      "A step-by-step booking flow paired with a floating AI triage assistant — built in Next.js with a glassmorphism UI that communicates calm and competence.",

    // 1 sentence — shown in impact section
    the_impact:
      "Appointment completion rates improved significantly, with patients rating the experience near-perfect from day one.",

    impact_metric_1: "< 2 Days",
    impact_label_1: "Average wait time",
    impact_metric_2: "4.9 / 5",
    impact_label_2: "Patient satisfaction",

    live_site_link: "https://ai-assisted-healthca-93mj.bolt.host",

    gallery: [
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1200&q=80",
    ],
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

    // One punchy hook
    description:
      "Replacing scattered spreadsheets with a unified, data-driven billing platform — built for finance teams that move fast.",

    // Kept for SEO/meta only
    the_context:
      "Businesses were losing hours to manual billing across disconnected tools, with no real-time visibility into cash flow.",

    // 1–2 sentences — shown as "The Brief"
    the_challenge:
      "Financial data was fragmented across tools, creating errors and blind spots. The brief was a single platform that made billing, payments, and insights visible at a glance.",

    // 1–2 sentences — shown as "The Work"
    the_approach:
      "A dashboard-first product with modular invoice management, payment tracking, and AI-driven financial insights — all designed to reduce decision lag and manual overhead.",

    // 1 sentence — shown in impact section
    the_impact:
      "Billing workflows that once took hours now run in minutes, with full financial visibility from the moment you log in.",

    impact_metric_1: "2×",
    impact_label_1: "Faster invoice processing",
    impact_metric_2: "+45%",
    impact_label_2: "Financial visibility",

    live_site_link: "https://invoice-management-ruddy.vercel.app/",

    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    ],
  },
];
