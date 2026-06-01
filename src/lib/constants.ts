import { PricingPlan } from "@/types";

export const APP_NAME = "PDF Workspace";
export const APP_DESCRIPTION = "The professional PDF editor for modern teams.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Starter",
    description: "Perfect for individuals exploring PDF editing.",
    price_monthly: 0,
    price_yearly: 0,
    features: [
      "5 projects",
      "Upload PDFs up to 10MB",
      "Basic text editing",
      "Basic shapes & annotations",
      "PDF export",
      "Community support",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals who need more power.",
    price_monthly: 19,
    price_yearly: 15,
    features: [
      "Unlimited projects",
      "Upload PDFs up to 100MB",
      "Advanced text editing",
      "Custom fonts & branding",
      "Digital signatures",
      "Version history (30 days)",
      "Priority support",
      "API access",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    description: "Collaborate seamlessly with your whole team.",
    price_monthly: 49,
    price_yearly: 39,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Real-time collaboration",
      "Team workspace",
      "Version history (1 year)",
      "Admin controls",
      "SSO / SAML",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Start Team Trial",
    highlighted: false,
  },
];

export const FAQ_ITEMS = [
  {
    question: "What file formats can I upload?",
    answer:
      "PDF Workspace supports PDF files of all versions. You can upload files up to 10MB on the free plan and up to 100MB on Pro and Team plans.",
  },
  {
    question: "Can I collaborate with my team in real time?",
    answer:
      "Yes! Our Team plan includes real-time collaboration powered by Supabase Realtime, allowing multiple users to edit the same document simultaneously.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. All files are encrypted at rest and in transit. We use Supabase storage with row-level security, ensuring only you (and your team) can access your documents.",
  },
  {
    question: "Can I export edited PDFs?",
    answer:
      "Yes. You can export your edited PDFs at any time in full quality. We use pdf-lib to ensure high-fidelity exports that preserve your original document.",
  },
  {
    question: "Do you offer a free trial for paid plans?",
    answer:
      "Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. Your access continues until the end of your billing period.",
  },
];

export const FEATURES = [
  {
    icon: "FileEdit",
    title: "Powerful PDF Editing",
    description:
      "Edit text, images, and layouts directly on your PDF — no conversion needed.",
  },
  {
    icon: "Type",
    title: "Rich Text Tools",
    description:
      "Add, edit, and style text with full font control, sizing, and color options.",
  },
  {
    icon: "Shapes",
    title: "Shapes & Annotations",
    description:
      "Draw rectangles, circles, arrows, and freehand annotations over any page.",
  },
  {
    icon: "PenLine",
    title: "Digital Signatures",
    description:
      "Sign documents digitally with a hand-drawn or typed signature.",
  },
  {
    icon: "Users",
    title: "Team Collaboration",
    description:
      "Work together in real time with teammates, with live cursors and instant sync.",
  },
  {
    icon: "Download",
    title: "High-Quality Export",
    description:
      "Export your finished document as a pixel-perfect, standards-compliant PDF.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Upload Your PDF",
    description:
      "Drag and drop or browse to upload any PDF document. We handle the rendering instantly.",
  },
  {
    step: "02",
    title: "Edit With Precision",
    description:
      "Use our intuitive toolbar to add text, shapes, images, and signatures to any page.",
  },
  {
    step: "03",
    title: "Collaborate & Review",
    description:
      "Invite teammates, leave comments, and iterate together in real time.",
  },
  {
    step: "04",
    title: "Export & Share",
    description:
      "Download your polished PDF or share a link directly with anyone.",
  },
];
