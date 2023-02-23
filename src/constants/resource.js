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
			DUPLICATE: "Nhân bản nhân viên thành công",
		},
		ERROR: {
			NOT_EMPTY: (name) => `${name} không được để trống`,
			UNIQUE: (name) => `${name} đã tồn tại trong hệ thống`,
			ADULT: "Nhân viên phải trên 18 tuổi",
			HAS_FORMAT: (name) => `${name} chưa đúng định dạng`,
			MAX_VALUE: (name, compareName) =>
				`${name} không được vượt quá ${compareName}`,
			MIN_VALUE: (name, compareName) =>
				`${name} không được nhỏ hơn ${compareName}`,
			MAX_LENGTH: (name, lenght) =>
				`${name} không được vượt quá ${lenght} ký tự`,
		},
	},
	INPUT_TITLE: {
		EmployeeCode: "Mã nhân viên",
		FullName: "Tên nhân viên",
		DepartmentId: "Đơn vị",
		Position: "Chức danh",
		PhoneNumber: "Số điện thoại",
		Email: "Email",
		DateOfBirth: "Ngày sinh",
		IdentityDate: "Ngày cấp",
		IdentityNumber: "Số chứng minh nhân dân",
		IdentityPlace: "Nơi cấp",
		BankName: "Tên ngân hàng",
		BankBranch: "Chi nhánh",
		LandlineNumber: "Điện thoại cố định",
		Address: "Địa chỉ",
		BankAccount: "Tài khoản ngân hàng",
	},
	INPUT_FIELD: {
		EMPLOYEE_CODE: "EmployeeCode",
		FULL_NAME: "FullName",
		DEPARTMENT_ID: "DepartmentId",
		PHONE_NUMBER: "PhoneNumber",
		EMAIL: "Email",
		DATEOFBIRTH: "DateOfBirth",
		IDENTITYDATE: "IdentityDate",
	},
	FORM_RULES: {
		NOT_EMPTY: () => ({
			NOT_EMPTY: "",
		}),
		HAS_FORMAT: (regex) => ({ HAS_FORMAT: regex }),
		UNIQUE: (compareValue) => ({ UNIQUE: compareValue }),
		ADULT: () => ({ ADULT: "" }),
		MAX_VALUE: (compareValue, compareName) => ({
			MAX_VALUE: { compareName, compareValue },
		}),
		MIN_VALUE: (compareValue, compareName) => ({
			MIN_VALUE: { compareName, compareValue },
		}),
		MAX_LENGTH: (length) => ({ MAX_LENGTH: length }),
	},
	FORM_RULES_NAME: {
		NOT_EMPTY: "NOT_EMPTY",
		HAS_FORMAT: "HAS_FORMAT",
		UNIQUE: "UNIQUE",
		ADULT: "ADULT",
		MAX_VALUE: "MAX_VALUE",
		MIN_VALUE: "MIN_VALUE",
		MAX_LENGTH: "MAX_LENGTH",
	},
	FORM_MODE: {
		ADD: "ADD",
		EDIT: "EDIT",
		DUPLICATE: "DUPLICATE",
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
		WARNING: (id) => `Bạn có thực sự muốn xóa Nhân viên \<${id}\> không?`,
		WARNING_MULTIPLE:
			"Bạn có thực sự muốn xóa những nhân viên được chọn không?",
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
	KEYCODE: {
		ARROW_DOWN: 38,
		ARROW_UP: 40,
		ENTER: 13,
	},
	REGEX: {
		EMPLOYEE_CODE: /^NV-[0-9]{1,17}$/,
		EMAIL: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
		PHONE_NUMBER: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
		LANDLINE_NUMBER: /^[0-9]{10,12}$/,
		IDENTITY_NUMBER: /^[0-9]{12}$/,
	},
	GENDER: [
		{
			value: 0,
			title: "Nam",
		},
		{
			value: 1,
			title: "Nữ",
		},
		{
			value: 2,
			title: "Khác",
		},
	],
	FILE_NAME: "Danh_sach_nhan_vien.xlsx",
};

export default RESOURCES;
