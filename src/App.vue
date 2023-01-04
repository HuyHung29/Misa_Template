<script setup>
import SideBar from "./components/TheSideBar.vue";
import Header from "./components/TheHeader.vue";
import Loading from "./components/MLoading.vue";
import EmployeeList from "./views/EmployeeList.vue";
import Form from "./components/MForm.vue";
import Dialog from "./components/MDialog.vue";
import { inject } from "vue";

const store = inject("store");

const { state } = store;
</script>

<template>
	<router-view />
	<!-- <div
		class="container"
		:class="{
			'container--sidebar-close': !state.sidebar.isOpen,
		}"
	>
		<SideBar />

		<div class="content">
			<Header />
			<div class="body">
				<EmployeeList />
			</div>
		</div>
		<Form v-if="state.form.isOpen" />
		<Dialog v-if="state.modal.isOpen" />
	</div> -->
</template>
