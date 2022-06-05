/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["avatars.dicebear.com", "ryfrttouaibbjbysbzoy.supabase.co"],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
};

module.exports = nextConfig;
