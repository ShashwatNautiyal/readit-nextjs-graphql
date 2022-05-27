import type {
	GetServerSidePropsContext,
	GetStaticPropsContext,
	InferGetServerSidePropsType,
	InferGetStaticPropsType,
	NextPage,
} from "next";
import { NextSeo } from "next-seo";
import client from "../apollo-client";
import HomeContainer from "../components/HomeContainer";
import { GET_ALL_POSTS } from "../graphql/queries";

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<NextSeo canonical={`${process.env.NEXT_VERCEL_DOMAIN}`} />
			<HomeContainer posts={posts} />
		</>
	);
};

export const getStaticProps = async () => {
	const { data: getPostList } = await client.query({
		query: GET_ALL_POSTS,
	});

	return {
		props: {
			posts: getPostList.getPostList as Post[],
		},
	};
};

export default Home;
