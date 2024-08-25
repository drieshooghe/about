import indexContent from '@content/index.json';

import { At, Cheqroom, DASMedia, LinkedIn, Location, Meditech } from '@assets/icons';
import React, { ImgHTMLAttributes } from 'react';
import { GitHub } from '../assets/icons/github';

const ResponsiveAvatar = () => {
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
				className="w-40 p-2 mb-2 lg:w-56 image-border-white"
			/>
		</picture>
	);
};

const getCompanyIcon = (name: string) => {
	switch (name) {
		case 'Cheqroom':
			return <Cheqroom className="w-3.5 h-3.5" />;
		case 'DAS Media':
			return <DASMedia className="w-3.5 h-3.5" />;
		case 'Meditech':
			return <Meditech className="w-3.5 h-3.5" />;
	}
};

export default function Home() {
	const { info, introduction, heading, expertise, skills, interests, experience, education } = indexContent;
	return (
		<>
			<header className="flex flex-col items-center col-span-4 mt-10 text-green-600">
				<ResponsiveAvatar />
				<p className="pb-1 text-xl">{heading.pre}</p>
				<h1 className="mb-3 text-4xl font-medium">{heading.title}</h1>
				<p className="flex items-center gap-0.5">
					<Location className="w-4 h-4" /> <span className="text-sm font-light">{info.location}</span>
				</p>
			</header>
			<section className="grid grid-cols-4 py-4 mt-4 mb-8 border-y md:grid-cols-8">
				<p className="col-span-4 font-light text-center text-green-600 md:col-start-2 md:col-span-6">{introduction}</p>
			</section>
			<main>
				<div className="grid grid-cols-7 mb-4 sm:grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-6 sm:gap-y-8">
					{/** Expertise */}
					<div className="order-1 col-span-5 sm:order-2 sm:col-span-1 sm:col-start-auto md:w-full">
						<div className="px-6 py-4 -ml-4 text-white bg-green-400 sm:-mr-4 sm:-ml-0 sm:rounded-l-xl sm:rounded-r-none sm:text-right rounded-r-xl md:rounded-xl md:mr-0 print:text-green-600">
							<h3 className="mb-2 font-medium uppercase">{expertise.title}</h3>
							<ul className="font-extralight">
								{expertise.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</div>
					{/** Highlighted experience */}
					<div className="order-2 col-span-5 col-start-2 sm:order-1 sm:col-span-1 sm:col-start-auto">
						<h3 className="mb-2 font-medium text-green-600 uppercase">{experience.title.short}</h3>
						<ol className="timeline">
							{experience.items.map((item) => (
								<li key={item.company}>
									<div className="flex items-center justify-center text-green-400 bg-white rounded-full timeline-icon ring-2 ring-inset ring-green-400 w-7 h-7">
										{getCompanyIcon(item.company)}
									</div>
									<div className="timeline-description">
										<p className="leading-7 text-green-500">{item.role}</p>
										<p className="text-sm font-light text-green-200">
											@ {item.company} | <span className="text-nowrap">{item.period}</span>
										</p>
									</div>
								</li>
							))}
						</ol>
					</div>
					{/** Skills */}
					<div className="order-3 col-span-5 col-start-3 md:order-2 sm:col-span-1 sm:col-start-auto">
						<div className="px-6 py-4 -mr-4 text-right text-white bg-green-400 rounded-l-xl sm:text-left sm:-ml-4 sm:-mr-0 sm:rounded-l-none sm:rounded-r-xl md:rounded-xl md:ml-0 print:text-green-600">
							<h3 className="mb-2 font-medium uppercase">{skills.title}</h3>
							<ul className="font-extralight">
								{skills.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</div>
					{/** Education & Certifications */}
					<div className="order-4 col-span-5 col-start-2 md:w-full sm:col-span-1 sm:col-start-auto">
						<h3 className="mb-2 font-medium text-green-600 uppercase">{education.title}</h3>
						<ul className="list-disc ml-7 marker:text-green-500">
							{education.items.map((item) => (
								<li key={item.title} className="mb-2">
									<p className="text-green-500">{item.title}</p>
									<p className="text-sm font-light text-green-200">
										{item.type} @ {item.organization} | <span className="text-nowrap">{item.date}</span>
									</p>
								</li>
							))}
						</ul>
					</div>
					{/** Interests */}
					<div className="order-5 col-span-5 md:w-full sm:col-span-1 sm:col-start-2">
						<div className="px-6 py-4 -ml-4 text-white bg-green-400 rounded-r-xl sm:-ml-0 sm:-mr-4 sm:rounded-r-none sm:rounded-l-xl md:rounded-xl md:mr-0 print:text-green-600">
							<h3 className="font-medium uppercase">{interests.title}</h3>
							<ul className="font-extralight">
								{interests.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</div>
					{/** Full experience */}
					<div className="order-6 col-span-5 col-start-2 sm:col-span-2 sm:col-start-auto">
						<h3 className="mb-2 font-medium text-green-600 uppercase sm:text-center">{experience.title.full}</h3>
						<ol className="timeline timeline--full">
							{experience.items.map((item) => (
								<li key={item.company}>
									<div className="flex items-center justify-center text-green-400 bg-white rounded-full timeline-icon grow ring-2 ring-inset ring-green-400 content min-w-7 h-7">
										{getCompanyIcon(item.company)}
									</div>
									<div className="timeline-description">
										<p className="leading-7 text-green-500">{item.role}</p>
										<p className="text-sm font-light text-green-200">
											@ {item.company} | {item.period}
										</p>
										<p className="text-sm font-light text-green-500">{item.description}</p>
									</div>
								</li>
							))}
						</ol>
					</div>
				</div>
				<div className="grid grid-cols-7 mt-12 ">
					<div className="col-span-5 col-start-2 p-4 text-white bg-green-400 rounded-t-xl">
						<h3>Let's talk!</h3>
					</div>
				</div>
			</main>
		</>
	);
}
