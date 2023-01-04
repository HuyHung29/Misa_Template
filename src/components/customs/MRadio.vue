<script setup>
import { ref } from "vue";
// Định nghĩa các props
const props = defineProps({
	title: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	id: {
		type: String,
	},
	type: {
		type: String,
		validator(value) {
			return ["check", "radio"].includes(value);
		},
		default: "check",
	},
	value: {
		type: [Number, String],
		default: 0,
	},
	hasMessage: {
		type: Boolean,
		default: false,
	},
});

const radioValue = ref(0);

const emit = defineEmits(["check"]);

const handleRadioChange = () => {
	emit("check", { name: props.name, value: radioValue.value });
};
</script>

<template>
	<div class="radiofield-check" v-if="type === 'check'">
		<input
			type="radio"
			:name="name"
			:id="id"
			class="radiofield-check__input"
		/>
		<label :for="id" class="radiofield-check__label">
			<i></i>
		</label>
		<label :for="id" class="radiofield-check__title">{{ title }}</label>
	</div>
	<div class="radiofield radiofield--sm" v-if="type === 'radio'">
		<label for="" class="radiofield__label">Giới tính</label>
		<div class="radiofield__input__wrap">
			<div class="radiofield__input__item">
				<input
					type="radio"
					:name="name"
					id="male"
					class="radiofield__input"
					value="0"
					:checked="value === 0"
					v-model="radioValue"
					@change="handleRadioChange"
				/>
				<label for="male" class="radiofield__input__icon"></label>
				<label for="male" class="radiofield__input__label">Nam</label>
			</div>

			<div class="radiofield__input__item">
				<input
					type="radio"
					:name="name"
					id="female"
					value="1"
					class="radiofield__input"
					:checked="value === 1"
					v-model="radioValue"
					@change="handleRadioChange"
				/>
				<label for="female" class="radiofield__input__icon"></label>
				<label for="female" class="radiofield__input__label">Nữ</label>
			</div>

			<div class="radiofield__input__item">
				<input
					type="radio"
					:name="name"
					id="other"
					value="2"
					class="radiofield__input"
					:checked="value === 2"
					v-model="radioValue"
					@change="handleRadioChange"
				/>
				<label for="other" class="radiofield__input__icon"></label>
				<label for="other" class="radiofield__input__label">Khác</label>
			</div>
		</div>
		<p v-if="hasMessage" class="radiofield__error">Error</p>
	</div>
</template>
