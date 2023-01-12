<script setup>
import Loading from "../components/MLoading.vue";
import EmployeeItem from "./EmployeeItem.vue";
import CheckBox from "../components/customs/MCheckBox.vue";
import Select from "../components/customs/MSelect.vue";
import Button from "../components/MButton.vue";
import Pagination from "../components/MPagination.vue";
import RESOURCES from "../constants/resource";
import { reactive, inject, onBeforeMount } from "vue";
import useEmployee from "../composable/employee";

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
	handleOpenForm,
	handleOpenModal,
	handleCloseModal,
	handleOpenLoading,
	handleCloseLoading,
} = inject("store");

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
const { totalRecord } = useEmployee();

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
// const handleDuplicateClick = () => {
// 	try {
// 		empState.listAction.isShow = false;
// 		handleOpenForm(
// 			RESOURCES.FORM_MODE.DUPLICATE,
// 			empState.listAction.employeeId
// 		);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

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
			empState.listAction.employeeId
		);

		handleCloseListAction();
	} catch (error) {
		console.log(error);
	}
};

/**
 * Hàm xử lý check all
 * Author: LHH - 04/01/23
 */
const handleCheckAll = (target) => {
	try {
		if (target.checked) {
			empState.checkList = [
				...state.employees.map((item) => item.EmployeeId),
			];
		} else {
			empState.checkList = [];
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
		} else {
			empState.checkList.push(value);
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
			handleGetEmployees({ employeeFilter: value });
		} else {
			handleGetEmployees();
		}
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div class="data-table">
		<div class="data-table__header">
			<h2 class="data-table__heading">Nhân viên</h2>
			<Button
				content="Thêm mới nhân viên"
				@click="handleOpenForm(RESOURCES.FORM_MODE.ADD)"
			/>
		</div>

		<div class="table-wrapper">
			<div class="table__function">
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
									:checked="
										empState.checkList.length !== 0 &&
										empState.checkList.length ===
											state.employees?.length
									"
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
							</th>
							<th class="table__heading w-250">
								<span>chức danh</span>
							</th>
							<th class="table__heading w-300">
								<span>tên đơn vị</span>
							</th>
							<th class="table__heading text-right w-200">
								<span>Lương</span>
							</th>
							<th class="table__heading w-200">
								<span>số điện thoại</span>
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
				<!-- Action list -->
				<ul
					class="table__action__list"
					v-if="empState.listAction.isShow"
					:style="empState.listAction.style"
				>
					<li class="table__action__item">Nhân bản</li>
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
