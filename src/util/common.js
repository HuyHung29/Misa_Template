import useEmployee from "../composable/employee";
import ENUMS from "../constants/enum";
import RESOURCES from "../constants/resource";
/**
 * @param {Date} dateTime Ngày tháng còn format
 * Hàm định dạng ngày tháng
 * @returns Ngày tháng dạng DD/MM/YYYY
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
 * @param {String} money Tiền cần định dạng
 * @returns Tiền dã được định dạng
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
 * Hàm chuyển đổi chuỗi thành ngày tháng
 * @param {String} data Ngày tháng cần convert
 * @returns Ngày tháng tương ứng
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
 * Hàm format
 * @param {date} date Ngày tháng cần convert
 * @returns Ngày tháng tương ứng
 * Author: LHH - 06/01/23
 */
export const convertStringToDateUSUK = (date, isJson) => {
	if (date) {
		// console.log("TIme: ", date);
		const [day, month, year] = date.toString().split("/");
		// console.log(day, month, year);

		const newDateString = `${year}/${month}/${day}`;

		const dtFormat = new Intl.DateTimeFormat("en-US", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});

		const newDateTime = new Date(newDateString);
		if (isJson) {
			newDateTime.setHours(newDateTime.getHours() + 24);
		}

		return dtFormat.format(newDateTime);
	}
};

/**
 *
 * @param {Number} gender Giới tính
 * @returns Tên của giới tính tương ứng
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
 *
 * @param {Array} rules Các rule validate
 * @param {String || Date} value Giá trị càn kiển tra
 * @param {String} name Tên của input cần validate
 * @returns Lỗi tương ứng với các rule
 *  Author: LHH - 26/01/23
 */
export const inputValidation = (rules, value, name) => {
	const { NOT_EMPTY, ADULT, HAS_FORMAT, MAX_VALUE, MIN_VALUE, MAX_LENGTH } =
		RESOURCES.FORM_RULES_NAME;
	const { ERROR } = RESOURCES.NOTIFICATION_MESSAGE;
	const { INPUT_TITLE } = RESOURCES;

	for (const rule of rules) {
		const key = Object.keys(rule)[0];
		const objecValue = rule[key];

		const compareValue = objecValue.compareValue
			? objecValue.compareValue
			: objecValue;
		const compareName = objecValue.compareName
			? objecValue.compareName
			: "";

		switch (key) {
			case NOT_EMPTY: {
				if (!value) {
					return ERROR[key](INPUT_TITLE[name]);
				}
				break;
			}
			case HAS_FORMAT: {
				if (value) {
					if (!compareValue.test(value)) {
						return ERROR[key](INPUT_TITLE[name]);
					}
				}
				break;
			}
			case ADULT: {
				if (value) {
					console.log(value);
					const date = new Date(value).getTime();
					const age = (Date.now() - date) / 1000 / 60 / 60 / 24 / 365;
					if (age < 18) {
						return ERROR[key];
					}
				}
				break;
			}
			case MAX_VALUE: {
				if (value) {
					const rawValue =
						typeof value === "object" ? new Date(value) : value;
					const rawCompareValue =
						typeof compareValue === "object"
							? new Date(compareValue)
							: compareValue;
					if (rawValue > rawCompareValue) {
						return ERROR[key](
							INPUT_TITLE[name],
							INPUT_TITLE[compareName]
						);
					}
				}
				break;
			}
			case MIN_VALUE: {
				if (value) {
					const rawValue =
						typeof value === "object" ? new Date(value) : value;
					const rawCompareValue =
						typeof compareValue === "object"
							? new Date(compareValue)
							: compareValue;

					if (rawValue < rawCompareValue) {
						return ERROR[key](
							INPUT_TITLE[name],
							INPUT_TITLE[compareName]
						);
					}
				}
				break;
			}
			case MAX_LENGTH: {
				if (value) {
					if (value.length > compareValue) {
						return ERROR[key](INPUT_TITLE[name], compareValue);
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
		var curOverflow = element.style.overflow;

		if (!curOverflow || curOverflow === "visible")
			element.style.overflow = "hidden";

		var isOverflowing =
			element.clientWidth < element.scrollWidth ||
			element.clientHeight < element.scrollHeight;

		element.style.overflow = curOverflow;

		return isOverflowing;
	}

	return false;
};
