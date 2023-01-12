const RESOURCES = {
	NOTIFICATION_TYPE: {
		SUCCESS: "SUCCESS",
		ERROR: "ERROR",
		INFO: "INFO",
		WARNING: "WARNING",
	},
	NOTIFICATION_TITLE: {
		SUCCESS: "Thành công",
		ERROR: "Lỗi",
		INFO: "Thông tin",
		WARNING: "Cảnh báo",
	},
	FORM_MESSAGE: {
		SUCCESS: {
			ADD: "Thêm mới nhân viên thành công!",
			EDIT: "Sửa nhân viên thành công!",
			DELETE: "Xóa nhân viên thành công",
		},
	},
	FORM_MODE: {
		ADD: "ADD",
		EDIT: "EDIT",
		DUPLICATE: "duplicate",
	},
	MODAL_TITLE: {
		INFO: "Xác nhận",
		WARNING: "Xác nhận xóa",
		ERROR: "Dữ liệu không đúng",
	},
	MODAL_TYPE: {
		INFO: "INFO",
		WARNING: "WARNING",
		ERROR: "ERROR",
	},
	MODAL_MESSAGE: {
		INFO: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
		WARNING: (id) => `Bạn có chắc chắn muốn xóa nhân viên \<${id}\> không?`,
	},
	PAGINATION: [
		{
			value: 20,
			title: "20 sản phẩm trên 1 trang",
		},
		{
			value: 50,
			title: "50 sản phẩm trên 1 trang",
		},
		{
			value: 100,
			title: "100 sản phẩm trên 1 trang",
		},
		{
			value: 150,
			title: "150 sản phẩm trên 1 trang",
		},
	],
};

export default RESOURCES;
