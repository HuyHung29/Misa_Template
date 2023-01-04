<script setup>
// Định nghĩa các props
const props = defineProps({
	title: {
		type: String,
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
		default: "MM/DD/YYYY",
	},
	size: {
		type: String,
		validator(value) {
			return ["sm", "md", "lg"].includes(value);
		},
		default: "md",
	},
	error: {
		type: String,
	},
	hasMessage: {
		type: Boolean,
		default: false,
	},
});
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
			<input
				type="text"
				class="date-picker__input"
				:placeholder="placeHolder"
				:name="name"
				:value="value"
			/>
			<p class="date-picker__icon">
				<i></i>
			</p>
		</div>
		<p v-if="hasMessage" class="date-picker__error">{{ error }}</p>

		<div class="date-picker__calendar">
			<div class="date-picker__calendar__header">
				<div class="date-picker__calendar__month-year">
					<p class="date-picker__calendar__month-year__text">
						Tháng 5, 2019
					</p>
					<p class="date-picker__calendar__month-year__icon">
						<i></i>
					</p>
				</div>

				<div class="date-picker__calendar__action">
					<p class="date-picker__calendar__action__item">
						<i class="icon-left"></i>
					</p>
					<p class="date-picker__calendar__action__item">
						<i class="icon-right"></i>
					</p>
				</div>
			</div>
			<div class="date-picker__calendar__body">
				<div class="date-picker__calendar__body__item day">T2</div>
				<div class="date-picker__calendar__body__item day">T3</div>
				<div class="date-picker__calendar__body__item day">T4</div>
				<div class="date-picker__calendar__body__item day">T5</div>
				<div class="date-picker__calendar__body__item day">T6</div>
				<div class="date-picker__calendar__body__item day">T7</div>
				<div class="date-picker__calendar__body__item day">CN</div>
				<div class="date-picker__calendar__body__item d1 active">1</div>
				<div class="date-picker__calendar__body__item d2">2</div>
				<div class="date-picker__calendar__body__item d3">3</div>
				<div class="date-picker__calendar__body__item d4">4</div>
				<div class="date-picker__calendar__body__item d5">5</div>
				<div class="date-picker__calendar__body__item d6">6</div>
				<div class="date-picker__calendar__body__item d7">7</div>
				<div class="date-picker__calendar__body__item d8">8</div>
				<div class="date-picker__calendar__body__item d9">9</div>
				<div class="date-picker__calendar__body__item d10">10</div>
				<div class="date-picker__calendar__body__item d11">11</div>
				<div class="date-picker__calendar__body__item d12">12</div>
				<div class="date-picker__calendar__body__item d13">13</div>
				<div class="date-picker__calendar__body__item d14">14</div>
				<div class="date-picker__calendar__body__item d14">15</div>
				<div class="date-picker__calendar__body__item d16">16</div>
				<div class="date-picker__calendar__body__item d17">17</div>
				<div class="date-picker__calendar__body__item d18">18</div>
				<div class="date-picker__calendar__body__item d19">19</div>
				<div class="date-picker__calendar__body__item d20">20</div>
				<div class="date-picker__calendar__body__item d21">21</div>
				<div class="date-picker__calendar__body__item d22">22</div>
				<div class="date-picker__calendar__body__item d23">23</div>
				<div class="date-picker__calendar__body__item d24">24</div>
				<div class="date-picker__calendar__body__item d25">25</div>
				<div class="date-picker__calendar__body__item d26">26</div>
				<div class="date-picker__calendar__body__item d27">27</div>
				<div class="date-picker__calendar__body__item d28">28</div>
				<div class="date-picker__calendar__body__item d29">29</div>
				<div class="date-picker__calendar__body__item d30">30</div>
				<div class="date-picker__calendar__body__item d31">31</div>
			</div>
			<div class="date-picker__calendar__footer">
				<button class="btn btn--link">
					<a href="#" class="btn__text">Hôm nay</a>
				</button>
			</div>
		</div>
	</div>
</template>
