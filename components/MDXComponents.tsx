import Link from 'next/link';
import type { LinkProps } from 'next/link';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

const CustomLink = (props: LinkProps & { href: string; children: string }) => {
  const isInternalLink =
    props.href && (props.href.startsWith('/') || props.href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={props.href}>
        <a>{props.children}</a>
      </Link>
    );
  }

  return (
    <a target='_blank' rel='noopener noreferrer' href={props.href}>
      {props.children}
    </a>
  );
};

const CustomImage = (props: ImageProps & { src: string }) => {
  return (
    <figure className='relative h-64 w-96'>
      <Image src={props.src} alt={props.alt} layout='fill' objectFit='cover' />
    </figure>
  );
};

const MDXComponents = {
  a: CustomLink,
  img: CustomImage,
};

export default MDXComponents;
