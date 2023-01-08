<script setup>
import { onMounted, ref, watch } from "vue";
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
	placeholder: {
		type: String,
		default: "",
	},
	tooltip: {
		type: String,
	},
	focus: {
		type: Boolean,
		default: false,
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
	hasMessage: {
		type: Boolean,
		default: false,
	},
});

/**
 * Định nghĩa các emit
 * Author: LHH - 04/01/23
 */
const emit = defineEmits(["change"]);

/**
 * Định nghĩa state dùng trong component
 * Author: LHH - 04/01/23
 */
const inputState = ref(props.value);
const inputRef = ref(null);

/**
 * Xử lý binding dữ liệu
 * Author: LHH - 04/01/23
 */
watch(inputState, () => {
	try {
		emit("change", { name: props.name, value: inputState.value });
	} catch (error) {
		console.log(error);
	}
});

onMounted(() => {
	if (props.focus) {
		inputRef.value.focus();
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
		<p v-if="hasMessage" class="textfield__error">Error</p>
	</div>
</template>
