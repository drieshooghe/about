import globalContent from '@content/global.json';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const font = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = globalContent.meta;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${font.variable} font-sans mx-4 md:max-w-3xl lg:max-w-5xl md:mx-auto print:max-w-2xl`}>
				{children}
			</body>
		</html>
	);
}
