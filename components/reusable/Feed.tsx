import { DocumentNode, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { ADD_VOTE } from "../../graphql/mutations";
import { getAgoDate } from "../../utils";

const Feed = ({
	posts,
	refetchQueries,
}: {
	posts: Post[] | undefined;
	refetchQueries: [DocumentNode, string];
}) => {
	return (
		<div className="w-full divide-y divide-gray-200 md:border border-t border-b md:mt-10 mt-5">
			{posts?.map((post) => (
				<FeedRow key={post.id} post={post} refetchQueries={refetchQueries} />
			))}
		</div>
	);
};

const FeedRow = ({
	post,
	refetchQueries,
}: {
	post: Post;
	refetchQueries: [DocumentNode, string];
}) => {
	const { data: session } = useSession();
	const [addVote] = useMutation(ADD_VOTE, {
		refetchQueries: refetchQueries,
	});

	const isUpvoted = post?.votes.find((item) => item.username === session?.user?.name)?.upvote;

	const handleVote = (isUpvote: boolean) => {
		if (!session || isUpvoted) return;

		addVote({
			variables: {
				post_id: post.id,
				username: session?.user?.name,
				upvote: isUpvote,
			},
		});
	};

	return (
		<div className="flex items-center gap-6 sm:py-0 py-5 md:px-0 px-2">
			<div className="sm:flex hidden flex-col items-center px-7 py-3 relative">
				<MdArrowDropUp
					onClick={() => handleVote(true)}
					className={`${
						isUpvoted === true ? "text-green-600" : "text-gray-300 hover:text-gray-400"
					} h-10 w-10 cursor-pointer`}
				/>
				<h2 className="text-gray-500 -my-2">
					{post.votes.reduce((acc, curr) => {
						if (curr.upvote) {
							acc = acc + 1;
						} else acc = acc - 1;
						return acc;
					}, 0)}
				</h2>
				<MdArrowDropDown
					onClick={() => handleVote(false)}
					className={`${
						isUpvoted === false ? "text-red-600" : "text-gray-300 hover:text-gray-400"
					} h-10 w-10 cursor-pointer`}
				/>
				<div className="border-gray-200 border-r absolute right-0 top-6 bottom-0"></div>
			</div>
			<Link href={`/post/${post.id}`}>
				<div className="flex sm:flex-row flex-col justify-between w-full gap-3 sm:items-center items-start cursor-pointer">
					<div className="flex gap-2">
						<div className="sm:hidden flex flex-col items-center relative -ml-2">
							<MdArrowDropUp
								onClick={() => handleVote(true)}
								className={`${
									isUpvoted === true
										? "text-green-600"
										: "text-gray-300 hover:text-gray-400"
								} h-10 w-10 cursor-pointer -my-2`}
							/>
							<h2 className="text-gray-500 -my-2">
								{post.votes.reduce((acc, curr) => {
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
						<div className="flex flex-col gap-3">
							<h2>{post.title}</h2>
							<div className="flex flex-row gap-2 text-sm items-center flex-wrap">
								<img
									className="h-6 w-6 rounded-full border"
									src={`https://avatars.dicebear.com/api/open-peeps/${post.username}.svg`}
									alt=""
								/>
								<h3 className="text-red-500">{post.username}</h3>
								<time className="text-gray-400">{getAgoDate(post.created_at)}</time>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3 md:pr-4 flex-shrink-0">
						<img
							style={{
								boxShadow:
									"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
							}}
							src={post.media}
							className="sm:h-[60px] rounded object-cover sm:w-[100px] w-screen max-h-[400px]"
							alt=""
						/>
						<BsThreeDotsVertical className="h-6 w-6 text-gray-300 sm:block hidden" />
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Feed;
