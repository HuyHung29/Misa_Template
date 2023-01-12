import { ref } from "vue";
import departmentApi from "../api/departmentApi";

/**
 * Các state và hàm dùng chung cho department
 * Author: LHH - 04/01/23
 */
const useDepartment = () => {
	try {
		const departments = ref(null);

		/**
		 * Lấy tất cả phòng ban
		 * Author: LHH - 04/01/23
		 */
		const getAllDepartment = async () => {
			try {
				const response = await departmentApi.getAllDepartment();

				departments.value = [...response];
			} catch (error) {
				console.log(error);
				departments.value = [];
			}
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
