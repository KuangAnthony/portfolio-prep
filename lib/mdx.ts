import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeWrap from 'rehype-wrap';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeSlug from 'rehype-slug';
import rehypeTOC from '@jsdevtools/rehype-toc';

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
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        [rehypeWrap, { wrapper: 'main' }],
        rehypePrism,
        rehypeSlug,
        [rehypeTOC, { position: 'beforebegin' }],
      ],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      ...data,
    },
  };
};
