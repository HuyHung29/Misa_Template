<script setup>
import Radio from "../components/customs/MRadio.vue";
import RESOURCES from "../constants/resource";
</script>

<template>
	<div>
		<Radio
			name="Gender"
			size="sm"
			:list="RESOURCES.GENDER"
			:defaultValue="RESOURCES.GENDER.MALE"
			@check="handleBindValue"
			title="Giới tính"
		/>
	</div>
</template>

<style></style>
