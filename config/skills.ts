import { Icons } from "@/components/common/icons";

export interface SkillItemData {
  name: string;
  description: string;
  icon?: keyof typeof Icons;
}

export interface SkillGroup {
  title: string;
  skills: SkillItemData[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend Development",
    skills: [
      {
        name: "Python",
        description:
          "Build backend services, automation tools, APIs, and data-driven applications.",
        icon: "python",
      },
      {
        name: "FastAPI",
        description:
          "Build high-performance, modern REST APIs and backend services with Python.",
        icon: "fastapi",
      },
      {
        name: "Django",
        description:
          "Develop robust web applications and backend systems with Python's mature web framework.",
        icon: "django",
      },
      {
        name: "Django REST Framework",
        description:
          "Build structured REST APIs and authentication systems on top of Django.",
        icon: "django",
      },
      {
        name: "Celery",
        description:
          "Run background jobs, scheduled tasks, and distributed workers in Python applications.",
        icon: "celery",
      },
    ],
  },
  {
    title: "Databases",
    skills: [
      {
        name: "PostgreSQL",
        description:
          "Design and manage reliable relational databases for production applications.",
        icon: "postgresql",
      },
      {
        name: "Redis",
        description:
          "Use in-memory data structures for caching, queues, sessions, and background processing.",
        icon: "redis",
      },
      {
        name: "MongoDB",
        description:
          "Work with flexible document-oriented data models for NoSQL storage.",
        icon: "mongodb",
      },
    ],
  },
  {
    title: "Infrastructure & Deployment",
    skills: [
      {
        name: "Docker",
        description:
          "Containerize applications and create reproducible development and deployment environments.",
        icon: "docker",
      },
      {
        name: "Linux Server Administration",
        description:
          "Manage Linux servers, processes, networking, permissions, and production environments.",
        icon: "linux",
      },
      {
        name: "Nginx",
        description:
          "Configure reverse proxies, web servers, SSL termination, and application routing.",
        icon: "nginx",
      },
    ],
  },
  {
    title: "Development Practices",
    skills: [
      {
        name: "API Design",
        description:
          "Design clean, versioned, and well-documented APIs for real-world clients.",
        icon: "swagger",
      },
      {
        name: "CI/CD",
        description:
          "Automate build, test, and deployment pipelines for fast and safe releases.",
        icon: "githubactions",
      },
    ],
  },
  {
    title: "Software Engineering",
    skills: [
      {
        name: "Git",
        description:
          "Manage source code, branches, collaboration, and version history with Git.",
        icon: "git",
      },
      {
        name: "Software Testing",
        description:
          "Write unit, integration, and end-to-end tests to keep software reliable.",
        icon: "testing",
      },
      {
        name: "SOLID Principles",
        description:
          "Apply object-oriented design principles to build maintainable, extensible code.",
      },
    ],
  },
  {
    title: "Frontend",
    skills: [
      {
        name: "TypeScript",
        description:
          "Write safer and more maintainable JavaScript applications with static typing.",
        icon: "typescript",
      },
      {
        name: "React",
        description:
          "Build interactive user interfaces using reusable components and modern React patterns.",
        icon: "react",
      },
      {
        name: "Next.js",
        description:
          "Build modern full-stack React applications with routing and optimized production builds.",
        icon: "nextjs",
      },
      {
        name: "Tailwind CSS",
        description:
          "Build responsive user interfaces efficiently with a utility-first CSS framework.",
        icon: "tailwindcss",
      },
    ],
  },
  {
    title: "Currently Exploring",
    skills: [
      {
        name: "Prometheus",
        description:
          "Learning metrics collection and time-series monitoring through small side projects.",
        icon: "prometheus",
      },
      {
        name: "Grafana",
        description:
          "Exploring dashboards and visualization for metrics and system health.",
        icon: "grafana",
      },
      {
        name: "Elasticsearch",
        description:
          "Exploring full-text search and indexing for larger datasets.",
        icon: "elasticsearch",
      },
      {
        name: "Kibana",
        description:
          "Exploring data visualization and querying on top of Elasticsearch.",
        icon: "kibana",
      },
    ],
  },
];