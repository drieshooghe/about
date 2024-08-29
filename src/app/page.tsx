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
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-6 sm:gap-y-8">
					{/** Expertise */}
					<div className="order-1 sm:order-2 md:w-full sm:self-center sm:justify-self-end">
						<div className="px-6 py-4 w-fit sm:-mr-4 sm:-ml-0 sm:rounded-l-xl sm:rounded-r-none sm:text-right rounded-r-xl md:rounded-xl md:mr-0 print:text-green-600">
							<SectionTitle>{expertise.title}</SectionTitle>
							<ul className="font-extralight">
								{expertise.items.map((item) => (
									<li key={item}>
										<Paragraph>{item}</Paragraph>
									</li>
								))}
							</ul>
						</div>
					</div>
					{/** Highlighted experience */}
					<div className="order-2 justify-self-center sm:order-1 sm:col-span-1 sm:col-start-auto w-fit">
						<SectionTitle>{experience.title.short}</SectionTitle>
						<Timeline experience={experience} />
					</div>
					{/** Skills */}
					<div className="order-3 md:order-2 sm:col-span-1 sm:col-start-auto sm:self-center justify-self-end sm:justify-self-start">
						<div className="px-6 py-4 -mr-4 text-right text-white bg-green-400 w-fit rounded-l-xl sm:text-left sm:-ml-4 sm:-mr-0 sm:rounded-l-none sm:rounded-r-xl md:rounded-xl md:ml-0 print:text-green-600">
							<SectionTitle>{skills.title}</SectionTitle>
							<ul className="font-extralight">
								{skills.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</div>
					{/** Education & Certifications */}
					<div className="order-4 md:w-full sm:col-span-1 sm:col-start-auto w-fit justify-self-center">
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
					</div>
					{/** Interests */}
					<div className="order-5 md:w-full sm:col-span-1 sm:col-start-2 sm:self-center sm:justify-self-end">
						<div className="px-6 py-4 -ml-4 text-white bg-green-400 w-fit rounded-r-xl sm:-ml-0 sm:-mr-4 sm:rounded-r-none sm:rounded-l-xl md:rounded-xl md:mr-0 print:text-green-600">
							<SectionTitle>{interests.title}</SectionTitle>
							<ul className="font-extralight">
								{interests.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</div>
					{/** Full experience */}
					<div className="order-6 sm:col-span-2 sm:col-start-auto">
						<SectionTitle>{experience.title.full}</SectionTitle>
						<Timeline variation="full" experience={experience} />
					</div>
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
