<script setup>
import CheckBox from "../components/customs/MCheckBox.vue";
import { formatDate, formatMoney } from "../util/common";
import { inject } from "vue";

const { state, handleOpenForm } = inject("store");
// Định nghĩa các props
const props = defineProps({
	employee: {
		type: Object,
		required: true,
		default: {},
	},
	checkList: {
		type: Array,
		default: [],
	},
});

// Định nghĩa các sự kiện
const emit = defineEmits(["click", "check"]);

const onOptionBtnClick = (e) => {
	const target = e.target;
	const position = target.getBoundingClientRect();
	emit("click", {
		employeeId: props.employee.EmployeeId,
		employeeCode: props.employee.EmployeeCode,
		top: position.top,
		right: document.body.offsetWidth - position.left,
		width: position.width,
		height: position.height,
	});
};

const onUpdateBtnClick = () => {
	handleOpenForm("edit", props.employee.EmployeeId);
};

const handleCheckBox = (data) => {
	emit("check", data.value);
};
</script>

<template>
	<tr class="table__row" @dblclick="onUpdateBtnClick('edit')">
		<td class="table__col text-center">
			<CheckBox
				name="table-checkbox"
				:id="employee.EmployeeId"
				:value="employee.EmployeeId"
				@check="handleCheckBox"
				:checked="checkList.includes(employee.EmployeeId)"
			/>
		</td>
		<td class="table__col">
			<span>{{ employee.EmployeeCode }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.FullName }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.GenderName ? employee.GenderName : "" }}</span>
		</td>
		<td class="table__col text-center">
			<span>{{ formatDate(employee.DateOfBirth) }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.IdentityNumber }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.PositionName }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.DepartmentName }}</span>
		</td>
		<td class="table__col text-right">
			<span>{{ formatMoney(employee.Salary) }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.PhoneNumber }}</span>
		</td>
		<td class="table__col text-center">
			<button class="table__action">
				<p class="table__action__update" @click="onUpdateBtnClick">
					Sửa
				</p>
				<p class="table__action__more" @click="onOptionBtnClick">
					<i class="table__action__icon"></i>
				</p>
			</button>
		</td>
	</tr>
</template>
