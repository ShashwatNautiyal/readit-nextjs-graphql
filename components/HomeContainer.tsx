import { useQuery } from "@apollo/client";
import React from "react";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "../graphql/queries";
import Loading from "./layout/Loading";
import Feed from "./reusable/Feed";

const HomeContainer = ({ topicName }: { topicName?: string | string[] | undefined }) => {
	const { data, loading } =
		topicName === "all" || !topicName
			? useQuery(GET_ALL_POSTS)
			: useQuery(GET_ALL_POSTS_BY_TOPIC, {
					variables: {
						topic: topicName,
					},
			  });
	const posts: Post[] | undefined =
		topicName === "all" || !topicName ? data?.getPostList : data?.getPostListByTopic;

	return (
		<Loading isLoading={loading}>
			<div className="lg:w-10/12 md:w-11/12 max-w-7xl md:my-10 my-5 w-full mx-auto">
				<div className="flex justify-between md:px-0 px-2">
					<h1 className="text-xl capitalize">{topicName ? topicName : "All"}</h1>
					<div className="flex gap-2">
						<BsGridFill className="h-6 w-6 cursor-pointer text-gray-200" />
						<FaThList className="h-6 w-6 cursor-pointer text-gray-400" />
					</div>
				</div>
				<Feed posts={posts} refetchQueries={[GET_ALL_POSTS, "getPostList"]} />
			</div>
		</Loading>
	);
};

export default HomeContainer;
