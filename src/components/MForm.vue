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
	watch,
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
		Position: null,
		DateOfBirth: null,
		IdentityNumber: null,
		IdentityDate: null,
		IdentityPlace: null,
		Address: null,
		PhoneNumber: null,
		LandlineNumber: null,
		Email: null,
		BankAccount: null,
		BankName: null,
		BankBranch: null,
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
const { NOT_EMPTY, ADULT, HAS_FORMAT, MIN_VALUE, MAX_LENGTH } =
	RESOURCES.FORM_RULES;

/**
 * Các regex cho input
 * Author: LHH - 27/01/23
 */
const { EMAIL, EMPLOYEE_CODE, PHONE_NUMBER, IDENTITY_NUMBER, LANDLINE_NUMBER } =
	RESOURCES.REGEX;

/**
 * Các form mode
 * Author: LHH - 27/01/23
 */
const { ADD, DUPLICATE, EDIT } = RESOURCES.FORM_MODE;

/**
 * Các nootification type
 * Author: LHH - 27/01/23
 */
const { ERROR, SUCCESS } = RESOURCES.NOTIFICATION_TYPE;

/**
 * Khai báo ref cho các input
 * Author: LHH - 27/01/23
 */
const employeeCodeRef = ref(null);
const fullNameRef = ref(null);
const departmentIdRef = ref(null);
const positionRef = ref(null);
const dateOfBirthRef = ref(null);
const identityNumberRef = ref(null);
const identityDateRef = ref(null);
const identityPlaceRef = ref(null);
const addressRef = ref(null);
const phoneNumberRef = ref(null);
const landlineNumberRef = ref(null);
const emailRef = ref(null);
const bankAccountRef = ref(null);
const bankNameRef = ref(null);
const bankBranchRef = ref(null);

/**
 * Tính toán tên form
 * Author: LHH - 04/01/23
 */
const formName = computed(() => {
	try {
		if (state.form.type === ADD) {
			return "Thêm nhân viên";
		}
		if (state.form.type === EDIT) {
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

			if (state.form.type === ADD) {
				await handleGetNewEmployeeCode();
			}

			if (state.form.type === EDIT) {
				await handleGetEditEmployee(state.form.employeeId);
			}

			if (state.form.type === DUPLICATE) {
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
 * Hàm xử lý phím tắt trong form
 * @param {event} e Sự kiện html
 */
function docKeyDown(e) {
	console.log(e);
	// this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
	if (e.ctrlKey && e.key === "s") {
		e.preventDefault();
		e.stopPropagation();

		// call your function to do the thing
		onStoreBtnClick();

		console.log("save");
	}

	if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
		e.preventDefault();
		e.stopPropagation();

		// call your function to do the thing
		onStoreAndAddBtnClick();

		console.log("save and add");
	}

	if (e.code === "Escape") {
		onCloseBtnClick();
	}
}

/**
 * Xử lý focus vào mã nhân viên và các phím tắt ở form
 * Author: LHH - 27/01/23
 */
onMounted(() => {
	if (employeeCodeRef.value) {
		employeeCodeRef.value.setFocusInput();
	}

	document.addEventListener("keydown", docKeyDown, false);
});

/**
 * Hàm xử lý remove event
 * Author: LHH - 23/03/23
 */
onUnmounted(() => {
	document.removeEventListener("keydown", docKeyDown);
});

/**
 * Hàm bindError do BE trả về
 * Author: LHH - 23/03/23
 */
watch(
	() => state.form.formError,
	() => {
		formState.formError = { ...state.form.formError };
	}
);

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

		setTimeout(() => {
			handleCloseLoading();
		}, 500);
	} catch (error) {
		console.log(error);
		// handleShowErrorMessage(error.UserMes);
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

		if (state.form.type === ADD) {
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

		setTimeout(() => {
			handleCloseLoading();
		}, 1000);
	} catch (error) {
		console.log(error);
		// handleShowErrorMessage(error.UserMes);
	}
};

/**
 * Xử lý submit form
 * Author: LHH - 04/01/23
 */
const handleSubmit = async () => {
	try {
		handleValidateForm();

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

			if (state.form.type === ADD || state.form.type === DUPLICATE) {
				await addNewEmployee(data);
			}

			if (state.form.type === EDIT) {
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
		type: SUCCESS,
		content: RESOURCES.FORM_MESSAGE.SUCCESS[state.form.type],
	});
};

/**
 * Xử lý hiển thị thông báo thành công
 * Author: LHH - 10/01/23
 */
const handleShowErrorMessage = (error) => {
	handleCloseLoading();
	handleShowToast({
		type: ERROR,
		content: error,
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
		// console.log(error);

		// const { UserMes, MoreInfo } = error;

		// for (const key in MoreInfo) {
		// 	if (Object.hasOwnProperty.call(MoreInfo, key)) {
		// 		const value = MoreInfo[key];

		// 		formState.formError[key] = value;
		// 	}
		// }

		// handleShowErrorMessage(UserMes);

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
			JSON.stringify(originValue.value)
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
const handleValidateForm = () => {
	try {
		employeeCodeRef.value.handleValidate();
		fullNameRef.value.handleValidate();
		departmentIdRef.value.handleValidate();
		positionRef.value.handleValidate();
		dateOfBirthRef.value.handleValidate();
		identityNumberRef.value.handleValidate();
		identityDateRef.value.handleValidate();
		identityPlaceRef.value.handleValidate();
		addressRef.value.handleValidate();
		phoneNumberRef.value.handleValidate();
		landlineNumberRef.value.handleValidate();
		emailRef.value.handleValidate();
		bankAccountRef.value.handleValidate();
		bankNameRef.value.handleValidate();
		bankBranchRef.value.handleValidate();
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
		employeeCodeRef.value.setFocusInput();
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
									ref="employeeCodeRef"
									isRequired
									title="Mã"
									name="EmployeeCode"
									size="sm"
									:rules="[
										NOT_EMPTY(),
										HAS_FORMAT(EMPLOYEE_CODE),
									]"
									:tabindex="1"
									:value="formState.formValue.EmployeeCode"
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
									ref="fullNameRef"
									isRequired
									title="Tên"
									name="FullName"
									size="sm"
									:rules="[NOT_EMPTY(), MAX_LENGTH(100)]"
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
									ref="departmentIdRef"
									size="sm"
									isRequired
									name="DepartmentId"
									title="Đơn vị"
									:rules="[NOT_EMPTY()]"
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
									ref="positionRef"
									:rules="[MAX_LENGTH(100)]"
									:tabindex="4"
									:value="formState.formValue.Position"
									@change="handleBindValue"
									@error="handleBindError"
									:error="
										formState.formError
											? formState.formError.Position
											: ''
									"
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
									placeholder="DD/MM/YYYY"
									:rules="[ADULT()]"
									:tabindex="5"
									:value="formState.formValue.DateOfBirth"
									@change="handleBindValue"
									@error="handleBindError"
									:error="
										formState.formError
											? formState.formError.DateOfBirth
											: ''
									"
									:isShowError="
										!!formState.formError.EmployeeCode ||
										!!formState.formError.FullName
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
									ref="identityNumberRef"
									:rules="[HAS_FORMAT(IDENTITY_NUMBER)]"
									:value="formState.formValue.IdentityNumber"
									@change="handleBindValue"
									:isShowError="
										!!formState.formError.DepartmentId
									"
									@error="handleBindError"
									:error="
										formState.formError
											? formState.formError.IdentityNumber
											: ''
									"
								/>
							</div>
							<div class="form__col col--5">
								<DatePicker
									ref="identityDateRef"
									size="sm"
									title="Ngày cấp"
									name="IdentityDate"
									placeholder="DD/MM/YYYY"
									:tabindex="10"
									:rules="[
										MIN_VALUE(
											formState.formValue.DateOfBirth,
											'DateOfBirth'
										),
									]"
									:value="formState.formValue.IdentityDate"
									@change="handleBindValue"
									@error="handleBindError"
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
									ref="identityPlaceRef"
									:rules="[MAX_LENGTH(255)]"
									:tabindex="11"
									:value="formState.formValue.IdentityPlace"
									@change="handleBindValue"
									@error="handleBindError"
									:error="
										formState.formError
											? formState.formError.IdentityPlace
											: ''
									"
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
							ref="addressRef"
							:rules="[MAX_LENGTH(255)]"
							:value="formState.formValue.Address"
							@change="handleBindValue"
							@error="handleBindError"
							:error="
								formState.formError
									? formState.formError.Address
									: ''
							"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							ref="phoneNumberRef"
							title="ĐT di động"
							name="PhoneNumber"
							size="sm"
							tooltip="Điện thoại di động"
							type="money"
							:tabindex="13"
							:rules="[HAS_FORMAT(PHONE_NUMBER)]"
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
							ref="landlineNumberRef"
							:rules="[HAS_FORMAT(LANDLINE_NUMBER)]"
							:value="formState.formValue.LandlineNumber"
							@change="handleBindValue"
							@error="handleBindError"
							:error="
								formState.formError
									? formState.formError.LandlineNumber
									: ''
							"
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
							:rules="[HAS_FORMAT(EMAIL), MAX_LENGTH(100)]"
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
							ref="bankAccountRef"
							:rules="[MAX_LENGTH(255)]"
							:value="formState.formValue.BankAccount"
							@change="handleBindValue"
							@error="handleBindError"
							:error="
								formState.formError
									? formState.formError.BankAccount
									: ''
							"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							:tabindex="17"
							title="Tên ngân hàng"
							name="BankName"
							size="sm"
							ref="bankNameRef"
							:rules="[MAX_LENGTH(255)]"
							:value="formState.formValue.BankName"
							@change="handleBindValue"
							@error="handleBindError"
							:error="
								formState.formError
									? formState.formError.BankName
									: ''
							"
						/>
					</div>
					<div class="form__col col--3">
						<Input
							:tabindex="18"
							title="Chi nhánh"
							name="BankBranch"
							size="sm"
							ref="bankBranchRef"
							:rules="[MAX_LENGTH(255)]"
							:value="formState.formValue.BankBranch"
							@change="handleBindValue"
							@error="handleBindError"
							:error="
								formState.formError
									? formState.formError.BankBranch
									: ''
							"
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
						tooltip="Ctrl + S"
						@click.prevent="onStoreBtnClick"
						:tabindex="19"
					/>
					<Button
						content="Cất và thêm"
						action="button"
						tooltip="Ctrl + Shift + S"
						@click="onStoreAndAddBtnClick"
						:tabindex="20"
					/>
				</div>
			</div>

			<Loading v-show="state.isLoading" />
		</div>
	</div>
</template>
