type BlogLayoutProps = {
  children: JSX.Element;
  frontMatter: {};
};

const BlogLayout = ({ children, frontMatter }: BlogLayoutProps) => {
  return <article className='prose mx-auto'>{children}</article>;
};

export default BlogLayout;
