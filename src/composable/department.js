import { ref } from "vue";
import departmentApi from "../api/departmentApi";

const useDepartment = () => {
	try {
		const departments = ref(null);

		// Lấy tất cả nhân viên
		const getAllDepartment = async () => {
			const response = await departmentApi.getAllDepartment();

			departments.value = [...response];
		};

		return {
			departments,
			getAllDepartment,
		};
	} catch (error) {
		console.log(error);
	}
};

export default useDepartment;
