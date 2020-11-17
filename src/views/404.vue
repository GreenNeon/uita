<template>
	<i-container>
		<i-row>
			<i-column>
				<h1 class="_text-red"><b>404 Not Found !</b></h1>
				<p>
					Yup halaman tidak ditemukan dalam aplikasi, mungkin anda melakukan suatu kesalahan dalam pengetikan. Coba kembali ke awal ...
				</p>
				<i-button href="/"
					>Kembali</i-button
				>
			</i-column>
		</i-row>
	</i-container>
</template>


<script>
export default {
	mounted() {
		this.$nextTick(function() {
			this.$store.dispatch("Base/ToggleLoading", { value: false, page: true });
		});
	}
};
</script>
