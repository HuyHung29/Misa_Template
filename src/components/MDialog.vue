<script setup>
import RESOURCES from "../constants/resource";
import { inject } from "vue";
import useEmployee from "../composable/employee";
import Button from "./MButton.vue";

/**
 * Các state và phương thức dùng chung
 * Author: LHH - 04/01/23
 */
const {
	state,
	handleGetEmployees,
	handleCloseModal,
	handleCloseForm,
	handleShowToast,
} = inject("store");

/**
 * Các state và phương thức liên quan đến employee
 * Author: LHH - 04/01/23
 */
const { statusCode, deleteEmployee } = useEmployee();

/**
 * Xử lý đóng dialog
 * Author: LHH - 04/01/23
 */
const handleCloseAll = () => {
	try {
		handleCloseModal();
		handleCloseForm();
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý ấn nút xóa
 * Author: LHH - 04/01/23
 */
const handleAgreeBtnClick = async () => {
	try {
		// if (state.modal.type === RESOURCES.MODAL_TYPE.WARNING) {
		// 	await deleteEmployee(state.modal.employeeId);
		// }

		// if (state.modal.type === RESOURCES.MODAL_TYPE.INFO) {
		// 	await state.modal.callback();
		// 	// handleCloseAll();
		// }

		// if (statusCode.value) {
		// 	await handleGetEmployees();

		// 	handleShowToast({
		// 		type: RESOURCES.NOTIFICATION_TYPE.SUCCESS,
		// 		content:
		// 			state.modal.type === RESOURCES.MODAL_TYPE.WARNING
		// 				? "Xóa nhân viên thành công"
		// 				: RESOURCES.FORM_MESSAGE.SUCCESS[state.form.type],
		// 	});
		// 	handleCloseAll();
		// }

		await state.modal.callback();
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div class="overlay">
		<div
			class="dialog"
			:class="{
				'dialog--error':
					state.modal.type === RESOURCES.MODAL_TYPE.ERROR,
				'dialog--info': state.modal.type === RESOURCES.MODAL_TYPE.INFO,
			}"
		>
			<div class="dialog__header">
				<h3 class="dialog__heading">{{ state.modal.title }}</h3>
				<p class="dialog__close-btn" @click="handleCloseModal">
					<i></i>
				</p>
			</div>
			<div class="dialog__body">
				<div class="dialog__content">
					<p class="dialog__content__icon"></p>
					<p class="dialog__content__text">
						{{ state.modal.content }}
					</p>
				</div>
			</div>
			<div class="dialog__action">
				<Button
					type="sub"
					@click="handleCloseModal"
					v-if="state.modal.type === RESOURCES.MODAL_TYPE.INFO"
					content="Hủy"
				/>
				<Button
					type="sub"
					@click="handleCloseAll"
					v-if="state.modal.type !== RESOURCES.MODAL_TYPE.ERROR"
					content="Không"
				/>
				<Button
					@click="handleAgreeBtnClick"
					v-if="state.modal.type !== RESOURCES.MODAL_TYPE.ERROR"
					content="Có"
					:type="
						state.modal.type === RESOURCES.MODAL_TYPE.WARNING
							? 'warning'
							: 'primary'
					"
				/>
				<Button
					@click="handleCloseModal"
					v-if="state.modal.type === RESOURCES.MODAL_TYPE.ERROR"
					content="Đóng"
				/>
			</div>
		</div>
	</div>
</template>

<style></style>
