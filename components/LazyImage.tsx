import { useEffect, useRef } from 'react';

export function LazyImage({
  src,
  alt,
  className,
  ...props
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = src;
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '100px 0px',
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [src]);

  return <img ref={imgRef} alt={alt} className={className} {...props} />;
}
