<script setup>
import Input from "../components/Customs/MInput.vue";
import DropDown from "../components/Customs/MDropDown.vue";
import DatePicker from "../components/Customs/MDatePicker.vue";
import Radio from "../components/Customs/MRadio.vue";
import { inject, onMounted, reactive, ref } from "vue";
import { formatDate } from "../util/common";
import useEmployee from "../composable/employee";
import useDepartment from "../composable/department";

const store = inject("store");

const { state, handleCloseForm, handleOpenModal } = store;

const {
	newEmployeeCode,
	editEmployee,
	statusCode,
	getEmployeeById,
	getNewEmployeeCode,
	addNewEmployee,
	updateNewEmployee,
} = useEmployee();

const { departments, getAllDepartment } = useDepartment();

const departmentsOption = ref([]);

const formState = reactive({
	formValue: {
		EmployeeCode: "",
		FullName: "",
		DepartmentName: "",
		PositionName: "",
		DateOfBirth: "",
		Gender: "",
		IdentityNumber: "",
		IdentityDate: "",
		IdentityPlace: "",
		PhoneNumber: "",
		PersonalTaxCode: "",
		Email: "",
	},
	formError: {},
});

onMounted(() => {
	if (state.form.type) {
		if (state.form.type === "edit") {
			handleGetEditEmployee(state.form.employeeId);
		} else {
			handleGetNewEmployeeCode();
		}
	}
});

const handleGetEditEmployee = async (id) => {
	try {
		await getEmployeeById(id);
		await getAllDepartment();
		const {
			EmployeeCode,
			FullName,
			DepartmentName,
			PositionName,
			DateOfBirth,
			Gender,
			IdentityNumber,
			IdentityDate,
			IdentityPlace,
			PhoneNumber,
			PersonalTaxCode,
			Email,
		} = editEmployee.value;

		formState.formValue = {
			EmployeeCode,
			FullName,
			DepartmentName,
			PositionName,
			DateOfBirth: formatDate(DateOfBirth),
			Gender,
			IdentityNumber,
			IdentityDate: formatDate(IdentityDate),
			IdentityPlace,
			PhoneNumber,
			PersonalTaxCode,
			Email,
		};

		departmentsOption.value = [
			...departments.value.map((item) => item.DepartmentName),
		];
	} catch (error) {}
};

const handleGetNewEmployeeCode = async () => {
	try {
		await getNewEmployeeCode();
		await getAllDepartment();

		formState.formValue = {
			EmployeeCode: newEmployeeCode.value,
		};

		departmentsOption.value = [
			...departments.value.map((item) => item.DepartmentName),
		];
	} catch (error) {}
};

const handleSubmit = async () => {
	handleValidateForm();

	if (Object.entries(formState.formError).length !== 0) {
		const { EmployeeCode, FullName, DepartmentName } = formState.formError;
		handleOpenModal(
			"Có lỗi",
			EmployeeCode || FullName || DepartmentName,
			"error"
		);
	} else {
		if (state.form.type === "add") {
			await addNewEmployee(formState.formValue);
			if (statusCode.value === 1) {
				handleCloseForm();
			}
		} else if (state.form.type === "edit") {
			await updateNewEmployee(state.form.employeeId, formState.formValue);
			if (statusCode.value === 1) {
				handleCloseForm();
			}
		}
	}
};

const onCloseBtnClick = () => {
	handleOpenModal(
		"Xác nhận",
		"Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
		"info"
	);
};

const handleBindInputValue = (target) => {
	formState.formValue[target.name] = target.value;
};

const handleBindSelectValue = ({ name, value }) => {
	formState.formValue[name] = value;
};

const handleBindRadioValue = ({ name, value }) => {
	formState.formValue[name] = value;
};

const handleValidateForm = () => {
	const { EmployeeCode, FullName, DepartmentName } = formState.formValue;

	if (!EmployeeCode) {
		formState.formError.EmployeeCode = "Mã nhân viên không được để trống";
	} else {
		formState.formError = {};
	}

	if (!FullName) {
		formState.formError.FullName = "Tên nhân viên không được để trống";
	} else {
		formState.formError = {};
	}

	if (!DepartmentName) {
		formState.formError.DepartmentName = "Đơn vị không được để trống";
	} else {
		formState.formError = {};
	}
};
</script>

<template>
	<div class="overlay">
		<form class="form" @submit.prevent="handleSubmit">
			<div class="form__header">
				<h2 class="form__heading">Thông tin nhân viên</h2>

				<div class="form__header__user-type">
					<div class="form__header__user-type__item">
						<Radio
							title="Là khách hàng"
							name="user-type"
							id="client"
						/>
					</div>
					<div class="form__header__user-type__item">
						<Radio
							title="Là nhà cung cấp"
							name="user-type"
							id="contributor"
						/>
					</div>
				</div>

				<div class="form__header__button">
					<p class="form__header__button__question"></p>
					<p
						class="form__header__button__close"
						@click="onCloseBtnClick"
					></p>
				</div>
			</div>
			<div class="form__body">
				<div class="form__row gutter--12">
					<div class="form__col col--6">
						<div class="form__row row-gap">
							<div class="form__col col--4">
								<Input
									isRequired
									title="Mã"
									name="EmployeeCode"
									size="sm"
									:value="formState.formValue.EmployeeCode"
									@change="handleBindInputValue"
									:error="
										formState.formError
											? formState.formError.EmployeeCode
											: ''
									"
								/>
							</div>
							<div class="form__col col--8">
								<Input
									isRequired
									title="Tên"
									name="FullName"
									size="sm"
									:value="formState.formValue.FullName"
									@change="handleBindInputValue"
									:error="
										formState.formError
											? formState.formError.FullName
											: ''
									"
								/>
							</div>
							<div class="form__col col--12">
								<DropDown
									size="sm"
									isRequired
									name="DepartmentName"
									title="Đơn vị"
									:value="formState.formValue.DepartmentName"
									:listValue="departmentsOption"
									@select="handleBindSelectValue"
									:error="
										formState.formError
											? formState.formError.FullName
											: ''
									"
								/>
							</div>
							<div class="form__col col--12">
								<Input
									title="Chức danh"
									name="PositionName"
									size="sm"
									:value="formState.formValue.PositionName"
									@change="handleBindInputValue"
								/>
							</div>
						</div>
					</div>
					<div class="form__col col--6">
						<div class="form__row row-gap">
							<div class="form__col col--5">
								<DatePicker
									size="sm"
									title="Ngày sinh"
									name="DateOfBirth"
									:value="formState.formValue.DateOfBirth"
								/>
							</div>
							<div class="form__col col--7">
								<Radio
									type="radio"
									name="Gender"
									:value="formState.formValue.Gender"
									@check="handleBindRadioValue"
								/>
							</div>
							<div class="form__col col--7">
								<Input
									title="Số CMND"
									name="IdentityNumber"
									size="sm"
									tooltip="Số chứng minh nhân dân"
									:value="formState.formValue.IdentityNumber"
									@change="handleBindInputValue"
								/>
							</div>
							<div class="form__col col--5">
								<DatePicker
									size="sm"
									title="Ngày cấp"
									name="IdentityDate"
									:value="formState.formValue.IdentityDate"
								/>
							</div>
							<div class="form__col col--12">
								<Input
									title="Nơi cấp"
									name="IdentityPlace"
									size="sm"
									:value="formState.formValue.IdentityPlace"
									@change="handleBindInputValue"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="form__row row-gap">
					<div class="form__col col--12">
						<Input
							title="Địa chỉ"
							name="Address"
							size="sm"
							:value="formState.formValue.Address"
							@change="handleBindInputValue"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="ĐT di động"
							name="PhoneNumber"
							size="sm"
							tooltip="Điện thoại di động"
							:value="formState.formValue.PhoneNumber"
							@change="handleBindInputValue"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="ĐT cố định"
							name="PersonalTaxCode"
							size="sm"
							tooltip="Điện thoại cố định"
							:value="formState.formValue.PersonalTaxCode"
							@change="handleBindInputValue"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="Email"
							name="Email"
							type="email"
							size="sm"
							:value="formState.formValue.Email"
							@change="handleBindInputValue"
						/>
					</div>
					<div class="form__col col--3"></div>
					<div class="form__col col--3">
						<Input
							title="Tài khoản ngân hàng"
							name="bank-account"
							size="sm"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="Tên ngân hàng"
							name="bank-name"
							size="sm"
						/>
					</div>
					<div class="form__col col--3">
						<Input title="Chi nhánh" name="bank-branch" size="sm" />
					</div>
				</div>
			</div>
			<div class="form__action">
				<button
					class="btn btn--sub"
					id="cancel-form-btn"
					@click="handleCloseForm"
					type="button"
				>
					<span class="btn__text">Hủy</span>
				</button>
				<div class="form__action__group">
					<button
						class="btn btn--sub"
						@click="handleCloseForm"
						type="button"
					>
						<span class="btn__text">Cất</span>
					</button>
					<button class="btn" id="add-form-btn" type="submit">
						<span class="btn__text">Cất và thêm</span>
					</button>
				</div>
			</div>
		</form>
	</div>
</template>
