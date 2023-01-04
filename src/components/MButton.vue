<script setup>
// Định nghĩa các props
const props = defineProps({
	type: {
		type: String,
		validator(value) {
			return ["primary", "sub"].includes(value);
		},
		default: "primary",
	},
	content: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<button
		class="btn"
		:class="{
			'btn--sub': type === 'sub',
		}"
	>
		<span class="btn__text">{{ content }}</span>
	</button>
</template>

<style></style>
