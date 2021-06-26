import type { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';
import MDXComponents from '@components/MDXComponents';
import { getAllSlugs, getPostBySlug } from '@lib/mdx';

type PostProps = {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {}; // TODO: type definition; don't know what data my frontMatter will include yet
};

interface PostParams extends ParsedUrlQuery {
  post: string;
}

const Post = ({ mdxSource, frontMatter }: PostProps) => {
  return (
    <article>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        post: slug.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { post } = params as PostParams;
  const { mdxSource, frontMatter } = await getPostBySlug(post);

  return {
    props: { mdxSource, frontMatter },
  };
};

export default Post;
