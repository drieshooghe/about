import type { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
	variant?: 'subdued' | 'normal';
	weight?: 'light' | 'normal' | 'bold';
	size?: 'small' | 'medium' | 'large';
	className?: string;
}

const getVariantValue = (variant: Props['variant']) => {
	switch (variant) {
		case 'subdued':
			return 'text-green-200';
		case 'normal':
			return 'text-green-500';
	}
};

const getWeightValue = (weight: Props['weight']) => {
	switch (weight) {
		case 'light':
			return 'font-light';
		case 'normal':
			return 'font-normal';
		case 'bold':
			return 'font-bold';
	}
};

const getSizeValue = (size: Props['size']) => {
	switch (size) {
		case 'small':
			return 'text-xs';
		case 'medium':
			return 'text-sm';
		case 'large':
			return 'text-base';
	}
};

const Paragraph: FC<Props> = ({ children, variant = 'normal', weight = 'normal', size = 'medium', className }) => {
	const classNames = className?.split(' ') ?? [];
	const classNameValue = [getVariantValue(variant), getSizeValue(size), getWeightValue(weight), ...classNames].join(
		' ',
	);

	return <p className={classNameValue}>{children}</p>;
};

export default Paragraph;
