<script setup>
import CheckBox from "../components/customs/MCheckBox.vue";
import { formatDate, formatMoney, formatGender } from "../util/common";
import { inject, ref } from "vue";
import RESOURCES from "../constants/resource";

/**
 * Sử dụng store
 * Author: LHH - 04/01/23
 */
const { state, handleOpenForm } = inject("store");
/**
 * Định nghĩa các props
 * Author: LHH - 04/01/23
 */
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

/**
 * Định nghĩa các rè của component
 * Author: LHH - 04/01/23
 */
const moreBtnRef = ref(null);

/**
 * Định nghĩa các emiit
 * Author: LHH - 04/01/23
 */
const emit = defineEmits(["click", "check"]);

/**
 * Xử lý khi ấn nút option
 * Author: LHH - 04/01/23
 */
const onOptionBtnClick = () => {
	try {
		const position = moreBtnRef.value.getBoundingClientRect();
		emit("click", {
			employeeId: props.employee.EmployeeId,
			employeeCode: props.employee.EmployeeCode,
			top: position.top,
			right: document.body.offsetWidth - position.left,
			width: position.width,
			height: position.height,
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý khi ấn nút sửa
 * Author: LHH - 04/01/23
 */
const onUpdateBtnClick = () => {
	try {
		handleOpenForm(RESOURCES.FORM_MODE.EDIT, props.employee.EmployeeId);
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý check item
 * Author: LHH - 04/01/23
 */
const handleCheckBox = (data) => {
	try {
		emit("check", data.value);
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<tr class="table__row" @dblclick="onUpdateBtnClick()">
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
			<span>{{ employee.GenderName }}</span>
		</td>
		<td class="table__col text-center">
			<span>{{ formatDate(employee.DateOfBirth) }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.IdentityNumber }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.Position }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.DepartmentName }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.PhoneNumber }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.BankAccount }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.BankName }}</span>
		</td>
		<td class="table__col">
			<span>{{ employee.BankBranch }}</span>
		</td>
		<td class="table__col text-center">
			<button class="table__action">
				<p class="table__action__update" @click="onUpdateBtnClick">
					Sửa
				</p>
				<button
					class="table__action__more"
					@click="onOptionBtnClick"
					ref="moreBtnRef"
				>
					<i class="table__action__icon"></i>
				</button>
			</button>
		</td>
	</tr>
</template>
