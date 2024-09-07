import type { FC } from 'react';

const Avatar: FC = () => {
  return (
    <picture>
      {/* AVIF source for screens larger than 1024px */}
      <source
        type="image/avif"
        media="(min-width: 1024px)"
        srcSet="/image/avatar-224@1x.avif 1x, /image/avatar-224@2x.avif 2x"
      />
      {/* WebP source for screens larger than 1024px */}
      <source
        type="image/webp"
        media="(min-width: 1024px)"
        srcSet="/image/avatar-224@1x.webp 1x, /image/avatar-224@2x.webp 2x"
      />
      {/* Fallback to PNG for screens larger than 1024px */}
      <source media="(min-width: 1024px)" srcSet="/image/avatar-224@1x.png 1x, /image/avatar-224@2x.png 2x" />

      {/* AVIF source for screens smaller than 1024px */}
      <source
        type="image/avif"
        media="(max-width: 1023px)"
        srcSet="/image/avatar-162@1x.avif 1x, /image/avatar-162@2x.avif 2x"
      />
      {/* WebP source for screens smaller than 1024px */}
      <source
        type="image/webp"
        media="(max-width: 1023px)"
        srcSet="/image/avatar-162@1x.webp 1x, /image/avatar-162@2x.webp 2x"
      />
      {/* Fallback to PNG for screens smaller than 1024px */}
      <source media="(max-width: 1023px)" srcSet="/image/avatar-162@1x.png 1x, /image/avatar-162@2x.png 2x" />

      {/* Fallback img element for browsers that do not support <picture> */}
      <img
        src="/image/avatar-224@1x.png"
        srcSet="/image/avatar-224@2x.png 2x"
        alt="Avatar"
        className="w-40 p-2 mb-2 lg:w-56 image-border-white print:w-32"
      />
    </picture>
  );
};

export default Avatar;
