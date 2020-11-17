<template>
	<SimpleForm
		:Name="ModelName.toLowerCase()"
		:Type="$route.meta.type"
		:Loading="Loading"
		@onnext="NextClick"
		@onback="BackClick"
		@onedit="EditClick"
	>
		<FormulateForm
			name="main-form"
			v-model="FormMain"
			:errors="FormErrors.Field"
			@submit="OnSubmitMain"
		>
			<i-row>
				<i-column offset-md="1" md="5">
					<div style="position: relative;" class="_margin-top-1">
						<div
							class="_height-100 _width-100"
							style="background: #26252e; position: absolute; opacity: 0.7;"
						></div>
						<img
							:src="
								FormMain.profile_url ||
								NOIMG
							"
							alt="Foto Profile"
							class="image _width-100 -thumbnail"
							style="object-fit: cover; height: 100px;"
						/>
					</div>

					<FormulateInput
						:disabled="IsView"
						type="image"
						name="foto"
						label="Foto Profil"
						help="pilih gambar dengan format png, jpg atau gif. maks ukuran 500kb"
						validation="mime:image/jpeg,image/png,image/gif"
						:uploader="OnUpload"
					/>

					<p class="vselect label">Pilih Wali Kelas *</p>
					<v-select
						:disabled="IsView"
						class="vselect"
						label="id"
						:filterable="false"
						:options="Pegawai.Data"
						v-model="FormMain.pegawai"
						@search="onSearchPegawai"
						placeholder="Cari dan pilih pegawai"
					>
						<template slot="no-options">
							Cari dan pilih pegawai ..
						</template>
						<template slot="option" slot-scope="option">
							<div class="d-center">
								<img
									:src="option.profile_url"
									class="image -responsive _rounded-circle _margin-right-1-3"
									style="max-height: 25px;"
								/>
								{{ option.nama }}
							</div>
						</template>
						<template slot="selected-option" slot-scope="option">
							<div class="selected d-center">
								<img
									:src="option.profile_url"
									class="image -responsive _rounded-circle _margin-right-1-3"
									style="max-height: 25px;"
								/>
								{{ option.nama }}
							</div>
						</template>
					</v-select>
				</i-column>
				<i-column md="5">
					<FormulateInput
						:disabled="IsView"
						type="text"
						name="nama"
						label="Nama *"
						placeholder="Masukan nama kelas .."
						validation="required"
					/>

					<FormulateInput
						:disabled="IsView"
						type="radio"
						name="kelompok"
						label="Pilih Kelompok TK *"
						value="A"
						validation="required|in:A,B"
						:options="{ A: 'Kelompok A', B: 'Kelompok B' }"
					/>

					<p class="_margin-y-1 _font-weight-bold">Lama Ajaran</p>
					<FormulateInput type="group" name="jadwal">
						<i-row>
							<i-column>
								<FormulateInput
									:disabled="IsView"
									type="date"
									name="mulai"
									label="Mulai *"
									placeholder="Tanggal mulai ajaran .."
									validation="required|date"
								/>
							</i-column>
							<i-column>
								<FormulateInput
									:disabled="IsView"
									type="date"
									name="berhenti"
									label="Berhenti *"
									placeholder="Tanggal berhenti ajaran .."
									validation="required|date"
								/>
							</i-column>
						</i-row>
					</FormulateInput>
				</i-column>
			</i-row>
		</FormulateForm>

		<h5 class="_margin-top-1 margin-optional _text-gray-70" v-if="!IsCreate">
			Optional
		</h5>
		<i-tabs custom class="margin-optional-content" v-if="!IsCreate">
			<template v-slot:header="{ tabs, active, setActive }">
				<span v-for="(tab, index) in tabs" :key="tab.id">
					<i-button
						:disabled="index > 0 && IsCreate"
						:variant="tab.id === active ? 'dark' : ''"
						size="sm"
						class="_margin-right-1-2"
						@click="setActive(tab)"
					>
						{{ tab.title }}
					</i-button>
				</span>
			</template>
			<i-tab title="Siswa">
				<i-row middle-xs class="_margin-x-1-4 _margin-y-1">
					<i-column xs="7" md="5">
						<i-input
							v-model="Siswa.Search"
							size="sm"
							placeholder="Cari data ..."
							v-on:input="OnSiswaCari"
						>
							<i slot="prefix"><Fa :icon="faSearch" /></i>
							<i-button
								size="sm"
								outline
								variant="secondary"
								slot="append"
								@click="
									Siswa.Search = '';
									OnSiswaCari();
								"
							>
								<i><Fa :icon="faTimesCircle" /></i>
							</i-button>
						</i-input>
					</i-column>
					<i-column class="_text-right">
						<i-button
							size="sm"
							:variant="Siswa.Unattended ? 'success' : 'secondary'"
							@click="OnSiswaToggle"
							:disabled="!IsEdit"
						>
							{{ Siswa.Unattended ? "Semua Siswa" : "Siswa Kelas" }}
						</i-button>
					</i-column>
				</i-row>
				<div class="_text-right _padding-0 _margin-x-1 _margin-bottom-1">
					<div
						v-if="IsEdit"
						class="_display-inline-flex _flex-direction-row _justify-content-end _align-items-center"
						key="action-1"
					>
						<div class="_margin-x-1">
							<b>Aksi Terpilih </b>
						</div>
						<div>
							<i-tooltip placement="bottom" style="margin: 0 0em 0 0em;">
								<i-button
									size="sm"
									variant="dark"
									@click="Siswa.Selecteds = []"
								>
									<i style="margin: 0 0.5em 0 0em;"><Fa :icon="faTimes" /></i>
									Batal
								</i-button>
								<template slot="body">Batalkan pilihan</template>
							</i-tooltip>
							<template>
								<i-tooltip placement="bottom" style="margin: 0 0.5em 0 0.5em;">
									<i-button
										size="sm"
										variant="warning"
										@click="OnSiswaTambah(null)"
										:disabled="!Siswa.Unattended"
									>
										<i><Fa :icon="faLink" /></i>
									</i-button>
									<template slot="body">Masukan ke kelas</template>
								</i-tooltip>
								<i-tooltip placement="bottom" style="margin: 0 0.5em 0 0em;">
									<i-button
										size="sm"
										variant="danger"
										@click="OnSiswaHapus(null)"
										:disabled="Siswa.Unattended"
									>
										<i><Fa :icon="faUnlink" /></i>
									</i-button>
									<template slot="body">Keluarkan dari kelas</template>
								</i-tooltip>
							</template>
						</div>
					</div>
				</div>
				<Table
					:Simple="true"
					:NoHead="true"
					v-on:page-change="LoadSiswa"
					v-on:sort-change="OnSiswaSort"
					v-on:select-change="OnSiswaSelect"
					:Rows="Siswa.Data"
					:Columns="Siswa.Columns"
					:Meta="Siswa.Meta"
					:Loading="Siswa.Loading"
					:Multiple="IsEdit"
					:Selecteds="SiswaSelecteds"
				>
					<template #action="{index}">
						<i-button
							@click.stop="OnSiswaAksi(index)"
							link
							variant="dark"
							class="_margin-x-1-3 -xs _font-weight-bold"
						>
							<Fa :icon="Siswa.Unattended ? faLink : faUnlink" />
							<span class="_margin-x-1-3">{{
								Siswa.Unattended ? "Masukan" : "Keluarkan"
							}}</span>
						</i-button>
					</template>
				</Table>
			</i-tab>
			<i-tab title="Pembelajaran">
				<h5
					v-if="Pembelajaran.Loading"
					class="_display-flex _justify-content-center _align-items-center"
				>
					<fulfilling-square-spinner
						:animation-duration="3000"
						:size="30"
						color="#26252e"
					/>
					<span class="_margin-x-1">Mengambil data ..</span>
				</h5>
				<div v-else>
					<h5>Jadwal Pembelajaran:</h5>
					<FormulateForm
						v-model="FormPembelajaran"
						@submit="OnPembelajaranTambah"
						v-if="IsEdit"
					>
						<i-row bottom-md class="_margin-bottom-1">
							<i-column md="6">
								<p class="vselect label">Pilih Pembelajaran</p>
								<v-select
									class="vselect"
									label="id"
									:filterable="false"
									:options="Pembelajaran.Search"
									v-model="Pembelajaran.Selected"
									@search="onSearchPembelajaran"
									placeholder="Cari dan pilih pembelajaran"
								>
									<template slot="no-options">
										Tidak ada hasil
									</template>
									<template slot="option" slot-scope="option">
										<div class="d-center">
											<img
												:src="option.profile_url"
												class="image -responsive _rounded-circle _margin-right-1-3"
												style="max-height: 25px;"
											/>
											{{ option.nama }}
										</div>
									</template>
									<template slot="selected-option" slot-scope="option">
										<div class="selected d-center">
											<img
												:src="option.profile_url"
												class="image -responsive _rounded-circle _margin-right-1-3"
												style="max-height: 25px;"
											/>
											{{ option.nama }}
										</div>
									</template>
								</v-select>
							</i-column>
							<i-column>
								<FormulateInput
									type="date"
									name="tanggal"
									label="Tanggal mengajar *"
								/>
							</i-column>
							<i-column>
								<FormulateInput type="submit" value="Tambah" />
							</i-column>
						</i-row>
					</FormulateForm>
					<i-table striped>
						<tr v-if="Pembelajaran.Data.length === 0">
							Belum memiliki data orang tua.
						</tr>
						<tr
							v-else
							v-for="(row, ipembelajaran) in Pembelajaran.Data"
							:key="ipembelajaran"
						>
							<th class="_align-middle" scope="row">
								<img
									:src="row.profile_url"
									class="image -responsive"
									style="max-height: 35px;"
								/>
							</th>
							<td class="_align-middle">
								<span class="_font-weight-bold">{{ row.nama }}</span> <br />
								{{
									row.deskripsi.slice(0, 60) +
									(row.deskripsi.length > 60 ? " ..." : "")
								}}
							</td>
							<td class="_align-middle">
								{{ CDate(row.tanggal) }}
							</td>
							<td class="_align-middle" v-if="IsEdit">
								<i-button
									link
									circle
									variant="danger"
									size="sm"
									@click="OnPembelajaranHapus(ipembelajaran, row.id)"
								>
									<Fa :icon="faTrash" />
									<span class="_margin-left-1-2"><b>Hapus</b></span>
								</i-button>
							</td>
						</tr>
					</i-table>
				</div>
			</i-tab>
			<i-tab title="Album">
				<h5
					v-if="Album.Loading && !Album.LoadMore"
					class="_display-flex _justify-content-center _align-items-center"
				>
					<fulfilling-square-spinner
						:animation-duration="3000"
						:size="30"
						color="#26252e"
					/>
					<span class="_margin-x-1">Mengambil data ..</span>
				</h5>
				<div v-else>
					<h5>Semua foto dikelas:</h5>
					<div class="_display-flex _flex-wrap">
						<div
							style="width: 140px; height: 140px; border: 2px gray dashed;"
							class="_text-center _cursor-pointer _margin-y-1"
							@click="Album.Modal = true"
						>
							Upload foto
						</div>
						<div
							v-for="(photo, index) in Album.Data.photos.data"
							:key="index"
							style="
								width: 140px;
								height: 140px;
								border: 1px black solid;
								position: relative;
							"
							class="_text-center image _margin-1 _cursor-pointer"
						>
							<img
								style="object-fit: cover;"
								class="image _width-100 _height-100"
								:src="photo.url"
								@click="
									Album.index = index;
									Album.Lightbox = true;
								"
							/>
							<span
								style="position: absolute; top: 0; right: 0;"
								class="_margin-1-2 _padding-1-4 _rounded _text-danger _background-gray-80"
								@click="OnFotoHapus(index, photo.foto_id)"
							>
								<Fa :icon="faTrash" />
							</span>
						</div>
						<div
							style="width: 140px; height: 140px;"
							class="_display-flex _align-items-center _justify-content-center _margin-y-1"
							v-if="Album.Data.photos.meta.has_more === true"
						>
							<HollowDotsSpinner
								v-show="Album.Loading && Album.LoadMore"
								:animation-duration="100"
								:size="20"
								color="#333"
							/>
							<a
								v-show="!Album.Loading"
								class="_text-flickr _font-weight-bold _cursor-pointer"
								@click="LoadAlbum(true)"
								><u>Muat lebih</u></a
							>
						</div>
					</div>
				</div>
			</i-tab>
		</i-tabs>
		<i-modal size="sm" variant="danger" v-model="Album.Modal">
			<b>Uploader:</b>
			<FormulateInput
				:disabled="IsView"
				type="image"
				name="foto"
				label="Foto Album"
				help="pilih gambar dengan format png, jpg atau gif. maks ukuran 2mb"
				validation="mime:image/jpeg,image/png,image/gif"
				:uploader="OnUploadAlbum"
			/>
		</i-modal>
		<Lightbox
			:visible="Album.Lightbox"
			v-if="Album.Data && Album.Data.photos"
			:imgs="Album.Data.photos.data.map((photo) => photo.url)"
			:index="Album.IndexLB"
			@hide="Album.Lightbox = false"
		></Lightbox>
	</SimpleForm>
</template>

<script>
import MixinCreate from "../../mixins/Create";
import debounce from "lodash/debounce";
import { Search, GETTable, POSTData, GETData, UPFile } from "../../utils/net";
import { isEmptyObject } from "../../utils/common";
import SimpleForm from "../../components/Form/SimpleForm";
import Noty from "noty";
import Table from "../../components/Table/Base";
import Fa from "vue-fa";
import {
	faSearch,
	faTimesCircle,
	faPlusSquare,
	faMinusSquare,
	faTimes,
	faUnlink,
	faLink,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FulfillingSquareSpinner, HollowDotsSpinner } from "epic-spinners";
import dayjs from "dayjs";
import Lightbox from "vue-easy-lightbox";

export default {
	name: "Kelas-Create",
	mixins: [MixinCreate],
	props: {
		ModelName: { type: String, default: "Kelas" },
	},
	components: {
		SimpleForm,
		Table,
		Fa,
		FulfillingSquareSpinner,
		HollowDotsSpinner,
		Lightbox,
	},
	data() {
		return {
			faSearch,
			faMinusSquare,
			faTimesCircle,
			faPlusSquare,
			faTimes,
			faUnlink,
			faLink,
			faTrash,
			NOIMG: `${window.location.origin}/noimg.webp`,
			OnSiswaCari: function () {},
			FormPembelajaran: {},
			Siswa: {
				Columns: [
					{
						key: "profile_url",
						name: "Foto",
						sort: -1,
						search: false,
						type: "image",
					},
					{
						key: "nama",
						name: "Nama",
						sort: 50,
						search: true,
					},
					{
						key: "nisn",
						name: "NIK",
						sort: 50,
						search: true,
					},
				],
				Meta: {
					_limit: 6,
					_like: {
						_text: "",
						_columns: [],
					},
					_with: ["kelas"],
					_filter: {
						_order: [],
						_includes: [],
						_symbol: {},
					},
				},
				Unattended: false,
				Loading: true,
				Selecteds: [],
				IsSelected: true,
				Data: [],
				Search: "",
			},
			Album: {
				Loading: true,
				LoadMore: false,
				Lightbox: false,
				IndexLB: 0,
				Modal: false,
				Data: {},
			},
			Pegawai: {
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
			},
		};
	},
	methods: {
		CDate(tanggal) {
			return dayjs(tanggal).format("dddd DD, MM/YY");
		},
		OnUpload(file, progress, error) {
			// optionally handle the `file` for your own purposes here...
			let formData = new FormData();
			formData.append("foto", file);
			progress(65);
			UPFile(`photos/profil`, formData).then((response) => {
				if (response.status < 400) {
					this.FormMain = {
						...this.FormMain,
						profile_url: response.data.data.profile_url,
						fk_foto: response.data.data.id,
					};

					progress(100);
				} else error(response.message);
			});
		},
		OnUploadAlbum(file, progress, error) {
			// optionally handle the `file` for your own purposes here...
			let formData = new FormData();
			formData.append("foto", file);
			progress(65);
			UPFile(`kelas/${this.id}/album`, formData).then((response) => {
				if (response.status < 400) {
					if (this.Album.Data.photos.data !== []) {
						this.Album.Data.photos.data = [];
						this.Album.Data.photos.data.push({
							url: response.data.data.profile_url,
						});
					} else {
						this.Album.Data.photos.data.push({
							url: response.data.data.profile_url,
						});
					}
					this.Album.Modal = false;
					progress(100);
				} else error(response.message);
			});
		},
		SaveData() {
			this.FormMain.jadwal = this.FormMain.jadwal[0];
			this.FormMain.fk_pegawai = this.FormMain.pegawai.id;
			new Noty({
				type: "info",
				text: `Menyimpan data ${this.ModelName.toLowerCase()} ...`,
			}).show();

			this.$store.dispatch(`${this.ModelName}/PostForm`).then((response) => {
				if (response.status < 400) {
					new Noty({
						type: "success",
						text: `Berhasil menyimpan ...`,
					}).show();

					this.ExitForm();
				} else {
					if (response.data) this.FormErrors.Field = response.data;
					this.FormErrors.Form = response.message;

					new Noty({
						type: "error",
						text: `Gagal menyimpan, ${response.message} ...`,
					}).show();
				}
			});
			this.FormMain.jadwal = [this.FormMain.jadwal];
		},
		UpdateData() {
			this.FormMain.jadwal = this.FormMain.jadwal[0];
			this.FormMain.fk_pegawai = this.FormMain.pegawai.id;
			new Noty({
				type: "info",
				text: `Menyimpan data ${this.ModelName.toLowerCase()} ...`,
			}).show();

			this.$store
				.dispatch(`${this.ModelName}/PatchForm`, this.id)
				.then((response) => {
					if (response.status < 400) {
						new Noty({
							type: "success",
							text: `Berhasil menyimpan ...`,
						}).show();

						this.ExitForm();
					} else {
						new Noty({
							type: "error",
							text: `Gagal menyimpan, ${response.message} ...`,
						}).show();

						if (response.data) this.FormErrors.Field = response.data;
						this.FormErrors.Form = response.message;
					}
				});
			this.FormMain.jadwal = [this.FormMain.jadwal];
		},
		onSearchPegawai: debounce(function (search, loading) {
			loading(true);
			Search(
				"pegawai/search",
				{
					value: escape(search),
					column: "nama",
				},
				{
					_filter: {
						_symbol: {
							_type: "e",
							_text: "GU",
							_column: "role",
						},
					},
				}
			).then((res) => {
				if (res.status < 400) this.Pegawai.Data = res.data.data;
				loading(false);
			});
		}, 350),
		onSearchPembelajaran: debounce(function (search, loading) {
			loading(true);
			Search("pembelajaran/search", {
				value: escape(search),
				column: "nama",
			}).then((res) => {
				if (res.status < 400) this.Pembelajaran.Search = res.data.data;
				loading(false);
			});
		}, 350),
		OnSiswaToggle() {
			this.Siswa.Unattended = !this.Siswa.Unattended;
			this.Siswa.Selecteds = [];
			this.LoadSiswa();
		},
		OnSiswaSort(column, index) {
			this.$set(this.Siswa.Columns, index, column);
			let orders = [];
			this.Siswa.Columns.forEach((column) => {
				if (column.sort !== -1 && column.sort !== 50) {
					let type = column.sort > 0 ? "asc" : "desc";
					orders.push({ _column: column.key, _type: type });
				}
			});
			let filter = {
				...this.Siswa.Meta._filter,
				_order: orders,
			};
			this.Siswa.Meta = {
				...this.Siswa.Meta,
				_filter: filter,
			};
			this.LoadSiswa();
		},
		OnSiswaSelect(value) {
			let selecteds = this.Siswa.Selecteds;
			for (let i = 0; i < this.Siswa.Meta._limit; i++) {
				const element = this.Siswa.Data[i];
				if (!element) break;
				let id = selecteds.findIndex((id) => id === element.id);
				if (value[i]) {
					if (id < 0) selecteds.push(element.id);
				} else {
					if (id > -1) selecteds.splice(id, 1);
				}
			}
		},
		OnSiswaAksi(index = null) {
			if (this.Siswa.Unattended) return this.OnSiswaTambah(index);
			this.OnSiswaHapus(index);
		},
		OnSiswaTambah(index = null) {
			let ids = [];
			let indexs = [];

			if (index !== null) {
				indexs.push(index);
				ids.push(this.Siswa.Data[index].id);
			} else {
				this.Siswa.Data.forEach((element, el_index) => {
					let exists =
						this.Siswa.Selecteds.findIndex((row) => row === element.id) > -1;
					if (exists) {
						ids.push(element.id);
						indexs.push(el_index);
					}
				});
			}

			POSTData(`kelas/${this.id}/link/siswa`, {
				fk_siswa: ids,
			}).then((response) => {
				if (response.status < 400) {
					indexs.reverse().forEach((i) => {
						this.Siswa.Data.splice(i, 1);
					});
				} else {
					new Noty({
						type: "error",
						text: `Gagal menambahkan kelas ...`,
					}).show();
				}
			});
		},
		OnSiswaHapus(index = null) {
			let ids = [];
			let indexs = [];
			if (index) {
				indexs.push(index);
				ids.push(this.Siswa.Data[index].id);
			} else {
				this.Siswa.Data.forEach((element, el_index) => {
					let exists =
						this.Siswa.Selecteds.findIndex((row) => row === element.id) > -1;
					if (exists) {
						ids.push(element.id);
						indexs.push(el_index);
					}
				});
			}

			POSTData(`kelas/${this.id}/unlink/siswa`, {
				fk_siswa: ids,
			}).then((response) => {
				if (response.status < 400) {
					indexs.reverse().forEach((i) => this.Siswa.Data.splice(i, 1));
				} else {
					new Noty({
						type: "error",
						text: `Gagal menambahkan kelas ...`,
					}).show();
				}
			});
		},
		OnPembelajaranHapus(index, id) {
			new Noty({
				type: "info",
				text: `Menghapus data pembelajaran ...`,
			}).show();

			POSTData(`kelas/${this.id}/unlink/pembelajaran`, {
				fk_pembelajaran: [id],
			}).then((response) => {
				if (response.status < 400) {
					new Noty({
						type: "success",
						text: `Berhasil menghapus pembelajaran ...`,
					}).show();
					this.Pembelajaran.Data.splice(index, 1);
				} else {
					new Noty({
						type: "error",
						text: `Gagal menghapus pembelajaran ...`,
					}).show();
				}
			});
		},
		OnFotoHapus(index, id) {
			new Noty({
				type: "info",
				text: `Menghapus foto ...`,
			}).show();

			POSTData(`kelas/${this.id}/unlink/foto`, {
				fk_foto: [id],
			}).then((response) => {
				if (response.status < 400) {
					new Noty({
						type: "success",
						text: `Berhasil menghapus foto ...`,
					}).show();
					this.Album.Data.photos.data.splice(index, 1);
				} else {
					new Noty({
						type: "error",
						text: `Gagal menghapus foto ...`,
					}).show();
				}
			});
		},
		OnPembelajaranTambah() {
			new Noty({
				type: "info",
				text: `Menambahkan data pembelajaran ...`,
			}).show();

			let unique =
				this.Pembelajaran.Data.findIndex((value) => {
					let sameId = value.id === this.Pembelajaran.Selected.id;
					let sameDate = value.tanggal === this.Pembelajaran.Selected.tanggal;
					return sameId && sameDate;
				}) < 0;
			let same = this.Pembelajaran.Data.filter((value) => {
					let sameId = value.id === this.Pembelajaran.Selected.id;
					return sameId;
				})
			if(same.length >= 4) {
				new Noty({
						type: "error",
						text: `Tidak bisa menambahkan progress ...`,
					}).show();
					return;
			}

			POSTData(`kelas/${this.id}/link/pembelajaran`, {
				id: [this.Pembelajaran.Selected.id],
				tanggal: [this.FormPembelajaran.tanggal],
			}).then((response) => {
				if (response.status < 400 && unique) {
					new Noty({
						type: "success",
						text: `Berhasil menambahkan pembelajaran ...`,
					}).show();
					this.Pembelajaran.Data.push({
						...this.Pembelajaran.Selected,
						tanggal: this.FormPembelajaran.tanggal,
					});
				} else {
					new Noty({
						type: "error",
						text: `Gagal menambahkan pembelajaran ...`,
					}).show();
				}
			});
		},
		OnFotoTambah() {},
		LoadSiswa(page = 1) {
			this.Siswa.Loading = true;
			this.Siswa.Meta.page = page;

			let url = "siswa/unattended";
			if (!this.Siswa.Unattended) url = `kelas/${this.id}/siswa`;

			let meta = this.Siswa.Meta;
			GETTable(url, meta).then((response) => {
				this.Siswa.Meta = { ...this.Siswa.Meta, ...(response.data.meta ?? {}) };
				this.Siswa.Loading = false;
				if (response.status < 400) this.Siswa.Data = response.data.data;
				else this.Siswa.Data = [];
			});
		},
		LoadPembelajaran() {
			this.Pembelajaran.Loading = true;
			GETData(`kelas/${this.id}/pembelajaran`).then((response) => {
				this.Pembelajaran.Loading = false;
				if (response.status < 400) this.Pembelajaran.Data = response.data.data;
				else this.Pembelajaran.Data = [];
			});
			this.onSearchPembelajaran("", function () {});
		},
		LoadAlbum(more = false) {
			this.Album.Loading = true;
			let url = "";
			if (more) {
				let page = this.Album.Data.photos.meta.page + 1;
				url = `kelas/${this.id}/album?page=${page}`;
				this.Album.LoadMore = true;
			} else url = `kelas/${this.id}/album?page=1`;
			GETData(url).then((response) => {
				this.Album.Loading = false;
				this.Album.LoadMore = false;
				if (response.status < 400) this.Album.Data = response.data.data;
				else this.Album.Data = {};
			});
			this.onSearchPembelajaran("", function () {});
		},
		async OnCreate(forms) {
			if (!isEmptyObject(forms)) {
				let doClear = false;
				let clearDialog = new Noty({
					text:
						"Terdapat data sebelumnya yang tersimpan, apakah ingin melanjutkan?",
					timeout: 8000,
					buttons: [
						Noty.button("Ya", "button-noty-ok", () => clearDialog.close()),

						Noty.button("Hapus", "button-noty-cancel", () => {
							doClear = true;
							clearDialog.close();
						}),
					],
					callbacks: {
						onClose: () => {
							if (doClear) {
								this.$store.dispatch(`${this.ModelName}/ClearForm`);
								this.FormInformasi = {};
							}
						},
					},
				});
				clearDialog.show();
			}
		},
		OnEdit() {},
		OnView() {},
		async OnMounted() {
			this.id = this.$route.params.id;
			let forms = await this.$store.dispatch(
				`${this.ModelName}/GET_CLEAN_FORM`
			);

			if (this.IsCreate) {
				this.Siswa.Unattended = true;
				this.OnCreate(forms);
				this.$nextTick(function () {
					this.$store.dispatch("Base/ToggleLoading", {
						value: false,
						page: false,
					});
				});
			} else {
				await this.$store
					.dispatch(`${this.ModelName}/SetItem`, this.id)
					.finally(() => {
						this.$store.dispatch("Base/ToggleLoading", {
							value: false,
							page: false,
						});
					});
				this.FormMain.jadwal = [this.FormMain.jadwal];
				if (this.IsEdit) this.OnEdit();
				else this.OnView();
			}
			this.LoadAlbum();
			this.LoadPembelajaran();
			this.LoadSiswa();
		},
	},
	computed: {
		SiswaSelecteds() {
			let ids = [];
			this.Siswa.Data.forEach((element) => {
				if (this.Siswa.Selecteds.findIndex((row) => row === element.id) > -1)
					ids.push(true);
				else ids.push(false);
			});
			return ids;
		},
	},
	async mounted() {
		this.OnSiswaCari = debounce(() => {
			this.Siswa.Meta = {
				...this.Siswa.Meta,
				_like: {
					_text: this.Siswa.Search,
					_columns: ["nama", "nis", "nik"],
				},
			};
			this.LoadSiswa();
		}, 400);
		this.OnMounted();
	},
};
</script>

<style>
</style>