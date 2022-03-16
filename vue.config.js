module.exports = {
	devServer: {
		disableHostCheck: true,
	},

	// 发布模式--发布阶段的打包入口
	chainWebpack: config => {
		config.when(process.env.NODE_ENV === "production", config => {
			config.entry("app").clear().add("./src/main.js");
			config.set("externals", {
				vue: "Vue",
				"vue-router": "VueRouter",
				axios: "axios",
				vuex: "Vuex",
			});
		});
	},

	configureWebpack: {
		devtool: false,
		mode: "production",
	},
};
