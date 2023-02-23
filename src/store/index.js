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
		title: null,
		content: null,
		type: "warning",
		employeeId: null,
		callback: null,
	},
	form: {
		isOpen: false,
		type: null,
		employeeId: null,
		formError: {},
	},
	sidebar: {
		isOpen: true,
	},
	isLoading: false,
	toasts: [],
	pagination: {
		keyword: "",
		pageSize: 20,
		pageNumber: 1,
	},
});

/**
 * Hàm xử lý danh sách nhân viên
 * Author: LHH - 06/01/23
 */
const handleGetEmployees = async (filter) => {
	try {
		state.isLoading = true;

		if (filter) {
			state.pagination = { ...state.pagination, ...filter };
		} else {
			state.pagination.keyword = "";
		}

		await getFilterEmployee(
			{ ...state.pagination },
			state.pagination.keyword
		);

		state.employees = [...listEmployee.value];
		state.totalPage = totalPage.value;
		state.totalRecord = totalRecord.value;

		setTimeout(() => {
			state.isLoading = false;
		}, 500);
	} catch (error) {
		console.log(error);
		state.isLoading = false;
	}
};

/**
 * Hàm xử lý cập nhật lại danh sách nhân viên
 * Author: LHH - 06/01/23
 */
const handleUpdateEmployeeList = (type, employeeId, data) => {
	try {
		console.log("Data", type, employeeId, data);
		let index;
		switch (type) {
			case "ADD":
			// state.employees.unshift(data);
			// state.totalRecord++;
			// state.totalPage = Math.round(
			// 	state.totalRecord / state.pagination.pageSize
			// );
			// break;
			case "DUPLICATE":
				state.employees.unshift(data);
				state.totalRecord++;
				state.totalPage = Math.round(
					state.totalRecord / state.pagination.pageSize
				);
				break;
			case "EDIT":
				index = state.employees.findIndex(
					(emp) => emp.EmployeeId === employeeId
				);

				if (index !== -1) {
					state.employees[index] = data;
				}
				break;
			case "DELETE":
				console.log("Before:", state.employees);

				state.totalRecord = state.totalRecord - data.length;
				state.totalPage = Math.round(
					state.totalRecord / state.pagination.pageSize
				);
				state.pagination.pageNumber = 1;

				state.employees = [
					...state.employees.filter(
						(emp) => !data.includes(emp.EmployeeId)
					),
				];

				break;

			default:
				break;
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý mở modal
 * Author: LHH - 02/01/23
 */
const handleOpenModal = (title, content, type, employeeId, callback) => {
	try {
		state.modal = {
			isOpen: true,
			title,
			content,
			type,
			employeeId,
			callback,
		};

		console.log(state.modal.type);
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
 * Hàm xử lý bind lỗi cho input
 * @param {Objec} errors Lỗi
 * Author: LHH - 23/02/23
 */
const handleSetErrorForm = (errors) => {
	state.form.formError = {
		...errors,
	};
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
const handleShowToast = ({ type, content }) => {
	state.toasts.unshift({ type, content, key: new Date() });
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
	handleUpdateEmployeeList,
	handleOpenModal,
	handleCloseModal,
	handleOpenForm,
	handleCloseForm,
	handleSetErrorForm,
	handleOpenSidebar,
	handleCloseSidebar,
	handleOpenLoading,
	handleCloseLoading,
	handleShowToast,
	handleCloseToast,
};
