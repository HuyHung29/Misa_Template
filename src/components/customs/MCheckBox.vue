<script setup>
// Định nghĩa props
const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		default: "",
	},
	name: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		default: "",
	},
	checked: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["check"]);

const handleCheck = (e) => {
	emit("check", e.target);
};
</script>

<template>
	<div class="checkbox">
		<input
			@change="handleCheck"
			type="checkbox"
			:name="name"
			:id="id"
			class="checkbox__input"
			:checked="checked"
			:value="value"
		/>
		<label :for="id" class="checkbox__label"><i></i></label>
		<label v-if="title" :for="id" class="checkbox__title">{{
			title
		}}</label>
	</div>
</template>
