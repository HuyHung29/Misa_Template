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
