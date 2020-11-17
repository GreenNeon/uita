<template>
	<div class="_margin-x-1 _margin-bottom-2">
		<i-row bottom-xs>
			<i-column md="4">
				<p class="vselect label _visible-md-and-up">Pilih Kelas</p>
				<v-select
					class="vselect _visible-md-and-up _margin-bottom-1"
					label="nama"
					:options="Kelas.Search"
					v-model="Kelas.Selected"
					:loading="Kelas.Loading"
					:clearable="false"
					@search="onSearchKelas"
					placeholder="Pilih kelas .."
				>
					<template v-slot:option="option">
						{{ option.nama }} <br />
						<small>Kelompok {{ option.kelompok || "UNK" }}</small>
					</template>
				</v-select>
			</i-column>
			<i-column md="4">
				<v-select
					:options="Siswa.Data"
					v-model="Siswa.Selected"
					:disabled="isEmptyObject(Kelas.Selected)"
					searchable
					label="nama"
					placeholder="Cari nama siswa disini .."
					class="_margin-bottom-1 vselect"
				>
					<template #open-indicator="{ attributes }">
						<span v-bind="attributes"></span>
					</template>
				</v-select>
			</i-column>
		</i-row>

		<h6
			class="_font-weight-semibold _margin-top-0"
			v-if="isEmptyObject(Siswa.Selected)"
		>
			<td colspan="5">Pilih siswa terlebih dahulu.</td>
		</h6>
		<i-collapsible v-else :value="['panel-1', 'panel-2']" variant="unstyled">
			<i-collapsible-item id="panel-1" title="Rekap Mingguan">
				<i-table bordered id="tabel-1">
					<tbody>
						<tr>
							<td class="_background-dark _align-middle" colspan="5">
								Pembelajaran <br />
								<small>Indikator</small>
							</td>
						</tr>

						<tr v-if="isEmptyObject(Pembelajaran.Data)">
							<td colspan="5">Tidak ada penilaian.</td>
						</tr>
						<template v-else v-for="(pembelajaran, index) in Pembelajaran.Data">
							<tr :key="'p1-' + index">
								<td class="_background-gray-70" width="5%">{{ index + 1 }}</td>
								<td class="_background-gray-70" colspan="4">
									{{ pembelajaran.nama }}
								</td>
							</tr>

							<template v-for="(indikator, yindex) in pembelajaran.indikator">
								<tr
									v-if="isEmptyObject(indikator.nilai)"
									:key="'p2-' + index + '-' + yindex"
								>
									<td width="5%"></td>
									<td width="5%">{{ index + 1 }}-{{ yindex + 1 }}</td>
									<td>{{ indikator.nama }}</td>
									<td colspan="2">Tidak ada penilaian.</td>
								</tr>
								<template v-else>
									<tr :key="'p2-' + index + '-' + yindex">
										<td width="5%"></td>
										<td width="5%">{{ index + 1 }}-{{ yindex + 1 }}</td>
										<td>{{ indikator.nama }}</td>
										<td>
											<span
												v-for="nilai in LastIndikator(indikator.nilai).nilai"
												:key="'p2-' + index + '-' + yindex + '-' + nilai"
											>
												&#9733;
											</span>
										</td>
										<td>
											{{ marks1[LastIndikator(indikator.nilai).nilai] }}
										</td>
									</tr>
									<tr :key="'p3-' + index + '-' + yindex">
										<td width="5%"></td>
										<td width="5%"></td>
										<td colspan="3">
											<b>Catatan: </b
											>{{
												LastIndikator(indikator.nilai).catatan || "Tidak ada."
											}}
										</td>
									</tr>
								</template>
							</template>
						</template>
					</tbody>
				</i-table>
				<i-button @click="ExportMingguan"
					>Print <Fa class="_margin-left-1" :icon="faPrint"
				/></i-button>
			</i-collapsible-item>
			<i-collapsible-item id="panel-2" title="Rekap Bulanan">
				<i-table bordered striped id="tabel-2">
					<tbody>
						<tr>
							<td class="_background-dark _align-middle" colspan="3">
								Pembelajaran <br />
								<small>Indikator</small>
							</td>
							<td class="_background-dark">Progress 1 <br /><small></small></td>
							<td class="_background-dark">Progress 2 <br /><small></small></td>
							<td class="_background-dark">Progress 3 <br /><small></small></td>
							<td class="_background-dark">Progress 4 <br /><small></small></td>
							<td class="_background-dark">
								Progress <br />
								Bulanan
							</td>
						</tr>

						<tr v-if="isEmptyObject(Pembelajaran.Data)">
							<td colspan="5">Tidak ada penilaian.</td>
						</tr>
						<template v-else v-for="(pembelajaran, index) in Pembelajaran.Data">
							<tr :key="'pb1-' + index">
								<td class="_background-gray-70" width="5%">{{ index + 1 }}</td>
								<td class="_background-gray-70" colspan="7">
									{{ pembelajaran.nama }}
								</td>
							</tr>

							<tr
								v-if="isEmptyObject(pembelajaran.indikator)"
								:key="'pb2-' + index"
							>
								<td colspan="5">Tidak ada penilaian.</td>
							</tr>
							<template
								v-else
								v-for="(indikator, yindex) in pembelajaran.indikator"
							>
								<tr :key="'pb2-' + index + '-' + yindex">
									<td width="5%"></td>
									<td width="5%">{{ index + 1 }}-{{ yindex + 1 }}</td>
									<td>{{ indikator.nama }}</td>
									<td
										v-for="zindex in 5"
										:key="'pb2-' + index + '-' + yindex + '-' + zindex"
									>
										<span v-if="zindex == 5">{{
											SummaryNilai(indikator.nilai)
										}}</span>
										<span
											v-else-if="isEmptyObject(indikator.nilai[zindex - 1])"
										>
											-
										</span>
										<span
											v-else
											v-for="star in indikator.nilai[zindex - 1].nilai"
											:key="
												'pb2-' +
												index +
												'-' +
												yindex +
												'-' +
												zindex +
												'-' +
												star
											"
										>
											&#9733;
										</span>
									</td>
								</tr>
							</template>
						</template>
					</tbody>
				</i-table>
				<i-button @click="ExportBulanan">Print <Fa class="_margin-left-1" :icon="faPrint" /></i-button>
			</i-collapsible-item>
		</i-collapsible>

		<!-- <div v-if="Pembelajaran.Loading">Loading...</div>
		<div v-else-if="Pembelajaran.Data.length < 1">Kosong atau belum memilih.</div> -->
	</div>
</template>

<script>
import debounce from "lodash/debounce";
import { isEmptyObject } from "../../utils/common";
import { GETData, Search } from "../../utils/net";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Fa from "vue-fa";
import dayjs from "dayjs";
import XLSX from "xlsx";

export default {
	name: "Laporan-Nilai",
	components: { Fa },
	data() {
		return {
			faPrint,
			marks1: {
				0: "Belum Dinilai",
				1: "Belum Berkembang",
				2: "Masih Berkembang",
				3: "Berkembang Sesuai Harapan",
				4: "Berkembang Sangat Baik",
				5: "Berkembang Sangat Baik",
			},
			Pembelajaran: {
				Loading: false,
				Data: [],
				Raw: [],
			},
			Kelas: {
				Loading: true,
				Selected: null,
				Data: [],
				Search: [],
			},
			Siswa: {
				Loading: true,
				Selected: null,
				CurrentIndex: 0,
				Data: [],
				Search: "",
			},
		};
	},
	methods: {
		isEmptyObject,
		LastIndikator(nilai) {
			if (isEmptyObject(nilai)) return null;
			return nilai.reduce((prev, current) =>
				dayjs(current.created_at).diff(dayjs(prev.created_at), "day") > 0
					? current
					: prev
			);
		},
		SummaryNilai(nilai) {
			if (isEmptyObject(nilai)) return this.marks1[0];
			let sum = 0;
			for (let index = 0; index < nilai.length; index++)
				sum += nilai[index].nilai;
			const avg = sum / nilai.length || 0;
			return this.marks1[Math.floor(avg)];
		},
		create_gap_rows(ws, nrows, ncols = 0) {
			var ref = XLSX.utils.decode_range(ws["!ref"]); // get original range
			ref.e.c += ncols;
			ref.e.r += nrows; // add to ending row
			ws["!ref"] = XLSX.utils.encode_range(ref); // reassign row
		},
		ExportMingguan() {
			let wb = XLSX.utils.book_new();
			let ws = XLSX.utils.json_to_sheet([
				[""],
				[null, "Perkembangan anak pada minggu terakhir"],
				[null, this.Siswa.Selected.nama],
				[null, this.Kelas.Selected.nama],
				[""],
			]);

			XLSX.utils.sheet_add_dom(ws, document.querySelector("#tabel-1 table"), {
				origin: XLSX.utils.encode_cell({ c: 1, r: 6 }),
			});
			XLSX.utils.book_append_sheet(wb, ws, "Rekap Mingguan");
			let filename = this.Siswa.Selected.nama
				.replace(/[^a-z0-9]/gi, "_")
				.toLowerCase();
			XLSX.writeFile(wb, `mingguan_${filename}.xlsx`);
		},
		ExportBulanan() {
			let wb = XLSX.utils.book_new();
			let ws = XLSX.utils.json_to_sheet([
				[""],
				[null, "Rekap perkembangan anak"],
				[null, this.Siswa.Selected.nama],
				[null, this.Kelas.Selected.nama],
				[""],
			]);

			XLSX.utils.sheet_add_dom(ws, document.querySelector("#tabel-2 table"), {
				origin: XLSX.utils.encode_cell({ c: 1, r: 6 }),
			});
			XLSX.utils.book_append_sheet(wb, ws, "Rekap Nilai");
			let filename = this.Siswa.Selected.nama
				.replace(/[^a-z0-9]/gi, "_")
				.toLowerCase();
			XLSX.writeFile(wb, `rekap_${filename}.xlsx`);
		},
		onSearchKelas: debounce(function (search, loading) {
			loading(true);
			Search("kelas/search", {
				value: escape(search),
				column: "nama",
			}).then((res) => {
				if (res.status < 400) this.Kelas.Search = res.data.data;
				loading(false);
			});
		}, 350),
	},
	watch: {
		"Kelas.Selected": function (nw) {
			if (!nw) return;
			//? Awal siswa masuk
			this.Siswa.Loading = true;
			this.Siswa.Selected = null;
			this.Siswa.Data = [];
			GETData(`kelas/${nw.id}/nilai`).then((res) => {
				this.Siswa.Loading = false;
				if (res.status < 400) {
					this.Siswa.Data = res.data.data;
					this.Siswa.Selected = this.Siswa.Data[0];
				}
			});
		},
		"Siswa.Selected": function (nw) {
			if (!nw) return;
			this.Pembelajaran.Loading = true;
			this.Pembelajaran.Raw = [];
			this.Pembelajaran.Data = [];
			GETData(
				`nilai/${this.Kelas.Selected.id}/${this.Siswa.Selected.id}/report`
			).then((res) => {
				if (res.status < 400) {
					this.Pembelajaran.Raw = res.data;
					this.Pembelajaran.Data = res.data.filter(
						(x, i, a) => a.map((y) => y.id).indexOf(x.id) === i
					);
				}
				this.Pembelajaran.Loading = false;
			});
		},
	},
	mounted() {
		this.onSearchKelas("", (flg) => (this.Kelas.Loading = flg));
	},
};
</script>

<style>
</style>