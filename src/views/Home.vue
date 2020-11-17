<template>
	<i-container fluid>
		<i-row class="_margin-x-1">
			<i-column md="4">
				<i-card class="_margin-y-1">
					<span class="_text-secondary">Jumlah</span>
					<template #footer>
						<h3>{{ Panel.siswa_count || 0 }} <b>Siswa</b></h3>
					</template>
				</i-card>
			</i-column>
			<i-column md="4">
				<i-card class="_margin-y-1">
					<span class="_text-secondary">Jumlah</span>
					<template #footer>
						<h3>{{ Panel.orangtua_count || 0 }} <b>Orangtua</b></h3>
					</template>
				</i-card>
			</i-column>
			<i-column md="4">
				<i-card class="_margin-y-1">
					<span class="_text-secondary">Jumlah</span>
					<template #footer>
						<h3>{{ Panel.pegawai_count || 0 }} <b>Pegawai</b></h3>
					</template>
				</i-card>
			</i-column>
			<i-column md="4">
				<i-card class="_margin-y-1">
					<span class="_text-secondary">Jumlah</span>
					<template #footer>
						<h3>{{ Panel.kelas_count || 0 }} <b>Kelas</b></h3>
					</template>
				</i-card>
			</i-column>
			<i-column md="4">
				<i-card variant="secondary" class="_margin-y-1">
					<span class="_text-white">Jumlah</span>
					<template #footer>
						<h3>{{ Panel.pembelajaran_count || 0 }} <b>Pembelajaran</b></h3>
					</template>
				</i-card>
			</i-column>
			<i-column md="4">
				<i-card variant="secondary" class="_margin-y-1">
					<span class="_text-white">Jumlah</span>
					<template #footer>
						<h3>{{ Panel.indikator_count || 0 }} <b>Indikator</b></h3>
					</template>
				</i-card>
			</i-column>
			<i-column md="4">
				<i-card fill variant="dark" class="_margin-y-1">
					<a class="_text-light" href="/dashboard/laporan/siswa">Laporan Siswa</a>
				</i-card>
			</i-column>
			<i-column md="4">
				<i-card fill variant="dark" class="_margin-y-1">
					<a class="_text-light" href="/dashboard/laporan/orangtua">Laporan Orang tua</a>
				</i-card>
			</i-column>
			<i-column md="4">
				<i-card fill variant="dark" class="_margin-y-1">
					<a class="_text-light" href="/dashboard/laporan/nilai">Laporan Nilai</a>
				</i-card>
			</i-column>
		</i-row>
	</i-container>
</template>

<script>
import { GETData } from "../utils/net";
// @ is an alias to /src
export default {
	name: "Home",
	data() {
		return {
			Panel: {},
		};
	},
	activated() {
		this.$nextTick(function () {
			this.$store.dispatch("Base/ToggleLoading", {
				value: false,
				page: false,
			});
		});
	},
	mounted() {
		this.$nextTick(function () {
			this.$store.dispatch("Base/ToggleLoading", {
				value: false,
				page: false,
			});
		});
		GETData("panel").then((res) => {
			if (res.status < 400) this.Panel = res.data;
		});
	},
};
</script>
