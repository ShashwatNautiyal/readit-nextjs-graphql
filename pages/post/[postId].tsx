import { useQuery } from "@apollo/client";
import {
	GetServerSidePropsContext,
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetServerSidePropsType,
	InferGetStaticPropsType,
	NextPage,
} from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import client from "../../apollo-client";
import PostContainer from "../../components/PostContainer";
import { GET_ALL_POSTS, GET_POST_BY_POST_ID } from "../../graphql/queries";
import { capitalize } from "../../utils";

const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<NextSeo
				title={`Post | ${capitalize(post.id)}`}
				canonical={`${process.env.NEXT_VERCEL_DOMAIN}/post/${post.id}`}
			/>
			<PostContainer post={post} />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	// Call an external API endpoint to get posts
	const { data: getPostList } = await client.query({
		query: GET_ALL_POSTS,
	});

	// Get the paths we want to pre-render based on posts
	const paths = getPostList.getPostList.map((post: Post) => ({
		params: { postId: post.id },
	}));

	return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const { data: getPostByPostId } = await client.query({
		query: GET_POST_BY_POST_ID,
		variables: {
			id: params?.postId,
		},
	});

	return {
		props: {
			post: getPostByPostId.getPostByPostId as Post,
		},
		revalidate: 10,
	};
};

export default PostPage;
