import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
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
	);
}

export default MyApp;
