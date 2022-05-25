import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Header from "../components/Header";
import HomeContainer from "../components/HomeContainer";

const Home: NextPage = () => {
	return (
		<>
			<NextSeo canonical={`${process.env.NEXT_VERCEL_DOMAIN}`} />
			<HomeContainer />
		</>
	);
};

export default Home;
