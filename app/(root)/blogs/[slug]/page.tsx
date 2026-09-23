import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { BlogTableOfContents } from "@/components/blogs/blog-table-of-contents";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getAllBlogSlugs, getAllBlogsMeta, getBlogPost } from "@/lib/blogs";
import { cn, formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    const ogImage = post.coverImage
      ? `${siteConfig.url}${post.coverImage}`
      : siteConfig.ogImage;

    return {
      title: post.title,
      description: post.description,
      authors: [{ name: siteConfig.authorName, url: siteConfig.url }],
      keywords: post.tags,
      alternates: {
        canonical: `${siteConfig.url}/blogs/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `${siteConfig.url}/blogs/${slug}`,
        siteName: siteConfig.name,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.date,
        authors: [siteConfig.authorName],
        tags: post.tags,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [ogImage],
        creator: `@${siteConfig.username}`,
      },
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    };
  } catch {
    return { title: "Blog Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  const isoDate = new Date(post.date).toISOString();
  const formattedDate = formatDate(post.date);
  const ogImage = post.coverImage
    ? `${siteConfig.url}${post.coverImage}`
    : siteConfig.ogImage;

  const otherPosts = getAllBlogsMeta()
    .filter((blog) => blog.slug !== slug)
    .slice(0, 2);

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
      sameAs: [siteConfig.links.github, siteConfig.links.twitter],
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blogs/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blogs/${slug}`,
    },
    image: ogImage,
    keywords: post.tags.join(", "),
    wordCount: post.contentHtml.replace(/<[^>]*>/g, "").split(/\s+/).length,
    ...(post.readingTime && {
      timeRequired: `PT${post.readingTime}M`,
    }),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Blog",
      name: `${siteConfig.authorName}'s Blog`,
      url: `${siteConfig.url}/blogs`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${siteConfig.url}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blogs/${slug}`,
      },
    ],
  };

  return (
    <ClientPageWrapper>
      <Script
        id="schema-blog-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <Script
        id="schema-breadcrumb-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <AnimatedText delay={0}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <Icons.chevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-foreground transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li aria-hidden="true">
                <Icons.chevronRight className="w-3.5 h-3.5" />
              </li>
              <li
                className="text-foreground font-medium truncate max-w-[200px] sm:max-w-[300px]"
                aria-current="page"
              >
                {post.title}
              </li>
            </ol>
          </nav>
        </AnimatedText>

        <AnimatedSection direction="up">
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-5" aria-label="Tags">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight text-foreground mb-5">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-7">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground pb-7 border-b border-border">
              <address className="flex items-center gap-1.5 not-italic">
                <Icons.user className="w-4 h-4" />
                <a
                  rel="author"
                  href={siteConfig.url}
                  className="hover:text-foreground transition-colors"
                >
                  {siteConfig.authorName}
                </a>
              </address>
              <time dateTime={isoDate} className="flex items-center gap-1.5">
                <Icons.calendar className="w-4 h-4" />
                {formattedDate}
              </time>
              {post.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Icons.clock className="w-4 h-4" />
                  {post.readingTime} min read
                </span>
              )}
            </div>
          </header>
        </AnimatedSection>

        {post.coverImage && (
          <AnimatedSection direction="up" delay={0.05}>
            <figure className="mb-12">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={960}
                height={540}
                className="w-full h-auto rounded-lg border border-border object-cover"
                priority
              />
            </figure>
          </AnimatedSection>
        )}

        <div className="blog-article-layout">
          <div className="min-w-0">
            <div className="lg:hidden mb-8">
              <BlogTableOfContents items={post.toc} />
            </div>

            <AnimatedSection direction="up" delay={0.1}>
              <section
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </AnimatedSection>

            <AnimatedSection
              direction="up"
              delay={0.15}
              className="mt-16 pt-8 border-t border-border"
            >
              <footer>
                {otherPosts.length > 0 && (
                  <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      More posts
                    </p>
                    <ul className="space-y-3">
                      {otherPosts.map((blog) => (
                        <li key={blog.slug}>
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="group flex flex-col gap-1"
                          >
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {blog.title}
                            </span>
                            <time
                              dateTime={new Date(blog.date).toISOString()}
                              className="text-xs text-muted-foreground"
                            >
                              {formatDate(blog.date)}
                            </time>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/blogs"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-lg gap-2"
                  )}
                >
                  <Icons.chevronLeft className="w-4 h-4" />
                  All posts
                </Link>
              </footer>
            </AnimatedSection>
          </div>

          <aside className="self-start hidden lg:block lg:sticky lg:top-8">
            <AnimatedSection direction="up" delay={0.12}>
              <BlogTableOfContents items={post.toc} />
            </AnimatedSection>
          </aside>
        </div>
      </article>
    </ClientPageWrapper>
  );
}
