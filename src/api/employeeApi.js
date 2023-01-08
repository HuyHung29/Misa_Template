import axiosClient from "./axiosClient";

const baseUrl = "Employees/";

/**
 * Các API liên quan đến Employee
 * Author: LHH - 04/01/23
 */
const employeeApi = {
	getAllEmp: () => {
		try {
			return axiosClient.get(baseUrl);
		} catch (error) {
			console.log(error);
		}
	},
	getEmpByFilter: (params) => {
		try {
			return axiosClient.get(baseUrl + "filter", { params });
		} catch (error) {
			console.log(error);
		}
	},
	getNewEmpCode: () => {
		try {
			return axiosClient.get(baseUrl + "NewEmployeeCode");
		} catch (error) {
			console.log(error);
		}
	},
	getEmpById: (id) => {
		try {
			return axiosClient.get(baseUrl + id);
		} catch (error) {
			console.log(error);
		}
	},
	createEmp: (employee) => {
		try {
			return axiosClient.post(baseUrl, employee);
		} catch (error) {
			console.log(error);
		}
	},
	updateEmp: (id, newEmployee) => {
		try {
			return axiosClient.put(baseUrl + id, newEmployee);
		} catch (error) {
			console.log(error);
		}
	},
	deleteEmp: (id) => {
		try {
			return axiosClient.delete(baseUrl + id);
		} catch (error) {
			console.log(error);
		}
	},
};

export default employeeApi;
