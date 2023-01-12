<script setup>
import Sidebar from "../components/TheSideBar.vue";
import Header from "../components/TheHeader.vue";
import Form from "../components/MForm.vue";
import Dialog from "../components/MDialog.vue";
import Loading from "../components/MLoading.vue";
import Toast from "../components/MToast.vue";
import { inject } from "vue";

/**
 * Các state dùng chung
 * Author: LHH - 04/01/23
 */
const { state } = inject("store");
</script>

<template>
	<div
		class="container"
		:class="{ 'container--sidebar-close': !state.sidebar.isOpen }"
	>
		<Sidebar />

		<div class="content">
			<Header />

			<div class="body">
				<router-view />
			</div>
		</div>
	</div>
	<Form v-if="state.form.isOpen" />
	<Dialog v-if="state.modal.isOpen" />
	<Loading v-show="state.isLoading" />
	<div class="toast-wrap">
		<Toast v-for="toast in state.toasts" :key="toast.key" :toast="toast" />
	</div>
</template>

<style></style>
