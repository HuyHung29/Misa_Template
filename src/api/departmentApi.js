import axiosClient from "./axiosClient";

const baseUrl = "Departments";

const departmentApi = {
	getAllDepartment: () => {
		return axiosClient.get(baseUrl);
	},
};

export default departmentApi;
