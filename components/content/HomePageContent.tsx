import ComponentMap from 'components/ui/ComponentMap';
import { fetchContentfulData } from 'lib/contentful';
import { placeholderHomeData } from 'lib/contentful/placeholder';
import type { ContentSection } from 'types/contentful';

interface HomePageData {
  homePageCollection: {
    items: Array<{
      title: string;
      metaTitle: string;
      sectionsCollection: {
        items: ContentSection[];
      };
    }>;
  };
}

const contentfulHomeQuery = `
{
  homePageCollection(limit: 1) {
    items {
      title
      metaTitle
      sectionsCollection(limit: 18) {
        items {
          ... on DuplexSection {
            title
            __typename
            text { json }
            textPosition
            textColor
            textBackgroundColor
            textBackgroundImage { url }
            textSectionIcon { url }
            cta
            ctaLink
            ctaButtonColor
            ctaStyle
            mediaType
            image { url }
            altText
            imageType
            desktopAlignment
            mobileAlignment
            split
            sys { id }
            slidesCollection(limit: 20) {
              items {
                text { json }
                textPosition
                image { url title }
                altText
                ctaText
                ctaUrl
              }
            }
          }
          ... on ColumnsSection {
            __typename
            sys { id }
            title
            text { json }
            textColor
            textPosition
            cta
            ctaLink
            backgroundColor1
            backgroundColor2
            rowWrap
            slideOnMobile
            columnsCollection(limit: 8) {
              items {
                text { json }
                textPosition
                mobileTextPosition
                mediaType
                image { url }
                ctaText
                ctaUrl
                textColor
                backgroundColor
                ctaStyle
                ctaButtonColor
                columnSpan
              }
            }
          }
          ... on HeroSection {
            __typename
            sys { id }
            mediaType
            image { url }
            mobileImage { url }
            altText
            text { json }
            verticalTextPosition
            horizontalTextPosition
            mobileTextPosition
            textColor
            mobileTextColor
            cta
            ctaLink
            ctaButtonColor
            ctaStyle
            noMarginBanner
          }
        }
      }
    }
  }
}
`;

export default async function HomePageContent() {
  const data = (!process.env.CONTENTFUL_SPACE || !process.env.CONTENTFUL_API)
    ? (placeholderHomeData as unknown as HomePageData)
    : (await fetchContentfulData(contentfulHomeQuery)) as unknown as HomePageData;

  if (!data?.homePageCollection?.items?.length) return null;

  const homePage = data.homePageCollection.items[0];
  const sections = homePage.sectionsCollection.items;

  return (
    <div className="w-full mx-auto max-w-screen-2xl h-full flex flex-col gap-8 md:gap-16 mb-12">
      {sections.length > 0 ? (
        sections.map((section) => (
          <div key={section.sys.id}>
            <ComponentMap section={section} />
          </div>
        ))
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
}
