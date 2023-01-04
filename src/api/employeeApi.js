import axiosClient from "./axiosClient";

const baseUrl = "Employees/";

const employeeApi = {
	getAllEmp: () => {
		return axiosClient.get(baseUrl);
	},
	getEmpByFilter: (params) => {
		return axiosClient.get(baseUrl, { params });
	},
	getNewEmpCode: () => {
		return axiosClient.get(baseUrl + "NewEmployeeCode");
	},
	getEmpById: (id) => {
		return axiosClient.get(baseUrl + id);
	},
	createEmp: (employee) => {
		return axiosClient.post(baseUrl, employee);
	},
	updateEmp: (id, newEmployee) => {
		return axiosClient.put(baseUrl + id, newEmployee);
	},
	deleteEmp: (id) => {
		return axiosClient.delete(baseUrl + id);
	},
};

export default employeeApi;
