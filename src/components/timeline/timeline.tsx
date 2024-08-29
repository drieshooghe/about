import CompanyLogo from '@components/company-logo';
import Paragraph from '@components/paragraph';
import type { experience } from '@content/index.json';
import type { FC } from 'react';
import styles from './timeline.module.css';

interface Props {
	variation?: 'default' | 'full';
	experience: typeof experience;
}

const Timeline: FC<Props> = ({ experience, variation = 'default' }) => {
	return (
		<ol className={`${styles.wrapper} ${variation === 'full' && styles.full}`}>
			{experience.items.map((item) => (
				<li key={item.company} className={`group ${styles.item}`}>
					<CompanyLogo company={item.company} className={styles.icon} />
					<div className={styles.description}>
						<Paragraph size="large" className={`py-0.5 ${styles.title} moving-color`}>
							{item.role}
						</Paragraph>
						<Paragraph variant="subdued" weight="light" size="small">
							@ {item.company} | {item.period}
						</Paragraph>
						{variation === 'full' && (
							<Paragraph weight="light" size="medium">
								{item.description}
							</Paragraph>
						)}
					</div>
				</li>
			))}
		</ol>
	);
};

export default Timeline;
