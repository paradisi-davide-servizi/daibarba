/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		DATABASE_URL: process.env.DATABASE_URL,
		REDEPLOY_URL: process.env.REDEPLOY_URL,
	},
	images: {
		remotePatterns: [
			{
				port: "",
				protocol: "https",
				hostname: "uwsgvqbciuqqzknchcbe.supabase.co",
			},
		],
	},
};

module.exports = nextConfig;
