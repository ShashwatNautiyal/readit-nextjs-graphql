import React, { Fragment, useState } from "react";
import { IoIosPhotos } from "react-icons/io";
import { ImArrowUp, ImFire } from "react-icons/im";
import { FaClock } from "react-icons/fa";
import { RiHammerFill } from "react-icons/ri";
import { BsFillBarChartFill } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_ALL_SUBREDDIT } from "../graphql/queries";
import Link from "next/link";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useStore } from "../zustand";

const Sidebar = () => {
	const { data } = useQuery(GET_ALL_SUBREDDIT);

	const subreddits: Subreddit[] | undefined = data?.getSubredditList;

	return (
		<>
			<MobileMenu subreddits={subreddits} />
			<div className="lg:w-[300px] md:w-[200px] md:block hidden bg-gray-100/30 border-r h-screen sticky top-0">
				<Link href={"/"} passHref>
					<a className="flex items-center gap-2 px-4 py-6">
						<img className="w-12 h-w-12 rounded-full" src="/logo.png" alt="" />
						<h1 className="font-semibold text-xl">
							Read<span className="text-red-500">it</span>
						</h1>
					</a>
				</Link>
				<h2 className="text-sm font-medium text-gray-700 px-4 mt-5">READIT POSTS</h2>
				<div className="border-t border-gray-200 my-1 mx-4"></div>
				<div className="mt-4">
					{navigations.map((item) => (
						<Link key={item.name} href={`/${item.name.toLowerCase()}`}>
							<a className="flex items-center px-4 py-3 gap-3 hover:text-gray-900 hover:bg-gray-200 text-gray-500/80">
								<img
									src={`https://avatars.dicebear.com/api/bottts/${item.name}.svg
                                `}
									className="h-6 w-6"
								/>

								<span className="font-semibold text-sm w-full">{item.name}</span>
							</a>
						</Link>
					))}
				</div>

				<h2 className="text-sm font-medium text-gray-700 px-4 mt-5">TOP COMMUNITIES</h2>
				<div className="border-t border-gray-200 my-1 mx-4"></div>
				<div className="mt-4">
					{subreddits?.map((item) => (
						<Link passHref key={item.id} href={`/subreddit/${item.topic}`}>
							<a className="flex px-4 py-3 gap-3 hover:text-gray-900 hover:bg-gray-200 text-gray-500/80">
								<img
									src={`https://avatars.dicebear.com/api/initials/${item.topic}.svg`}
									className="h-6 w-6 rounded-full border"
								/>
								<span className="font-semibold text-sm w-full">r/{item.topic}</span>
							</a>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

const MobileMenu = ({ subreddits }: { subreddits: Subreddit[] | undefined }) => {
	const { menuOpen, setMenuOpen } = useStore();
	return (
		<Transition.Root show={menuOpen} as={Fragment}>
			<Dialog as="div" className="relative z-40 md:hidden" onClose={setMenuOpen}>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
				</Transition.Child>

				<div className="fixed inset-0 flex z-40">
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="absolute top-0 right-0 -mr-12 pt-2">
									<button
										type="button"
										className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
										onClick={() => setMenuOpen(false)}
									>
										<span className="sr-only">Close sidebar</span>
										<div className="h-full flex items-center md:hidden cursor-pointer px-4">
											<div className="flex flex-col">
												<div
													className={`${
														menuOpen
															? "rotate-45 translate-y-[7px]"
															: "rotate-0"
													} h-[3px] transition-transform transform duration-200 rounded-full w-6 bg-black`}
												></div>
												<div
													className={`${
														menuOpen ? "opacity-0" : "opacity-100"
													} h-[3px] transition-opacity duration-200 rounded-full w-6 bg-black my-1`}
												></div>
												<div
													className={`${
														menuOpen
															? "-rotate-45 -translate-y-[7px]"
															: "rotate-0"
													} h-[3px] transition-transform transform duration-200 rounded-full w-6 bg-black`}
												></div>
											</div>
										</div>
									</button>
								</div>
							</Transition.Child>
							<Link href={"/"} passHref>
								<a className="flex items-center gap-2 px-4 py-6">
									<img
										className="w-12 h-w-12 rounded-full"
										src="/logo.png"
										alt=""
									/>
									<h1 className="font-semibold text-xl">
										Read<span className="text-red-500">it</span>
									</h1>
								</a>
							</Link>
							<h2 className="text-sm font-medium text-gray-700 px-4 mt-5">
								READIT POSTS
							</h2>
							<div className="border-t border-gray-200 my-1 mx-4"></div>
							<div className="mt-4">
								{navigations.map((item) => (
									<Link key={item.name} href={`/${item.name.toLowerCase()}`}>
										<a className="flex items-center px-4 py-3 gap-3 hover:text-gray-900 hover:bg-gray-200 text-gray-500/80">
											<img
												src={`https://avatars.dicebear.com/api/bottts/${item.name}.svg`}
												className="h-6 w-6"
											/>

											<span className="font-semibold text-sm w-full">
												{item.name}
											</span>
										</a>
									</Link>
								))}
							</div>

							<h2 className="text-sm font-medium text-gray-700 px-4 mt-5">
								TOP COMMUNITIES
							</h2>
							<div className="border-t border-gray-200 my-1 mx-4"></div>
							<div className="mt-4">
								{subreddits?.map((item) => (
									<Link passHref key={item.id} href={`/subreddit/${item.topic}`}>
										<a className="flex px-4 py-3 gap-3 hover:text-gray-900 hover:bg-gray-200 text-gray-500/80">
											<img
												src={`https://avatars.dicebear.com/api/initials/${item.topic}.svg`}
												className="h-6 w-6 rounded-full border"
											/>
											<span className="font-semibold text-sm w-full">
												r/{item.topic}
											</span>
										</a>
									</Link>
								))}
							</div>
						</Dialog.Panel>
					</Transition.Child>
					<div className="flex-shrink-0 w-14" aria-hidden="true">
						{/* Dummy element to force sidebar to shrink to fit close icon */}
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

const navigations = [
	{
		name: "All",
	},
	{
		name: "Hot",
	},
	{
		name: "New",
	},
	{
		name: "Controversial",
	},
	{
		name: "Rising",
	},
	{
		name: "Top",
	},
];

export default Sidebar;
