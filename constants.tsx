
import { Feature, PricingPlan, TechSpec } from './types';

export const FEATURES: Feature[] = [
  {
    id: 'headless',
    title: 'Pure Headless Power',
    description: 'Consume your content via GraphQL or REST API from any frontend—React, Vue, Svelte, or Mobile.',
    icon: 'fa-microchip'
  },
  {
    id: 'opensource',
    title: 'Completely Open Source',
    description: 'Built on the robust Payload CMS core. No vendor lock-in, total transparency, full ownership.',
    icon: 'fa-code'
  },
  {
    id: 'selfhost',
    title: 'Host Yourself',
    description: 'Your data stays on your infrastructure. Deploy to AWS, Vercel, Railway, or your own bare metal.',
    icon: 'fa-server'
  },
  {
    id: 'db',
    title: 'Database Agnostic',
    description: 'Choose your weapon: MongoDB, PostgreSQL, or SQLite. High performance, zero hassle.',
    icon: 'fa-database'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Community',
    price: '£0',
    billing: 'Forever Free',
    features: [
      'Core Payload CMS Engine',
      'Standard Components',
      'Community Support',
      'Self-Hosting Only'
    ],
    cta: 'Get Started Free'
  },
  {
    name: 'PayloadX Premium',
    price: '£120',
    billing: 'One-Time Fee',
    highlighted: true,
    features: [
      'Advanced Admin UI Kit',
      'Dedicated Email Support',
      'Enterprise Auth Modules',
      'Custom Deployment Scripts',
      'Lifetime Updates'
    ],
    cta: 'Get One-Time Access'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    billing: 'Annual Partnership',
    features: [
      'SLA Guarantees',
      'White-label Solution',
      'Architectural Consulting',
      'Security Audits',
      'Multi-tenant Support'
    ],
    cta: 'Contact Sales'
  }
];

export const TECH_SPECS: TechSpec[] = [
  { name: 'Engine', value: 'Node.js 20.9.0+', icon: 'fa-brands fa-node-js' },
  { name: 'Package Mgr', value: 'pnpm (preferred), npm, yarn', icon: 'fa-box-open' },
  { name: 'Databases', value: 'Postgres, Mongo, SQLite', icon: 'fa-database' },
  { name: 'Language', value: 'TypeScript First', icon: 'fa-code' }
];
