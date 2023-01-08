import HomeLayout from "../layouts/HomeLayout.vue";
import EmployeeList from "../views/EmployeeList.vue";
import About from "../views/About.vue";

const routes = [
	{
		path: "/",
		component: HomeLayout,
		children: [
			{
				path: "/",
				component: EmployeeList,
			},
			{
				path: "about",
				component: About,
			},
		],
	},
];

export default routes;
