'use client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import clsx from 'clsx';
import type { HeroSection } from 'types/contentful';
import VideoBlock from 'components/ui/VideoBlock';
import { options } from 'components/ui/richTextOptions';

interface HeroProps {
  section: HeroSection;
}

function getContrastYIQ(hexcolor: string): 'black' | 'white' {
  const hex = hexcolor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

function getJustifyClass(position?: string): string {
  switch (position) {
    case 'Left': return 'justify-start';
    case 'Right': return 'justify-end';
    default: return 'justify-center';
  }
}

function getAlignClass(position?: string): string {
  switch (position) {
    case 'Top': return 'items-start';
    case 'Center': return 'items-center';
    default: return 'items-end';
  }
}

function getTextAlignClass(position?: string): string {
  switch (position) {
    case 'Left': return 'text-left';
    case 'Right': return 'text-right';
    default: return 'text-center';
  }
}

function getMdJustifyClass(position?: string): string {
  switch (position) {
    case 'Left': return 'md:justify-start';
    case 'Right': return 'md:justify-end';
    default: return 'md:justify-center';
  }
}

function getMdTextAlignClass(position?: string): string {
  switch (position) {
    case 'Left': return 'md:text-left';
    case 'Right': return 'md:text-right';
    default: return 'md:text-center';
  }
}

export default function Hero({ section }: HeroProps) {
  const isUnderImage = section.horizontalTextPosition === 'Under Image' || !section.image;
  const isMobileUnder = section.mobileTextPosition === 'Under Image';

  return (
    <div className={section.noMarginBanner ? 'w-full -mb-6 md:-mb-12' : 'w-full'}>
      <a href={section.ctaLink || undefined}>
        <div className="relative mx-auto flex flex-col text-center">
          {/* Media */}
          {section.mediaType ? (
            <VideoBlock
              video={section.image!.url}
              mobileVideo={section.mobileImage?.url ?? null}
              alt={section.altText}
            />
          ) : (
            <>
              {section.image && (
                <img
                  src={section.image.url + '?fm=webp'}
                  alt={section.altText}
                  className={clsx(
                    'w-full object-cover',
                    section.mobileImage ? 'hidden md:block' : 'block'
                  )}
                />
              )}
              {section.mobileImage && (
                <img
                  src={section.mobileImage.url + '?fm=webp'}
                  alt={section.altText}
                  className="w-full object-cover block md:hidden min-h-[650px] sm:min-h-[500px]"
                />
              )}
            </>
          )}

          {/* Overlay content */}
          <div
            className={clsx(
              'w-full h-auto flex top-0 left-0 right-0 bottom-0',
              isMobileUnder || !section.image ? 'relative' : 'absolute',
              isUnderImage ? 'md:relative' : 'md:absolute',
              getAlignClass(section.verticalTextPosition),
              getJustifyClass(section.mobileTextPosition),
              getTextAlignClass(section.mobileTextPosition),
              getMdJustifyClass(section.horizontalTextPosition),
              getMdTextAlignClass(section.horizontalTextPosition),
            )}
          >
            <div
              className={clsx('flex flex-col p-6 md:p-12', isUnderImage && 'pb-2 md:pb-8')}
              style={{ color: section.textColor || 'inherit' }}
            >
              {section.text && documentToReactComponents(section.text.json, options)}

              {section.cta && (
                <p
                  className={clsx(
                    'mt-6 transition-all ease-in-out hover:opacity-75',
                    section.ctaStyle === 'Button'
                      ? clsx(
                          'relative w-full items-center font-reg justify-center p-4 tracking-wide max-w-xs flex',
                          section.mobileTextPosition === 'Left' || section.horizontalTextPosition === 'Left'
                            ? 'mr-auto'
                            : 'mx-auto'
                        )
                      : undefined
                  )}
                  style={{
                    backgroundColor:
                      section.ctaStyle === 'Button'
                        ? section.ctaButtonColor || 'white'
                        : 'transparent',
                    color: section.ctaButtonColor
                      ? getContrastYIQ(section.ctaButtonColor)
                      : undefined,
                  }}
                >
                  {section.cta}
                </p>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
