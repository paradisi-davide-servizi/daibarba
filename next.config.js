/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		DATABASE_URL: process.env.DATABASE_URL,
		REDEPLOY_URL: process.env.REDEPLOY_URL,
		NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
		NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
	},
	images: {
		minimumCacheTTL: 300,
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
