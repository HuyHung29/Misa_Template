<script setup>
import { reactive, ref } from "@vue/reactivity";
import Input from "../components/customs/MInput.vue";
import Select from "../components/customs/MSelect.vue";
import DatePicker from "../components/customs/MDatePicker.vue";
import Button from "../components/MButton.vue";
import RESOURCES from "../constants/resource";

import { computed, inject, onBeforeMount, onMounted } from "vue";
import useEmployee from "../composable/employee";
import useDepartment from "../composable/department";
import usePosition from "../composable/position";

/**
 * Các state sử dụng trong component
 * Author: LHH - 04/01/23
 */
const departmentList = ref([]);
const { departments, getAllDepartment } = useDepartment();

/**
 * Xử lý department option
 * Author: LHH - 06/01/23
 */
const departmentOptions = computed(() => {
	return departmentList.value.map((item) => ({
		value: item.DepartmentId,
		title: item.DepartmentName,
	}));
});

onBeforeMount(async () => {
	try {
		await getAllDepartment();

		departmentList.value = [...departments.value];
	} catch (error) {
		console.log(error);
	}
});

const state = reactive({
	employeeCode: "",
	fullName: "",
	departmentId: "",
	dateOfBirth: "",
	phoneNumber: "",
	email: "",
});

const error = reactive({
	employeeCode: null,
	fullName: null,
	departmentId: null,
	dateOfBirth: null,
	phoneNumber: null,
	email: null,
});

const { NOT_EMPTY, UNIQUE, ADULT, HAS_FORMAT } = RESOURCES.FORM_RULES;

const codeRef = ref(null);
const nameRef = ref(null);
const unitRef = ref(null);
const dateRef = ref(null);
const phoneRef = ref(null);
const emailRef = ref(null);

const handleBindValue = ({ name, value }) => {
	try {
		state[name] = value;
	} catch (error) {
		console.log(error);
	}
};

const handleBindError = ({ name, message }) => {
	try {
		error[name] = message;
	} catch (error) {
		console.log(error);
	}
};

const handleSubmit = async () => {
	await codeRef.value.handleValidate();
	await nameRef.value.handleValidate();
	await unitRef.value.handleValidate();
	await dateRef.value.handleValidate();
	await phoneRef.value.handleValidate();
	await emailRef.value.handleValidate();

	console.log("Error:", error, "Value:", state);
};
</script>

<template>
	<div>
		<Input
			name="employeeCode"
			title="Mã nhân viên"
			:value="state.employeeCode"
			:rules="[NOT_EMPTY, HAS_FORMAT, UNIQUE]"
			@change="handleBindValue"
			@error="handleBindError"
			ref="codeRef"
			:error="error.employeeCode"
		/>
		<Input
			name="fullName"
			title="Tên nhân viên"
			:value="state.fullName"
			@change="handleBindValue"
			ref="nameRef"
			:rules="[NOT_EMPTY]"
			@error="handleBindError"
			:error="error.fullName"
		/>
		<Select
			name="departmentId"
			title="Đơn vị"
			:defaultValue="
				departments?.find(
					(item) => item.DepartmentId === state.departmentId
				)?.DepartmentName
			"
			:listValue="departmentOptions"
			@select="handleBindValue"
			ref="unitRef"
			@error="handleBindError"
			:error="error.departmentId"
			:rules="[NOT_EMPTY]"
		/>
		<Input
			name="phoneNumber"
			title="Số điện thoại"
			:value="state.phoneNumber"
			@change="handleBindValue"
			ref="phoneRef"
			@error="handleBindError"
			:error="error.phoneNumber"
			:rules="[HAS_FORMAT]"
		/>
		<Input
			name="email"
			title="Email"
			:value="state.email"
			@change="handleBindValue"
			ref="emailRef"
			@error="handleBindError"
			:error="error.email"
			:rules="[HAS_FORMAT]"
		/>
		<DatePicker
			title="Ngày sinh"
			name="dateOfBirth"
			:value="state.dateOfBirth"
			:error="error.dateOfBirth"
			@change="handleBindValue"
			@error="handleBindError"
			:rules="[ADULT]"
			ref="dateRef"
		/>
		<Button content="Submit" @click="handleSubmit" />
	</div>
</template>

<style></style>
