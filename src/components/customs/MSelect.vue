<script setup>
import { reactive, watch } from "vue";

/**
 * Định nghĩa các props
 * Author: LHH - 04/01/23
 */
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
	tabindex: {
		type: Number,
	},
	defaultValue: {
		type: [String, Number],
	},
	size: {
		type: String,
		validator(value) {
			return ["sm", "lg"].includes(value);
		},
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
});

/**
 * Định nghĩa các emit
 * Author: LHH - 04/01/23
 */
const emit = defineEmits(["select"]);

/**
 * Định nghĩa các state của component
 * Author: LHH - 04/01/23
 */
const state = reactive({
	isShow: false,
	value: props.defaultValue,
});

/**
 * Xử lý thay đổi dữ liệu
 * Author: LHH - 04/01/23
 */
const handleChangeValue = (item) => {
	try {
		state.value = item.title;
		state.isShow = false;
		emit("select", { name: props.name, value: item.value });
	} catch (error) {
		console.log(error);
	}
};

/**
 * Theo dõi sự thay đổi của props
 * Author: LHH - 04/01/23
 */
watch(
	() => props.defaultValue,
	(newVal) => {
		try {
			if (newVal) {
				state.value = newVal;
			}
		} catch (error) {
			console.log(error);
		}
	}
);

/**
 * Xử lý mở select
 * Author: LHH - 04/01/23
 */
const handleOpenList = () => {
	try {
		state.isShow = true;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý đóng select
 * Author: LHH - 04/01/23
 */
const handleCloseList = () => {
	try {
		state.isShow = false;
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div
		class="select"
		:class="{
			'select--sm': size === 'sm',
			'select--lg': size === 'lg',
			invalid: error,
		}"
	>
		<label v-if="title" for="" class="select__label"
			>{{ title }} <span v-if="isRequired">*</span></label
		>
		<div class="select__input__wrap">
			<p class="select__icon">
				<i></i>
			</p>
			<input
				type="text"
				class="select__input"
				:value="state.value"
				@click="state.isShow = !state.isShow"
				:tabindex="tabindex"
			/>
			<ul class="select__list" v-show="state.isShow" :style="style">
				<li
					v-for="item in listValue"
					class="select__item"
					:class="{ selected: item.title === state.value }"
					:key="item.value"
					@click="handleChangeValue(item)"
				>
					{{ item.title }}
				</li>
			</ul>
		</div>
		<p v-if="error" class="select__error">{{ error }}</p>
	</div>
</template>

<style></style>
