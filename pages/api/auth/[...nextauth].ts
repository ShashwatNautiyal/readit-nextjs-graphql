import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "../../../utils";

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
		CredentialsProvider({
			name: "Credentials",
			credentials: {},
			authorize: async (credentials) => {
				const { user, error } = await supabase.auth.signIn({
					//@ts-ignore
					email: credentials.email,
					//@ts-ignore
					password: credentials.password,
				});

				console.log(user, error);
				if (user) {
					return {
						email: user.email,
						name: user.user_metadata.name,
					};
				}
				return null;
			},
		}),

		// ...add more providers here
	],
});
