<template>
	<i-layout class="_height-100" style="background-color: #26252e">
		<i-layout-header class="_padding-x-4"> </i-layout-header>

		<i-layout-content class="_margin-x-5 _text-white">
			<h1 class="_font-weight-bold">404</h1>
			<h3 class="_margin-y-0">Halaman tidak ditemukan ..</h3>
		</i-layout-content>
		<i-layout-footer class="_padding-x-4">
			<a href="/">Sistem Informasi Sekolah Millenia</a>
		</i-layout-footer>
	</i-layout>
</template>

<script>
export default {
	name: "NotFound",
	mounted() {
		this.$nextTick(() => {
			this.$store.dispatch("Base/ToggleLoading", { value: false, page: true });
		});
	},
};
</script>

<style>
</style>