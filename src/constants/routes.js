import HomeLayout from "../layouts/HomeLayout.vue";
import EmployeeList from "../views/EmployeeList.vue";

const routes = [
	{
		path: "/",
		component: HomeLayout,
		children: [
			{
				path: "/",
				component: EmployeeList,
			},
		],
	},
];

export default routes;
