import useEmployee from "../composable/employee";
import ENUMS from "../constants/enum";
import RESOURCES from "../constants/resource";
/**
 * Hàm định dạng ngày tháng
 * Author: LHH - 02/01/23
 */
export const formatDate = (dateTime) => {
	if (dateTime !== null && dateTime !== undefined && dateTime) {
		dateTime = new Date(dateTime);
		let date =
			dateTime.getDate() < 10
				? "0" + dateTime.getDate()
				: dateTime.getDate();
		let month =
			dateTime.getMonth() < 9
				? `0${dateTime.getMonth() + 1}`
				: dateTime.getMonth() + 1;
		let year = dateTime.getFullYear();

		return `${date}/${month}/${year}`;
	}

	return "";
};

/**
 * Hàm định dạng tiền tệ
 * Author: LHH - 02/01/23
 */
export const formatMoney = (money) => {
	if (Number.parseInt(money)) {
		money = money.toLocaleString("it-IT", {
			style: "currency",
			currency: "VND",
		});
		return money;
	}

	return 0 + " VND";
};

/**
 * Hàm convert ngày tháng
 * Author: LHH - 06/01/23
 */
export const convertStringToDate = (data) => {
	if (data) {
		const str = data;

		const [day, month, year] = str.split("/");
		if (day && month && year) {
			const date = new Date(+year, +month - 1, +day);
			return date;
		}

		return "";
	}

	return "";
};

/**
 * Hàm convert ngày tháng
 * Author: LHH - 06/01/23
 */
export const formatGender = (gender) => {
	const { MALE, FEMALE, OTHER } = ENUMS.GENDER;
	switch (gender) {
		case MALE:
			return "Nam";
		case FEMALE:
			return "Nữ";
		case OTHER:
			return "Khác";
		default:
			return "";
	}
};

/**
 * Hàm validate input
 * Author: LHH - 26/01/23
 */
export const inputValidation = async (rules, value, name, checkValue) => {
	const { NOT_EMPTY, UNIQUE, ADULT, HAS_FORMAT } = RESOURCES.FORM_RULES;
	const { ERROR } = RESOURCES.FORM_MESSAGE;
	const { EMPLOYEE_CODE, EMAIL, PHONE_NUMBER } = RESOURCES.INPUT_FIELD;
	const { INPUT_TITLE } = RESOURCES;
	const { REGEX } = RESOURCES;

	console.log("Value: ", value);

	for (const rule of rules) {
		switch (rule) {
			case NOT_EMPTY: {
				if (!value) {
					return ERROR[rule](INPUT_TITLE[name]);
				}
				break;
			}
			case UNIQUE: {
				if (value) {
					const { employeeCheck, getEmployeeByEmpCode } =
						useEmployee();
					await getEmployeeByEmpCode(value);

					if (
						employeeCheck.value &&
						employeeCheck.value.EmployeeCode !== checkValue
					) {
						return ERROR[rule](INPUT_TITLE[name]);
					}
				}
				break;
			}
			case HAS_FORMAT: {
				if (value) {
					switch (name) {
						case EMPLOYEE_CODE: {
							if (value) {
								if (!REGEX.EMPLOYEE_CODE.test(value)) {
									return ERROR[rule](INPUT_TITLE[name]);
								}
							}
							break;
						}
						case PHONE_NUMBER: {
							if (value) {
								if (!REGEX.PHONE_NUMBER.test(value)) {
									return ERROR[rule](INPUT_TITLE[name]);
								}
							}
							break;
						}
						case EMAIL: {
							if (value) {
								if (!REGEX.EMAIL.test(value)) {
									return ERROR[rule](INPUT_TITLE[name]);
								}
							}
							break;
						}
						default:
							return null;
					}
				}
				break;
			}
			case ADULT: {
				if (value) {
					const date = new Date(value).getTime();
					const age = (Date.now() - date) / 1000 / 60 / 60 / 24 / 365;
					if (age < 18) {
						return ERROR[rule];
					}
				}
				break;
			}

			default:
				return null;
		}
	}
};

/**
 * Kiểm tra phần tử có quá giới hạn hay ko
 * Author: LHH - 31/01/23
 */
export const isOverflow = (element) => {
	if (element) {
		return (
			element.scrollHeight > element.clientHeight ||
			element.scrollWidth > element.clientWidth
		);
	}

	return false;
};
