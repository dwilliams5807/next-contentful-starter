'use client';
import type { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

export const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
    [MARKS.CODE]: (text) => (
      <code className="block font-mono text-sm bg-black/30 px-4 py-2 rounded text-left mt-1">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (_node, children) => (
      <h1 className="mb-6 first:mt-0 last:mb-0 font-head text-3xl md:text-5xl tracking-tight leading-tight">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mb-4 first:mt-0 last:mb-0 font-head text-2xl md:text-4xl tracking-tight leading-tight">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="font-sub text-xl md:text-2xl leading-snug">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <h4 className="font-reg text-2xl">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node, children) => (
      <h5 className="font-sub">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node, children) => (
      <h6 className="font-signature">{children}</h6>
    ),
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      const isEmpty =
        Array.isArray(children) &&
        children.length === 1 &&
        children[0] === '';
      if (isEmpty) return null;
      return (
        <p className="my-3 font-reg empty:hidden text-base max-w-2xl mx-auto">
          {children}
        </p>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = node.data.uri as string;
      const isExternal =
        uri.startsWith('http') &&
        typeof window !== 'undefined' &&
        !uri.includes(window.location.hostname);
      return (
        <a
          href={uri}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  renderText: (text) =>
    text.split('\n').reduce<React.ReactNode[]>((acc, segment, index) => {
      if (index === 0) return [segment];
      return [...acc, <br key={index} />, segment];
    }, []),
};
