<template>
	<div class="_margin-x-1">
		<i-row bottom-xs class="_margin-bottom-2">			
			<i-column>
				<h5 class="_margin-top-0 _margin-left-0">Laporan Tahunan</h5>
				<line-chart
					v-if="lineData != null"
					:chartdata="lineData"
					:options="chartOptions"
				/>
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
				<h5># Chart alamat pada tahun <b>2020</b>, setiap alamat siswa.</h5>
			</i-column>
		</i-row>
	</div>
</template>

<script>
import LineChart from "../../components/Charts/Line";
import DonutChart from "../../components/Charts/Donut";
import { GETData } from "../../utils/net";
export default {
	name: "Laporan-Siswa",
	components: { LineChart, DonutChart },
	data() {
		return {
			lineData: null,
			alamatData: null,
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
			},
		};
	},
	mounted() {
		GETData("siswa/report").then((res) => {
			if (res.status < 400) {
				let data = {
					labels: [],
					datasets: [
						{
							label: "Tahunan",
							backgroundColor: [],
							data: [],
						},
					],
				};
				for (let index = 0; index < res.data.tahun.length; index++) {
					const element = res.data.tahun[index];
					data.labels.push(element.year);
					data.datasets[0].backgroundColor.push(
						"#" + ((Math.random() * 0xffffff) << 0).toString(16)
					);
					data.datasets[0].data.push(element.data);
				}
				this.lineData = data;

				let donut = {
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
					donut.datasets[0].backgroundColor.push(
						"#" + ((Math.random() * 0xffffff) << 0).toString(16)
					);
					donut.labels.push(key);
					donut.datasets[0].data.push(alamat);
				}
				this.alamatData = donut;
			}
		});
	},
};
</script>

<style>
</style>