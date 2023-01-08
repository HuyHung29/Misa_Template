<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import ENUMS from "../../constants/enum";
import { ref, watch } from "vue";

/**
 * Định nghĩa các props
 * Author: LHH - 04/01/23
 */
const props = defineProps({
	title: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	value: {
		type: [String, Date],
		default: "",
	},
	tabindex: {
		type: Number,
	},
	placeholder: {
		type: String,
		default: "DD/MM/YYYY",
	},
	size: {
		type: String,
		validator(value) {
			return ["sm", "lg"].includes(value);
		},
	},
	error: {
		type: String,
	},
	hasMessage: {
		type: Boolean,
		default: false,
	},
});

/**
 * Định nghĩa các emit
 * Author: LHH -
 */
const emit = defineEmits(["change"]);

/**
 * Tạo các state của component
 * Author: LHH -
 */
const date = ref();

/**
 * Hàm format date
 * Author: LHH - 05/01/23
 */
const format = (date) => {
	try {
		const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		const month =
			date.getMonth() + 1 < 10
				? "0" + (date.getMonth() + 1)
				: date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Theo dõi sự thay đổi của các state
 * Author: LHH - 05/01/23
 */
watch(date, () => {
	try {
		emit("change", { name: props.name, value: date });
	} catch (error) {
		console.log(error);
	}
});

/**
 * Theo dõi sự thay đổi của props
 * Author: LHH - 05/01/23
 */
watch(
	() => props.value,
	(newVal) => {
		try {
			date.value = newVal;
		} catch (error) {
			console.log(error);
		}
	}
);
</script>

<template>
	<div
		class="date-picker"
		:class="{
			'date-picker--sm': size === 'sm',
			'date-picker--lg': size === 'lg',
		}"
	>
		<label v-if="title" class="date-picker__label">{{ title }}</label>
		<div class="date-picker__wrapper">
			<Datepicker
				v-model="date"
				placeholder="DD/MM/YYYY"
				text-input
				auto-apply
				close-on-scroll
				show-now-button
				:enable-time-picker="false"
				:format="format"
				hide-offset-dates
				:day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
			>
				<template
					#dp-input="{ value, onInput, onEnter, onTab, onClear }"
				>
					<div class="date-picker__wrapper">
						<input
							type="text"
							class="date-picker__input"
							:placeholder="placeholder"
							:name="name"
							:value="value"
							:tabindex="tabindex"
							autocomplete="off"
						/>
						<p class="date-picker__icon">
							<i></i>
						</p>
					</div>
				</template>
				<template #month="{ text, value }">
					{{ ENUMS.month[text] }}
				</template>
				<template #now-button="{ selectCurrentDate }">
					<div class="date-picker__calendar__footer">
						<button
							class="btn btn--link"
							@click="selectCurrentDate()"
						>
							<a class="btn__text">Hôm nay</a>
						</button>
					</div>
				</template>
			</Datepicker>
		</div>
		<p v-if="hasMessage" class="date-picker__error">{{ error }}</p>
	</div>
</template>

<style scoped>
.dp-custom-cell {
	border-radius: 50%;
}
</style>
