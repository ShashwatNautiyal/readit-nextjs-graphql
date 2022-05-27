import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://ridgefield.stepzen.net/api/quelling-pike/__graphql",
	headers: {
		Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
	},
	cache: new InMemoryCache(),
	ssrMode: true,
	ssrForceFetchDelay: 500,
});

export default client;
