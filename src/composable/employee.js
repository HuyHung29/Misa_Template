import { ref } from "vue";
import employeeApi from "../api/employeeApi";
import RESOURCES from "../constants/resource";

/**
 * Các hàm dùng chung cho employee
 * Author: LHH - 04/01/23
 */
const useEmployee = () => {
	try {
		const listEmployee = ref([]);
		const newEmployeeCode = ref(null);
		const newEmployee = ref(null);
		const editEmployee = ref(null);
		const statusCode = ref(null);
		const totalPage = ref(null);
		const totalRecord = ref(null);
		const employeeCheck = ref(null);
		const deleteIds = ref(null);

		/**
		 * Lấy tất cả nhân viên
		 * Author: LHH - 04/01/23
		 */
		const getAllEmployee = async () => {
			try {
				const response = await employeeApi.getAllEmp();

				listEmployee.value = [...response];
				statusCode.value = null;
			} catch (error) {
				throw error;
			}
		};

		/**
		 * Lấy nhân viên theo filter
		 * Author: LHH - 04/01/23
		 */
		const getFilterEmployee = async (filter, keyword = "") => {
			try {
				const response = await employeeApi.getEmpByFilter(
					filter,
					keyword
				);
				if (response) {
					const { TotalPage, TotalRecord, Data } = response;

					totalPage.value = TotalPage;
					totalRecord.value = TotalRecord;

					listEmployee.value = Data;
					statusCode.value = null;
				} else {
					totalPage.value = 0;
					totalRecord.value = 0;

					listEmployee.value = [];
				}
			} catch (error) {
				totalPage.value = 0;
				totalRecord.value = 0;

				listEmployee.value = [];
				throw error;
			}
		};

		/**
		 * Lấy nhân viên theo id
		 * Author: LHH - 04/01/23
		 */
		const getEmployeeById = async (id) => {
			try {
				const response = await employeeApi.getEmpById(id);

				editEmployee.value = response;
				statusCode.value = null;
			} catch (error) {
				throw error;
			}
		};

		/**
		 * Lấy nhân viên theo id
		 * Author: LHH - 04/01/23
		 */
		const getNewEmployeeCode = async () => {
			try {
				const response = await employeeApi.getNewEmpCode();

				newEmployeeCode.value = response;
				statusCode.value = null;
			} catch (error) {
				throw error;
			}
		};

		/**
		 * Thêm nhân viên mới
		 * Author: LHH - 04/01/23
		 */
		const addNewEmployee = async (employee) => {
			try {
				const response = await employeeApi.createEmp(employee);

				newEmployee.value = response;

				statusCode.value = response ? true : false;
			} catch (error) {
				statusCode.value = null;
				throw error;
			}
		};

		/**
		 * Cập nhật thông tin nhân viên
		 * Author: LHH - 04/01/23
		 */
		const updateNewEmployee = async (id, employee) => {
			try {
				const response = await employeeApi.updateEmp(id, employee);
				console.log(response);

				newEmployee.value = response;

				statusCode.value = response ? true : false;
			} catch (error) {
				statusCode.value = null;
				throw error;
			}
		};

		/**
		 * Hàm xử lý xóa nhân viên
		 * @param {Array} ids: danh sách id nhân viên cần xóa
		 * Author: LHH - 04/01/23
		 */
		const deleteEmployee = async (ids) => {
			try {
				console.log(ids);
				const response = await employeeApi.deleteEmp(ids);

				console.log(response);

				deleteIds.value = response;

				statusCode.value = response ? true : false;
			} catch (error) {
				statusCode.value = null;
				throw error;
			}
		};

		/**
		 * Hàm xuất excel
		 * Author: LHH - 21/02/23
		 */
		const handleExportExcel = async (filter) => {
			try {
				const response = await employeeApi.exportExcel(filter);

				const url = URL.createObjectURL(new Blob([response]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", RESOURCES.FILE_NAME);
				document.body.appendChild(link);
				link.click();
			} catch (error) {
				console.log(error);
			}
		};
		return {
			listEmployee,
			newEmployeeCode,
			newEmployee,
			editEmployee,
			employeeCheck,
			deleteIds,
			statusCode,
			totalPage,
			totalRecord,
			getAllEmployee,
			getFilterEmployee,
			getEmployeeById,
			getNewEmployeeCode,
			addNewEmployee,
			updateNewEmployee,
			deleteEmployee,
			handleExportExcel,
		};
	} catch (error) {
		throw error;
	}
};

export default useEmployee;
