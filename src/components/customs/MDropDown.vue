<script setup>
import { reactive } from "vue";

// Định nghĩa các props
const props = defineProps({
	listValue: {
		type: Array,
		required: true,
		default: [],
	},
	title: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	value: {
		type: String,
	},
	size: {
		type: String,
		validator(value) {
			return ["sm", "md", "lg"].includes(value);
		},
		default: "md",
	},
	style: {
		type: Object,
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

const emit = defineEmits(["select"]);

const state = reactive({
	isShow: false,
	value: "",
});

const handleChangeValue = (value) => {
	state.value = value;
	state.isShow = false;
	emit("select", { name: props.name, value: state.value });
};
</script>

<template>
	<div
		class="dropdown"
		:class="{
			'dropdown--sm': size === 'sm',
			'dropdown--lg': size === 'lg',
			invalid: error,
		}"
	>
		<label v-if="title" for="" class="dropdown__label"
			>{{ title }} <span v-if="isRequired">*</span></label
		>
		<div class="dropdown__input__wrap">
			<p class="dropdown__icon">
				<i></i>
			</p>
			<input
				type="text"
				class="dropdown__input"
				:value="state.value"
				@focus="state.isShow = !state.isShow"
			/>
			<ul class="dropdown__list" v-show="state.isShow" :style="style">
				<li
					v-for="value in listValue"
					class="dropdown__item"
					:class="{ selected: value === state.value }"
					:key="value"
					@click="handleChangeValue(value)"
				>
					{{ value }}
				</li>
			</ul>
		</div>
		<p v-if="hasMessage" class="dropdown__error">Error Message</p>
	</div>
</template>

<style></style>
