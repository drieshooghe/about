import {
	cta,
	education,
	experience,
	expertise,
	heading,
	info,
	interests,
	introduction,
	projects,
	skills,
} from '@content/index.json';

import { At, GitHub, LinkedIn, Location, Printer } from '@assets/icons';
import Avatar from '@components/avatar';
import ContactInfo from '@components/contact-info';
import Paragraph from '@components/paragraph';
import SectionTitle from '@components/section-title';
import Timeline from '@components/timeline/timeline';
import Link from 'next/link';
import React from 'react';

export default function Home() {
	return (
		<>
			<header className="flex flex-col print:flex-row  items-center mt-10 text-green-600 print:gap-4 relative">
				<button id="print-button" type="button" className="absolute right-0 top-0 print:hidden">
					<Printer className="text-green-300 transition-colors w-8 h-8 hover:text-green-400" />
				</button>
				<Avatar />
				<div className="flex flex-col grow items-center print:items-start">
					<p className="pb-1 text-xl print:text-lg">{heading.pre}</p>
					<h1 className="mb-3 text-4xl print:text-3xl font-medium">{heading.title}</h1>
					<p className="flex items-center gap-0.5">
						<Location className="w-4 h-4" /> <span className="text-sm font-light">{info.location}</span>
					</p>
				</div>
				<div className="hidden print:flex print:flex-col print:gap-2">
					<ContactInfo info={info} />
				</div>
			</header>
			<section className="grid grid-cols-1 py-4 mt-4 mb-8 border-y">
				<Paragraph weight="light" size="large" className="text-center">
					{introduction}
				</Paragraph>
			</section>
			<main>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 print:gap-6">
					{/** Expertise */}
					<section className="order-1 sm:order-2 grid auto-rows-min gap-y-2 break-inside-avoid print:order-3">
						<SectionTitle>{expertise.title}</SectionTitle>
						<ul>
							{expertise.items.map((item) => (
								<li key={item} className="my-2">
									<Paragraph weight="extralight">{item}</Paragraph>
								</li>
							))}
						</ul>
					</section>
					{/** Highlighted experience */}
					<section className="order-2 sm:order-1 grid auto-rows-min gap-y-2 break-inside-avoid print:hidden">
						<SectionTitle>{experience.title.short}</SectionTitle>
						<Timeline experience={experience} />
					</section>
					{/** Skills */}
					<section className="order-3 md:order-2 grid auto-rows-min gap-y-2 break-inside-avoid print:order-2">
						<SectionTitle>{skills.title}</SectionTitle>
						<ul>
							{skills.items.map((item) => (
								<li key={item} className="my-2">
									<Paragraph weight="extralight">{item}</Paragraph>
								</li>
							))}
						</ul>
					</section>
					{/** Education & Certifications */}
					<section className="order-4 grid auto-rows-min gap-y-2 break-inside-avoid print:order-1">
						<SectionTitle>{education.title}</SectionTitle>
						<ul className="list-disc ml-4 marker:text-green-500">
							{education.items.map((item) => (
								<li key={item.title} className="mb-2">
									<Paragraph size="large">{item.title}</Paragraph>
									<Paragraph size="small" weight="light" variant="subdued">
										{item.type} @ {item.organization} | <span className="text-nowrap">{item.date}</span>
									</Paragraph>
								</li>
							))}
						</ul>
					</section>
					{/** Interests */}
					<section className="order-5 grid auto-rows-min gap-y-2 break-inside-avoid print:order-4">
						<SectionTitle>{interests.title}</SectionTitle>
						<ul>
							{interests.items.map((item) => (
								<li key={item} className="my-2">
									<Paragraph weight="extralight">{item}</Paragraph>
								</li>
							))}
						</ul>
					</section>
					{/** Projects */}
					<section className="order-6 sm:col-span-2 grid auto-rows-min gap-y-4 break-inside-avoid">
						<SectionTitle className="sm:text-center">{projects.title}</SectionTitle>
						<div className="grid md:grid-cols-2 gap-8">
							{projects.items.map((item) => (
								<Link
									key={item.title}
									href={item.link}
									className="flex flex-col gap-2 mb-2 px-6 py-4 border rounded-xl transition hover:shadow-md"
									target="_blank"
								>
									<Paragraph size="large">{item.title}</Paragraph>
									<Paragraph weight="light">{item.description}</Paragraph>
									<Paragraph size="small" weight="light" variant="subdued">
										{projects.pre_technologies} {item.technologies.join(', ')}
									</Paragraph>
								</Link>
							))}
						</div>
					</section>
					{/** Full experience */}
					<section className="order-7 sm:col-span-2 grid auto-rows-min gap-y-4 print:mt-16 break-inside-avoid">
						<SectionTitle className="sm:text-center">{experience.title.full}</SectionTitle>
						<Timeline variation="full" experience={experience} />
					</section>
				</div>
				<div className="mt-12 flex justify-center break-inside-avoid print:hidden">
					<section className="gap-3 py-4 px-6 flex flex-col items-center w-full md:max-w-md bg-green-400 rounded-t-xl print:border print:rounded-xl">
						<SectionTitle className="text-white print:text-green-600">{cta.title}</SectionTitle>
						<div className="grid gap-3">
							<ContactInfo info={info} />
						</div>
					</section>
				</div>
			</main>
		</>
	);
}
