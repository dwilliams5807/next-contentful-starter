'use client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { CSSProperties } from 'react';
import clsx from 'clsx';
import type { ColumnsSection, ColumnItem } from 'types/contentful';
import VideoBlock from 'components/ui/VideoBlock';
import { options } from 'components/ui/richTextOptions';

interface ColumnsProps {
  section: ColumnsSection;
}

function getContrastYIQ(hexcolor: string): 'black' | 'white' {
  const hex = hexcolor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

function getTextAlignClass(position?: string): string {
  switch (position) {
    case 'Left': return 'text-left';
    case 'Right': return 'text-right';
    case 'Center': return 'text-center';
    default: return '';
  }
}

function getSelfAlignClass(position?: string): string {
  switch (position) {
    case 'Left': return 'self-start';
    case 'Right': return 'self-end';
    default: return 'self-center';
  }
}

export default function Columns({ section }: ColumnsProps) {
  const numItems = section.columnsCollection.items.reduce(
    (total, item) => total + (item.columnSpan === '2' ? 2 : 1),
    0
  );

  let gridClass: string;
  switch (numItems) {
    case 2:
      gridClass = section.slideOnMobile
        ? 'md:grid-cols-2 px-6 lg:px-12 gap-4'
        : 'grid-cols-2 lg:p-8 gap-4';
      break;
    case 3:
      gridClass = 'grid-cols-1 lg:grid-cols-3 gap-6';
      break;
    case 4:
      if (!section.rowWrap) {
        gridClass = section.columnsCollection.items[0]?.image
          ? section.slideOnMobile
            ? 'lg:grid-cols-4 gap-6'
            : 'grid-cols-2 lg:grid-cols-4 gap-6'
          : 'grid-cols-2 lg:grid-cols-4 gap-4';
      } else {
        gridClass = section.slideOnMobile
          ? 'md:grid-cols-2 px-6 lg:px-12 gap-4'
          : 'grid-cols-2 md:grid-cols-2 px-6 lg:px-12 gap-4';
      }
      break;
    case 5:
    case 6:
      gridClass = !section.rowWrap
        ? 'grid-cols-2 lg:grid-cols-5 gap-6'
        : 'grid-cols-1 lg:grid-cols-3 gap-6';
      break;
    case 7:
      gridClass = 'grid-cols-2 lg:grid-cols-4 justify-center gap-6';
      break;
    case 8:
      gridClass = !section.rowWrap
        ? 'grid-cols-2 md:grid-cols-4 justify-center gap-6'
        : 'grid-cols-4 md:grid-cols-8 md:p-8 justify-center gap-4';
      break;
    default:
      gridClass = 'grid-cols-3 gap-6';
  }

  const sectionStyle: CSSProperties = {
    color: section.textColor || 'inherit',
    ...(section.backgroundColor1 ? { backgroundColor: section.backgroundColor1 } : {}),
  };

  function renderColumnCta(item: ColumnItem) {
    if (!item.ctaText) return null;
    const isButton = item.ctaStyle === 'Button';
    const bgColor = item.ctaButtonColor || undefined;
    const textColor = bgColor ? getContrastYIQ(bgColor) : item.textColor || 'inherit';

    return (
      <p
        style={{ backgroundColor: isButton ? bgColor : undefined, color: textColor }}
        className={clsx(
          'transition-all ease-in-out',
          getSelfAlignClass(item.textPosition),
          isButton
            ? clsx(
                'flex justify-center items-center border-2 border-black px-4 py-3',
                item.image ? 'max-w-sm mt-6 mx-auto' : 'w-full mt-0',
                'hover:opacity-75'
              )
            : 'mt-6 hover:opacity-75'
        )}
      >
        <span>{item.ctaText}</span>
      </p>
    );
  }

  return (
    <div className="w-full">
      <div
        style={sectionStyle}
        className={clsx(
          'relative mx-auto flex flex-col text-center px-6 md:px-8',
          section.backgroundColor1 && 'py-8 md:py-12'
        )}
      >
        {section.text && (
          <div className="mx-auto mb-8 flex flex-col text-center">
            {documentToReactComponents(section.text.json, options)}
          </div>
        )}

        <div className={`grid ${gridClass}`}>
          {section.columnsCollection.items.map((item, index) => (
            <div
              key={index}
              className={clsx('w-full', item.columnSpan === '2' && 'col-span-2')}
            >
              <a href={item.ctaUrl || undefined} className="w-full h-full block">
                <div
                  className={clsx(
                    'relative',
                    section.columnsCollection.items.length === 4 && 'h-full',
                    !item.image && 'flex justify-center items-center'
                  )}
                  style={{
                    backgroundColor: item.image ? undefined : item.backgroundColor || undefined,
                  }}
                >
                  {item.image && (
                    item.mediaType ? (
                      <div className="w-full h-auto">
                        <VideoBlock video={item.image.url} mobileVideo={null} alt={undefined} />
                      </div>
                    ) : (
                      <img
                        className="w-auto h-auto mx-auto"
                        src={item.image.url + '?fm=webp'}
                        alt={item.altText || ''}
                      />
                    )
                  )}

                  <div
                    className={clsx(
                      'flex flex-col w-full',
                      (item.mobileTextPosition ?? item.textPosition) === 'Overlay'
                        ? 'absolute inset-0 items-center justify-end pb-4'
                        : 'mt-3 relative',
                      item.textPosition === 'Overlay'
                        ? 'md:absolute md:inset-0 md:items-center md:justify-end md:pb-8'
                        : 'md:mt-3 md:relative'
                    )}
                  >
                    {item.text && (
                      <div className={clsx('w-full', getTextAlignClass(item.textPosition))}>
                        {documentToReactComponents(item.text.json, options)}
                      </div>
                    )}
                    {renderColumnCta(item)}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {section.cta && section.ctaLink && (
          <div className="mt-8 flex w-full flex-col">
            <a
              href={section.ctaLink}
              target={
                section.ctaLink.startsWith('https') &&
                typeof window !== 'undefined' &&
                !section.ctaLink.includes(window.location.hostname)
                  ? '_blank'
                  : '_self'
              }
              rel={
                section.ctaLink.startsWith('https') &&
                typeof window !== 'undefined' &&
                !section.ctaLink.includes(window.location.hostname)
                  ? 'noopener noreferrer'
                  : undefined
              }
              className="mx-auto mt-3 text-center transition-all ease-in-out hover:opacity-75"
            >
              {section.cta}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
