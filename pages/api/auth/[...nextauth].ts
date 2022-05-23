import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			// @ts-ignore
			clientId: process.env.GOOGLE_ID,
			// @ts-ignore
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		FacebookProvider({
			// @ts-ignore
			clientId: process.env.FACEBOOK_ID,
			// @ts-ignore
			clientSecret: process.env.FACEBOOK_SECRET,
		}),
		// ...add more providers here
	],
});
