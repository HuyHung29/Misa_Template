import axios from "axios";
import queryString from "query-string";
import RESOURCES from "../constants/resource";
import store from "../store";

/**
 * Config axios
 * Author: LHH - 02/01/23
 */
const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		"content-type": "application/json",
	},
	paramsSerializer: {
		encode: queryString.parse,
		serialize: (params) => queryString.stringify(params),
	},
});

/**
 * Config response
 * Author: LHH - 02/01/23
 */
axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		try {
			// Xử lý lỗi chung cho các request trả về
			const { handleShowToast, handleSetErrorForm, handleCloseLoading } =
				store;
			const { ERROR } = RESOURCES.NOTIFICATION_TYPE;
			const { DEFAULT } = RESOURCES.NOTIFICATION_MESSAGE.ERROR;
			if (error.response) {
				const { data } = error.response;

				handleCloseLoading();
				handleShowToast({
					type: ERROR,
					content: data.UserMes ? data.UserMes : DEFAULT,
				});

				if (data.MoreInfo) {
					handleSetErrorForm(data.MoreInfo);
				} else {
					handleSetErrorForm({});
				}
			} else {
				handleShowToast({
					type: ERROR,
					content: DEFAULT,
				});
			}

			// throw error.response.data;
		} catch (err) {
			console.log(err);
		}
	}
);

export default axiosClient;
