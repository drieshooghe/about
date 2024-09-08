import avatarAvifSmx1 from '@image/avatar-162@1x.avif';
import avatarPngSmx1 from '@image/avatar-162@1x.png';
import avatarWebpSmx1 from '@image/avatar-162@1x.webp';
import avatarAvifSmx2 from '@image/avatar-162@2x.avif';
import avatarPngSmx2 from '@image/avatar-162@2x.png';
import avatarWebpSmx2 from '@image/avatar-162@2x.webp';
import avatarAvifLgx1 from '@image/avatar-224@1x.avif';
import avatarPngLgx1 from '@image/avatar-224@1x.png';
import avatarWebpLgx1 from '@image/avatar-224@1x.webp';
import avatarAvifLgx2 from '@image/avatar-224@2x.avif';
import avatarPngLgx2 from '@image/avatar-224@2x.png';
import avatarWebpLgx2 from '@image/avatar-224@2x.webp';
import type { FC } from 'react';

const Avatar: FC = () => {
  return (
    <picture>
      {/* AVIF source for screens larger than 1024px */}
      <source
        type="image/avif"
        media="(min-width: 1024px)"
        srcSet={`${avatarAvifLgx1.src} 1x, ${avatarAvifLgx2.src} 2x`}
      />
      {/* WebP source for screens larger than 1024px */}
      <source type="image/webp" media="(min-width: 1024px)" srcSet={`${avatarWebpLgx1} 1x, ${avatarWebpLgx2} 2x`} />
      {/* Fallback to PNG for screens larger than 1024px */}
      <source media="(min-width: 1024px)" srcSet={`${avatarPngLgx1.src} 1x, ${avatarPngLgx2.src} 2x`} />

      {/* AVIF source for screens smaller than 1024px */}
      <source
        type="image/avif"
        media="(max-width: 1023px)"
        srcSet={`${avatarAvifSmx1.src} 1x, ${avatarAvifSmx2.src} 2x`}
      />
      {/* WebP source for screens smaller than 1024px */}
      <source type="image/webp" media="(max-width: 1023px)" srcSet={`${avatarWebpSmx1} 1x, ${avatarWebpSmx2} 2x`} />
      {/* Fallback to PNG for screens smaller than 1024px */}
      <source media="(max-width: 1023px)" srcSet={`${avatarPngSmx1} 1x, ${avatarPngSmx2} 2x`} />

      {/* Fallback img element for browsers that do not support <picture> */}
      <img
        src={avatarPngLgx1.src}
        srcSet={`${avatarPngLgx2.src} 2x`}
        alt="Avatar"
        className="w-40 p-2 mb-2 lg:w-56 image-border-white print:w-32"
      />
    </picture>
  );
};

export default Avatar;
