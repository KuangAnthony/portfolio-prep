import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const root = process.cwd();

export const getAllSlugs = async () => {
  const postsPath = path.join(root, 'posts');
  const fileNames = fs.readdirSync(postsPath);

  return fileNames;
};

export const getPostBySlug = async (slug: string) => {
  const source = fs.readFileSync(
    path.join(root, 'posts', `${slug}.mdx`),
    'utf-8'
  );
  const { content, data } = matter(source);
  const mdxSource = await serialize(content);

  return {
    mdxSource,
    frontMatter: {
      ...data,
    },
  };
};
