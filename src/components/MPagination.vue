<script setup>
import { useRoute } from "vue-router";
import ENUMS from "../constants/enum";
import DropDown from "../components/customs/MDropDown.vue";
import { inject, reactive, watch } from "@vue/runtime-core";

/**
 * Các state và hàm dùng chung
 * Author: LHH - 04/01/23
 */
const { state, handleGetEmployees } = inject("store");

/**
 * Các state dùng trong component
 * Author: LHH - 04/01/23
 */
const paginationState = reactive({
	pageSize: 20,
	pageNumber: 1,
});

/**
 * Theo dõi sự thay đổi của state
 * Author: LHH - 04/01/23
 */
watch(paginationState, () => {
	try {
		handleGetEmployees({ ...paginationState });
	} catch (error) {
		console.log(error);
	}
});

/**
 * Xử lý thay đổi số nhân viên trên 1 trang
 * Author: LHH - 04/01/23
 */
const handleChangeEmployeeQuantity = ({ _, value }) => {
	try {
		paginationState.pageSize = value;
		paginationState.pageNumber = 1;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý thay chuyển trang
 * Author: LHH - 04/01/23
 */
const handleChangePageNumber = (page) => {
	try {
		paginationState.pageNumber = page;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý ấn lùi 1 trang
 * Author: LHH - 04/01/23
 */
const handleClickPreBtn = () => {
	try {
		if (paginationState.pageNumber > 1)
			paginationState.pageNumber = paginationState.pageNumber - 1;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Xử lý tiến 1 trang
 * Author: LHH - 04/01/23
 */
const handleClickNextBtn = () => {
	try {
		if (paginationState.pageNumber < state.totalPage)
			paginationState.pageNumber = paginationState.pageNumber + 1;
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div class="data-table__footer">
		<p class="data-table__quantity">
			Tổng số: <span>{{ state.totalRecord }}</span> bản ghi
		</p>

		<div class="data-table__action">
			<DropDown
				:listValue="ENUMS.pagination"
				:defaultValue="ENUMS.pagination[0].value"
				name="emp-quantity"
				:style="{ top: 'unset', bottom: '100%' }"
				@select="handleChangeEmployeeQuantity"
			/>
			<!-- Pagination -->
			<div class="data-table__pagination">
				<p
					class="data-table__pagination__action"
					:class="{ disabled: paginationState.pageNumber === 1 }"
					@click="handleClickPreBtn"
				>
					Trước
				</p>
				<ul class="data-table__pagination__page">
					<li
						class="data-table__pagination__item"
						:class="{ active: paginationState.pageNumber === page }"
						v-for="page in +state.totalPage"
						:key="page"
						@click="handleChangePageNumber(page)"
					>
						{{ page }}
					</li>
				</ul>
				<p
					class="data-table__pagination__action"
					:class="{
						disabled:
							paginationState.pageNumber === state.totalPage,
					}"
					@click="handleClickNextBtn"
				>
					Sau
				</p>
			</div>
		</div>
	</div>
</template>

<style></style>
