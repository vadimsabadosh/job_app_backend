module.exports = {
	info: {
		version: "1.0.0",
		title: "Job Finder API Documentation",
		license: {
			name: "MIT",
		},
	},
	security: {
		BearerAuth: {
			type: "http",
			scheme: "bearer",
		},
	},
	baseDir: __dirname,
	filesPattern: "../**/*.js",
	swaggerUIPath: "/api-docs",
	exposeSwaggerUI: true,
	exposeApiDocs: false,
	apiDocsPath: "/v3/api-docs",
	notRequiredAsNullable: false,
	swaggerUiOptions: {},
	multiple: true,
};
