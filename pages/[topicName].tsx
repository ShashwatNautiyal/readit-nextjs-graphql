import {
	GetServerSidePropsContext,
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetServerSidePropsType,
	InferGetStaticPropsType,
} from "next";
import { NextSeo } from "next-seo";
import React from "react";
import client from "../apollo-client";
import HomeContainer from "../components/HomeContainer";
import { GET_ALL_POSTS_BY_TOPIC } from "../graphql/queries";
import { capitalize, DOMAIN } from "../utils";

const TopicsPage = ({ posts, topicName }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<NextSeo
				title={`${capitalize(topicName as string)}`}
				canonical={`${DOMAIN}/${topicName}`}
			/>
			<HomeContainer posts={posts} topicName={topicName} />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on posts
	const paths = navigations.map((nav) => ({
		params: { topicName: nav.href },
	}));

	return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const { data: getPostListByTopic } = await client.query({
		query: GET_ALL_POSTS_BY_TOPIC,
		variables: {
			topic: params?.topicName,
		},
	});

	return {
		props: {
			topicName: params?.topicName,
			posts: getPostListByTopic.getPostListByTopic as Post[],
		},
	};
};

const navigations = [
	{
		name: "Hot",
		href: "hot",
	},
	{
		name: "New",
		href: "new",
	},
	{
		name: "Controversial",
		href: "controversial",
	},
	{
		name: "Rising",
		href: "rising",
	},
	{
		name: "Top",
		href: "top",
	},
];

export default TopicsPage;
