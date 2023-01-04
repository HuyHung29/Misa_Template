<script setup>
import Loading from "../components/MLoading.vue";
import EmployeeItem from "./EmployeeItem.vue";
import CheckBox from "../components/customs/MCheckBox.vue";
import DropDown from "../components/customs/MDropDown.vue";
import Button from "../components/MButton.vue";
import { onMounted, reactive, inject } from "vue";
import useEmployee from "../composable/employee";

// Định nghĩa các state
const state = reactive({
	employees: [],
	isLoading: false,
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

const store = inject("store");

const { handleOpenForm, handleOpenModal, handleCloseModal } = store;

const { listEmployee, getAllEmployee } = useEmployee();

// Call API
onMounted(() => {
	handleGetAllEmployee();
});

// Khai báo các sự kiện

const handleGetAllEmployee = async () => {
	try {
		state.isLoading = true;

		await getAllEmployee();

		state.employees = [...listEmployee.value];

		state.isLoading = false;
	} catch (error) {
		console.log(error);
	}
};

const handleDisplayListAction = (data) => {
	state.listAction = {
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
	state.listAction.isShow = false;
};

const onDeleteBtnClick = () => {
	handleOpenModal(
		"Xác nhận xóa",
		`Bạn có chắc chắn muốn xóa nhân viên \<${state.listAction.employeeCode}\> không?`,
		"warning",
		state.listAction.employeeId
	);

	handleCloseListAction();
};

const handleCheckAll = (target) => {
	if (target.checked) {
		state.checkList = [...state.employees.map((item) => item.EmployeeId)];
	} else {
		state.checkList = [];
	}
};

const handleCheck = (value) => {
	if (state.checkList.includes(value)) {
		state.checkList.splice(state.checkList.indexOf(value), 1);
	} else {
		state.checkList.push(value);
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
										state.checkList.length !== 0 &&
										state.checkList.length ===
											state.employees.length
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
							:checkList="state.checkList"
						/>
					</tbody>
				</table>
				<!-- Action list -->
				<ul
					class="table__action__list"
					v-if="state.listAction.isShow"
					:style="state.listAction.style"
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
				<!-- Table loading -->
				<div class="table__loading" v-show="state.isLoading">
					<Loading />
				</div>
			</div>

			<div class="data-table__footer">
				<p class="data-table__quantity">
					Tổng số: <span>{{ state.employees.length }}</span> bản ghi
				</p>

				<div class="data-table__action">
					<DropDown
						:listValue="[
							'10 sản phẩm trên 1 trang',
							'20 sản phẩm trên 1 trang',
							'50 sản phẩm trên 1 trang',
							'100 sản phẩm trên 1 trang',
						]"
						name="emp-quantity"
						:style="{ top: 'unset', bottom: '100%' }"
					/>
					<!-- Pagination -->
					<div class="data-table__pagination">
						<p class="data-table__pagination__action disabled">
							Trước
						</p>
						<ul class="data-table__pagination__page">
							<li class="data-table__pagination__item active">
								1
							</li>
							<li class="data-table__pagination__item">2</li>
							<li class="data-table__pagination__item">3</li>
							<li class="data-table__pagination__item">...</li>
							<li class="data-table__pagination__item">52</li>
						</ul>
						<p class="data-table__pagination__action">Sau</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
