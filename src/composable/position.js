import { ref } from "vue";
import positionApi from "../api/positionApi";

/**
 * Các state và hàm dùng chung cho position
 * Author: LHH - 08/01/23
 */
const usePosition = () => {
	try {
		const positions = ref(null);

		// Lấy tất cả chức danh
		const getAllPosition = async () => {
			try {
				const response = await positionApi.getAllPosition();

				positions.value = [...response];
			} catch (error) {
				console.log(error);
			}
		};

		return {
			positions,
			getAllPosition,
		};
	} catch (error) {
		console.log(error);
	}
};

export default usePosition;
