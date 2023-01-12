<script setup>
import useClickOutSide from "../../composable/clickOutSide";
import { reactive, ref, watch } from "vue";

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
	type: {
		type: String,
		validator(value) {
			return ["dropdown", "combobox"].includes(value);
		},
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
	indexItem: props.type === "dropdown" ? null : 0,
	listSearch: [...props.listValue],
});

/**
 * Định nghĩa các ref
 * Author: LHH - 12/01/23
 */
const listRef = ref(null);

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
	() => props,
	() => {
		try {
			state.value = props.defaultValue;
			state.listSearch = [...props.listValue];
		} catch (error) {
			console.log(error);
		}
	},
	{ deep: true }
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

/**
 * Xử lý đóng list khi click ra ngoài
 * Author: LHH -
 */
useClickOutSide(listRef, () => {
	if (state.isShow) {
		state.isShow = false;
	}
});

/**
 * Xử lý tìm kiếm
 * Author: LHH - 12/01/23
 */
const handleInput = (e) => {
	console.log(e.target.value);
	state.isShow = true;
	state.indexItem = 0;
	const inputVal = e.target.value.toLowerCase();

	if (!inputVal) {
		state.indexItem = 0;
		state.listSearch = props.listValue;
	}

	state.listSearch = props.listValue.filter((item) =>
		item.title.toLowerCase().includes(inputVal)
	);
};

/**
 * Xử lý ấn nút lên xuống và enter
 * Author: LHH - 12/01/23
 */

const handleChangeItemSelected = (e) => {
	switch (e.keyCode) {
		case 38:
			state.isShow = true;
			if (state.indexItem > 0) {
				state.indexItem--;
			}
			break;
		case 40:
			state.isShow = true;
			const length = state.listSearch.length;
			if (state.indexItem < length - 1) {
				state.indexItem++;
			}
			break;
		case 13:
			state.isShow = false;
			state.value = state.listSearch[state.indexItem].title;

			state.indexItem = props.listValue.findIndex(
				(item) => item.value === state.listSearch[state.indexItem].value
			);
			state.listSearch = [...props.listValue];
			emit("select", {
				name: props.name,
				value: state.listSearch[state.indexItem].value,
			});

			break;

		default:
			break;
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
		ref="listRef"
	>
		<label v-if="title" for="" class="select__label"
			>{{ title }} <span v-if="isRequired">*</span></label
		>
		<div class="select__input__wrap">
			<button class="select__icon" @click="state.isShow = !state.isShow">
				<i></i>
			</button>
			<input
				type="text"
				class="select__input"
				:readonly="type === 'dropdown'"
				v-model="state.value"
				@click="state.isShow = !state.isShow"
				:tabindex="tabindex"
				@input="handleInput"
				@keydown="handleChangeItemSelected"
			/>
			<ul class="select__list" v-show="state.isShow" :style="style">
				<li
					v-for="(item, index) in state.listSearch"
					class="select__item"
					:class="{
						selected:
							state.indexItem === index ||
							item.title === state.value,
					}"
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
