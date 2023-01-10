<script setup>
import Input from "../components/customs/MInput.vue";
import Select from "./customs/MSelect.vue";
import DatePicker from "../components/customs/MDatePicker.vue";
import Radio from "../components/customs/MRadio.vue";
import Button from "../components/MButton.vue";
import Loading from "../components/MLoading.vue";
import CheckBox from "../components/customs/MCheckBox.vue";
import { computed, inject, onBeforeMount, reactive, ref } from "vue";
import ENUMS from "../constants/enum";
import RESOURCES from "../constants/resource";
import useEmployee from "../composable/employee";
import useDepartment from "../composable/department";
import usePosition from "../composable/position";

/**
 * Lấy dữ liệu từ store
 * Author: LHH - 04/01/23
 */
const {
	state,
	handleGetEmployees,
	handleCloseForm,
	handleOpenModal,
	handleOpenLoading,
	handleCloseLoading,
	handleShowToast,
} = inject("store");

/**
 * Các state và hàm liên quan đến employee
 * Author: LHH - 04/01/23
 */
const {
	newEmployeeCode,
	editEmployee,
	employeeCheck,
	statusCode,
	getEmployeeById,
	getNewEmployeeCode,
	getEmployeeByEmpCode,
	addNewEmployee,
	updateNewEmployee,
} = useEmployee();

/**
 * Các state và hàm liên quan đến department
 * Author: LHH - 04/01/23
 */
const { departments, getAllDepartment } = useDepartment();

/**
 * Các state và hàm liên quan đến position
 * Author: LHH - 08/01/23
 */
const { positions, getAllPosition } = usePosition();

/**
 * Các state sử dụng trong component
 * Author: LHH - 04/01/23
 */
const departmentList = ref([]);

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

const formState = reactive({
	formValue: {
		employeeCode: "",
		fullName: "",
		departmentId: "",
		positionName: "",
		dateOfBirth: "",
		gender: 0,
		identityNumber: "",
		identityDate: "",
		identityPlace: "",
		address: "",
		phoneNumber: "",
		personalTaxCode: "",
		email: "",
	},
	editEmployeeCode: "",
	formError: {
		isError: null,
		fullName: null,
		employeeCode: null,
		departmentId: null,
	},
});

/**
 * Tính toán tên form
 * Author: LHH - 04/01/23
 */
const formName = computed(() => {
	try {
		if (state.form.type === RESOURCES.FORM_MODE.ADD)
			return "Thêm nhân viên";
		else if (state.form.type === RESOURCES.FORM_MODE.EDIT)
			return "Sửa nhân viên";
	} catch (error) {
		console.log(error);
	}
});

/**
 * Xử lý call API
 * Author: LHH - 04/01/23
 */
onBeforeMount(async () => {
	try {
		if (state.form.type) {
			await getAllDepartment();

			departmentList.value = [...departments.value];

			if (state.form.type === "edit") {
				await handleGetEditEmployee(state.form.employeeId);
			} else {
				await handleGetNewEmployeeCode();
			}
			await getAllPosition();
		}
	} catch (error) {
		console.log(error);
	}
});

/**
 * Hàm xử lý lấy nhân viên sửa
 * Author: LHH - 04/01/23
 */
const handleGetEditEmployee = async (id) => {
	try {
		handleOpenLoading();

		await getEmployeeById(id);

		const {
			EmployeeCode,
			FullName,
			DepartmentId,
			PositionName,
			PositionId,
			DateOfBirth,
			Gender,
			IdentityNumber,
			IdentityDate,
			IdentityPlace,
			Address,
			PhoneNumber,
			PersonalTaxCode,
			Email,
		} = editEmployee.value;

		formState.formValue = {
			employeeCode: EmployeeCode,
			fullName: FullName,
			departmentId: DepartmentId
				? DepartmentId
				: departmentList.value[0].DepartmentId,
			positionName:
				PositionName ??
				positions.value?.find(
					(position) => position.PositionId === PositionId
				).PositionName,
			dateOfBirth: DateOfBirth ? new Date(DateOfBirth) : "",
			gender: Gender,
			identityNumber: IdentityNumber,
			identityDate: IdentityDate ? new Date(IdentityDate) : "",
			identityPlace: IdentityPlace,
			address: Address,
			phoneNumber: PhoneNumber,
			personalTaxCode: PersonalTaxCode,
			email: Email,
		};

		formState.editEmployeeCode = EmployeeCode;

		handleCloseLoading();
	} catch (error) {
		console.log(error);
		handleCloseLoading();
	}
};

/**
 * Xử lý lấy mã nhân viên mới
 * Author: LHH - 04/01/23
 */
const handleGetNewEmployeeCode = async () => {
	try {
		handleOpenLoading();

		await getNewEmployeeCode();

		formState.formValue = {
			employeeCode: newEmployeeCode.value,
			fullName: "",
			departmentId: departmentList.value[0].DepartmentId,
			positionName: "",
			dateOfBirth: "",
			gender: 0,
			identityNumber: "",
			identityDate: "",
			identityPlace: "",
			address: "",
			phoneNumber: "",
			personalTaxCode: "",
			email: "",
		};

		handleCloseLoading();
	} catch (error) {
		console.log(error);
		handleCloseLoading();
		formState.formValue = {
			employeeCode: "",
			fullName: "",
			departmentId: "",
			positionName: "",
			dateOfBirth: "",
			gender: 0,
			identityNumber: "",
			identityDate: "",
			identityPlace: "",
			address: "",
			phoneNumber: "",
			personalTaxCode: "",
			email: "",
		};
	}
};

/**
 * Xử lý submit form
 * Author: LHH - 04/01/23
 */
const handleSubmit = async () => {
	try {
		await handleValidateForm();

		console.log(formState.formError);

		if (formState.formError.isError) {
			const {
				employeeCode,
				fullName,
				departmentId,
				dateOfBirth,
				identityDate,
				phoneNumber,
				email,
			} = formState.formError;
			handleOpenModal(
				RESOURCES.MODAL_TITLE.ERROR,
				employeeCode ||
					fullName ||
					departmentId ||
					dateOfBirth ||
					identityDate ||
					phoneNumber ||
					email,
				RESOURCES.MODAL_TYPE.ERROR
			);
		} else {
			const { dateOfBirth, identityDate } = formState.formValue;
			const formatDateOfBirth = new Date(dateOfBirth);
			formatDateOfBirth.setDate(formatDateOfBirth.getDate() + 1);
			const formatIdentityDate = new Date(identityDate);
			formatIdentityDate.setDate(formatIdentityDate.getDate() + 1);
			const data = {
				...formState.formValue,
				dateOfBirth: formatDateOfBirth,
				identityDate: formatIdentityDate,
			};
			if (state.form.type === RESOURCES.FORM_MODE.ADD) {
				await addNewEmployee(data);
			} else if (state.form.type === RESOURCES.FORM_MODE.EDIT) {
				await updateNewEmployee(state.form.employeeId, data);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý hiển thị thông báo thành công
 * Author: LHH - 10/01/23
 */
const handleShowSuccessMessage = () => {
	if (state.form.type === RESOURCES.FORM_MODE.ADD) {
		handleShowToast({
			type: RESOURCES.NOTIFICATION_TYPE.SUCCESS,
			key: new Date(),
			content: "Thêm nhân viên thành công",
		});
	} else if (state.form.type === RESOURCES.FORM_MODE.EDIT) {
		handleShowToast({
			type: RESOURCES.NOTIFICATION_TYPE.SUCCESS,
			key: new Date(),
			content: "Sửa nhân viên thành công",
		});
	}
};

/**
 * Xử lý ấn vào nút cất
 * Author: LHH - 08/01/23
 */
const onStoreBtnClick = async () => {
	try {
		await handleSubmit();
		if (statusCode.value === 1) {
			console.log(state.form.type);
			handleGetEmployees();
			handleShowSuccessMessage();
			handleCloseForm();
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý ấn vào nút cất và thêm
 * Author: LHH - 08/01/23
 */
const onStoreAndAddBtnClick = async () => {
	try {
		await handleSubmit();
		if (statusCode.value === 1) {
			handleGetEmployees();
			handleGetNewEmployeeCode();
			handleShowSuccessMessage();
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý ấn vào nút đóng form
 * Author: LHH - 04/01/23
 */
const onCloseBtnClick = () => {
	try {
		handleOpenModal(
			RESOURCES.MODAL_TITLE.INFO,
			RESOURCES.MODAL_MESSAGE.INFO,
			RESOURCES.MODAL_TYPE.INFO
		);
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý binding dữ liệu cho form
 * Author: LHH - 04/01/23
 */
const handleBindValue = ({ name, value }) => {
	try {
		formState.formValue[name] = value;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý validate form
 * Author: LHH - 04/01/23
 */
const handleValidateForm = async () => {
	try {
		const {
			employeeCode,
			fullName,
			departmentId,
			dateOfBirth,
			identityNumber,
			identityDate,
			phoneNumber,
			email,
		} = formState.formValue;

		formState.formError.isError = false;

		if (!employeeCode) {
			formState.formError.employeeCode =
				"Mã nhân viên không được để trống";
			formState.formError.isError = true;
		} else {
			await getEmployeeByEmpCode(employeeCode);
			if (
				employeeCheck.value &&
				employeeCheck.value.EmployeeCode !== formState.editEmployeeCode
			) {
				console.log(employeeCheck.value);
				formState.formError.employeeCode = "Mã nhân viên đã tồn tại";
				formState.formError.isError = true;
			} else {
				formState.formError.employeeCode = null;
			}
		}

		if (!fullName) {
			formState.formError.fullName = "Tên nhân viên không được để trống";
			formState.formError.isError = true;
		} else {
			formState.formError.fullName = null;
		}

		if (!departmentId) {
			formState.formError.departmentId = "Đơn vị không được để trống";
			formState.formError.isError = true;
		} else {
			formState.formError.departmentId = null;
		}

		if (dateOfBirth) {
			const date = new Date(dateOfBirth).getTime();
			const age = (Date.now() - date) / 1000 / 60 / 60 / 24 / 365;
			if (age < 18) {
				formState.formError.dateOfBirth = "Nhân viên phải trên 18 tuổi";
				formState.formError.isError = true;
			} else {
				formState.formError.dateOfBirth = null;
			}
		}

		if (identityNumber) {
			if (identityDate) {
				console.log(
					identityDate,
					dateOfBirth,
					identityNumber < dateOfBirth
				);
				if (identityDate < dateOfBirth) {
					formState.formError.identityDate = "Ngày cấp không đúng";
					formState.formError.isError = true;
				} else {
					formState.formError.dateOfBirth = null;
				}
			} else {
				formState.formError.identityDate =
					"Ngày cấp không được để trống";
				formState.formError.isError = true;
			}
		}

		if (phoneNumber) {
			const regexPhone =
				/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
			if (!regexPhone.test(phoneNumber)) {
				formState.formError.phoneNumber = "Ngày cấp không đúng";
				formState.formError.isError = true;
			} else {
				formState.formError.phoneNumber = null;
			}
		}

		if (email) {
			const regexEmail =
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			if (!regexEmail.test(email)) {
				formState.formError.email = "Email không đúng";
				formState.formError.isError = true;
			} else {
				formState.formError.email = null;
			}
		}
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div class="overlay">
		<form class="form" @submit.prevent="handleSubmit">
			<div class="form__header">
				<h2 class="form__heading">{{ formName }}</h2>

				<div class="form__header__user-type">
					<div class="form__header__user-type__item">
						<CheckBox
							title="Là khách hàng"
							id="client"
							name="user-type"
						/>
					</div>
					<div class="form__header__user-type__item">
						<CheckBox
							title="Là nhà cung cấp"
							id="contributor"
							name="user-type"
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
									:focus="true"
									isRequired
									title="Mã"
									name="employeeCode"
									size="sm"
									:tabindex="1"
									:value="formState.formValue.employeeCode"
									@change="handleBindValue"
									:error="
										formState.formError
											? formState.formError.employeeCode
											: ''
									"
								/>
							</div>
							<div class="form__col col--8">
								<Input
									isRequired
									title="Tên"
									name="fullName"
									size="sm"
									:tabindex="2"
									:value="formState.formValue.fullName"
									@change="handleBindValue"
									:error="
										formState.formError
											? formState.formError.fullName
											: ''
									"
								/>
							</div>
							<div class="form__col col--12">
								<Select
									size="sm"
									isRequired
									name="departmentId"
									title="Đơn vị"
									:tabindex="4"
									:listValue="departmentOptions"
									:defaultValue="
										editEmployee
											? departments?.find(
													(item) =>
														item.DepartmentId ===
														editEmployee?.DepartmentId
											  )?.DepartmentName
											: departmentOptions[0]?.title
									"
									@select="handleBindValue"
									:error="
										formState.formError
											? formState.formError.departmentId
											: ''
									"
								/>
							</div>
							<div class="form__col col--12">
								<Input
									title="Chức danh"
									name="positionName"
									size="sm"
									:tabindex="7"
									:value="formState.formValue.positionName"
									@change="handleBindValue"
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
									name="dateOfBirth"
									:tabindex="3"
									:value="formState.formValue.dateOfBirth"
									@change="handleBindValue"
									placeholder="DD/MM/YYYY"
									:error="
										formState.formError
											? formState.formError.dateOfBirth
											: ''
									"
								/>
							</div>
							<div class="form__col col--7">
								<Radio
									name="gender"
									size="sm"
									:list="ENUMS.GENDER"
									:defaultValue="formState.formValue.gender"
									@check="handleBindValue"
									title="Giới tính"
								/>
							</div>
							<div class="form__col col--7">
								<Input
									title="Số CMND"
									name="identityNumber"
									size="sm"
									:tabindex="5"
									tooltip="Số chứng minh nhân dân"
									:value="formState.formValue.identityNumber"
									@change="handleBindValue"
								/>
							</div>
							<div class="form__col col--5">
								<DatePicker
									size="sm"
									title="Ngày cấp"
									name="identityDate"
									:tabindex="6"
									:value="formState.formValue.identityDate"
									@change="handleBindValue"
									placeholder="DD/MM/YYYY"
									:error="
										formState.formError
											? formState.formError.identityDate
											: ''
									"
								/>
							</div>
							<div class="form__col col--12">
								<Input
									title="Nơi cấp"
									name="identityPlace"
									size="sm"
									:tabindex="8"
									:value="formState.formValue.identityPlace"
									@change="handleBindValue"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="form__row row-gap">
					<div class="form__col col--12">
						<Input
							title="Địa chỉ"
							name="address"
							size="sm"
							:tabindex="9"
							:value="formState.formValue.address"
							@change="handleBindValue"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="ĐT di động"
							name="phoneNumber"
							size="sm"
							tooltip="Điện thoại di động"
							:tabindex="10"
							:value="formState.formValue.phoneNumber"
							@change="handleBindValue"
							:error="
								formState.formError
									? formState.formError.phoneNumber
									: ''
							"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="ĐT cố định"
							name="personalTaxCode"
							size="sm"
							tooltip="Điện thoại cố định"
							:tabindex="11"
							:value="formState.formValue.personalTaxCode"
							@change="handleBindValue"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="Email"
							name="email"
							placeholder="example@gmail.com"
							type="email"
							size="sm"
							:tabindex="12"
							:value="formState.formValue.email"
							@change="handleBindValue"
							:error="
								formState.formError
									? formState.formError.email
									: ''
							"
						/>
					</div>
					<div class="form__col col--3"></div>
					<div class="form__col col--3">
						<Input
							title="Tài khoản ngân hàng"
							name="bank-account"
							size="sm"
							:tabindex="13"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="Tên ngân hàng"
							name="bank-name"
							size="sm"
							:tabindex="14"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="Chi nhánh"
							name="bank-branch"
							size="sm"
							:tabindex="15"
						/>
					</div>
				</div>
			</div>
			<div class="form__action">
				<Button
					type="sub"
					content="Hủy"
					@click="handleCloseForm"
					:tabindex="18"
				/>
				<div class="form__action__group">
					<Button
						type="sub"
						content="Cất"
						action="button"
						@click.prevent="onStoreBtnClick"
						:tabindex="17"
					/>
					<Button
						content="Cất và thêm"
						action="button"
						@click="onStoreAndAddBtnClick"
						:tabindex="16"
					/>
				</div>
			</div>
		</form>
	</div>
</template>
