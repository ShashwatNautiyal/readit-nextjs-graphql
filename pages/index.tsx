import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import HomeContainer from "../components/HomeContainer";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Readit</title>
			</Head>
			<HomeContainer />
		</>
	);
};

export default Home;
