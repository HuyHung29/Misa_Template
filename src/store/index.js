import { reactive, readonly } from "vue";
import useEmployee from "../composable/employee";
import RESOURCES from "../constants/resource";

/**
 * Các hàm liên quan đến employee
 * Author: LHH - 02/01/23
 */
const { listEmployee, totalPage, totalRecord, getFilterEmployee } =
	useEmployee();

/**
 * Khởi tạo store dùng chung
 * Author: LHH - 02/01/23
 */
const state = reactive({
	employees: [],
	totalPage: 1,
	totalRecord: null,
	modal: {
		isOpen: false,
		title: "",
		content: "",
		type: "warning",
		employeeId: "",
	},
	form: {
		isOpen: false,
		type: "",
		employeeId: "",
	},
	sidebar: {
		isOpen: true,
	},
	isLoading: false,
	toasts: [],
});

/**
 * Hàm xử lý danh sách nhân viên
 * Author: LHH - 06/01/23
 */
const handleGetEmployees = async (
	filter = { pageSize: RESOURCES.PAGINATION[0].value, pageNumber: 1 }
) => {
	try {
		state.isLoading = true;

		await getFilterEmployee(filter);
		state.employees = [...listEmployee.value];
		state.totalPage = totalPage.value;
		state.totalRecord = totalRecord.value;

		state.isLoading = false;
	} catch (error) {
		console.log(error);
		state.isLoading = false;
	}
};

/**
 * Hàm xử lý mở modal
 * Author: LHH - 02/01/23
 */
const handleOpenModal = (title, content, type, employeeId) => {
	try {
		state.modal = {
			isOpen: true,
			title,
			content,
			type,
			employeeId,
		};
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý đóng modal
 * Author: LHH - 02/01/23
 */
const handleCloseModal = () => {
	try {
		state.modal = {
			isOpen: false,
		};
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý mở form
 * Author: LHH - 02/01/23
 */
const handleOpenForm = (type, employeeId) => {
	try {
		state.form = {
			isOpen: true,
			type,
			employeeId,
		};
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý đóng form
 * Author: LHH - 02/01/23
 */
const handleCloseForm = () => {
	try {
		state.form = {
			isOpen: false,
			type: "",
			employeeId: "",
		};
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý mở sidebar
 * Author: LHH - 02/01/23
 */
const handleOpenSidebar = () => {
	try {
		state.sidebar.isOpen = true;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý đóng sidebar
 * Author: LHH - 02/01/23
 */
const handleCloseSidebar = () => {
	try {
		state.sidebar.isOpen = false;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý mở loading
 * Author: LHH - 02/01/23
 */
const handleOpenLoading = () => {
	try {
		state.isLoading = true;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý đóng loading
 * Author: LHH - 02/01/23
 */
const handleCloseLoading = () => {
	try {
		state.isLoading = false;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý hiên thị toast message
 * Author: LHH - 10/01/23
 */
const handleShowToast = (toast = { title: "", content: "" }) => {
	state.toasts.push(toast);
};

/**
 * Xử lý ẩn toast message
 * Author: LHH - 10/01/23
 */
const handleCloseToast = (key) => {
	const index = state.toasts.findIndex((toast) => toast.key === key);

	state.toasts.splice(index, 1);
};

export default {
	state: readonly(state),
	handleGetEmployees,
	handleOpenModal,
	handleCloseModal,
	handleOpenForm,
	handleCloseForm,
	handleOpenSidebar,
	handleCloseSidebar,
	handleOpenLoading,
	handleCloseLoading,
	handleShowToast,
	handleCloseToast,
};
