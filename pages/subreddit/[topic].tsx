import { useQuery } from "@apollo/client";
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import client from "../../apollo-client";
import Loading from "../../components/layout/Loading";
import Feed from "../../components/reusable/Feed";
import { GET_ALL_POSTS_BY_SUBREDDIT_TOPIC, GET_ALL_SUBREDDIT } from "../../graphql/queries";
import { capitalize, DOMAIN } from "../../utils";

const Subreddit = ({ posts, topic }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<NextSeo canonical={`${DOMAIN}/subreddit/${topic}`} />
			<NextSeo
				title={`Subreddit | ${capitalize(topic as string)}`}
				canonical={`${DOMAIN}/subreddit/${topic}`}
				openGraph={{
					url: `${DOMAIN}/subreddit/${topic}`,
					title: `Topic | ${capitalize(topic as string)}`,
					images: [
						{
							url: `https://avatars.dicebear.com/api/bottts/${topic}.svg`,
						},
					],
				}}
			/>

			<div className="lg:w-10/12 md:w-11/12 max-w-7xl md:my-10 my-5 w-full mx-auto">
				<div className="flex justify-between md:px-0 px-2">
					<div className="flex items-center gap-2">
						<img
							className="h-10 w-10 rounded-full border"
							src={`https://avatars.dicebear.com/api/initials/${topic}.svg`}
							alt={topic as string}
						/>

						<h1 className="text-xl font-semibold">Welcome to r/{topic} subreddit</h1>
					</div>
					<div className="flex gap-2">
						<BsGridFill className="h-6 w-6 cursor-pointer text-gray-200" />
						<FaThList className="h-6 w-6 cursor-pointer text-gray-400" />
					</div>
				</div>
				<Feed posts={posts} />
			</div>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	// Call an external API endpoint to get posts
	const { data } = await client.query({
		query: GET_ALL_SUBREDDIT,
	});

	// Get the paths we want to pre-render based on posts
	const paths = data.getSubredditList.slice(0, 6).map((subreddit: Subreddit) => ({
		params: { topic: subreddit.topic },
	}));

	return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const { data: getPostListBySubredditTopic } = await client.query({
		query: GET_ALL_POSTS_BY_SUBREDDIT_TOPIC,
		variables: {
			topic: params?.topic,
		},
	});

	return {
		props: {
			topic: params?.topic,
			posts: getPostListBySubredditTopic.getPostListBySubredditTopic as Post[],
		},
	};
};

export default Subreddit;
