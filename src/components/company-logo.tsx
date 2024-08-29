import { Cheqroom, DASMedia, Meditech } from '@assets/icons';
import type { FC } from 'react';

interface Props {
	company: string;
	className?: string;
}

const getIcon = (company: Props['company']) => {
	switch (company) {
		case 'Cheqroom':
			return <Cheqroom className="w-3.5 h-3.5" />;
		case 'DAS Media':
			return <DASMedia className="w-3.5 h-3.5" />;
		case 'Meditech':
			return <Meditech className="w-3.5 h-3.5" />;
	}
};

const CompanyLogo: FC<Props> = ({ company, className }) => {
	const classNames = className?.split(' ') ?? [];
	const classNameValue = ['timeline-icon', 'text-green-400', 'ring-green-400', ...classNames].join(' ');

	return <div className={classNameValue}>{getIcon(company)}</div>;
};

export default CompanyLogo;
