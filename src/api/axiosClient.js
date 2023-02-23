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
			const { status, data } = error.response;
			const { handleShowToast, handleSetErrorForm, handleCloseLoading } =
				store;
			const { ERROR } = RESOURCES.NOTIFICATION_TYPE;

			handleCloseLoading();
			handleShowToast({ type: ERROR, content: data.UserMes });

			handleSetErrorForm(data.MoreInfo);

			// throw error.response.data;
		} catch (err) {
			console.log(store.state);
			console.log("Looi axios:", err);
		}
	}
);

export default axiosClient;
