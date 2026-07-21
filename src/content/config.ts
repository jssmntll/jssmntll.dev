import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    order: z.number(),
    tags: z.array(z.object({
      name: z.string(),
      color: z.string(),
    })),
    stats: z.array(z.object({
      label: z.string(),
      value: z.string(),
      color: z.string(),
      width: z.string().optional(),
    })),
    links: z.array(z.object({
      label: z.string(),
      icon: z.string(),
      href: z.string(),
    })),
    featured: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    current: z.boolean().default(false),
  }),
});

export const collections = { projects, experience };
