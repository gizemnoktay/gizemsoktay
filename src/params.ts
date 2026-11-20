import { defineParams } from "@sveltejs/kit/params";

export const params = defineParams({
	preview: (param) => (param === "preview" ? param : undefined),
});