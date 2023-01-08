import axiosClient from "./axiosClient";

const baseUrl = "Positions/";

/**
 * Các API liên quan đến Position
 * Author: LHH - 08/01/23
 */
const positionApi = {
	getAllPosition: () => {
		try {
			return axiosClient.get(baseUrl);
		} catch (error) {
			console.log(error);
		}
	},
	getPositionById: (id) => {
		try {
			return axiosClient.get(baseUrl + id);
		} catch (error) {
			console.log(error);
		}
	},
};

export default positionApi;
