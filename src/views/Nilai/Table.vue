<template>
	<div class="_margin-x-1">
		<h5 class="_margin-top-1">Penilaian</h5>
		<i-row>
			<i-column xs="9" md="4">
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
			<i-column xs="3" offset-md="5" class="_text-right">
				<i-button-group>
					<i-button
						:disabled="Siswa.CurrentIndex < 1"
						@click="Siswa.CurrentIndex -= 1"
						><Fa :icon="faChevronLeft"
					/></i-button>
					<i-button
						:disabled="Siswa.CurrentIndex >= Siswa.Data.length - 1"
						@click="Siswa.CurrentIndex += 1"
						><Fa :icon="faChevronRight"
					/></i-button>
				</i-button-group>
			</i-column>
		</i-row>
		<i-row>
			<i-column xs="6" md="3" class="_visible-sm-and-down">
				<p class="vselect label">Pilih Kelas</p>
				<v-select
					class="vselect"
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
			<i-column xs="6" md="3">
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
				<p class="vselect label" v-show="!isEmptyObject(Kelas.Selected)">
					Pilih Pembelajaran
				</p>
				<v-select
					v-show="!isEmptyObject(Kelas.Selected)"
					class="vselect"
					label="nama"
					:options="Pembelajaran.Search"
					v-model="Pembelajaran.Selected"
					:loading="Pembelajaran.Loading"
					@search="onSearchPembelajaran"
					:clearable="true"
					placeholder="Pilih kelas .."
				>
					<template v-slot:option="option">
						{{ option.nama }}
					</template>
				</v-select>

				<template v-for="(pembelajaran, p_index) in PembelajaranProgress">
					<div
						:key="'p-' + p_index"
						class="_cursor-pointer _margin-y-1 _padding-x-1 _padding-y-1-4 _rounded"
						:class="
							Pembelajaran.Progress == p_index + 1
								? '_background-dark'
								: '_background-gray-30'
						"
						@click="OnProgressChange(pembelajaran, p_index + 1)"
					>
						<p
							class="_font-weight-semibold"
							:class="
								Pembelajaran.Progress == p_index + 1
									? '_text-white'
									: '_text-dark'
							"
						>
							Progress {{ p_index + 1 }} /
							<small
								class="_font-weight-regular"
								:class="
									Pembelajaran.Progress == p_index + 1
										? '_text-gray-10 '
										: '_text-gray-80'
								"
							>
								{{ dayjs(pembelajaran.tanggal).format("DD-MM-YYYY") }}
								<Fa
									v-if="dayjs(pembelajaran.tanggal).diff(dayjs(), 'day') <= 0"
									:icon="faCalendarCheck"
								/>
								<Fa v-else :icon="faCalendarTimes" />
							</small>
						</p>
					</div>
				</template>
			</i-column>
			<i-column md="9" v-if="isEmptyObject(Kelas.Selected)">
				<h5 class="_margin-y-2">
					<Fa :icon="faChalkboard" class="_margin-x-1" />Pilih
					<b>Kelas</b> terlebih dahulu ..
				</h5>
			</i-column>
			<i-column md="9" v-else-if="Siswa.Loading">
				<h5
					v-if="Indikator.Loading && !Indikator.LoadMore"
					class="_display-flex _margin-x-2 _align-items-center"
				>
					<fulfilling-square-spinner
						:animation-duration="3000"
						:size="20"
						color="#26252e"
					/>
					<span class="_margin-x-1">Menyiapkan data siswa ..</span>
				</h5>
			</i-column>
			<i-column md="9" v-else-if="Siswa.Data.length < 1">
				<h5 class="_margin-y-2">
					<Fa :icon="faTimesCircle" class="_margin-x-1" />Kelas tidak memiliki
					<b>Siswa</b> ..
				</h5>
			</i-column>
			<i-column md="9" v-else>
				<div class="_margin-x-1 _margin-y-2 _display-flex">
					<img
						:src="Siswa.Data[Siswa.CurrentIndex].profile_url"
						alt="avatar"
						class="image -thumbnail"
						style="height: 130px; width: 130px; object-fit: cover"
					/>
					<div class="_margin-x-1 _margin-y-1-2">
						<b>{{ Siswa.Data[Siswa.CurrentIndex].nama }}</b> <br />
						<i>{{ "NIS." + Siswa.Data[Siswa.CurrentIndex].nis }}</i>
						<p>
							{{ Siswa.Data[Siswa.CurrentIndex].tanggal_lahir }} <br />
							{{ Siswa.Data[Siswa.CurrentIndex].gender }}
						</p>
					</div>
				</div>
				<h5 class="_margin-y-2" v-if="isEmptyObject(Pembelajaran.Selected)">
					<Fa :icon="faCheckDouble" class="_margin-x-1" />Pilih
					<b>Pembelajaran</b> untuk memberikan nilai indikator ..
				</h5>
				<template v-else>
					<h5
						v-if="Indikator.Loading && !Indikator.LoadMore"
						class="_display-flex _margin-x-2 _align-items-center"
					>
						<fulfilling-square-spinner
							:animation-duration="3000"
							:size="20"
							color="#26252e"
						/>
						<span class="_margin-x-1">Mengambil data indikator ..</span>
					</h5>
					<Table
						v-else
						:Rows="Indikator.Data"
						:Columns="Columns"
						NoHead
						Simple
						v-on:row-click="OnIndikatorClick"
					>
						<template #custom-row="{ row, index, click }">
							<td class="_text-center" @click.stop.self="click(index)">
								<HeartRating
									:spacing="2"
									:inactive-color="'#FFF'"
									:active-color="'#F14'"
									:increment="1"
									:item-size="18"
									:show-rating="false"
									class="_display-inline-block"
									v-model="row.nilai"
									@rating-selected="OnNilai(row, index)"
								/>
								<p class="_margin-0" @click.stop="click(index)">
									<em>{{ marks1[row.nilai || 0] }} </em>
								</p>
							</td>
						</template>
						<template #action="{ row }">
							<i-button
								variant="secondary"
								class="-xs"
								@click.stop="OnCatatanClick(row)"
							>
								Catatan
							</i-button>
						</template>
					</Table>
				</template>
			</i-column>
		</i-row>
		<i-modal fill variant="info" size="sm" v-model="Indikator.Modal">
			<template slot="header">Deskripsi Indikator</template>
			<i-row
				class="_padding-x-1-4 _padding-y-1-3"
				v-if="!isEmptyObject(Indikator.Selected)"
			>
				<i-column xs="4">
					<img
						:src="
							!isEmptyObject(Indikator.Selected.profile_url)
								? Indikator.Selected.profile_url
								: ''
						"
						alt="Gambar"
						class="image _border _border-color-dark _width-100"
						style="object-fit: cover"
					/>
				</i-column>
				<i-column class="_padding-x-1-2">
					<div class="_padding-y-1-2 _padding-bottom-1-4">
						<b>Deskripsi:</b>
						{{
							!isEmptyObject(Indikator.Selected.deskripsi)
								? Indikator.Selected.deskripsi
								: "Tidak ada deskripsi."
						}}
					</div>
					<p>
						<b>Catatan:</b>
						{{
							!isEmptyObject(Indikator.Selected.catatan)
								? Indikator.Selected.catatan
								: "Tidak ada catatan."
						}}
					</p>
				</i-column>
			</i-row>
		</i-modal>
		<i-modal variant="secondary" size="sm" v-model="Indikator.ModalCatatan">
			<template slot="header">Catatan Penilaian</template>
			<FormulateForm
				name="main-form"
				v-model="FormCatatan"
				@submit="OnSubmitCatatan"
			>
				<FormulateInput
					type="textarea"
					name="catatan"
					label="Catatan khusus dalam penilaian"
					help="Catatan akan muncul pada dashboard orangtua."
					placeholder=".."
					validation="required"
				/>
				<FormulateInput class="_text-right" type="submit" value="Simpan" />
			</FormulateForm>
		</i-modal>
	</div>
</template>

<script>
import { HeartRating } from "vue-rate-it";
import debounce from "lodash/debounce";
import Table from "../../components/Table/Base";
import { mapState } from "vuex";
import { Search, GETData, POSTData, PATCHData } from "../../utils/net";
import { FulfillingSquareSpinner } from "epic-spinners";
import { isEmptyObject } from "../../utils/common";
import Fa from "vue-fa";
import Noty from "noty";
import {
	faSearch,
	faTimesCircle,
	faChevronLeft,
	faChevronRight,
	faChalkboard,
	faCheckDouble,
	faCalendarCheck,
	faCalendarTimes,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import localeId from "dayjs/locale/id";

export default {
	name: "Nilai-Table",
	props: {
		ModelName: { type: String, default: "Nilai" },
	},
	components: { Table, HeartRating, Fa, FulfillingSquareSpinner },
	data() {
		return {
			faSearch,
			faTimesCircle,
			faChevronLeft,
			faChevronRight,
			faChalkboard,
			faCheckDouble,
			faCalendarCheck,
			faCalendarTimes,
			HoverIndikator: false,
			FormCatatan: {},
			marks1: {
				0: "Belum Dinilai",
				1: "Belum Berkembang",
				2: "Masih Berkembang",
				3: "Berkembang Sesuai Harapan",
				4: "Berkembang Sangat Baik",
				5: "Berkembang Sangat Baik",
			},
			Kelas: {
				Loading: true,
				Selected: null,
				Data: [],
				Search: [],
			},
			Pembelajaran: {
				Loading: true,
				Selected: null,
				Data: [],
				Search: [],
				Raw: [],
				Progress: 1,
			},
			Siswa: {
				Loading: true,
				Selected: null,
				CurrentIndex: 0,
				Data: [],
				Search: "",
			},
			Indikator: {
				Loading: true,
				Selected: null,
				Data: [],
				Raw: [],
				Modal: false,
				ModalCatatan: false,
			},
			Columns: [
				{
					key: "nama",
					name: "Indikator",
					sort: -1,
					search: true,
				},
				{
					key: null,
					name: "Pemahaman",
					sort: -1,
					search: false,
				},
			],
		};
	},
	computed: {
		...mapState({
			//* State
			Loading(state) {
				return state[this.ModelName].Loading;
			},
			//* Getters
			// Selecteds (state, getters) {
			// 	return getters[ `${this.ModelName}/GET_SELECTED` ]
			// }
		}),
		PembelajaranProgress() {
			return this.Pembelajaran.Raw.filter((data) => {
				if (this.Pembelajaran.Selected)
					return data.id == this.Pembelajaran.Selected.id;
				return false;
			});
		},
	},
	methods: {
		dayjs,
		isEmptyObject,
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
		onSearchPembelajaran: debounce(function (search, loading) {
			loading(true);
			this.Pembelajaran.Search = this.Pembelajaran.Data.filter((value) =>
				value.nama.includes(search)
			);
			loading(false);
		}, 350),
		OnSubmitCatatan() {
			//! Data ada di indikator.Data!!
			let Siswa = this.Siswa.Data[this.Siswa.CurrentIndex];
			let indikator = this.Indikator.Selected;
			let index = this.Indikator.Data.findIndex((data) => data.id == indikator.id)
			// console.info('nilai', Siswa.nilai, indikator)
			let dateSelected = this.Pembelajaran.Selected.tanggal;
			let nilai_i = Siswa.nilai.findIndex((nilai_d) => {
				let sameId = nilai_d.fk_indikator === indikator.id;
				let sameDate =
					dayjs(nilai_d.created_at)
						.locale(localeId)
						.diff(dayjs(dateSelected), "day") == 0;
				return sameId && sameDate;
			});
			let nilai = {
				nilai: indikator.nilai,
				fk_siswa: Siswa.id,
				fk_indikator: indikator.id,
				fk_kelas: this.Kelas.Selected.id,
				catatan: this.FormCatatan.catatan || "",
				created_at: dayjs(dateSelected).format("YYYY-MM-DD HH:mm:ss"),
				updated_at: dayjs(dateSelected).format("YYYY-MM-DD HH:mm:ss"),
			};

			if (nilai_i > -1) {
				nilai = {
					...Siswa.nilai[nilai_i],
					...nilai,
				};
			}
			
			console.info('nilai', nilai)

			//! Jika gak ada id nilai maka buat baru
			if (isEmptyObject(nilai.id)) {
				indikator.catatan = nilai.catatan;
			} else {
				//! Update nilai
				if (Siswa.nilai[nilai_i].catatan === nilai.catatan) return;
				PATCHData(`nilai/${nilai.id}`, {
					fk_nilai: nilai.id,
					...nilai,
				}).then((response) => {
					if (response.status < 400) {
						//? Update nilai di siswa dan indikator
						//? hapus nilai.id sebelum masukan ke indikator
						this.$set(Siswa.nilai, nilai_i, {
							...Siswa.nilai[nilai_i],
							...nilai,
						});
						let id = nilai.id;
						delete nilai.id;
						this.$set(this.Indikator.Data, index, {
							...indikator,
							...nilai,
							fk_nilai: id,
						});
						new Noty({
							type: "success",
							text: `Berhasil menyimpan ...`,
						}).show();
					} else {
						new Noty({
							type: "error",
							text: `Gagal menyimpan, ${response.message} ...`,
						}).show();
					}
				});
			}
			this.Indikator.ModalCatatan = false;
		},
		OnIndikatorClick(value) {
			this.Indikator.Modal = true;
			this.Indikator.Selected = value;
		},
		OnCatatanClick(value) {
			this.FormCatatan = { catatan: value.catatan || "" };
			this.Indikator.ModalCatatan = true;
			this.Indikator.Selected = value;
		},
		OnNilai(indikator, index) {
			//! Data ada di indikator.Data!!
			//? Cari nilai siswa yang harus diupdate
			let Siswa = this.Siswa.Data[this.Siswa.CurrentIndex];
			let dateSelected = this.Pembelajaran.Selected.tanggal;
			let nilai_i = Siswa.nilai.findIndex((nilai_d) => {
				let sameId = nilai_d.fk_indikator === indikator.id;
				let sameDate =
					dayjs(nilai_d.created_at)
						.locale(localeId)
						.diff(dayjs(dateSelected), "day") == 0;
				return sameId && sameDate;
			});

			let nilai = {
				nilai: indikator.nilai,
				fk_siswa: Siswa.id,
				fk_indikator: indikator.id,
				fk_kelas: this.Kelas.Selected.id,
				catatan: this.FormCatatan.catatan || indikator.catatan || "",
				created_at: dayjs(dateSelected).format("YYYY-MM-DD HH:mm:ss"),
				updated_at: dayjs(dateSelected).format("YYYY-MM-DD HH:mm:ss"),
			};

			if (nilai_i > -1) {
				nilai = {
					...Siswa.nilai[nilai_i],
					...nilai,
				};
			}

			//! Jika gak ada id nilai maka buat baru
			if (isEmptyObject(nilai.id)) {
				//! Create nilai
				POSTData("nilai", nilai).then((response) => {
					if (response.status < 400) {
						//? Update nilai di siswa dan indikator
						this.$set(this.Indikator.Data, index, {
							...indikator,
							...nilai,
							fk_nilai: response.data.data.id,
						});
						Siswa.nilai = [
							...Siswa.nilai,
							{
								...nilai,
								id: response.data.data.id,
							},
						];
						new Noty({
							type: "success",
							text: `Berhasil menyimpan ...`,
						}).show();
					} else {
						new Noty({
							type: "error",
							text: `Gagal menyimpan, ${response.message} ...`,
						}).show();
					}
				});
			} else {
				//! Update nilai
				if (Siswa.nilai[nilai_i].nilai === nilai.nilai) return;
				PATCHData(`nilai/${nilai.id}`, {
					fk_nilai: nilai.id,
					...nilai,
				}).then((response) => {
					if (response.status < 400) {
						//? Update nilai di siswa dan indikator
						//? hapus nilai.id sebelum masukan ke indikator
						this.$set(Siswa.nilai, nilai_i, {
							...Siswa.nilai[nilai_i],
							...nilai,
						});
						let id = nilai.id;
						delete nilai.id;
						this.$set(this.Indikator.Data, index, {
							...indikator,
							...nilai,
							fk_nilai: id,
						});
						new Noty({
							type: "success",
							text: `Berhasil menyimpan ...`,
						}).show();
					} else {
						new Noty({
							type: "error",
							text: `Gagal menyimpan, ${response.message} ...`,
						}).show();
					}
				});
			}
		},
		OnProgressChange(pembelajaran, index) {
			this.Pembelajaran.Progress = index;
			this.Pembelajaran.Selected = pembelajaran;
		},
		NilaitoIndikator() {
			//? Nilai ditambahkan pada indikator
			this.Indikator.Data = this.Indikator.Raw.map((item) => {
				let siswa = this.Siswa.Data[this.Siswa.CurrentIndex];
				let nilai_a = siswa.nilai;
				let index = nilai_a.findIndex((data) => {
					let sameId = data.fk_indikator === item.id;
					let date1 = dayjs(data.created_at.substring(0, 23))
						.locale(localeId)
						.format("YYYYMMDD");
					let date2 = dayjs(this.Pembelajaran.Selected.tanggal)
						.locale(localeId)
						.format("YYYYMMDD");

					let sameDate = date1 === date2;
					return sameId && sameDate;
				});
				//? Cek apakah memiliki nilai tidak kosong
				//? jika iya kembalikan indikator tanpa tambahan
				if (index > -1) {
					let nilai = { ...nilai_a[index] };
					nilai.fk_nilai = nilai.id;
					delete nilai.id;
					return { ...item, ...nilai };
				}
				return item;
			});
		},
	},
	watch: {
		"Kelas.Selected": function (nw) {
			if (!nw) return;
			this.Pembelajaran.Loading = true;
			this.Pembelajaran.Selected = null;
			GETData(`kelas/${nw.id}/pembelajaran`).then((res) => {
				this.Pembelajaran.Progress = 1;
				if (res.status < 400) {
					this.Pembelajaran.Raw = res.data.data;
					this.Pembelajaran.Data = res.data.data.filter(
						(x, i, a) => a.map((y) => y.id).indexOf(x.id) === i
					);

					this.onSearchPembelajaran("", (flg) => {
						this.Pembelajaran.Loading = flg;
						this.Pembelajaran.Selected = this.Pembelajaran.Search[0];
					});
				}
			});
			//? Awal siswa masuk
			this.Siswa.Loading = true;
			GETData(`kelas/${nw.id}/nilai`).then((res) => {
				this.Siswa.Loading = false;
				if (res.status < 400) this.Siswa.Data = res.data.data;
			});
		},
		"Pembelajaran.Selected": function (nw) {
			if (!nw) return;
			this.Indikator.Loading = true;
			GETData(`pembelajaran/${nw.id}/indikator?_limit=inf`).then((res) => {
				this.Indikator.Loading = false;
				if (res.status < 400) {
					//? Nilai ditambahkan pada indikator
					this.Indikator.Raw = res.data.data;
					this.Indikator.Data = res.data.data;
					this.NilaitoIndikator();
				}
			});
		},
		"Siswa.CurrentIndex": function (nw) {
			if (nw === null) return;
			this.NilaitoIndikator();
		},
		"Siswa.Selected": function (nw) {
			if (!nw) return;
			this.Siswa.CurrentIndex = this.Siswa.Data.findIndex(
				(item) => item.id === nw.id
			);
			this.Siswa.Selected = null;
		},
	},
	mounted() {
		this.onSearchKelas("", (flg) => (this.Kelas.Loading = flg));

		this.$nextTick(function () {
			this.$store.dispatch("Base/ToggleLoading", { value: false, page: false });
		});
	},
	created() {
		// register the icon
	},
};
</script>

<style>
</style>