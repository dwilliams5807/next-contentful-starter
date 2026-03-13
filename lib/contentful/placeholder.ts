import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';
import type { ContentSection, ColumnItem } from 'types/contentful';

// ─── Rich text helpers ────────────────────────────────────────────────────────

const t = (value: string) => ({ nodeType: 'text' as const, value, marks: [], data: {} });
const tc = (value: string) => ({ nodeType: 'text' as const, value, marks: [{ type: MARKS.CODE }], data: {} });
const p = (value: string) => ({ nodeType: BLOCKS.PARAGRAPH, data: {}, content: [t(value)] });
const pc = (value: string) => ({ nodeType: BLOCKS.PARAGRAPH, data: {}, content: [tc(value)] });
const h1 = (value: string) => ({ nodeType: BLOCKS.HEADING_1, data: {}, content: [t(value)] });
const h2 = (value: string) => ({ nodeType: BLOCKS.HEADING_2, data: {}, content: [t(value)] });
const h3 = (value: string) => ({ nodeType: BLOCKS.HEADING_3, data: {}, content: [t(value)] });
const doc = (...content: object[]): Document => ({
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: content as Document['content'],
});

// ─── Placeholder sections ─────────────────────────────────────────────────────

const sections: ContentSection[] = [
  // 1. Hero — HeroSection
  {
    __typename: 'HeroSection',
    sys: { id: 'demo-hero' },
    image: { url: 'https://placehold.co/1400x700/1e293b/1e293b', title: 'Hero' },
    altText: 'Hero background',
    text: { json: doc(
      h1('next-contentful-blocks'),
      p('Contentful page blocks for Next.js.'),
    ) },
    horizontalTextPosition: 'Center',
    verticalTextPosition: 'Center',
    textColor: '#ffffff',
    mobileTextPosition: 'Center',
    noMarginBanner: false,
    cta: 'View on GitHub',
    ctaLink: 'https://github.com/',
    ctaStyle: 'Button',
    ctaButtonColor: '#ffffff',
  },

  // 2. Get started — Columns with setup steps
  {
    __typename: 'ColumnsSection',
    sys: { id: 'demo-setup' },
    text: { json: doc(h2('Get started')) },
    textColor: '#e5e7eb',
    columnsCollection: {
      items: [
        {
          textPosition: 'Below',
          text: { json: doc(
            h3('Clone and setup'),
            pc('npm install'),
          ) },
        },
        {
          textPosition: 'Below',
          text: { json: doc(
            h3('Setup Contentful & install CLI'),
            pc('npm install -g contentful-cli'),
            p('Create a Contentful account and add CONTENTFUL_SPACE and CONTENTFUL_API to .env.local'),

          ) },
        },
        {
          textPosition: 'Below',
          text: { json: doc(
            h3('Import content types'),
            pc('contentful space import --content-file contentful/content-types.json'),
          ) },
        },
      ] as ColumnItem[],
    },
  },

  // 3. Duplex Section — explains Duplex
  {
    __typename: 'DuplexSection',
    sys: { id: 'demo-duplex' },
    title: 'Duplex',
    text: { json: doc(
      h2('Duplex Section'),
      p('Two column layout. Text on one side, image on the other. Supports images, video, and card slider. Configurable split (40 / 50 / 60%), desktop and mobile alignment options, and CTA.'),
    ) },
    textColor: '#e5e7eb',
    textBackgroundColor: '#1a1a1a',
    image: { url: 'https://placehold.co/800x600/BEC9E6/BEC9E6', title: 'Duplex example' },
    altText: 'Duplex section example',
    desktopAlignment: 'Right',
    mobileAlignment: 'Bottom',
    split: undefined,
  },

  // 4. Columns Section — explains Columns, cards explain each block type
  {
    __typename: 'ColumnsSection',
    sys: { id: 'demo-columns' },
    text: { json: doc(
      h2('Columns Section'),
      p('Responsive grid of Card entries. 2–8 columns, optional slider. Cards support images, video, text overlays, CTAs, and custom colors.'),
    ) },
    textColor: '#e5e7eb',
    columnsCollection: {
      items: [
        {
          image: { url: 'https://placehold.co/400x240/BEC9E6/BEC9E6', title: 'Duplex' },
          altText: 'Duplex Section',
        },
        {
          image: { url: 'https://placehold.co/400x240/DDE6BD/DDE6BD', title: 'Columns' },
          altText: 'Columns Section',
        },
        {
          image: { url: 'https://placehold.co/400x240/E6C7BE/E6C7BE', title: 'Hero' },
          altText: 'Hero Section',
        },
      ] as ColumnItem[],
    },
  },

  // 5. Carousel mode — Duplex with slides on the left
  {
    __typename: 'DuplexSection',
    sys: { id: 'demo-carousel' },
    title: 'Carousel',
    text: { json: doc(
      h2('Carousel mode'),
      p('Add Cards to the Slides field on any Duplex Section to enable slider.'),
    ) },
    textColor: '#e5e7eb',
    textBackgroundColor: '#1a1a1a',
    imageType: 'Images',
    desktopAlignment: 'Left',
    mobileAlignment: 'Bottom',
    split: '60%',
    slidesCollection: {
      items: [
        {
          image: { url: 'https://placehold.co/350x440/BEC9E6/BEC9E6', title: 'Card 1' },
          altText: 'Card 1',
        },
        {
          image: { url: 'https://placehold.co/350x440/DDE6BD/DDE6BD', title: 'Card 2' },
          altText: 'Card 2',
        },
        {
          image: { url: 'https://placehold.co/350x440/E6C7BE/E6C7BE', title: 'Card 3' },
          altText: 'Card 3',
        },
        {
          image: { url: 'https://placehold.co/350x440/E6DBBE/E6DBBE', title: 'Card 4' },
          altText: 'Card 4',
        },
      ] as ColumnItem[],
    },
  },

  // 6. CTA — Hero explains itself
  {
    __typename: 'HeroSection',
    sys: { id: 'demo-cta' },
    image: { url: 'https://placehold.co/1400x500/E6DBBE/E6DBBE', title: 'CTA background' },
    altText: 'CTA background',
    text: { json: doc(
      h2('Hero Section'),
      p('Full width background with overlaid text at any position. Supports separate mobile images.'),
      p('Add CONTENTFUL_SPACE and CONTENTFUL_API to .env.local to use your own content.'),
    ) },
    horizontalTextPosition: 'Center',
    verticalTextPosition: 'Center',
    textColor: '#333333',
    mobileTextPosition: 'Center',
    noMarginBanner: false,
  },
];

export const placeholderHomeData = {
  homePageCollection: {
    items: [
      {
        title: 'Demo — next-contentful-blocks',
        metaTitle: 'next-contentful-blocks',
        sectionsCollection: { items: sections },
      },
    ],
  },
};
