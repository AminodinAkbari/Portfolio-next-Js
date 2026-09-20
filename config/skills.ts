import { Icons } from "@/components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "Python",
    description:
      "Build backend services, automation tools, APIs, and data-driven applications.",
    rating: 5,
    icon: Icons.python
  },
  {
    name: "FastAPI",
    description:
      "Build high-performance, modern REST APIs and backend services with Python.",
    rating: 5,
    icon: Icons.fastapi,
  },
  {
    name: "Django",
    description:
      "Develop robust web applications and backend systems with Python's mature web framework.",
    rating: 5,
    icon: Icons.django,
  },
  {
    name: "PostgreSQL",
    description:
      "Design and manage reliable relational databases for production applications.",
    rating: 5,
    icon: Icons.postgresql,
  },
  {
    name: "Docker",
    description:
      "Containerize applications and create reproducible development and deployment environments.",
    rating: 5,
    icon: Icons.docker,
  },
  {
    name: "Linux",
    description:
      "Manage Linux servers, processes, networking, permissions, and production environments.",
    rating: 5,
    icon: Icons.linux,
  },
  {
    name: "Git",
    description:
      "Manage source code, branches, collaboration, and version history with Git.",
    rating: 5,
    icon: Icons.git,
  },
  {
    name: "Redis",
    description:
      "Use in-memory data structures for caching, queues, sessions, and background processing.",
    rating: 4,
    icon: Icons.redis,
  },
  {
    name: "MongoDB",
    description:
      "Work with flexible document-oriented data models for applications that benefit from NoSQL storage.",
    rating: 4,
    icon: Icons.mongodb,
  },
  {
    name: "Django REST Framework",
    description:
      "Build structured REST APIs and authentication systems on top of Django.",
    rating: 4,
    icon: Icons.django,
  },
  {
    name: "Nginx",
    description:
      "Configure reverse proxies, web servers, SSL termination, and application routing.",
    rating: 4,
    icon: Icons.nginx,
  },
  {
    name: "React",
    description:
      "Build interactive user interfaces using reusable components and modern React patterns.",
    rating: 4,
    icon: Icons.react,
  },
  {
    name: "Next.js",
    description:
      "Build modern full-stack React applications with routing, rendering, and optimized production builds.",
    rating: 4,
    icon: Icons.nextjs,
  },
  {
    name: "TypeScript",
    description:
      "Write safer and more maintainable JavaScript applications with static typing.",
    rating: 4,
    icon: Icons.typescript,
  },
  {
    name: "Tailwind CSS",
    description:
      "Build responsive user interfaces efficiently with a utility-first CSS framework.",
    rating: 4,
    icon: Icons.tailwindcss,
  },
];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);