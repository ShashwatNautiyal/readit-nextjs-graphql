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
import { DOMAIN } from "../utils";

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<NextSeo
				openGraph={{
					url: "/",
					description:
						"Readit is a network of communities where people can dive into their interests, hobbies and passions. There's a community for whatever you're interested in on Readit.",
					site_name: "Readit",
					images: [
						{
							url: DOMAIN,
							width: 512,
							height: 512,
							alt: "Readit logo",
						},
					],
				}}
				canonical={`${DOMAIN}`}
			/>
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
