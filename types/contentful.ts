import type { Document } from '@contentful/rich-text-types';

export interface ContentfulImage {
  url: string;
  title?: string;
}

export interface ContentfulRichText {
  json: Document;
}

export interface ContentfulSys {
  id: string;
}

export interface DuplexSection {
  __typename: 'DuplexSection';
  sys: ContentfulSys;
  title?: string;
  text?: ContentfulRichText;
  textPosition?: string;
  textColor?: string;
  textBackgroundColor?: string;
  textBackgroundImage?: ContentfulImage;
  textSectionIcon?: ContentfulImage;
  cta?: string;
  ctaLink?: string;
  ctaButtonColor?: string;
  ctaStyle?: 'Button' | 'Link';
  // Single media mode
  mediaType?: boolean;
  image?: ContentfulImage;
  altText?: string;
  // Carousel mode (if slidesCollection has items, carousel is rendered instead of image)
  imageType?: 'Icons' | 'Images';
  slidesCollection?: { items: ColumnItem[] };
  // Shared layout
  desktopAlignment?: 'Left' | 'Right';
  mobileAlignment?: 'Top' | 'Bottom';
  split?: '60%' | '40%' | '100%';
}

export interface ColumnItem {
  text?: ContentfulRichText;
  textPosition?: string;
  mobileTextPosition?: string;
  mediaType?: boolean;
  image?: ContentfulImage;
  altText?: string;
  ctaText?: string;
  ctaUrl?: string;
  textColor?: string;
  backgroundColor?: string;
  ctaStyle?: 'Button' | 'Link';
  ctaButtonColor?: string;
  columnSpan?: '1' | '2';
}

export interface ColumnsSection {
  __typename: 'ColumnsSection';
  sys: ContentfulSys;
  title?: string;
  text?: ContentfulRichText;
  textColor?: string;
  textPosition?: string;
  cta?: string;
  ctaLink?: string;
  backgroundColor1?: string;
  backgroundColor2?: string;
  mobileAlignment?: string;
  rowWrap?: boolean;
  slideOnMobile?: boolean;
  columnsCollection: {
    items: ColumnItem[];
  };
}

export interface HeroSection {
  __typename: 'HeroSection';
  sys: ContentfulSys;
  mediaType?: boolean;
  image?: ContentfulImage;
  mobileImage?: ContentfulImage;
  altText?: string;
  text?: ContentfulRichText;
  verticalTextPosition?: 'Top' | 'Center' | 'Bottom';
  horizontalTextPosition?: 'Left' | 'Center' | 'Right' | 'Under Image';
  mobileTextPosition?: 'Left' | 'Center' | 'Right' | 'Under Image';
  textColor?: string;
  mobileTextColor?: string;
  cta?: string;
  ctaLink?: string;
  ctaButtonColor?: string;
  ctaStyle?: 'Button' | 'Link';
  noMarginBanner?: boolean;
}

export type ContentSection =
  | DuplexSection
  | ColumnsSection
  | HeroSection;
