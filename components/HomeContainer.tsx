import { useQuery } from "@apollo/client";
import React from "react";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "../graphql/queries";
import Loading from "./layout/Loading";
import Feed from "./reusable/Feed";

type HomeProps = { posts: Post[]; topicName?: string | string[] | undefined };

const HomeContainer = (props: HomeProps) => {
	const { posts, topicName } = props;
	return (
		<div className="lg:w-10/12 md:w-11/12 max-w-7xl md:my-10 my-5 w-full mx-auto">
			<div className="flex justify-between md:px-0 px-2">
				<h1 className="text-xl capitalize font-semibold">
					{topicName ? topicName : "All"}
				</h1>
				<div className="flex gap-2">
					<BsGridFill className="h-6 w-6 cursor-pointer text-gray-200" />
					<FaThList className="h-6 w-6 cursor-pointer text-gray-400" />
				</div>
			</div>
			<Feed posts={posts} refetchQueries={[GET_ALL_POSTS, "getPostList"]} />
		</div>
	);
};

export default HomeContainer;
