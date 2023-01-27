<script setup>
import { onMounted, onUpdated, ref, watch } from "vue";
import { inputValidation } from "../../util/common";
/**
 * Định nghĩa các props
 * Author: LHH - 04/01/23
 */
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
		type: [String, Number],
		default: "",
	},
	originValue: {
		type: [String, Number],
	},
	rules: {
		type: Array,
		default: [],
	},
	placeholder: {
		type: String,
		default: "",
	},
	tooltip: {
		type: String,
	},
	tabindex: {
		type: Number,
	},
	type: {
		type: String,
		default: "text",
	},
	size: {
		type: String,
		validator(value) {
			return ["sm", "lg"].includes(value);
		},
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
const emit = defineEmits(["change", "error"]);

/**
 * Định nghĩa state dùng trong component
 * Author: LHH - 04/01/23
 */
const inputState = ref(props.value);
const inputRef = ref(null);

/**
 * Hàm set focus cho input
 * Author: LHH - 26/01/23
 */
const setFocusInput = () => {
	try {
		if (inputRef.value) {
			inputRef.value.focus();
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý validate
 * Author: LHH - 26/01/23
 */
const handleValidate = async () => {
	const message = await inputValidation(
		props.rules,
		inputState.value || props.value,
		props.name,
		props.originValue
	);

	emit("error", {
		name: props.name,
		message,
	});
};

/**
 * Định nghĩa các expose
 * Author: LHH - 26/01/23
 */
defineExpose({
	setFocusInput,
	handleValidate,
});

/**
 * Xử lý binding dữ liệu
 * Author: LHH - 04/01/23
 */
watch(inputState, () => {
	try {
		emit("change", {
			name: props.name,
			value: inputState.value,
		});
	} catch (error) {
		console.log(error);
	}
});
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
				ref="inputRef"
				:type="type"
				class="textfield__input"
				:name="name"
				:placeholder="placeholder"
				:tabindex="tabindex"
				:value="value"
				v-model="inputState"
			/>
		</div>
		<p class="textfield__error">
			{{ error || "Thông tin không đúng" }}
		</p>
	</div>
</template>
