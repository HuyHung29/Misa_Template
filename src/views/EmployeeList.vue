<script setup>
import Loading from "../components/MLoading.vue";
import EmployeeItem from "./EmployeeItem.vue";
import CheckBox from "../components/customs/MCheckBox.vue";
import Select from "../components/customs/MSelect.vue";
import Button from "../components/MButton.vue";
import Pagination from "../components/MPagination.vue";
import RESOURCES from "../constants/resource";
import { reactive, inject, onBeforeMount, computed } from "vue";
import useEmployee from "../composable/employee";
import employeeApi from "../api/employeeApi";

/**
 * Định nghĩa các state
 * Author: LHH - 04/01/23
 */
const empState = reactive({
	listAction: {
		isShow: false,
		employeeId: "",
		employeeCode: "",
		style: {
			top: "",
			right: "",
		},
	},
	checkList: [],
});

/**
 * Sử dụng store
 * Author: LHH -04/01/23
 */
const {
	state,
	handleGetEmployees,
	handleUpdateEmployeeList,
	handleOpenForm,
	handleOpenModal,
	handleCloseModal,
	handleOpenLoading,
	handleCloseLoading,
	handleCloseForm,
	handleShowToast,
} = inject("store");

/**
 * Hàm xử lý check all
 * Author: LHH - 14/02/23
 */
const isCheckAll = computed(() => {
	let isCheck = true;

	if (!(empState.checkList.length !== 0)) {
		return false;
	}

	isCheck = state.employees.every((item) =>
		empState.checkList.includes(item.EmployeeId)
	);

	return isCheck;
});

/**
 * Call API
 * Author: LHH - 04/01/23
 */
onBeforeMount(() => {
	try {
		handleGetAllEmployee();
	} catch (error) {
		console.log(error);
	}
});

/**
 * Khai báo state của component
 * Author: LHH - 04/01/23
 */
const { statusCode, deleteIds, deleteEmployee } = useEmployee();

/**
 * Hàm call API
 * Author: LHH - 04/01/23
 */
const handleGetAllEmployee = () => {
	try {
		handleGetEmployees();
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý việc hiển thị action list
 * Author: LHH -
 */
const handleDisplayListAction = (data) => {
	try {
		if (empState.listAction.employeeId === data.employeeId) {
			empState.listAction = {
				isShow: false,
			};
		} else {
			empState.listAction = {
				isShow: true,
				employeeId: data.employeeId,
				employeeCode: data.employeeCode,
				style: {
					top: data.top + data.height + "px",
					right: data.right - data.width + "px",
				},
			};
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý đóng action
 * Author: LHH - 04/01/23
 */
const handleCloseListAction = () => {
	try {
		empState.listAction.isShow = false;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý ấn nút nhân bản
 * Author: LHH - 11/01/23
 */
const handleDuplicateClick = () => {
	try {
		empState.listAction.isShow = false;
		handleOpenForm(
			RESOURCES.FORM_MODE.DUPLICATE,
			empState.listAction.employeeId
		);
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý xóa nhân viên
 * Author: LHH - 30/01/23
 */
const handleDeleteEmployee = async () => {
	try {
		await deleteEmployee([...state.modal.employeeId]);

		if (statusCode.value) {
			// await handleGetEmployees();

			handleUpdateEmployeeList(
				"DELETE",
				state.modal.employeeId,
				deleteIds.value
			);

			handleShowToast({
				type: RESOURCES.NOTIFICATION_TYPE.SUCCESS,
				content:
					state.modal.type === RESOURCES.MODAL_TYPE.WARNING
						? RESOURCES.FORM_MESSAGE.SUCCESS.DELETE
						: RESOURCES.FORM_MESSAGE.SUCCESS[state.form.type],
			});
			handleCloseModal();

			empState.checkList = empState.checkList.filter(
				(id) => !deleteIds.value.includes(id)
			);
		}
	} catch (error) {
		console.log(error);
		const { UserMes } = error;
		handleShowToast({
			type: RESOURCES.NOTIFICATION_TYPE.ERROR,
			content: UserMes,
		});
		handleCloseModal();
	}
};

/**
 * Hàm xử lý khi ấn nút xóa
 * Author: LHH - 04/01/23
 */
const onDeleteBtnClick = () => {
	try {
		handleOpenModal(
			RESOURCES.MODAL_TITLE.WARNING,
			RESOURCES.MODAL_MESSAGE.WARNING(empState.listAction.employeeCode),
			RESOURCES.MODAL_TYPE.WARNING,
			[empState.listAction.employeeId],
			handleDeleteEmployee
		);

		handleCloseListAction();
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý khi ấn nút xóa hàng loạt
 * Author: LHH - 17/02/23
 */
const handleMultipleDelete = () => {
	console.log(empState.checkList);
	handleOpenModal(
		RESOURCES.MODAL_TITLE.WARNING,
		RESOURCES.MODAL_MESSAGE.WARNING_MULTIPLE,
		RESOURCES.MODAL_TYPE.WARNING,
		[...empState.checkList],
		handleDeleteEmployee
	);
};

/**
 * Hàm xử lý check all
 * Author: LHH - 04/01/23
 */
const handleCheckAll = (target) => {
	try {
		const empIds = state.employees.map((item) => item.EmployeeId);

		const ids = empIds.filter((id) => !empState.checkList.includes(id));
		if (target.checked) {
			empState.checkList = [...empState.checkList, ...ids];
		} else {
			empState.checkList = [
				...empState.checkList.filter((item) => !empIds.includes(item)),
			];
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý check item
 * Author: LHH - 04/01/23
 */
const handleCheck = (value) => {
	try {
		if (empState.checkList.includes(value)) {
			empState.checkList.splice(empState.checkList.indexOf(value), 1);

			console.log(empState.checkList);
		} else {
			empState.checkList.push(value);
			console.log(empState.checkList);
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý tìm kiếm
 * Author: LHH - 04/01/23
 */
const handleSearchEmployee = (value) => {
	try {
		if (value) {
			handleGetEmployees({ keyword: value });
		} else {
			handleGetEmployees();
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý mở form thêm mới
 * Author: LHH - 04/01/2023
 */
const handleOpenAddForm = () => {
	handleOpenForm(RESOURCES.FORM_MODE.ADD);
};

/**
 * Hàm xử lý xuất file excel
 * Author: LHH - 04/01/2023
 */
const handleExportData = async () => {
	try {
		var file = await employeeApi.exportExcel();

		const url = URL.createObjectURL(new Blob([file]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "Danh_sach_nhan_vien.xlsx");
		document.body.appendChild(link);
		link.click();
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div class="data-table">
		<div class="data-table__header">
			<h2 class="data-table__heading">Nhân viên</h2>
			<Button content="Thêm mới nhân viên" @click="handleOpenAddForm" />
		</div>

		<div class="table-wrapper">
			<div class="table__function">
				<div
					class="table__function_multiple-task"
					v-if="empState.checkList.length >= 2"
				>
					<p class="selected-item">
						{{ empState.checkList.length }} nhân viên được chọn
					</p>
					<p
						class="table__function_multiple-task__delete"
						@click="handleMultipleDelete"
					>
						Xóa tất cả
					</p>
				</div>
				<div class="textfield textfield--sm">
					<div class="textfield__input__wrap">
						<p class="textfield__icon">
							<i></i>
						</p>
						<input
							type="text"
							class="textfield__input"
							placeholder="Tìm theo mã, tên nhân viên"
							name="filter"
							:debounce-events="['input', 'keyup']"
							v-debounce:500ms.lock="handleSearchEmployee"
						/>
					</div>
				</div>
				<p
					class="table__function__refresh"
					@click="handleGetAllEmployee"
				>
					<i></i>
				</p>
				<p class="table__function__export" @click="handleExportData">
					<i></i>
				</p>
			</div>
			<div class="table__wrap" @scroll="handleCloseListAction">
				<table class="table">
					<thead class="table__header">
						<tr class="table__row">
							<th class="table__heading text-center">
								<CheckBox
									id="checkAll"
									name="checkAll"
									@check="handleCheckAll"
									:checked="isCheckAll === true"
								/>
							</th>
							<th class="table__heading w-150">
								<span>mã nhân viên</span>
							</th>
							<th class="table__heading w-200">
								<span>tên nhân viên</span>
							</th>
							<th class="table__heading w-150">
								<span>giới tính</span>
							</th>
							<th class="table__heading text-center w-200">
								<span>ngày sinh</span>
							</th>
							<th class="table__heading w-200">
								<span>số cmnd</span>
								<p class="table__heading__tooltip">
									Số chứng minh nhân dân
								</p>
							</th>
							<th class="table__heading w-200">
								<span>chức danh</span>
							</th>
							<th class="table__heading w-300">
								<span>tên đơn vị</span>
							</th>
							<th class="table__heading w-200">
								<span>số điện thoại</span>
							</th>
							<th class="table__heading w-200">
								<span>số tài khoản</span>
							</th>
							<th class="table__heading w-200">
								<span>tên ngân hàng</span>
							</th>
							<th class="table__heading w-200">
								<span>chi nhánh</span>
							</th>
							<th class="table__heading text-center w-150">
								<span>chức năng</span>
							</th>
						</tr>
					</thead>
					<tbody class="table__body">
						<EmployeeItem
							v-for="employee in state.employees"
							:employee="employee"
							@click="handleDisplayListAction"
							@check="handleCheck"
							:checkList="empState.checkList"
						/>
					</tbody>
				</table>
				<Loading v-show="state.isLoading" />
				<!-- Action list -->
				<ul
					class="table__action__list"
					v-if="empState.listAction.isShow"
					:style="empState.listAction.style"
				>
					<li
						class="table__action__item"
						@click="handleDuplicateClick"
					>
						Nhân bản
					</li>
					<li
						class="table__action__item open-dialog-btn"
						@click="onDeleteBtnClick"
					>
						Xóa
					</li>
					<li
						class="table__action__item"
						@click="handleCloseListAction"
					>
						Ngưng sử dụng
					</li>
				</ul>
				<div class="table__empty" v-if="state.employees.length === 0">
					<img src="../assets/images/nodata.76e50bd8.svg" alt="" />
					<p>Không có dữ liệu</p>
				</div>
			</div>

			<Pagination />
		</div>
	</div>
</template>

<style></style>
