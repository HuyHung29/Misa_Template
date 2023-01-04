<script setup>
import { inject } from "vue";
import useEmployee from "../composable/employee";

const store = inject("store");

const { state, handleCloseModal, handleCloseForm } = store;

const { statusCode, deleteEmployee } = useEmployee();

const handleCloseAll = () => {
	handleCloseModal();
	handleCloseForm();
};

const handleDeleteBtn = async () => {
	if (state.modal.type === "warning") {
		await deleteEmployee(state.modal.employeeId);

		if (statusCode.value === 1) {
			handleCloseModal();
		}
	} else {
		handleCloseModal();
		handleCloseForm();
	}
};
</script>

<template>
	<div class="overlay">
		<div
			class="dialog"
			:class="{
				'dialog--error': state.modal.type === 'error',
				'dialog--info': state.modal.type === 'info',
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
					v-if="state.modal.type !== 'error'"
					@click="handleCloseModal"
					class="btn btn--sub"
					:style="{
						'margin-right': 'auto',
					}"
				>
					<span class="btn__text">{{
						state.modal.type === "warning" ? "Không" : "Hủy"
					}}</span>
				</button>
				<button
					v-if="state.modal.type === 'info'"
					class="btn btn--sub"
					@click="handleCloseAll"
				>
					<span class="btn__text">Không</span>
				</button>
				<button
					class="btn"
					@click="handleDeleteBtn"
					v-if="state.modal.type !== 'error'"
				>
					<span class="btn__text">Có</span>
				</button>
				<button
					@click="handleCloseModal"
					class="btn"
					v-if="state.modal.type === 'error'"
					:style="{ margin: '0 auto' }"
				>
					<span class="btn__text">Đóng</span>
				</button>
			</div>
		</div>
	</div>
</template>

<style></style>
