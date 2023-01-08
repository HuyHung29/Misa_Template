<script setup>
/**
 * Định nghĩa các props
 * Author: LHH - 04/01/23
 */
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
	action: {
		type: String,
		validator(value) {
			return ["submit", "reset", "button"].includes(value);
		},
		default: "button",
	},
});
</script>

<template>
	<button
		:type="action"
		class="btn"
		:class="{
			'btn--sub': type === 'sub',
		}"
	>
		<span class="btn__text">{{ content }}</span>
	</button>
</template>

<style></style>
