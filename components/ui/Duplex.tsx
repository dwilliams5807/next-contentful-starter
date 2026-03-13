'use client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { DuplexSection } from 'types/contentful';
import VideoBlock from 'components/ui/VideoBlock';
import { options } from 'components/ui/richTextOptions';

interface DuplexProps {
  section: DuplexSection;
}

function getContrastYIQ(hexcolor: string): 'black' | 'white' {
  const hex = hexcolor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

export default function Duplex({ section }: DuplexProps) {
  const slides = section.slidesCollection?.items ?? [];
  const hasSlides = slides.length > 0;

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !hasSlides) return;

    function handleScroll() {
      if (!el) return;
      setShowLeftArrow(el.scrollLeft > 0);
      setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }

    el.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [hasSlides]);

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const is100 = section.split === '100%';
  const is60 = section.split === '60%';
  const is40 = section.split === '40%';

  return (
    <div className="w-full">
      <div
        id={section.title?.replace(/\s+/g, '').toLowerCase()}
        className={clsx(
          'mx-auto flex flex-col text-center',
          is100 ? 'md:flex-col px-4 md:px-8' : 'md:flex-row'
        )}
      >
        {/* Text section */}
        <div
          style={{
            color: section.textColor || 'inherit',
            ...(section.textBackgroundImage
              ? {
                  backgroundImage: `url(${section.textBackgroundImage.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }
              : { backgroundColor: section.textBackgroundColor || 'transparent' }),
          }}
          className={clsx('w-full h-auto flex items-center', {
            'basis-full': is100,
            'md:basis-[40%]': is60,
            'md:basis-[60%]': is40,
            'md:basis-1/2': !is100 && !is60 && !is40,
          })}
        >
          <div className="mx-auto p-8 md:py-14 md:px-10 flex flex-col">
            {section.textSectionIcon && (
              <img
                className="w-28 md:w-40 h-auto mx-auto mb-4"
                src={section.textSectionIcon.url + '?fm=webp'}
                alt=""
              />
            )}
            {section.text && documentToReactComponents(section.text.json, options)}
            {section.cta && (
              <a
                href={section.ctaLink}
                style={{
                  backgroundColor:
                    section.ctaStyle === 'Button'
                      ? section.ctaButtonColor || 'white'
                      : 'transparent',
                  color: section.ctaButtonColor
                    ? getContrastYIQ(section.ctaButtonColor)
                    : section.textColor || 'inherit',
                }}
                className={clsx('mt-6 transition-all ease-in-out hover:opacity-75', {
                  'style-cta max-w-xs flex mx-auto': section.ctaStyle === 'Button',
                })}
              >
                {section.cta}
              </a>
            )}
          </div>
        </div>

        {/* Media section */}
        <div
          className={clsx('flex w-full overflow-hidden', {
            'md:basis-[60%]': is60,
            'md:basis-1/2': !is60 && !is100,
            'w-full': is100,
            'md:order-first': section.desktopAlignment === 'Left',
            'md:order-last': section.desktopAlignment !== 'Left',
            'order-first': section.mobileAlignment === 'Top',
            'order-last': section.mobileAlignment !== 'Top',
          })}
        >
          {hasSlides ? (
            <div className="relative w-full">
              <div ref={scrollRef} className="flex overflow-x-auto gap-2 p-0">
                {slides.map((slide, index) => (
                  <a key={index} href={slide.ctaUrl || undefined}>
                    <div
                      className={clsx(
                        'inline-grid gap-4 shrink-0',
                        section.imageType === 'Icons' ? 'w-32' : 'w-80 md:w-[350px]'
                      )}
                    >
                      <div
                        className={clsx(
                          'cursor-pointer',
                          section.imageType !== 'Icons' && 'aspect-[4/5] bg-gray-50'
                        )}
                      >
                        {slide.image && (
                          <img
                            className="object-contain w-full h-full"
                            src={slide.image.url + '?fm=webp'}
                            alt={slide.altText || slide.image.title || ''}
                          />
                        )}
                        {slide.text && documentToReactComponents(slide.text.json, options)}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              {showLeftArrow && (
                <button
                  onClick={() => scrollBy(-300)}
                  className="absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
                  aria-label="Scroll left"
                >
                  ‹
                </button>
              )}
              {showRightArrow && (
                <button
                  onClick={() => scrollBy(300)}
                  className="absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
                  aria-label="Scroll right"
                >
                  ›
                </button>
              )}
            </div>
          ) : section.image?.url ? (
            section.mediaType ? (
              <VideoBlock
                video={section.image.url}
                mobileVideo={null}
                alt={section.altText}
              />
            ) : (
              <img
                alt={section.altText}
                className="object-cover w-full h-full"
                src={section.image.url + '?fm=webp'}
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
