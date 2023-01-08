<script setup>
import Loading from "../components/MLoading.vue";
import EmployeeItem from "./EmployeeItem.vue";
import CheckBox from "../components/customs/MCheckBox.vue";
import DropDown from "../components/customs/MDropDown.vue";
import Button from "../components/MButton.vue";
import Pagination from "../components/MPagination.vue";
import ENUMS from "../constants/enum";
import { reactive, inject, onBeforeMount } from "vue";
import useEmployee from "../composable/employee";

// Định nghĩa các state
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

const {
	state,
	handleGetEmployees,
	handleOpenForm,
	handleOpenModal,
	handleCloseModal,
	handleOpenLoading,
	handleCloseLoading,
} = inject("store");

// Call API
onBeforeMount(() => {
	handleGetAllEmployee();
});

const { totalRecord } = useEmployee();

// Khai báo các sự kiện

const handleGetAllEmployee = () => {
	try {
		handleGetEmployees();
	} catch (error) {
		console.log(error);
	}
};

const handleDisplayListAction = (data) => {
	empState.listAction = {
		isShow: true,
		employeeId: data.employeeId,
		employeeCode: data.employeeCode,
		style: {
			top: data.top + data.height + "px",
			right: data.right - data.width + "px",
		},
	};
};

const handleCloseListAction = () => {
	empState.listAction.isShow = false;
};

const onDeleteBtnClick = () => {
	handleOpenModal(
		"Xác nhận xóa",
		`Bạn có chắc chắn muốn xóa nhân viên \<${empState.listAction.employeeCode}\> không?`,
		"warning",
		empState.listAction.employeeId
	);

	handleCloseListAction();
};

const handleCheckAll = (target) => {
	if (target.checked) {
		empState.checkList = [
			...state.employees.map((item) => item.EmployeeId),
		];
	} else {
		empState.checkList = [];
	}
};

const handleCheck = (value) => {
	if (empState.checkList.includes(value)) {
		empState.checkList.splice(empState.checkList.indexOf(value), 1);
	} else {
		empState.checkList.push(value);
	}
};

const handleSearchEmployee = (value) => {
	if (value) {
		handleGetEmployees({ employeeFilter: value });
	} else {
		handleGetEmployees();
	}
};
</script>

<template>
	<div class="data-table">
		<div class="data-table__header">
			<h2 class="data-table__heading">Nhân viên</h2>
			<Button
				content="Thêm mới nhân viên"
				@click="handleOpenForm('add')"
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
					<li
						class="table__action__item"
						@click="handleCloseListAction"
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
