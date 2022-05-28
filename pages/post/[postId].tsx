import { useQuery } from "@apollo/client";
import {
	GetServerSidePropsContext,
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetServerSidePropsType,
	InferGetStaticPropsType,
	NextPage,
} from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import client from "../../apollo-client";
import PostContainer from "../../components/PostContainer";
import { GET_ALL_POSTS, GET_POST_BY_POST_ID } from "../../graphql/queries";
import { capitalize, DOMAIN } from "../../utils";

const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<NextSeo
				title={post.title}
				canonical={`${DOMAIN}/post/${post.id}`}
				description={post.description.substring(0, 170)}
				openGraph={{
					type: "article",
					url: `${DOMAIN}/post/${post.id}`,
					title: post.title,
					description: post.description,
					images: [
						{
							url: post.media,
						},
					],
					article: {
						publishedTime: post.created_at,
						authors: [post.username],
						modifiedTime: post.created_at,
						tags: [post.title, post.topic],
					},
				}}
			/>
			<ArticleJsonLd
				type="Blog"
				url={`${DOMAIN}/post/${post.id}`}
				title={`${post.title}`}
				images={[post.media]}
				datePublished={post.created_at}
				dateModified={post.created_at}
				authorName={post.username}
				description={post.description}
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
	};
};

export default PostPage;
