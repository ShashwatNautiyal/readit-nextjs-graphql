import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { DefaultSeo } from "next-seo";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<>
			<NextNProgress
				color="rgb(239, 68, 68)"
				startPosition={0.1}
				height={3}
				showOnShallow={true}
				options={{
					showSpinner: false,
				}}
			/>
			<DefaultSeo
				defaultTitle="Readit"
				titleTemplate="Readit | %s"
				description="Readit is a network of communities where people can dive into their interests, hobbies and passions. There's a community for whatever you're interested in on Readit."
				canonical="https://readit-nextjs-graphql.vercel.app/"
				openGraph={{
					type: "website",
					locale: "en_IE",
					url: "https://readit-nextjs-graphql.vercel.app/",
					description:
						"Readit is a network of communities where people can dive into their interests, hobbies and passions. There's a community for whatever you're interested in on Readit.",
					site_name: "Readit",
					images: [
						{
							url: "https://readit-nextjs-graphql.vercel.app/logo.png",
							width: 512,
							height: 512,
							alt: "Readit logo",
						},
					],
				}}
				twitter={{
					handle: "@shashwatnauti",
					site: "@Readit",
					cardType: "summary_large_image",
				}}
				facebook={{
					appId: "1079077892678757",
				}}
			/>
			<ApolloProvider client={client}>
				<SessionProvider session={session}>
					<div className="flex">
						<Sidebar />
						<div className="flex flex-1 flex-col">
							<Header />
							<Component {...pageProps} />
						</div>
					</div>
				</SessionProvider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
