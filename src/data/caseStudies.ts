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
    project_title: "SweetMagic Kitchen — A Modern Recipe Experience",
    client_name: "SweetMagic Kitchen",
    category: "Food & Recipe",
    services: "UI/UX Design, Frontend Development",
    year: 2025,
    featured: true,
    cover_image: "https://res.cloudinary.com/dhgkvhtol/image/upload/v1777886011/Screenshot_2026-05-04_144236_fpr6sr.png",
    description:
      "SweetMagic was conceived as a modern recipe platform in a space saturated with cluttered and outdated experiences.",
    the_context:
      "SweetMagic was conceived as a modern recipe platform in a space saturated with cluttered and outdated experiences. Most existing solutions prioritized volume over usability, making it difficult for users to quickly discover relevant recipes. The opportunity was to create a clean, visually engaging platform that simplifies exploration and enhances the overall cooking experience.",
    the_challenge:
      "The primary challenge was balancing rich visual content with performance and usability. Recipe platforms rely heavily on imagery, but excessive content can lead to clutter and slow loading times. Ensuring a fast, responsive experience while maintaining high-quality visuals and intuitive navigation was critical.",
    the_approach:
      "A minimal and structured design system was implemented to reduce cognitive load. Clear categorization, strong typography, and consistent spacing were used to guide users naturally. Responsive layouts ensured seamless usage across devices, while performance optimizations improved loading speed without compromising visual quality.",
    the_impact:
      "SweetMagic delivers a frictionless recipe discovery experience, allowing users to explore content quickly and efficiently. The platform demonstrates how thoughtful design and performance optimization can transform a content-heavy application into a seamless and engaging product.",
    impact_metric_1: "+40%",
    impact_label_1: "Improved user navigation efficiency",
    impact_metric_2: "2x",
    impact_label_2: "Faster content discovery",
    live_site_link: "https://sweetmagic-website-783c4e.netlify.app/",
    gallery: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    ],
  },
  {
    id: "ipl-auction",
    slug: "ipl-auction",
    project_title: "IPL Auction — Real-Time Bidding Simulation",
    client_name: "Gavel Auction Platform",
    category: "Sports Tech",
    services: "UI/UX Design, Frontend Development",
    year: 2025,
    featured: true,
    cover_image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1800&q=80",
    description:
      "The IPL Auction platform was developed to simulate the excitement and strategy of real-world cricket auctions.",
    the_context:
      "The IPL Auction platform was developed to simulate the excitement and strategy of real-world cricket auctions. The goal was to create an interactive system where users could experience live bidding, team building, and competitive decision-making.",
    the_challenge:
      "The biggest challenge was handling real-time interactions and complex state updates. Auction systems require instant feedback, accurate bid tracking, and smooth user experience under rapid interactions, making state management a critical factor.",
    the_approach:
      "A component-based architecture was implemented to manage dynamic states efficiently. Real-time bidding logic was designed to handle updates, validations, and user actions seamlessly. The UI was optimized for clarity, ensuring users can quickly understand auction status and make decisions.",
    the_impact:
      "The platform successfully replicates a real IPL auction experience, showcasing advanced frontend capabilities including real-time updates, state management, and interactive UI design. It stands out as a technically strong and engaging product.",
    impact_metric_1: "Real-time",
    impact_label_1: "Dynamic bidding system",
    impact_metric_2: "+70%",
    impact_label_2: "User interaction rate",
    live_site_link: "https://www.iplauction.fun/",
    gallery: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=1200&q=80",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
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
    cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    description:
      "A modern invoice management platform designed to streamline billing workflows, centralize financial data, and surface actionable business insights.",
    the_context:
      "The Invoice Management System was built to address the inefficiencies of traditional billing processes, where businesses rely on spreadsheets, scattered tools, and manual data entry. This fragmentation often leads to errors, lack of visibility, and delayed decision-making. The goal was to create a unified platform that centralizes invoices, payments, customer data, and analytics into a single, intuitive system.",
    the_challenge:
      "The primary challenge was designing a system capable of handling complex financial data while remaining simple and accessible for everyday users. Managing large datasets, multiple workflows, and real-time updates required careful structuring. Additionally, integrating features like file uploads, editable records, payment tracking, and AI-driven insights without overwhelming the interface demanded a strong balance between functionality and usability.",
    the_approach:
      "A dashboard-first approach was adopted to provide users with immediate visibility into key financial metrics. The system was structured into clear modules including invoice management, payments, customers, and analytics. Clean layouts, consistent spacing, and intuitive filtering mechanisms were used to simplify navigation. AI-powered insights were integrated to enhance decision-making, offering forecasts, anomaly detection, and customer-level analytics, all while maintaining a fast and responsive user experience.",
    the_impact:
      "The platform transforms fragmented billing workflows into a streamlined, data-driven system. Users can manage invoices, track payments, and gain actionable insights from a single interface, significantly improving efficiency and visibility across financial operations.",
    impact_metric_1: "2x",
    impact_label_1: "Faster invoice processing",
    impact_metric_2: "+45%",
    impact_label_2: "Improved financial visibility",
    live_site_link: "https://invoice-management-ruddy.vercel.app/",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=1200&q=80",
    ],
  },
];
