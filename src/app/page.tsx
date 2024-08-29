import indexContent from '@content/index.json';

import { At, Cheqroom, DASMedia, LinkedIn, Location, Meditech } from '@assets/icons';
import Avatar from '@components/avatar';
import CompanyLogo from '@components/company-logo';
import Paragraph from '@components/paragraph';
import SectionTitle from '@components/section-title';
import Timeline from '@components/timeline/timeline';
import React, { ImgHTMLAttributes } from 'react';
import { GitHub } from '../assets/icons/github';

export default function Home() {
	const { info, introduction, heading, expertise, skills, interests, experience, education, cta } = indexContent;
	return (
		<>
			<header className="flex flex-col items-center col-span-4 mt-10 text-green-600">
				<Avatar />
				<p className="pb-1 text-xl">{heading.pre}</p>
				<h1 className="mb-3 text-4xl font-medium">{heading.title}</h1>
				<p className="flex items-center gap-0.5">
					<Location className="w-4 h-4" /> <span className="text-sm font-light">{info.location}</span>
				</p>
			</header>
			<section className="grid grid-cols-1 py-4 my-4 border-y">
				<Paragraph weight="light" size="large" className="text-center">
					{introduction}
				</Paragraph>
			</section>
			<main>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					{/** Expertise */}
					<section className="order-1 sm:order-2 grid auto-rows-min gap-y-2">
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
					<section className="order-2 sm:order-1 grid auto-rows-min gap-y-2">
						<SectionTitle>{experience.title.short}</SectionTitle>
						<Timeline experience={experience} />
					</section>
					{/** Skills */}
					<section className="order-3 md:order-2 grid auto-rows-min gap-y-2">
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
					<section className="order-4 grid auto-rows-min gap-y-2">
						<SectionTitle>{education.title}</SectionTitle>
						<ul className="list-disc ml-7 marker:text-green-500">
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
					<section className="order-5 grid auto-rows-min gap-y-2">
						<SectionTitle>{interests.title}</SectionTitle>
						<ul>
							{interests.items.map((item) => (
								<li key={item} className="my-2">
									<Paragraph weight="extralight">{item}</Paragraph>
								</li>
							))}
						</ul>
					</section>
					{/** Full experience */}
					<section className="order-6 sm:col-span-2 grid auto-rows-min gap-y-4">
						<SectionTitle className="sm:text-center">{experience.title.full}</SectionTitle>
						<Timeline variation="full" experience={experience} />
					</section>
				</div>
				<div className="grid grid-cols-1 mt-12 ">
					<div className="p-4 text-white bg-green-400 rounded-t-xl">
						<SectionTitle>{cta.title}</SectionTitle>
					</div>
				</div>

				{/** Project section: event-sourcing, this website and CI/CD, etc. */}
				{/** Made with NextJS, Tailwind, blablabla */}
			</main>
		</>
	);
}
