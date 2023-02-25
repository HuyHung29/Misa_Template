<script setup>
import { onMounted, ref } from "vue";
import Radio from "../components/customs/MRadio.vue";
import RESOURCES from "../constants/resource";

const listRefs = ref([
	{ a: ref(null) },
	{ b: ref(null) },
	{ c: ref(null) },
	{ d: ref(null) },
	{ e: ref(null) },
	{ f: ref(null) },
	{ g: ref(null) },
	{ h: ref(null) },
]);

onMounted(() => {
	console.log(listRefs.value[0].a.offsetHeight);
});
</script>

<template>
	<section>
		<div :ref="(el) => (listRefs[0].a = el)">a</div>
		<div ref="listRef[1]">b</div>
		<div ref="listRef[2]">c</div>
		<div ref="listRef[3]">d</div>
		<div ref="listRef[4]">e</div>
		<div ref="listRef[5]">f</div>
		<div ref="listRef[6]">g</div>
		<div ref="listRef[7]">h</div>
	</section>
</template>

<style scoped>
* {
	box-sizing: border-box;
}

div {
	padding: 10px;
	background-color: red;
	margin-bottom: 10px;
}
</style>
