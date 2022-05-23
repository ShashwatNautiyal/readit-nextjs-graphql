import React, { Fragment, SetStateAction, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { BsFillCaretDownFill, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FiYoutube } from "react-icons/fi";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoMdCreate, IoMdKey } from "react-icons/io";
import Modal from "./reusable/Modal";
import InputBox from "./reusable/InputBox";
import ButtonPrimary from "./reusable/ButtonPrimary";
import ButtonSecondry from "./reusable/ButtonSecondry";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import client from "../apollo-client";
import { GET_ALL_POSTS, GET_ALL_SUBREDDIT, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import { supabase } from "../utils";
import Dropdown from "./reusable/Dropdown";

const Header = () => {
	const [signInModalOpen, setSignInModalOpen] = useState(false);
	const [creatPostModalOpen, setCreatPostModalOpen] = useState(false);

	const { data: session } = useSession();

	return (
		<div className="flex items-center justify-between border-b h-16 pl-[57px] w-full sticky top-0 bg-white">
			<SignInModal modalOpen={signInModalOpen} setModalOpen={setSignInModalOpen} />
			<CreatePostModal modalOpen={creatPostModalOpen} setModalOpen={setCreatPostModalOpen} />

			<div className="flex flex-1 items-center px-4">
				<BiSearch className="h-6 w-6 text-gray-400 flex-shrink-0" />
				<input
					placeholder="Search"
					type="text"
					className="px-2 focus:outline-none md:w-1/2 w-full"
				/>
			</div>
			<div className="flex gap-4 pr-4 items-center">
				<FaComment className="text-gray-400/80 h-6 w-6 md:block hidden" />
				<FaBell className="text-gray-400/80 h-6 w-6 md:block hidden" />

				{!session ? (
					<>
						<ButtonPrimary
							size="small"
							text="Sign in"
							onClick={() => setSignInModalOpen(true)}
						/>
						{/* <ButtonPrimary
							size="small"
							text="Sign up"
							onClick={() => setSignInModalOpen(true)}
						/> */}
					</>
				) : (
					<>
						<ButtonPrimary
							size="small"
							text="Create Post"
							onClick={() => setCreatPostModalOpen(true)}
						/>
						<Popover className="relative">
							{({ open }) => (
								<>
									<Popover.Button className="flex items-center gap-2">
										<img
											className="h-8 w-8 rounded-full border"
											src={`https://avatars.dicebear.com/api/open-peeps/${session?.user?.name}.svg`}
											alt=""
										/>
										<span className="text-gray-500 font-semibold text-sm md:block hidden">
											{session.user?.name}
										</span>
										<BsFillCaretDownFill
											className={`${
												open ? "rotate-180 transform" : "rotate-0"
											} text-gray-400 transition-transform`}
										/>
									</Popover.Button>

									<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="opacity-0 translate-y-1"
										enterTo="opacity-100 translate-y-0"
										leave="transition ease-in duration-150"
										leaveFrom="opacity-100 translate-y-0"
										leaveTo="opacity-0 translate-y-1"
									>
										<Popover.Panel className="absolute right-0 z-10 mt-3 max-w-sm lg:max-w-3xl">
											<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
												<div className="relative whitespace-nowrap flex gap-8 bg-white p-4 flex-col">
													{solutions.map((item) => (
														<button
															key={item.name}
															onClick={item.onClick}
															className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
														>
															<p className="text-sm text-black">
																{item.name}
															</p>
														</button>
													))}
												</div>
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
					</>
				)}
			</div>
		</div>
	);
};

const SignInModal = ({
	modalOpen,
	setModalOpen,
}: {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passVisible, setPassVisible] = useState(false);

	return (
		<Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
			<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-green-100 rounded-full">
						<IoMdKey className="h-6 w-6 text-green-500" />
					</div>
					<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
						Sign in
					</Dialog.Title>
				</div>
				<div className="mt-2">
					<p className="text-sm text-gray-500">
						Become a member - you'll enjoy the feed and the Reddits of others.
					</p>
				</div>
				<div className="w-full border-t border-gray-300 my-4" />
				<div className="flex flex-col gap-4">
					<InputBox
						input={email}
						setInput={setEmail}
						label="Email"
						name="email"
						placeholder="Enter your email address"
						type={"text"}
					/>
					<InputBox
						input={password}
						setInput={setPassword}
						label="Password"
						name="password"
						placeholder="Enter your password"
						type={passVisible ? "text" : "password"}
						Icon={passVisible ? BsFillEyeSlashFill : BsFillEyeFill}
						onIconClick={() => setPassVisible((prev) => !prev)}
					/>
					<div className="flex items-center justify-between">
						<div className="flex items-center ">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 cursor-pointer accent-red-500 focus:accent-red-500"
							/>
							<label
								htmlFor="remember-me"
								className="block cursor-pointer pl-2 text-sm text-gray-500 font-medium"
							>
								Remember me
							</label>
						</div>

						<a
							href="#"
							className="font-medium text-sm text-indigo-600 hover:text-indigo-500"
						>
							Forgot your password?
						</a>
					</div>
					<ButtonPrimary text="Sign in" size="large" />

					<div>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-4 grid grid-cols-3 gap-3">
							<div>
								<button
									onClick={() => signIn("google")}
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium  hover:bg-gray-50"
								>
									<FcGoogle className="h-5 w-5" />
								</button>
							</div>

							<div>
								<button
									onClick={() => signIn("github")}
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-800 hover:bg-gray-50"
								>
									<FaGithub className="h-5 w-5" />
								</button>
							</div>

							<div>
								<button
									onClick={() => signIn("facebook")}
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-blue-500 hover:bg-gray-50"
								>
									<FaFacebook className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>
					<div className="w-full border-t border-gray-300 my-2" />
					<div className="text-sm text-center text-gray-500 font-medium">
						Don't have an account?
						<a
							href="#"
							className="ml-2 font-medium text-sm text-indigo-600 hover:text-indigo-500"
						>
							Sign up
						</a>
					</div>
				</div>
			</Dialog.Panel>
		</Modal>
	);
};

const CreatePostModal = ({
	modalOpen,
	setModalOpen,
}: {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
	const [title, setTitle] = useState("");
	const [media, setMedia] = useState<File | null>(null);
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [isDropZone, setIsDropZone] = useState(false);
	const [selectedSubreddit, setSelectedSubreddit] = useState<{
		value: string;
		imgUrl?: string;
	}>();
	const [selectedTopic, setSelectedTopic] = useState<{ value: string; imgUrl?: string }>();

	const { data } = useQuery(GET_ALL_SUBREDDIT);

	const subreddits: Subreddit[] | undefined = data?.getSubredditList;

	const { data: session } = useSession();

	const [addPost] = useMutation(ADD_POST, {
		refetchQueries: [GET_ALL_POSTS, "getPostList"],
	});
	const [addSubreddit] = useMutation(ADD_SUBREDDIT);

	const handleCreatePost = async () => {
		try {
			if (!title || !selectedSubreddit || !media || !description) {
				setError("All fields are required!");
				return;
			}

			console.log(title, selectedSubreddit, media, description, selectedTopic);

			setIsLoading(true);
			// Upload image to supabase storage
			const publicURL = await supabase.storage
				.from("reddit-2.0")
				.upload(`post-images/${Math.random()}.${media.name.split(".").pop()}`, media)
				.then(({ data }) => {
					const { publicURL } = supabase.storage
						.from("reddit-2.0")
						.getPublicUrl(`post-images/${data?.Key.split("/").pop()}`);
					return publicURL;
				})
				.catch((err) => {
					throw err;
				});

			// Check for existing subreddit in DB
			const {
				data: { getSubredditListByTopic },
			} = await client.query({
				query: GET_SUBREDDIT_BY_TOPIC,
				variables: {
					topic: selectedSubreddit.value.toLowerCase(),
				},
			});

			// Create new subreddit if it does not exists
			if (!(getSubredditListByTopic.length > 0)) {
				const {
					data: { insertSubreddit },
				} = await addSubreddit({
					variables: {
						topic: selectedSubreddit.value.toLowerCase(),
					},
				});

				const {
					data: { insertPost },
				} = await addPost({
					variables: {
						description: description,
						media: publicURL ?? "",
						subreddit_id: insertSubreddit.id,
						title: title,
						username: session?.user?.name,
						topic: selectedTopic?.value.toLowerCase(),
					},
				});
			} else {
				const {
					data: { insertPost },
				} = await addPost({
					variables: {
						description: description,
						media: publicURL ?? "",
						subreddit_id: getSubredditListByTopic[0].id,
						title: title,
						username: session?.user?.name,
						topic: selectedTopic?.value.toLowerCase(),
					},
				});
			}
			setModalOpen(false);
		} catch (error) {
			setError(error as string);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setIsDropZone(true);
		}
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		setIsDropZone(false);
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.dataTransfer.dropEffect = "copy";
		setIsDropZone(true);
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			setMedia(e.dataTransfer.files[0]);
			e.dataTransfer.clearData();
			setIsDropZone(false);
		}

		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
			<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-green-100 rounded-full">
						<IoMdCreate className="h-6 w-6 text-green-500" />
					</div>
					<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
						Create Post
					</Dialog.Title>
				</div>
				<div className="mt-2">
					<p className="text-sm text-gray-500">
						Add your thoughts, links, images or photos.
					</p>
				</div>
				<div className="w-full border-t border-gray-300 my-4" />

				<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
					<div className="flex flex-col col-span-1 gap-4">
						<InputBox
							input={title}
							setInput={setTitle}
							label="Title"
							name="title"
							placeholder="Add title"
							type={"text"}
						/>

						<div className="flex gap-4">
							<Dropdown
								isCustomValue
								selected={selectedSubreddit}
								setSelected={setSelectedSubreddit}
								label="Subreddit"
								options={
									subreddits?.map((item) => ({
										value: item.topic,
										imgUrl: `https://avatars.dicebear.com/api/initials/${item.topic}.svg`,
									})) ?? []
								}
							/>
							<Dropdown
								selected={selectedTopic}
								setSelected={setSelectedTopic}
								label="Topic"
								options={
									navigations?.map((item) => ({
										value: item.name,
										imgUrl: `https://avatars.dicebear.com/api/bottts/${item.name}.svg`,
									})) ?? []
								}
							/>
						</div>
						<InputBox
							textArea
							input={description}
							setInput={setDescription}
							label="Description"
							name="description"
							placeholder="Add description"
							type={"text"}
						/>
						{error && <p className="text-sm text-red-700 -my-2">*{error}</p>}
					</div>

					<div className="col-span-1 flex flex-col">
						<p className="text-sm font-medium text-gray-700">Attach file</p>
						<div
							onDrop={(e) => handleDrop(e)}
							onDragOver={(e) => handleDragOver(e)}
							onDragEnter={(e) => handleDragEnter(e)}
							onDragLeave={(e) => handleDragLeave(e)}
							className="bg-white rounded-md flex-1 shadow-sm border mt-1 relative"
						>
							<>
								{isDropZone && (
									<div className="absolute top-0 left-0 right-0 bottom-0 bg-white/40 rounded-md border-dashed border-4 scale-[1.01] z-10"></div>
								)}
								{media ? (
									<div className="relative w-full rounded-md md:max-h-full">
										<img
											className="object-cover h-full w-full max-h-[250px] rounded-md"
											src={URL.createObjectURL(media)}
											alt=""
										/>
										<label
											className="absolute bottom-2 flex justify-center w-full"
											htmlFor="post_image"
										>
											<p className="inline-flex rounded-md items-center flex-shrink-0 whitespace-nowrap justify-center border border-transparent font-medium shadow-sm text-red-700 bg-red-100 text-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 py-1.5 px-2 min-w-min w-24 cursor-pointer">
												Change
											</p>
										</label>
										<input
											type="file"
											onChange={(e) =>
												setMedia(e.target.files && e.target.files[0])
											}
											className="hidden"
											id="post_image"
										/>
									</div>
								) : (
									<div className="flex flex-col items-center gap-2 h-full justify-center md:py-0 py-4">
										<div className="flex text-gray-400">
											<HiOutlinePhotograph className="h-10 w-10" />
											<FiYoutube className="h-10 w-10 mt-5 -ml-5" />
										</div>
										<p className="text-sm text-gray-500 font-medium">
											Drag and Drop
										</p>

										<div>
											<label htmlFor="post_image">
												<p className="inline-flex rounded-md items-center flex-shrink-0 whitespace-nowrap justify-center border border-transparent font-medium shadow-sm text-red-700 bg-red-100 text-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 py-1.5 px-2 min-w-min w-24 cursor-pointer">
													Choose file
												</p>
											</label>
											<input
												type="file"
												accept="image/*"
												onChange={(e) =>
													setMedia(e.target.files && e.target.files[0])
												}
												className="hidden"
												id="post_image"
											/>
										</div>
									</div>
								)}
							</>
						</div>
					</div>
				</div>
				<div className="w-full border-t border-gray-300 my-6" />
				<div className="flex itms-ceenter justify-center gap-4">
					<ButtonSecondry
						onClick={() => setModalOpen(false)}
						text="Cancel"
						size="small"
						disabled={isLoading}
					/>
					<ButtonPrimary
						isLoading={isLoading}
						onClick={() => handleCreatePost()}
						text="Post"
						size="small"
					/>
				</div>
			</Dialog.Panel>
		</Modal>
	);
};

const solutions = [
	{
		name: "Sign out",
		onClick: () => signOut(),
	},
];

const navigations = [
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

export default Header;
