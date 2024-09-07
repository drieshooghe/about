import type { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}

const SectionTitle: FC<Props> = ({ children, className }) => {
  const classNames = className?.split(' ') ?? [];
  const classNameValue = ['font-medium', 'leading-7', 'text-green-600', 'uppercase', ...classNames].join(' ');

  return <h2 className={classNameValue}>{children}</h2>;
};

export default SectionTitle;
