import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
	PUBLIC_PRISMIC_ENVIRONMENT: {
		public: true,
		schema: (value) => value,
		description: "The Prismic environment to use instead of the production repository.",
	},
});