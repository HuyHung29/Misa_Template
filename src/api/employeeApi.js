import axiosClient from "./axiosClient";

const baseUrl = "Employees/";

/**
 * Các API liên quan đến Employee
 * Author: LHH - 04/01/23
 */
const employeeApi = {
	/**
	 * Hàm lấy tất cả nhân viên
	 * Author: LHH - 04/01/23
	 */
	getAllEmp: () => {
		try {
			return axiosClient.get(baseUrl);
		} catch (error) {
			console.log(error);
		}
	},

	/**
	 * Lấy danh sách nhân viên theo bộ lọc và phân trang
	 * Author: LHH - 04/01/23
	 */
	getEmpByFilter: (params, keyword) => {
		try {
			return axiosClient.post(baseUrl + "filter", keyword, { params });
			// return axiosClient.get(baseUrl, { params });
		} catch (error) {
			console.log(error);
		}
	},

	/**
	 * Lấy mẫ nhân viên mới
	 * Author: LHH - 04/01/23
	 */
	getNewEmpCode: () => {
		try {
			return axiosClient.get(baseUrl + "new-employee-code");
		} catch (error) {
			console.log(error);
		}
	},

	/**
	 * Lấy thông tin nhân viên theo ID
	 * Author: LHH - 04/01/23
	 */
	getEmpById: (id) => {
		try {
			return axiosClient.get(baseUrl + id);
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * Hàm thêm nhân viên
	 * Author: LHH - 04/01/23
	 */
	createEmp: (employee) => {
		try {
			return axiosClient.post(baseUrl, employee);
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * Hàm sửa nhân viên
	 * Author: LHH - 04/01/23
	 */
	updateEmp: (id, newEmployee) => {
		try {
			return axiosClient.put(baseUrl + id, newEmployee);
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * Hàm xóa nhân viên
	 * Author: LHH - 04/01/23
	 */

	/**
	 * Hàm xóa nhân viên
	 * Author: LHH - 04/01/23
	 * @param {*} ids
	 * @returns
	 */
	deleteEmp: (ids) => {
		try {
			return axiosClient.delete(baseUrl, { data: { ids } });
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * Hàm xuất excel
	 * Author: LHH - 19/02/23
	 */
	exportExcel: (params) => {
		try {
			const headers = {
				"Content-Disposition": `attachment; filename=hh.xlsx"}`,
				"Content-Type":
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			};
			const config = {
				method: "GET",
				url: URL,
				responseType: "arraybuffer",
				headers,
				params,
			};
			return axiosClient.get(baseUrl + "get-employee-excel", config);
		} catch (error) {
			console.log(error);
		}
	},
};

export default employeeApi;
