import Link from 'next/link';
import type { LinkProps } from 'next/link';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

const CustomLink = (props: LinkProps & { href: string; children: string }) => {
  const isExternalLink = props.href && props.href.startsWith('https');

  if (!isExternalLink) {
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
    <figure>
      <div className='relative h-96 w-full'>
        <Image
          src={props.src}
          alt={props.alt}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <figcaption className='text-center'>{props.alt}</figcaption>
    </figure>
  );
};

const MDXComponents = {
  a: CustomLink,
  img: CustomImage,
};

export default MDXComponents;
