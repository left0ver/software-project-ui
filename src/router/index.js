import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/login",
		component: () =>
			import(
				/* webpackChunkName: "login"*/ "../views/login/Login-Register.vue"
			),
	},
	{
		path: "/home",
		component: () =>
			import(/* webpackChunkName: "home"*/ "../views/home/Home.vue"),
	},
	{
		path: "/carousel/main1",
		component: () => import("../components/carousel/Main1.vue"),
	},
	{
		path: "/carousel/main2",
		component: () => import("../components/carousel/Main2.vue"),
	},
	{
		path: "/carousel/main3",
		component: () => import("../components/carousel/Main3.vue"),
	},
	{
		name: "Article",
		path: "/article",
		component: () =>
			import(
				/* webpackChunkName: "article"*/ "../views/article/Article.vue"
			),
	},
	{
		path: "/postDiscuss",
		component: () =>
			import(
				/* webpackChunkName:"postDiscuss"*/ "../views/postDiscuss/postDiscuss.vue"
			),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});
export default router;
