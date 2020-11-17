<template>
	<div class="_margin-x-1">
		<i-row bottom-xs class="_margin-bottom-2">			
			<i-column md="7">
				<h5 class="_margin-top-0 _margin-left-0">Laporan Pekerjaan</h5>
				<donut-chart
					v-if="pekerjaanData != null"
					:chartdata="pekerjaanData"
					:options="chartOptions"
				/>
			</i-column>
			<i-column md="4" >
				<h5># Chart pekerjaan pada tahun <b>2020</b>, setiap pekerjaan orang tua.</h5>
			</i-column>

			<i-column md="7">
				<h5>Laporan Alamat</h5>
				<donut-chart
					v-if="alamatData != null"
					:chartdata="alamatData"
					:options="chartOptions"
				/>
			</i-column>
			<i-column md="4" >
				<h5># Chart alamat pada tahun <b>2020</b>, setiap alamat orang tua.</h5>
			</i-column>
		</i-row>
	</div>
</template>

<script>
import DonutChart from "../../components/Charts/Donut";
import { GETData } from "../../utils/net";
export default {
	name: "Laporan-Orangtua",
	components: { DonutChart },
	data() {
		return {
			pekerjaanData: null,
			alamatData: null,
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
			},
		};
	},
	mounted() {
		GETData("orangtua/report").then((res) => {
			if (res.status < 400) {
				let donut1 = {
					datasets: [
						{
							label: "Pekerjaan",
							backgroundColor: [],
							data: [],
						},
					],

					// These labels appear in the legend and in the tooltips when hovering different arcs
					labels: [],
				};
				for (let [key, pekerjaan] of Object.entries(res.data.pekerjaan)) {
					donut1.datasets[0].backgroundColor.push(
						"#" + ((Math.random() * 0xffffff) << 0).toString(16)
					);
					donut1.labels.push(key);
					donut1.datasets[0].data.push(pekerjaan);
				}
				this.pekerjaanData = donut1;

				let donut2 = {
					datasets: [
						{
							label: "Alamat",
							backgroundColor: [],
							data: [],
						},
					],

					// These labels appear in the legend and in the tooltips when hovering different arcs
					labels: [],
				};
				for (let [key, alamat] of Object.entries(res.data.alamat)) {
					donut2.datasets[0].backgroundColor.push(
						"#" + ((Math.random() * 0xffffff) << 0).toString(16)
					);
					donut2.labels.push(key);
					donut2.datasets[0].data.push(alamat);
				}
				this.alamatData = donut2;
			}
		});
	},
};
</script>

<style>
</style>