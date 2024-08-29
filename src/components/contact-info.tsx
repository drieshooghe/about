import { At, GitHub, LinkedIn } from '@assets/icons';
import type { info } from '@content/index.json';
import Link from 'next/link';
import type { FC } from 'react';
import Paragraph from './paragraph';

interface Props {
	info: typeof info;
}

const ContactInfo: FC<Props> = ({ info }) => {
	return (
		<>
			<Link href={`mailto:${info.email}`}>
				<Paragraph
					weight="extralight"
					size="large"
					className="flex items-center gap-2 text-white print:text-green-500 print:text-sm"
				>
					<At />
					{info.email}
				</Paragraph>
			</Link>
			<Link href={`https://${info.linkedin}`} target="_blank">
				<Paragraph
					weight="extralight"
					size="large"
					className="flex items-center gap-2 text-white print:text-green-500 print:text-sm"
				>
					<LinkedIn />
					{info.linkedin}
				</Paragraph>
			</Link>
			<Link href={`https://${info.github}`} target="_blank">
				<Paragraph
					weight="extralight"
					size="large"
					className="flex items-center gap-2 text-white print:text-green-500 print:text-sm"
				>
					<GitHub />
					{info.github}
				</Paragraph>
			</Link>
		</>
	);
};

export default ContactInfo;
