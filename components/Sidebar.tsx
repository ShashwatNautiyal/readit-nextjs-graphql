import React, { Fragment, useState } from "react";
import { IoIosPhotos } from "react-icons/io";
import { ImArrowUp, ImFire } from "react-icons/im";
import { FaClock } from "react-icons/fa";
import { RiHammerFill } from "react-icons/ri";
import { BsFillBarChartFill } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_ALL_SUBREDDIT } from "../graphql/queries";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { HiOutlineMenu } from "react-icons/hi";

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
	return (
		<Menu as="div" className="flex items-center lg:hidden">
			<Menu.Button className="flex items-center fixed top-0 left-0 h-16 border-b bg-white z-10">
				{/* Mobile menu button */}
				<div className="h-full flex items-center border-r md:hidden cursor-pointer px-4">
					<div className="flex flex-col">
						<div
							className={`h-[3px] transition-transform transform duration-200 rounded-full w-6 bg-black`}
						></div>
						<div
							className={`h-[3px] transition-opacity duration-200 rounded-full w-6 bg-black my-1`}
						></div>
						<div
							className={`h-[3px] transition-transform transform duration-200 rounded-full w-6 bg-black`}
						></div>
					</div>
				</div>
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transform transition duration-[400ms]"
				enterFrom="opacity-0 -translate-x-full"
				enterTo="opacity-100 translate-x-0"
				leave="transform duration-[400ms] transition ease-in-out"
				leaveFrom="opacity-100 translate-x-0 "
				leaveTo="opacity-0 -translate-x-full"
			>
				<Menu.Items className="fixed h-screen w-[250px] z-10 shadow-xl overflow-auto left-0 top-0 flex flex-col bg-white">
					<Menu.Item>
						{({ active }) => (
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
						)}
					</Menu.Item>

					<h2 className="text-sm font-medium text-gray-700 px-4 mt-5">READIT POSTS</h2>
					<div className="border-t border-gray-200 my-1 mx-4"></div>
					<div className="mt-4">
						{navigations.map((item) => (
							<Menu.Item>
								{({ active }) => (
									<Link key={item.name} href={`/${item.name.toLowerCase()}`}>
										<a className="flex items-center px-4 py-3 gap-3 hover:text-gray-900 hover:bg-gray-200 text-gray-500/80">
											<img
												src={`https://avatars.dicebear.com/api/bottts/${item.name}.svg
                                `}
												className="h-6 w-6"
											/>

											<span className="font-semibold text-sm w-full">
												{item.name}
											</span>
										</a>
									</Link>
								)}
							</Menu.Item>
						))}
					</div>

					<h2 className="text-sm font-medium text-gray-700 px-4 mt-5">TOP COMMUNITIES</h2>
					<div className="border-t border-gray-200 my-1 mx-4"></div>
					<div className="mt-4">
						{subreddits?.map((item) => (
							<Menu.Item>
								{({ active }) => (
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
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
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
