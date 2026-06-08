import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "content", "articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  published: string;
  tags: string;
}

export interface ArticleData extends ArticleMeta {
  content: string;
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

  const articles = files.map((file) => {
    const slug = file.replace(".md", "");
    const raw = fs.readFileSync(path.join(articlesDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      author: data.author || "",
      published: String(data.published || ""),
      tags: String(data.tags || ""),
    };
  });

  articles.sort((a, b) => b.published.localeCompare(a.published));
  return articles;
}

export function getArticleData(slug: string): ArticleData | null {
  const filePath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    author: data.author || "",
      published: String(data.published || ""),
      tags: String(data.tags || ""),
    content,
  };
}
