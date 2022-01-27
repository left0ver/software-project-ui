import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/iconfont.css";
import {
	Button,
	Tabs,
	TabPane,
	Input,
	Icon,
	Form,
	FormItem,
	Radio,
	Collapse,
	CollapseItem,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Menu,
	MenuItem,
	Submenu,
	Carousel,
	CarouselItem,
} from "element-ui";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Carousel);
Vue.use(CarouselItem);
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
