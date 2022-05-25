import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowDropDown, MdArrowDropUp, MdOutlineKeyboardBackspace } from "react-icons/md";
import { ADD_COMMENT, ADD_VOTE } from "../graphql/mutations";
import { GET_POST_BY_POST_ID } from "../graphql/queries";
import { getAgoDate } from "../utils";
import Loading from "./layout/Loading";
import ButtonPrimary from "./reusable/ButtonPrimary";
import ButtonSecondry from "./reusable/ButtonSecondry";
import InputBox from "./reusable/InputBox";

const PostContainer = ({ id }: { id: string | string[] | undefined }) => {
	const [comment, setComment] = useState("");
	const [commentOpen, setCommentOpen] = useState(false);
	const { data: session } = useSession();

	const router = useRouter();

	const [addComment] = useMutation(ADD_COMMENT, {
		refetchQueries: [GET_POST_BY_POST_ID, "getPostByPostId"],
	});

	const [addVote] = useMutation(ADD_VOTE, {
		refetchQueries: [GET_POST_BY_POST_ID, "getPostByPostId"],
	});

	const { data, loading } = useQuery(GET_POST_BY_POST_ID, {
		variables: {
			id: id,
		},
	});
	const post: Post | undefined = data?.getPostByPostId;

	const handleComment = async () => {
		if (!comment) return;

		await addComment({
			variables: {
				post_id: id,
				username: session?.user?.name,
				text: comment,
			},
		});

		setCommentOpen(false);
		setComment("");
	};

	const isUpvoted = post?.votes.find((item) => item.username === session?.user?.name)?.upvote;

	const handleVote = async (isUpvote: boolean) => {
		if (!session || isUpvoted) return;

		await addVote({
			variables: {
				post_id: post?.id,
				username: session?.user?.name,
				upvote: isUpvote,
			},
		});
	};

	const usersLiked = post?.votes.filter((post) => post.upvote === true);

	return (
		<Loading isLoading={loading}>
			<div>
				<div className="flex lg:gap-6 gap-3 border-b">
					<div className="sm:flex hidden lg:px-7 px-3 py-3 items-center relative lg:gap-4 gap-2">
						<MdOutlineKeyboardBackspace
							onClick={() => router.back()}
							className="w-8 h-8 text-gray-900 cursor-pointer"
						/>
						<div className="flex flex-col items-center">
							<MdArrowDropUp
								onClick={() => handleVote(true)}
								className={`${
									isUpvoted === true
										? "text-green-600"
										: "text-gray-300 hover:text-gray-400"
								} h-10 w-10 cursor-pointer`}
							/>
							<h2 className="text-gray-500 -my-2">
								{post?.votes.reduce((acc, curr) => {
									if (curr.upvote) {
										acc = acc + 1;
									} else acc = acc - 1;
									return acc;
								}, 0)}
							</h2>
							<MdArrowDropDown
								onClick={() => handleVote(false)}
								className={`${
									isUpvoted === false
										? "text-red-600"
										: "text-gray-300 hover:text-gray-400"
								} h-10 w-10 cursor-pointer`}
							/>
							<div className="border-gray-200 border-r absolute right-0 top-9 bottom-0"></div>
						</div>
					</div>
					<div className="flex sm:flex-row flex-col justify-between w-full md:gap-6 gap-2 sm:mt-0 mt-4 sm:items-center lg:max-h-[200px] sm:max-h-[300px]">
						<div className="flex gap-2 py-3">
							<div className="sm:hidden flex items-center relative">
								<div className="flex flex-col items-center">
									<MdArrowDropUp
										onClick={() => handleVote(true)}
										className={`${
											isUpvoted === true
												? "text-green-600"
												: "text-gray-300 hover:text-gray-400"
										} h-10 w-10 cursor-pointer -my-2`}
									/>
									<h2 className="text-gray-500 -my-2">
										{post?.votes.reduce((acc, curr) => {
											if (curr.upvote) {
												acc = acc + 1;
											} else acc = acc - 1;
											return acc;
										}, 0)}
									</h2>
									<MdArrowDropDown
										onClick={() => handleVote(false)}
										className={`${
											isUpvoted === false
												? "text-red-600"
												: "text-gray-300 hover:text-gray-400"
										} h-10 w-10 cursor-pointer -my-2`}
									/>
									<div className="border-gray-200 border-r absolute right-0 top-0 bottom-0"></div>
								</div>
							</div>
							<div className="flex flex-col justify-center items-start gap-3 sm:py-5 py-0">
								<div className="flex flex-row gap-2 text-sm items-center flex-wrap">
									<img
										className="h-6 w-6 rounded-full border"
										src={`https://avatars.dicebear.com/api/open-peeps/${post?.username}.svg`}
										alt=""
									/>
									<h3 className="text-red-500">{post?.username}</h3>
									<time className="text-gray-400">
										{getAgoDate(post?.created_at)}
									</time>
								</div>
								<h1 className="text-2xl">{post?.title}</h1>
								<div className="flex items-center gap-2">
									<div className="flex -space-x-1 relative z-0 overflow-hidden">
										{usersLiked?.map((item, index) => (
											<img
												style={{
													zIndex: `${1000 - index}`,
												}}
												className={`relative inline-block h-6 w-6 rounded-full ring-2 ring-white border bg-white`}
												src={`https://avatars.dicebear.com/api/open-peeps/${item?.username}.svg`}
												alt=""
											/>
										))}
									</div>
									{usersLiked && usersLiked.length > 0 && (
										<h3 className="text-gray-800 text-sm">
											Liked by{" "}
											<span className="text-black font-medium">
												{usersLiked[0].username}
											</span>
											{usersLiked.length > 1 && (
												<>
													{" "}
													and{" "}
													<span className="text-black font-medium">
														{usersLiked.length - 1} other
														{usersLiked.length - 1 > 1 ? "s" : ""}
													</span>
												</>
											)}
										</h3>
									)}
								</div>
							</div>
						</div>
						<img
							className="h-full w-screen max-h-[400px] sm:max-w-[250px] object-cover"
							src={post?.media}
							alt=""
						/>
					</div>
				</div>

				<div className="lg:w-10/12 md:w-11/12 max-w-7xl md:my-10 my-5 w-full mx-auto px-2 flex flex-col md:gap-8 gap-4">
					<div>
						<h1 className="text-xl">Description</h1>
						<h2 className="mt-4 lg:w-5/6 w-full whitespace-pre-line">
							{post?.description}
						</h2>
					</div>

					<div>
						<div className="flex items-center gap-4">
							<h1 className="text-xl">Comments ({post?.comments.length})</h1>
							<ButtonPrimary
								onClick={() => setCommentOpen(true)}
								text="Leave Comment"
								disabled={!session}
								size="small"
							/>
						</div>

						{commentOpen && (
							<div className="my-3 flex flex-col gap-1">
								<div className="flex flex-row gap-2 text-sm items-center flex-wrap">
									<img
										className="h-6 w-6 rounded-full border"
										src={`https://avatars.dicebear.com/api/open-peeps/${session?.user?.name}.svg`}
										alt=""
									/>
									<h3 className="text-red-500">{session?.user?.name}</h3>
								</div>
								<InputBox
									input={comment}
									label=""
									placeholder="Leave a comment here"
									name="comment"
									setInput={setComment}
									type="text"
								/>
								<div className="flex gap-2 mt-1">
									<ButtonSecondry
										size="xsmall"
										text="Cancel"
										onClick={() => setCommentOpen(false)}
									/>
									<ButtonPrimary
										size="xsmall"
										text="Comment"
										onClick={() => handleComment()}
									/>
								</div>
							</div>
						)}

						{/* Comments */}

						{post?.comments.map((item) => (
							<div key={item.id} className="flex mt-6 md:gap-2">
								<div className="-mt-3 -ml-2">
									<MdArrowDropUp className="h-8 w-8 -mb-4 text-gray-300" />
									<MdArrowDropDown className="h-8 w-8 -mt-4 text-gray-300" />
								</div>
								<div className="flex flex-col gap-1">
									<div className="flex flex-row gap-2 text-sm items-center flex-wrap">
										<img
											className="h-6 w-6 rounded-full border"
											src={`https://avatars.dicebear.com/api/open-peeps/${item?.username}.svg`}
											alt=""
										/>
										<h3 className="text-red-500">{item?.username}</h3>
										<time className="text-gray-400">
											{getAgoDate(item?.created_at)}
										</time>
									</div>
									<h3 className="text-gray-700">{item.text}</h3>
									<div className="flex gap-6 text-sm">
										<button className="text-gray-500/80 font-semibold">
											Reply
										</button>
										<button className="text-gray-500/80 font-semibold">
											Share
										</button>
										<button className="text-gray-500/80 font-semibold">
											Report
										</button>
										<button className="text-gray-500/80 font-semibold">
											Save
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Loading>
	);
};

export default PostContainer;
