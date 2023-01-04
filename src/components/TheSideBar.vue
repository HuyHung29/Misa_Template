<script setup>
import { inject } from "vue";

const store = inject("store");

const { state, handleOpenSidebar, handleCloseSidebar } = store;
</script>

<template>
	<div
		class="side-bar"
		:class="{
			'side-bar--close': !state.sidebar.isOpen,
		}"
	>
		<div class="side-bar__header">
			<i v-if="state.sidebar.isOpen" class="side-bar__header__icon"></i>
			<img
				v-if="state.sidebar.isOpen"
				class="side-bar__header__logo"
				src="../assets/images/logo.svg"
				alt=""
			/>
			<p
				v-if="!state.sidebar.isOpen"
				class="side-bar__header__open"
				@click="handleOpenSidebar"
			>
				<i></i>
			</p>
		</div>
		<ul class="side-bar__menu">
			<li class="side-bar__item active">
				<p class="side-bar__item__icon">
					<i class="icon1"></i>
				</p>
				<p class="side-bar__item__text">Tổng quan</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon2"></i>
				</p>
				<p class="side-bar__item__text">Tiền mặt</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon3"></i>
				</p>
				<p class="side-bar__item__text">Tiền gửi</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon4"></i>
				</p>
				<p class="side-bar__item__text">Mua hàng</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon5"></i>
				</p>
				<p class="side-bar__item__text">Bán hàng</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon6"></i>
				</p>
				<p class="side-bar__item__text">Quản lý hóa đơn</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon7"></i>
				</p>
				<p class="side-bar__item__text">Kho</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon8"></i>
				</p>
				<p class="side-bar__item__text">Công cụ dụng cụ</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon9"></i>
				</p>
				<p class="side-bar__item__text">Tài sản cố định</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon10"></i>
				</p>
				<p class="side-bar__item__text">Thuế</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon11"></i>
				</p>
				<p class="side-bar__item__text">Giá thành</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon12"></i>
				</p>
				<p class="side-bar__item__text">Tổng hợp</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon13"></i>
				</p>
				<p class="side-bar__item__text">Ngân sách</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon14"></i>
				</p>
				<p class="side-bar__item__text">Báo cáo</p>
			</li>
			<li class="side-bar__item">
				<p class="side-bar__item__icon">
					<i class="icon15"></i>
				</p>
				<p class="side-bar__item__text">Phân tích tài chính</p>
			</li>
		</ul>
	</div>
</template>

<style></style>
