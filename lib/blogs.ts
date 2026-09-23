import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  featured?: boolean;
}

export interface BlogMeta extends BlogFrontmatter {
  slug: string;
}

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface BlogPost extends BlogMeta {
  contentHtml: string;
  toc: TocItem[];
}

function ensureBlogsDir() {
  if (!fs.existsSync(BLOGS_DIR)) {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function remarkHeadings(collector: TocItem[]) {
  return () => (tree: { type: string; depth?: number; children?: unknown[]; data?: Record<string, unknown> }) => {
    const walk = (node: typeof tree) => {
      if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
        const text = collectText(node.children);
        if (text) {
          const base = slugify(text);
          let id = base;
          let n = 1;
          while (collector.some((item) => item.id === id)) {
            id = `${base}-${n++}`;
          }
          collector.push({ id, text, depth: node.depth as 2 | 3 });
          node.data = node.data || {};
          const hProperties = (node.data.hProperties as Record<string, string>) || {};
          hProperties.id = id;
          node.data.hProperties = hProperties;
        }
      }
      if (Array.isArray(node.children)) {
        (node.children as typeof tree[]).forEach(walk);
      }
    };
    walk(tree);
  };
}

function collectText(children?: unknown[]): string {
  if (!Array.isArray(children)) return "";
  return children
    .map((child) => {
      const c = child as { value?: string; children?: unknown[] };
      if (typeof c.value === "string") return c.value;
      if (Array.isArray(c.children)) return collectText(c.children);
      return "";
    })
    .join("");
}

export function getAllBlogSlugs(): string[] {
  ensureBlogsDir();
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllBlogsMeta(): BlogMeta[] {
  ensureBlogsDir();
  const slugs = getAllBlogSlugs();

  const blogs = slugs.map((slug) => {
    const filePath = path.join(BLOGS_DIR, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    return {
      slug,
      ...(data as BlogFrontmatter),
    } as BlogMeta;
  });

  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const toc: TocItem[] = [];
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHeadings(toc))
    .use(remarkHtml, { sanitize: false })
    .process(content);

  let contentHtml = processed.toString();
  contentHtml = contentHtml.replace(
    /<table>[\s\S]*?<\/table>/g,
    (table) => `<div class="table-scroll">${table}</div>`
  );

  return {
    slug,
    ...(data as BlogFrontmatter),
    contentHtml,
    toc,
  };
}

export function getFeaturedBlogs(): BlogMeta[] {
  const all = getAllBlogsMeta();
  const featured = all.filter((b) => b.featured);
  return featured.length > 0 ? featured.slice(0, 3) : all.slice(0,3);
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
