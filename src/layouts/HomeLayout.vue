<script setup>
import Sidebar from "../components/TheSideBar.vue";
import Header from "../components/TheHeader.vue";
</script>

<template>
	<div class="container">
		<Sidebar />

		<div class="content">
			<Header />

			<div class="body">
				<router-view />
			</div>
		</div>
	</div>
</template>

<style></style>
