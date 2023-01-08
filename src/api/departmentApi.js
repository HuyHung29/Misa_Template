import axiosClient from "./axiosClient";

const baseUrl = "Departments";

/**
 * Các API liên quan đến Department
 * Author: LHH - 04/01/23
 */
const departmentApi = {
	getAllDepartment: () => {
		try {
			return axiosClient.get(baseUrl);
		} catch (error) {
			console.log(error);
		}
	},
};

export default departmentApi;
