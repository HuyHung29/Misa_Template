import { reactive, readonly } from "vue";

// Khởi tạo store
const state = reactive({
	employees: [],
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
});

/**
 * Hàm xử lý đóng mở modal
 * Author: LHH - 02/01/23
 */
const handleOpenModal = (title, content, type, employeeId) => {
	state.modal = {
		isOpen: true,
		title,
		content,
		type,
		employeeId,
	};

	console.log(state.modal);
};

const handleCloseModal = () => {
	state.modal = {
		isOpen: false,
	};
};

/**
 * Hàm xử lý đóng mở form
 * Author: LHH - 02/01/23
 */
const handleOpenForm = (type, employeeId) => {
	state.form = {
		isOpen: true,
		type,
		employeeId,
	};
	console.log(state.form);
};

const handleCloseForm = () => {
	state.form = {
		isOpen: false,
		type: "",
		employeeId: "",
	};

	console.log(state.form);
};

/**
 * Hàm xử lý đóng mở sidebar
 * Author: LHH - 02/01/23
 */
const handleOpenSidebar = () => {
	state.sidebar.isOpen = true;
};

const handleCloseSidebar = () => {
	state.sidebar.isOpen = false;
};

export default {
	state: readonly(state),
	handleOpenModal,
	handleCloseModal,
	handleOpenForm,
	handleCloseForm,
	handleOpenSidebar,
	handleCloseSidebar,
};
