<script setup>
// Định nghĩa các props
const props = defineProps({
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
	placeHolder: {
		type: String,
		default: "",
	},
	tooltip: {
		type: String,
	},
	tabIndex: {
		type: Number,
	},
	type: {
		type: String,
		default: "text",
	},
	size: {
		type: String,
		validator(value) {
			return ["sm", "md", "lg"].includes(value);
		},
		default: "md",
	},
	isRequired: {
		type: Boolean,
		default: false,
	},
	error: {
		type: String,
		default: null,
	},
	hasMessage: {
		type: Boolean,
		default: false,
	},
});

// Định nghĩa hàm
const emit = defineEmits(["change"]);

const handleChange = (e) => {
	emit("change", e.target);
};
</script>

<template>
	<div
		class="textfield"
		:class="{
			'textfield--sm': size === 'sm',
			'textfield--lg': size === 'lg',
			invalid: error,
		}"
	>
		<label v-if="title" class="textfield__label"
			>{{ title }} <span v-if="isRequired">*</span>
			<p v-if="tooltip" class="textfield__tooltip">
				{{ tooltip }}
			</p>
		</label>
		<div class="textfield__input__wrap">
			<input
				:type="type"
				class="textfield__input"
				:name="name"
				:placeholder="placeHolder"
				:tabindex="tabIndex"
				:value="value"
				@input="handleChange"
			/>
		</div>
		<p v-if="hasMessage" class="textfield__error">Error</p>
	</div>
</template>
