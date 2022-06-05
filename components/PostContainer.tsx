import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp, MdOutlineKeyboardBackspace } from "react-icons/md";
import { ADD_COMMENT, ADD_VOTE } from "../graphql/mutations";
import { GET_COMMENTS_BY_POST_ID, GET_VOTES_BY_POST_ID } from "../graphql/queries";
import { revalidate } from "../utils";
import ButtonPrimary from "./reusable/ButtonPrimary";
import ButtonSecondry from "./reusable/ButtonSecondry";
import InputBox from "./reusable/InputBox";
const TimeAgo = dynamic(() => import("./reusable/TimeAgo"), { ssr: false });

const PostContainer = ({ post }: { post: Post }) => {
	const [comment, setComment] = useState("");
	const [commentOpen, setCommentOpen] = useState(false);
	const { data: session } = useSession();
	const [commentLoading, setCommentLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const router = useRouter();

	const { data: getVotesByPostId, loading: isVotesLoading } = useQuery(GET_VOTES_BY_POST_ID, {
		variables: {
			post_id: post.id,
		},
	});

	const { data: getCommentsByPostId, loading: isCommentsLoading } = useQuery(
		GET_COMMENTS_BY_POST_ID,
		{
			variables: {
				post_id: post.id,
			},
		}
	);

	const [addComment] = useMutation(ADD_COMMENT, {
		refetchQueries: [GET_COMMENTS_BY_POST_ID, "getCommentsByPostId"],
	});

	const [addVote] = useMutation(ADD_VOTE, {
		refetchQueries: [GET_VOTES_BY_POST_ID, "getVotesByPostId"],
	});

	const votes: Vote[] | undefined = isVotesLoading
		? post.votes
		: getVotesByPostId?.getVotesByPostId;
	const comments: Comments[] | undefined = isCommentsLoading
		? post.comments
		: getCommentsByPostId?.getCommentsByPostId;

	const isUpvoted = votes?.find((item) => item.username === session?.user?.name)?.upvote;

	const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!comment) return;
		setCommentLoading(true);

		const { data } = await addComment({
			variables: {
				post_id: post.id,
				username: session?.user?.name,
				text: comment,
			},
		});

		if (data) {
			revalidate(`/post/${post.id}`);
		}

		setCommentOpen(false);
		setComment("");
		setCommentLoading(false);
	};

	const handleVote = async (isUpvote: boolean) => {
		if (!session || isUpvoted) return;

		const { data } = await addVote({
			variables: {
				post_id: post?.id,
				username: session?.user?.name,
				upvote: isUpvote,
			},
		});

		if (data) {
			revalidate(`/post/${post.id}`);
			revalidate(`/subreddit/${post.subreddit[0].topic}`);
			revalidate(`/${post.topic}`);
			revalidate(`/`);
		}
	};

	const usersLiked = isVotesLoading
		? post.votes?.filter((post) => post.upvote === true)
		: votes?.filter((post) => post.upvote === true);

	return (
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
							{votes?.reduce((acc, curr) => {
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
						<div className="flex flex-col justify-center items-start gap-3 sm:py-5 py-0 px-2">
							<div className="flex flex-row gap-2 text-sm items-center flex-wrap">
								<img
									className="h-6 w-6 rounded-full border"
									src={`https://avatars.dicebear.com/api/open-peeps/${post?.username}.svg`}
									alt=""
								/>
								<h3 className="text-red-500">{post?.username}</h3>
								<TimeAgo time={post.created_at} />
							</div>
							<h1 className="text-2xl">{post?.title}</h1>
							<div className="flex items-center gap-2">
								<div className="flex -space-x-1 relative z-0 overflow-hidden">
									{usersLiked?.map((item, index) => (
										<img
											key={item.id}
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
						<h1 className="text-xl">Comments ({comments?.length})</h1>
						<ButtonPrimary
							onClick={() => {
								setCommentOpen(true);
								setTimeout(() => {
									inputRef.current?.focus();
								}, 100);
							}}
							text="Leave Comment"
							disabled={!session}
							size="small"
						/>
					</div>

					{commentOpen && (
						<form onSubmit={handleComment} className="my-3 flex flex-col gap-1">
							<div className="flex flex-row gap-2 text-sm items-center flex-wrap">
								<img
									className="h-6 w-6 rounded-full border"
									src={`https://avatars.dicebear.com/api/open-peeps/${session?.user?.name}.svg`}
									alt=""
								/>
								<h3 className="text-red-500">{session?.user?.name}</h3>
							</div>
							<InputBox
								refInput={inputRef}
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
									disabled={commentLoading}
									onClick={() => setCommentOpen(false)}
								/>
								<ButtonPrimary
									size="xsmall"
									text="Comment"
									isLoading={commentLoading}
									type="submit"
								/>
							</div>
						</form>
					)}

					{/* Comments */}

					{comments?.map((item) => (
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
									<h2 className="text-red-500">{item?.username}</h2>
									<TimeAgo time={item.created_at} />
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
									<button className="text-gray-500/80 font-semibold">Save</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PostContainer;
