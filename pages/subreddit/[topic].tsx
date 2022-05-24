import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import Loading from "../../components/layout/Loading";
import Feed from "../../components/reusable/Feed";
import { GET_ALL_POSTS_BY_SUBREDDIT_TOPIC } from "../../graphql/queries";

const Subreddit: NextPage = () => {
	const {
		query: { topic },
	} = useRouter();

	const { data, error, loading } = useQuery(GET_ALL_POSTS_BY_SUBREDDIT_TOPIC, {
		variables: {
			topic: topic,
		},
	});
	const posts: Post[] | undefined = data?.getPostListBySubredditTopic;

	return (
		<Loading isLoading={loading}>
			<div className="lg:w-10/12 md:w-11/12 max-w-7xl md:my-10 my-5 w-full mx-auto">
				<div className="flex justify-between md:px-0 px-2">
					<div className="flex items-center gap-2">
						<img
							className="h-10 w-10 rounded-full border"
							src={`https://avatars.dicebear.com/api/initials/${topic}.svg`}
							alt=""
						/>
						<h1 className="text-xl font-semibold">Welcome to r/{topic} subreddit</h1>
					</div>
					<div className="flex gap-2">
						<BsGridFill className="h-6 w-6 cursor-pointer text-gray-200" />
						<FaThList className="h-6 w-6 cursor-pointer text-gray-400" />
					</div>
				</div>
				<Feed
					posts={posts}
					refetchQueries={[
						GET_ALL_POSTS_BY_SUBREDDIT_TOPIC,
						"getPostListBySubredditTopic",
					]}
				/>
			</div>
		</Loading>
	);
};

export default Subreddit;
