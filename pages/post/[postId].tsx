import { useQuery } from "@apollo/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import PostContainer from "../../components/PostContainer";
import { capitalize } from "../../utils";

const PostPage = ({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<NextSeo
				title={`Post | ${capitalize(query.postId as string)}`}
				canonical={`${process.env.NEXT_VERCEL_DOMAIN}/post/${query.postId}`}
			/>
			<PostContainer id={query.postId} />
		</>
	);
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
	return { props: { query: query } };
};

export default PostPage;
