import axios from "axios";
import queryString from "query-string";

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
		throw error;
	}
);

export default axiosClient;
