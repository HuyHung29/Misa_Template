<script setup>
import Input from "../components/customs/MInput.vue";
import Select from "./customs/MSelect.vue";
import DatePicker from "../components/customs/MDatePicker.vue";
import Radio from "../components/customs/MRadio.vue";
import Button from "../components/MButton.vue";
import Loading from "../components/MLoading.vue";
import CheckBox from "../components/customs/MCheckBox.vue";
import {
	computed,
	inject,
	onBeforeMount,
	onMounted,
	onUnmounted,
	reactive,
	ref,
} from "vue";
import RESOURCES from "../constants/resource";
import useEmployee from "../composable/employee";
import useDepartment from "../composable/department";

/**
 * Lấy dữ liệu từ store
 * Author: LHH - 04/01/23
 */
const {
	state,
	handleUpdateEmployeeList,
	handleOpenForm,
	handleCloseForm,
	handleOpenModal,
	handleOpenLoading,
	handleCloseLoading,
	handleShowToast,
	handleCloseModal,
} = inject("store");

/**
 * Các state và hàm liên quan đến employee
 * Author: LHH - 04/01/23
 */
const {
	newEmployeeCode,
	newEmployee,
	editEmployee,
	statusCode,
	getEmployeeById,
	getNewEmployeeCode,
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
// const { positions, getAllPosition } = usePosition();

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

/**
 * Các state của form
 * Author: LHH - 04/01/23
 */
const formState = reactive({
	formValue: {
		EmployeeCode: "",
		FullName: "",
		DepartmentId: "",
		Position: "",
		DateOfBirth: null,
		Gender: 0,
		IdentityNumber: "",
		IdentityDate: null,
		IdentityPlace: "",
		Address: "",
		PhoneNumber: "",
		LandlineNumber: "",
		Email: "",
		BankAccount: "",
		BankName: "",
		BankBranch: "",
	},
	editEmployeeCode: "",
	formError: {
		EmployeeCode: null,
		FullName: null,
		DepartmentId: null,
		PhoneNumber: null,
		Email: null,
	},
});

const originValue = ref({
	EmployeeCode: "",
	FullName: "",
	DepartmentId: "",
	Position: "",
	DateOfBirth: "",
	Gender: 0,
	IdentityNumber: "",
	IdentityDate: "",
	IdentityPlace: "",
	Address: "",
	PhoneNumber: "",
	LandlineNumber: "",
	Email: "",
	BankAccount: "",
	BankName: "",
	BankBranch: "",
});
/**
 * Các quy tắc để validate
 * Author: LHH - 27/01/23
 */
const { NOT_EMPTY, UNIQUE, ADULT, HAS_FORMAT } = RESOURCES.FORM_RULES;

/**
 * Khai báo ref cho các input
 * Author: LHH - 27/01/23
 */
const codeRef = ref(null);
const nameRef = ref(null);
const unitRef = ref(null);
const dateOfBirthRef = ref(null);
const identityDateRef = ref(null);
const phoneRef = ref(null);
const emailRef = ref(null);

/**
 * Tính toán tên form
 * Author: LHH - 04/01/23
 */
const formName = computed(() => {
	try {
		if (state.form.type === RESOURCES.FORM_MODE.ADD) {
			return "Thêm nhân viên";
		}
		if (state.form.type === RESOURCES.FORM_MODE.EDIT) {
			return "Sửa nhân viên";
		}

		return "Nhân bản nhân viên";
	} catch (error) {
		console.log(error);
	}
});

/**
 * Xử lý call API
 * Author: LHH - 04/01/23
 */
const handleCallApi = async () => {
	try {
		if (state.form.type) {
			await getAllDepartment();

			departmentList.value = [...departments.value];

			if (state.form.type === RESOURCES.FORM_MODE.ADD) {
				await handleGetNewEmployeeCode();
			}

			if (state.form.type === RESOURCES.FORM_MODE.EDIT) {
				await handleGetEditEmployee(state.form.employeeId);
			}

			if (state.form.type === RESOURCES.FORM_MODE.DUPLICATE) {
				await handleGetEditEmployee(state.form.employeeId);
				await handleGetNewEmployeeCode();
			}

			originValue.value = { ...formState.formValue };
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hook xử lý các công việc trước khi render
 * Author: LHH - 27/01/23
 */
onBeforeMount(() => {
	try {
		handleCallApi();
	} catch (error) {
		console.log(error);
	}
});

/**
 * Xử lý focus vào mã nhân viên
 * Author: LHH - 27/01/23
 */

function doc_keyUp(e) {
	// this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
	if (e.ctrlKey && e.key === "ArrowDown") {
		// call your function to do the thing

		console.log("hello");
	}
}

onMounted(() => {
	if (codeRef.value) {
		codeRef.value.setFocusInput();
	}

	document.addEventListener("keyup", doc_keyUp, false);
});

onUnmounted(() => {
	document.removeEventListener("keyup", doc_keyUp);
});

/**
 * Hàm xử lý lấy nhân viên sửa
 * Author: LHH - 04/01/23
 */
const handleGetEditEmployee = async (id) => {
	try {
		handleOpenLoading();

		await getEmployeeById(id);

		const { EmployeeCode, DepartmentId, DateOfBirth, IdentityDate } =
			editEmployee.value;

		formState.formValue = {
			...editEmployee.value,
			DepartmentId: DepartmentId
				? DepartmentId
				: departmentList.value[0].DepartmentId,
		};

		formState.editEmployeeCode = EmployeeCode;

		handleCloseLoading();
	} catch (error) {
		console.log(error);
		handleCloseLoading();
		handleShowToast({
			type: RESOURCES.NOTIFICATION_TYPE.ERROR,
			content: error.UserMes,
		});
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

		if (state.form.type === RESOURCES.FORM_MODE.ADD) {
			formState.formValue = {
				EmployeeCode: newEmployeeCode.value,
				FullName: "",
				DepartmentId: "",
				Position: "",
				DateOfBirth: null,
				Gender: 0,
				IdentityNumber: "",
				IdentityDate: null,
				IdentityPlace: "",
				Address: "",
				PhoneNumber: "",
				LandlineNumber: "",
				Email: "",
				BankAccount: "",
				BankName: "",
				BankBranch: "",
			};
		} else {
			formState.formValue.EmployeeCode = newEmployeeCode.value;
		}

		handleCloseLoading();
	} catch (error) {
		console.log(error);
		handleCloseLoading();
		handleShowToast({
			type: RESOURCES.NOTIFICATION_TYPE.ERROR,
			content: error,
		});
	}
};

/**
 * Xử lý submit form
 * Author: LHH - 04/01/23
 */
const handleSubmit = async () => {
	try {
		console.log("Value", formState.formValue);
		await handleValidateForm();

		let isError = false;

		for (const key in formState.formError) {
			if (Object.hasOwnProperty.call(formState.formError, key)) {
				const element = formState.formError[key];
				if (element) {
					handleOpenModal(
						RESOURCES.MODAL_TITLE.ERROR,
						element,
						RESOURCES.MODAL_TYPE.ERROR
					);
					isError = true;
					return;
				}
			}
		}

		if (!isError) {
			const data = {
				...formState.formValue,
			};

			if (
				state.form.type === RESOURCES.FORM_MODE.ADD ||
				state.form.type === RESOURCES.FORM_MODE.DUPLICATE
			) {
				await addNewEmployee(data);
			}

			if (state.form.type === RESOURCES.FORM_MODE.EDIT) {
				await updateNewEmployee(state.form.employeeId, data);
			}
		}
	} catch (error) {
		throw error;
	}
};

/**
 * Xử lý hiển thị thông báo thành công
 * Author: LHH - 10/01/23
 */
const handleShowSuccessMessage = () => {
	handleShowToast({
		type: RESOURCES.NOTIFICATION_TYPE.SUCCESS,
		content: RESOURCES.FORM_MESSAGE.SUCCESS[state.form.type],
	});
};

/**
 * Xử lý khi gửi dữ liệu
 * Author: LHH - 31/01/23
 */
const handleAddEditEmployee = async () => {
	try {
		handleOpenLoading();

		await handleSubmit();

		if (statusCode.value) {
			handleUpdateEmployeeList(
				state.form.type,
				state.form.employeeId,
				newEmployee.value
			);

			handleShowSuccessMessage();
			handleCloseModal();

			handleCloseLoading();

			return true;
		}

		handleCloseLoading();

		return false;
	} catch (error) {
		handleCloseLoading();
		console.log(error);

		const { UserMes, MoreInfo } = error;

		for (const key in MoreInfo) {
			if (Object.hasOwnProperty.call(MoreInfo, key)) {
				const value = MoreInfo[key];

				formState.formError[key] = value;
			}
		}

		handleShowToast({
			type: RESOURCES.NOTIFICATION_TYPE.ERROR,
			content: UserMes,
		});

		return false;
	}
};

/**
 * Xử lý ấn vào nút cất
 * Author: LHH - 08/01/23
 */
const onStoreBtnClick = async () => {
	try {
		if (await handleAddEditEmployee()) {
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
		if (await handleAddEditEmployee()) {
			handleOpenForm(RESOURCES.FORM_MODE.ADD);
			await handleGetNewEmployeeCode();
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
		if (
			JSON.stringify(formState.formValue) ===
				JSON.stringify(originValue.value) &&
			state.form.type !== RESOURCES.FORM_MODE.ADD
		) {
			handleCloseForm();
		} else {
			handleOpenModal(
				RESOURCES.MODAL_TITLE.INFO,
				RESOURCES.MODAL_MESSAGE.INFO,
				RESOURCES.MODAL_TYPE.INFO,
				state.form.employeeId,
				onStoreBtnClick
			);
		}
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
		formState.formError[name] = null;

		console.log("Name: ", name, "Value: ", value);
		console.log("State: ", formState.formValue);
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý binding error
 * Author: LHH - 27/01/23
 */
const handleBindError = ({ name, message }) => {
	try {
		formState.formError[name] = message;
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
		await codeRef.value.handleValidate();
		await nameRef.value.handleValidate();
		await unitRef.value.handleValidate();
		await dateOfBirthRef.value.handleValidate();
		await identityDateRef.value.handleValidate();
		await phoneRef.value.handleValidate();
		await emailRef.value.handleValidate();
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lsy quay đầu tab index
 * Author: LHH - 15/02/23
 */
const handleSetTabIndex = (e) => {
	if (e.keyCode === 9) {
		e.preventDefault();
		codeRef.value.setFocusInput();
	}
};
</script>

<template>
	<div class="overlay">
		<div class="form">
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
									ref="codeRef"
									isRequired
									title="Mã"
									name="EmployeeCode"
									size="sm"
									:rules="[NOT_EMPTY, HAS_FORMAT, UNIQUE]"
									:tabindex="1"
									:value="formState.formValue.EmployeeCode"
									:originValue="formState.editEmployeeCode"
									@change="handleBindValue"
									@error="handleBindError"
									:error="
										formState.formError
											? formState.formError.EmployeeCode
											: ''
									"
								/>
							</div>
							<div class="form__col col--8">
								<Input
									ref="nameRef"
									isRequired
									title="Tên"
									name="FullName"
									size="sm"
									:rules="[NOT_EMPTY]"
									:tabindex="2"
									:value="formState.formValue.FullName"
									@change="handleBindValue"
									@error="handleBindError"
									:error="
										formState.formError
											? formState.formError.FullName
											: ''
									"
								/>
							</div>
							<div class="form__col col--12">
								<Select
									ref="unitRef"
									size="sm"
									isRequired
									name="DepartmentId"
									title="Đơn vị"
									:rules="[NOT_EMPTY]"
									:tabindex="3"
									:defaultValue="
										departments?.find(
											(item) =>
												item.DepartmentId ===
												formState.formValue.DepartmentId
										)?.DepartmentName
									"
									:listValue="departmentOptions"
									@select="handleBindValue"
									@error="handleBindError"
									:error="
										formState.formError
											? formState.formError.DepartmentId
											: ''
									"
								/>
							</div>
							<div class="form__col col--12">
								<Input
									title="Chức danh"
									name="Position"
									size="sm"
									:tabindex="4"
									:value="formState.formValue.Position"
									@change="handleBindValue"
								/>
							</div>
						</div>
					</div>
					<div class="form__col col--6">
						<div class="form__row row-gap">
							<div class="form__col col--5">
								<DatePicker
									ref="dateOfBirthRef"
									size="sm"
									title="Ngày sinh"
									name="DateOfBirth"
									:rules="[ADULT]"
									:tabindex="5"
									:value="formState.formValue.DateOfBirth"
									@change="handleBindValue"
									@error="handleBindError"
									placeholder="DD/MM/YYYY"
									:error="
										formState.formError
											? formState.formError.DateOfBirth
											: ''
									"
								/>
							</div>
							<div class="form__col col--7">
								<Radio
									name="Gender"
									size="sm"
									:list="RESOURCES.GENDER"
									:defaultValue="formState.formValue.Gender"
									@check="handleBindValue"
									title="Giới tính"
									:tabindex="6"
								/>
							</div>
							<div class="form__col col--7">
								<Input
									title="Số CMND"
									name="IdentityNumber"
									size="sm"
									:tabindex="9"
									tooltip="Số chứng minh nhân dân"
									:value="formState.formValue.IdentityNumber"
									@change="handleBindValue"
								/>
							</div>
							<div class="form__col col--5">
								<DatePicker
									ref="identityDateRef"
									size="sm"
									title="Ngày cấp"
									name="IdentityDate"
									:rules="[]"
									:tabindex="10"
									:value="formState.formValue.IdentityDate"
									@change="handleBindValue"
									@error="handleBindError"
									placeholder="DD/MM/YYYY"
									:error="
										formState.formError
											? formState.formError.IdentityDate
											: ''
									"
								/>
							</div>
							<div class="form__col col--12">
								<Input
									title="Nơi cấp"
									name="IdentityPlace"
									size="sm"
									:tabindex="11"
									:value="formState.formValue.IdentityPlace"
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
							name="Address"
							size="sm"
							:tabindex="12"
							:value="formState.formValue.Address"
							@change="handleBindValue"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							ref="phoneRef"
							title="ĐT di động"
							name="PhoneNumber"
							size="sm"
							tooltip="Điện thoại di động"
							type="money"
							:tabindex="13"
							:rules="[HAS_FORMAT]"
							:value="formState.formValue.PhoneNumber"
							@change="handleBindValue"
							@error="handleBindError"
							:error="
								formState.formError
									? formState.formError.PhoneNumber
									: ''
							"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							title="ĐT cố định"
							name="LandlineNumber"
							size="sm"
							tooltip="Điện thoại cố định"
							:tabindex="14"
							:value="formState.formValue.LandlineNumber"
							@change="handleBindValue"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							ref="emailRef"
							title="Email"
							name="Email"
							placeholder="example@gmail.com"
							type="email"
							size="sm"
							:rules="[HAS_FORMAT]"
							:tabindex="15"
							:value="formState.formValue.Email"
							@change="handleBindValue"
							@error="handleBindError"
							:error="
								formState.formError
									? formState.formError.Email
									: ''
							"
						/>
					</div>
					<div class="form__col col--3"></div>
					<div class="form__col col--3">
						<Input
							:tabindex="16"
							title="Tài khoản ngân hàng"
							name="BankAccount"
							size="sm"
							:value="formState.formValue.BankAccount"
							@change="handleBindValue"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							:tabindex="17"
							title="Tên ngân hàng"
							name="BankName"
							size="sm"
							:value="formState.formValue.BankName"
							@change="handleBindValue"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							:tabindex="18"
							title="Chi nhánh"
							name="BankBranch"
							size="sm"
							:value="formState.formValue.BankBranch"
							@change="handleBindValue"
						/>
					</div>
				</div>
			</div>
			<div class="form__action">
				<Button
					type="sub"
					content="Hủy"
					@click="handleCloseForm"
					:tabindex="21"
					@keydown="handleSetTabIndex"
				/>
				<div class="form__action__group">
					<Button
						type="sub"
						content="Cất"
						action="button"
						@click.prevent="onStoreBtnClick"
						:tabindex="19"
					/>
					<Button
						content="Cất và thêm"
						action="button"
						@click="onStoreAndAddBtnClick"
						:tabindex="20"
					/>
				</div>
			</div>

			<Loading v-show="state.isLoading" />
		</div>
	</div>
</template>
