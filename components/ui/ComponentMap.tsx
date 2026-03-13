'use client';
import type { ContentSection } from 'types/contentful';
import Columns from 'components/ui/Columns';
import Duplex from 'components/ui/Duplex';
import Hero from 'components/ui/Hero';

interface ComponentMapProps {
  section: ContentSection;
}

export default function ComponentMap({ section }: ComponentMapProps) {
  switch (section.__typename) {
    case 'DuplexSection':
      return <Duplex section={section} />;
    case 'HeroSection':
      return <Hero section={section} />;
    case 'ColumnsSection':
      return <Columns section={section} />;
    default:
      return null;
  }
}
