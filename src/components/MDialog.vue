<script setup>
import RESOURCES from "../constants/resource";
import { inject } from "vue";
import useEmployee from "../composable/employee";

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
const handleDeleteBtn = async () => {
	try {
		if (state.modal.type === RESOURCES.MODAL_TYPE.WARNING) {
			await deleteEmployee(state.modal.employeeId);

			if (statusCode.value === 1) {
				await handleGetEmployees();
				handleCloseModal();
				handleShowToast({
					type: RESOURCES.NOTIFICATION_TYPE.SUCCESS,
					key: new Date(),
					content: "Xóa nhân viên thành công",
				});
			}
		} else {
			handleCloseModal();
			handleCloseForm();
		}
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
				<button
					v-if="state.modal.type !== RESOURCES.MODAL_TYPE.ERROR"
					@click="handleCloseModal"
					class="btn btn--sub"
					:style="{
						'margin-right': 'auto',
					}"
				>
					<span class="btn__text">{{
						state.modal.type === RESOURCES.MODAL_TYPE.WARNING
							? "Không"
							: "Hủy"
					}}</span>
				</button>
				<button
					v-if="state.modal.type === RESOURCES.MODAL_TYPE.INFO"
					class="btn btn--sub"
					@click="handleCloseAll"
				>
					<span class="btn__text">Không</span>
				</button>
				<button
					class="btn"
					@click="handleDeleteBtn"
					v-if="state.modal.type !== RESOURCES.MODAL_TYPE.ERROR"
				>
					<span class="btn__text">Có</span>
				</button>
				<button
					@click="handleCloseModal"
					class="btn"
					v-if="state.modal.type === RESOURCES.MODAL_TYPE.ERROR"
					:style="{ margin: '0 auto' }"
				>
					<span class="btn__text">Đóng</span>
				</button>
			</div>
		</div>
	</div>
</template>

<style></style>
