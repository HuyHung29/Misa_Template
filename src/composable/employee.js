import { ref } from "vue";
import employeeApi from "../api/employeeApi";

const useEmployee = () => {
	try {
		const listEmployee = ref([]);
		const newEmployeeCode = ref(null);
		const editEmployee = ref(null);
		const statusCode = ref(null);

		// Lấy tất cả nhân viên
		const getAllEmployee = async () => {
			const response = await employeeApi.getAllEmp();

			listEmployee.value = [...response];
		};

		// Lấy nhân viên theo id
		const getEmployeeById = async (id) => {
			const response = await employeeApi.getEmpById(id);

			editEmployee.value = { ...response };
		};

		// Lấy nhân viên theo id
		const getNewEmployeeCode = async () => {
			const response = await employeeApi.getNewEmpCode();

			newEmployeeCode.value = response;
		};

		// Thêm nhân viên mới
		const addNewEmployee = async (employee) => {
			const response = await employeeApi.createEmp(employee);

			statusCode.value = response;
		};

		// Cập nhật thông tin nhân viên
		const updateNewEmployee = async (id, employee) => {
			const response = await employeeApi.updateEmp(id, employee);
			console.log(response);

			statusCode.value = response;
		};

		// Xóa nhân viên
		const deleteEmployee = async (id) => {
			const response = await employeeApi.deleteEmp(id);

			console.log(response);
			statusCode.value = response;
		};

		return {
			listEmployee,
			newEmployeeCode,
			editEmployee,
			statusCode,
			getAllEmployee,
			getEmployeeById,
			getNewEmployeeCode,
			addNewEmployee,
			updateNewEmployee,
			deleteEmployee,
		};
	} catch (error) {
		console.log(error);
	}
};

export default useEmployee;
