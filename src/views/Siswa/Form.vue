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
				<i-column class="_margin-bottom-1" md="5" offset-md="1">
					<FormulateInput
						:disabled="IsView"
						type="text"
						name="nama"
						label="Nama *"
						placeholder="Masukan nama siswa .."
						validation="required"
					/>

					<FormulateInput
						:disabled="IsView"
						type="radio"
						name="gender"
						label="Pilih Gender *"
						value="L"
						validation="in:L,P|required"
						:options="{ L: 'Laki-Laki', P: 'Perempuan' }"
					/>

					<i-row>
						<i-column>
							<FormulateInput
								:disabled="IsView"
								type="date"
								name="tanggal_lahir"
								label="Tanggal Lahir *"
								placeholder="Masukan tanggal lahir .."
								validation="required|date"
							/>
						</i-column>
						<i-column>
							<FormulateInput
								:disabled="IsView"
								type="text"
								name="tempat_lahir"
								label="Tempat Lahir *"
								placeholder="Masukan tempat lahir .."
								validation="required"
							/>
						</i-column>
					</i-row>

					<i-row>
						<i-column>
							<FormulateInput
								:disabled="IsView"
								type="number"
								name="anak_ke"
								placeholder="Masukan dengan angka .."
								label="Anak ke *"
								validation="required|number"
							/>
						</i-column>
						<i-column>
							<FormulateInput
								:disabled="IsView"
								type="number"
								name="jumlah_saudara"
								placeholder="Masukan dengan angka .."
								label="Saudara *"
								validation="required|number"
							/>
						</i-column>
					</i-row>
					<FormulateInput
						:disabled="IsView"
						type="text"
						name="nisn"
						label="NISN *"
						placeholder="Masukan nomor induk siswa nasional .."
						validation="required"
					/>

					<FormulateInput
						:disabled="IsView"
						type="text"
						name="nik"
						label="NIK *"
						placeholder="Masukan nomor induk keluarga .."
						validation="required"
					/>

					<i-button
						v-if="!IsCreate"
						:loading="LoadingReset"
						@click.prevent.self="OnResetPassword"
						:disabled="!IsEdit"
					>
						Reset Password
						<template v-slot:loading> Loading .. </template>
					</i-button>
				</i-column>

				<i-column md="5">
					<div class="_text-center" v-show="FormMain.profile_url">
						<img
							:src="FormMain.profile_url"
							alt="Foto Profile"
							class="image -responsive _width-50"
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

					<FormulateInput
						:disabled="IsView"
						type="select"
						name="agama"
						label="Agama *"
						placeholder="Pilih agama .."
						validation="required"
						:options="{
							Islam: 'Islam',
							Kristen: 'Kristen ',
							Khatolik: 'Katolik',
							Hindu: 'Hindu',
							Buddha: 'Buddha',
							Khonghucu: 'Khonghucu',
						}"
					/>

					<FormulateInput
						:disabled="IsView"
						type="text"
						name="kewarganegaraan"
						label="Kewarganegaraan *"
						placeholder="Masukan kewarganegaraan .."
						validation="required"
					/>

					<FormulateInput
						:disabled="IsView"
						type="select"
						name="transportasi"
						placeholder="Pilih transportasi .."
						label="Pilih Transportasi *"
						validation="required"
						:options="{
							Jalan: 'Jalan kaki',
							Motor: 'Motor',
							Mobil: 'Mobil',
							Sepeda: 'Teleporter',
						}"
					/>

					<FormulateInput
						:disabled="IsView"
						type="select"
						name="golongan_darah"
						placeholder="Pilih Golongan darah .."
						label="Pilih Golongan Darah *"
						validation="in:A,AB,B,O|required"
						:options="{
							A: 'Golongan A',
							B: 'Golongan B',
							AB: 'Golongan AB',
							O: 'Golongan O',
						}"
					/>
				</i-column>
			</i-row>
		</FormulateForm>

		<h5 class="_margin-top-1 margin-optional _text-gray-70">Optional</h5>
		<i-tabs custom class="margin-optional-content">
			<template v-slot:header="{ tabs, active, setActive }">
				<span v-for="(tab, index) in tabs" :key="tab.id">
					<i-button
						:disabled="index > 0 && IsCreate"
						:variant="tab.id === active ? 'dark' : ''"
						size="sm"
						class="_margin-right-1-2 _margin-bottom-1-3"
						@click="setActive(tab)"
					>
						{{ tab.title }}
					</i-button>
				</span>
			</template>
			<i-tab title="Informasi">
				<FormulateForm name="informasi-form" v-model="FormInformasi">
					<i-row>
						<i-column md="6">
							<FormulateInput
								:disabled="IsView"
								type="text"
								name="reg_akta"
								placeholder="Masukan no Akta kelahiran .."
								label="Reg. Akta lahir"
							/>
							<FormulateInput
								:disabled="IsView"
								type="text"
								name="no_kip"
								placeholder="Masukan no KIP .."
								label="No KIP"
							/>

							<FormulateInput
								:disabled="IsView"
								type="text"
								name="no_kks"
								placeholder="Masukan no KKS .."
								label="No. KKS"
							/>

							<FormulateInput
								:disabled="IsView"
								type="text"
								name="no_kps"
								placeholder="Masukan no KPS .."
								label="No. KPS"
							/>
						</i-column>
						<i-column md="6">
							<FormulateInput
								:disabled="IsView"
								type="textarea"
								name="penyakit_berat"
								label="Penyakit Berat"
								placeholder="Masukan penyakit berat .."
								help="dapat dipisah dengan koma (,)"
							/>

							<FormulateInput
								:disabled="IsView"
								type="textarea"
								name="kebutuhan_khusus"
								label="Kebutuhan Khusus"
								placeholder="Masukan jika memiliki kebutuhan khusus .."
								help="dapat dipisah dengan koma (,)"
							/>
						</i-column>
					</i-row>
				</FormulateForm>
			</i-tab>
			<i-tab title="Tinggi Berat">
				<h5
					v-if="TinggiBerat.Loading"
					class="_display-flex _justify-content-center _align-items-center"
				>
					<fulfilling-square-spinner
						:animation-duration="2000"
						:size="30"
						color="#26252e"
					/>
					<span class="_margin-x-1">Mengambil data ..</span>
				</h5>
				<div v-else>
					<h5>Perubahan Tinggi-Berat:</h5>
					<FormulateForm
						v-model="FormTinggiBerat"
						@submit="OnSubmitTinggiBerat"
						v-if="IsEdit"
					>
						<i-row bottom-md class="_margin-bottom-1">
							<i-column>
								<FormulateInput
									type="number"
									name="tinggi"
									label="Tinggi"
									validation="required"
									placeholder="dalam cm"
								/>
							</i-column>
							<i-column>
								<FormulateInput
									type="number"
									name="berat"
									label="Berat"
									validation="required"
									placeholder="dalam kg"
								/>
							</i-column>
							<i-column>
								<FormulateInput type="submit" value="Tambah" />
							</i-column>
						</i-row>
					</FormulateForm>
					<i-table striped>
						<tr v-if="TinggiBerat.Data.length === 0">
							Belum memiliki data tinggi berat.
						</tr>
						<tr
							v-else
							v-for="(row, itinggiberat) in TinggiBerat.Data"
							:key="itinggiberat"
						>
							<th scope="row" class="_font-weight-bold">
								{{ row.created_at }}
							</th>
							<td>{{ row.tinggi }}CM</td>
							<td>{{ row.berat }}KG</td>
							<td width="100px" v-if="IsEdit">
								<i-button
									link
									circle
									variant="danger"
									size="sm"
									@click="OnDeleteTinggiBerat(itinggiberat, row.id)"
								>
									<Fa :icon="faTrash" />
									<span class="_margin-left-1-2"><b>Hapus</b></span>
								</i-button>
							</td>
						</tr>
					</i-table>
				</div>
			</i-tab>
			<i-tab title="Orang tua">
				<h5
					v-if="Orangtua.Loading"
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
					<h5>Relasi dengan Orang tua:</h5>
					<FormulateForm
						v-model="FormOrangtua"
						@submit="OnSubmitOrangtua"
						v-if="IsEdit"
					>
						<i-row bottom-md class="_margin-bottom-1">
							<i-column md="6">
								<p class="vselect label">Pilih Orang tua</p>
								<v-select
									class="vselect"
									label="id"
									:filterable="false"
									:options="Orangtua.Search"
									v-model="Orangtua.Selected"
									placeholder="Cari dan pilih orang tua"
								>
									<template slot="no-options"> Tidak ada hasil </template>
									<template slot="option" slot-scope="option">
										<div class="d-center">
											<img
												:src="option.profile_url"
												class="image -responsive _rounded-circle _margin-right-1-3"
												style="max-height: 25px"
											/>
											{{ option.nama }}
										</div>
									</template>
									<template slot="selected-option" slot-scope="option">
										<div class="selected d-center">
											<img
												:src="option.profile_url"
												class="image -responsive _rounded-circle _margin-right-1-3"
												style="max-height: 25px"
											/>
											{{ option.nama }}
										</div>
									</template>
								</v-select>
							</i-column>
							<i-column class="_margin-y-1-2">
								<FormulateInput
									type="checkbox"
									name="tinggal_bersama"
									label="Tinggal Bersama"
								/>
							</i-column>
							<i-column>
								<FormulateInput type="submit" value="Tambah" />
							</i-column>
						</i-row>
					</FormulateForm>
					<i-table striped>
						<tr v-if="Orangtua.Data.length === 0">
							Belum memiliki data orang tua.
						</tr>
						<tr
							v-else
							v-for="(row, iorangtua) in Orangtua.Data"
							:key="iorangtua"
						>
							<th scope="row">
								<img
									:src="row.profile_url"
									class="image -responsive"
									style="max-height: 35px"
								/>
							</th>
							<td class="_font-weight-bold _align-middle">{{ row.nama }}</td>
							<td class="_align-middle">
								<FormulateInput
									:disabled="!IsEdit"
									type="checkbox"
									name="tinggal_bersama"
									label="Tinggal Bersama"
									v-model="row.tinggal_bersama"
									@input="OnUpdateOrangtua(iorangtua, !row.tinggal_bersama)"
								/>
							</td>
							<td v-if="IsEdit">
								<i-button
									link
									circle
									variant="danger"
									size="sm"
									@click="OnDeleteOrangtua(iorangtua, row.id)"
								>
									<Fa :icon="faTrash" />
									<span class="_margin-left-1-2"><b>Hapus</b></span>
								</i-button>
							</td>
						</tr>
					</i-table>
				</div>
			</i-tab>
			<i-tab title="Kelas">
				<h5
					v-if="Kelas.Loading"
					class="_display-flex _justify-content-center _align-items-center"
				>
					<fulfilling-square-spinner
						:animation-duration="4000"
						:size="30"
						color="#26252e"
					/>
					<span class="_margin-x-1">Mengambil data ..</span>
				</h5>
				<div v-else>
					<h5>Relasi dengan Kelas:</h5>
					<FormulateForm
						v-model="FormKelas"
						@submit="OnSubmitKelas"
						v-if="IsEdit"
					>
						<i-row bottom-md class="_margin-bottom-1">
							<i-column>
								<p class="vselect label">Pilih Kelas</p>
								<v-select
									class="vselect"
									label="id"
									:filterable="false"
									:options="Kelas.Search"
									v-model="Kelas.Selected"
									:multiple="true"
									placeholder="Cari dan pilih kelas"
								>
									<template slot="no-options"> Tidak ada hasil </template>
									<template slot="option" slot-scope="option">
										<div class="d-center">
											<img
												:src="option.profile_url"
												class="image -responsive _rounded-circle _margin-right-1-3"
												style="max-height: 25px"
											/>
											{{ option.nama }}
										</div>
									</template>
									<template slot="selected-option" slot-scope="option">
										<div class="selected d-center">
											<img
												:src="option.profile_url"
												class="image -responsive _rounded-circle _margin-right-1-3"
												style="max-height: 25px"
											/>
											{{ option.nama }}
										</div>
									</template>
								</v-select>
							</i-column>
							<i-column>
								<FormulateInput type="submit" value="Tambah" />
							</i-column>
						</i-row>
					</FormulateForm>

					<i-table striped>
						<tr v-if="Kelas.Data.length === 0">
							Belum masuk kedalam kelas manapun.
						</tr>
						<tr v-else v-for="(row, ikelas) in Kelas.Data" :key="ikelas">
							<th scope="row">
								<img
									:src="row.profile_url"
									class="image -responsive"
									style="max-height: 35px"
								/>
							</th>
							<td class="_font-weight-bold _align-middle">{{ row.nama }}</td>
							<td class="_align-middle">
								<span>Kelompok </span>{{ row.kelompok }}
							</td>
							<td v-if="IsEdit">
								<i-button
									link
									circle
									variant="danger"
									size="sm"
									@click="OnDeleteKelas(ikelas, row.id)"
								>
									<Fa :icon="faTrash" />
									<span class="_margin-left-1-2"><b>Hapus</b></span>
								</i-button>
							</td>
						</tr>
					</i-table>
				</div>
			</i-tab>
		</i-tabs>
	</SimpleForm>
</template>

<script>
import MixinCreate from "../../mixins/Create";
import debounce from "lodash/debounce";
import pick from "lodash/pick";
import { Search, GETData, POSTData, UPFile } from "../../utils/net";
import Fa from "vue-fa";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { isEmptyObject } from "../../utils/common";
import SimpleForm from "../../components/Form/SimpleForm";
import Noty from "noty";
import { FulfillingSquareSpinner } from "epic-spinners";
import dayjs from "dayjs";

export default {
	name: "Siswa-Create",
	mixins: [MixinCreate],
	props: {
		ModelName: { type: String, default: "Siswa" },
	},
	components: { SimpleForm, Fa, FulfillingSquareSpinner },
	data() {
		return {
			faEdit,
			faTrash,
			FormInformasi: {},
			FormTinggiBerat: {},
			FormOrangtua: {},
			FormKelas: {},
			today: dayjs().format("YYYY-MM-DD"),
			LoadingReset: false,
			Orangtua: {
				Loading: true,
				Selected: null,
				Data: [],
				Search: [],
			},
			TinggiBerat: {
				Loading: true,
				Selected: null,
				Data: [],
				Search: [],
			},
			Kelas: {
				Loading: true,
				Selected: null,
				Data: [],
				Search: [],
			},
		};
	},
	methods: {
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
		SaveData() {
			new Noty({
				type: "info",
				text: `Menyimpan data ${this.ModelName.toLowerCase()} ...`,
			}).show();

			this.FormMain = {
				...this.FormMain,
				...this.FormInformasi,
			};

			this.$store.dispatch(`${this.ModelName}/PostForm`).then((response) => {
				if (response.status < 400) {
					new Noty({
						type: "success",
						text: `Berhasil menyimpan ...`,
					}).show();

					this.id = response.data.data.id;
					this.$router.push(`${this.id}/edit?new`, () => this.OnMounted());
				} else {
					if (response.data) this.FormErrors.Field = response.data;
					this.FormErrors.Form = response.message;

					new Noty({
						type: "error",
						text: `Gagal menyimpan, ${response.message} ...`,
					}).show();
				}
			});
		},
		UpdateData() {
			this.FormMain = { ...this.FormMain, ...this.FormInformasi };

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
		},
		onSearchKelas: debounce(function (search, loading) {
			this.ViewTable("kelas");
			loading(true);
			Search("kelas/search", {
				value: escape(search),
				column: "nama",
			}).then((res) => {
				if (res.status < 400) this.Kelas.Search = res.data.data;
				loading(false);
			});
		}, 350),
		onSearchOrangtua: debounce(function (search, loading) {
			this.ViewTable("orangtua");
			loading(true);
			Search("orangtua/search", {
				value: escape(search),
				column: "nama",
			}).then((res) => {
				if (res.status < 400) this.Orangtua.Search = res.data.data;
				loading(false);
			});
		}, 350),
		OnSubmitTinggiBerat() {
			POSTData(`siswa/${this.id}/link/tinggiberat`, {
				...this.FormTinggiBerat,
			}).then((response) => {
				if (response.status < 400) {
					this.LoadTinggiBerat();
					new Noty({
						type: "success",
						text: `Berhasil menambahkan tinggi & berat ...`,
					}).show();
				} else {
					new Noty({
						type: "error",
						text: `Gagal menambahkan tinggi & berat ...`,
					}).show();
				}
			});
		},
		OnSubmitOrangtua() {
			let opts = Boolean(this.FormOrangtua.tinggal_bersama);
			if (!this.Orangtua.Selected) {
				return new Noty({
					type: "error",
					text: `Gagal menambahkan orangtua ...`,
				}).show();
			}

			let unique =
				this.Orangtua.Data.findIndex((value) => {
					return value.id === this.Orangtua.Selected.id;
				}) < 0;

			POSTData(`siswa/${this.id}/link/orangtua`, {
				id: [this.Orangtua.Selected.id],
				tinggal_bersama: [opts],
			}).then((response) => {
				if (response.status < 400 && unique) {
					this.Orangtua.Selected = {
						...this.Orangtua.Selected,
						tinggal_bersama: opts,
					};
					this.Orangtua.Data.push(this.Orangtua.Selected);
					new Noty({
						type: "success",
						text: `Berhasil menambahkan orangtua ...`,
					}).show();
				} else {
					new Noty({
						type: "error",
						text: `Gagal menambahkan orangtua ...`,
					}).show();
				}
				this.Orangtua.Selected = [];
			});
		},
		OnSubmitKelas() {
			let unique = [];
			if (!this.Kelas.Selected) {
				return new Noty({
					type: "error",
					text: `Gagal menambahkan kelas ...`,
				}).show();
			}

			for (let i = 0; i < this.Kelas.Selected.length; i++) {
				const element = this.Kelas.Selected[i];
				let addel = this.Kelas.Data.find((value) => {
					return value.id === element.id;
				});
				if (addel === undefined) unique.push(element);
			}
			POSTData(`siswa/${this.id}/link/kelas`, {
				fk_kelas: this.Kelas.Selected.map((row) => row.id),
			}).then((response) => {
				if (response.status < 400 && unique.length > 0) {
					this.Kelas.Data.push(...unique);
					new Noty({
						type: "success",
						text: `Berhasil menambahkan kelas ...`,
					}).show();
				} else {
					new Noty({
						type: "error",
						text: `Gagal menambahkan kelas ...`,
					}).show();
				}
				this.Kelas.Selected = [];
			});
		},
		OnDeleteTinggiBerat(index, id) {
			POSTData(`siswa/${this.id}/unlink/tinggiberat`, {
				fk_tinggi_berat: [id],
			}).then((response) => {
				if (response.status < 400) {
					this.TinggiBerat.Data.splice(index, 1);
					new Noty({
						type: "success",
						text: `Berhasil menghapus data tinggi & berat ...`,
					}).show();
				} else {
					new Noty({
						type: "error",
						text: `Gagal menghapus data tinggi & berat ...`,
					}).show();
				}
			});
		},
		OnDeleteOrangtua(index, id) {
			POSTData(`siswa/${this.id}/unlink/orangtua`, {
				fk_orangtua: [id],
			}).then((response) => {
				if (response.status < 400) {
					this.Orangtua.Data.splice(index, 1);
					new Noty({
						type: "success",
						text: `Berhasil menghapus hubungan dengan orang tua ...`,
					}).show();
				} else {
					new Noty({
						type: "error",
						text: `Gagal menghapus hubungan dengan orang tua ...`,
					}).show();
				}
			});
		},
		OnDeleteKelas(index, id) {
			POSTData(`siswa/${this.id}/unlink/kelas`, {
				fk_kelas: [id],
			}).then((response) => {
				if (response.status < 400) {
					this.Kelas.Data.splice(index, 1);
					new Noty({
						type: "success",
						text: `Berhasil menghapus hubungan dengan kelas ...`,
					}).show();
				} else {
					new Noty({
						type: "error",
						text: `Gagal menghapus hubungan dengan kelas ...`,
					}).show();
				}
			});
		},
		OnUpdateOrangtua(index) {
			let orangtua_id = this.Orangtua.Data[index].id;
			let tinggal = this.Orangtua.Data[index].tinggal_bersama;
			POSTData(`siswa/${this.id}/change/orangtua`, {
				fk_orangtua: { id: orangtua_id, tinggal_bersama: tinggal },
			}).then((response) => {
				if (response.status < 400) {
					new Noty({
						type: "success",
						text: `Berhasil mengubah ...`,
					}).show();
				} else {
					this.Orangtua.Data[index].tinggal_bersama = !this.Orangtua.Data[index]
						.tinggal_bersama;
					new Noty({
						type: "error",
						text: `Gagal mengubah ...`,
					}).show();
				}
			});
		},
		LoadKelas() {
			this.Kelas.Loading = true;
			GETData(`siswa/${this.id}/kelas`).then((response) => {
				this.Kelas.Loading = false;
				if (response.status < 400) this.Kelas.Data = response.data.data;
				else this.Kelas.Data = [];
			});
			Search("kelas/search", {
				value: escape(""),
				column: "nama",
			}).then((res) => {
				if (res.status < 400) this.Kelas.Search = res.data.data;
			});
		},
		LoadOrangtua() {
			this.Orangtua.Loading = true;
			GETData(`siswa/${this.id}/orangtua`).then((response) => {
				this.Orangtua.Loading = false;
				if (response.status < 400) this.Orangtua.Data = response.data.data;
				else this.Orangtua.Data = [];
			});
			Search("orangtua/search", {
				value: escape(""),
				column: "nama",
			}).then((res) => {
				if (res.status < 400) this.Orangtua.Search = res.data.data;
			});
		},
		LoadTinggiBerat() {
			this.TinggiBerat.Loading = true;

			GETData(`siswa/${this.id}/tinggiberat`).then((response) => {
				this.TinggiBerat.Loading = false;
				if (response.status < 400) this.TinggiBerat.Data = response.data.data;
				else this.TinggiBerat.Data = [];
			});
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
		OnResetPassword() {
			this.LoadingReset = true;
			POSTData(`siswa/${this.id}/resetpassword`).then((res) => {
				if (res.status < 400) {
					new Noty({
						type: "success",
						text: `Berhasil mengatur ulang password siswa ...`,
					}).show();
				} else {
					new Noty({
						type: "error",
						text: `Gagal mengatur ulang password siswa ...`,
					}).show();
				}
				this.LoadingReset = false;
			});
		},
		OnEdit() {},
		OnView() {},
		async OnMounted() {
			this.id = this.$route.params.id;
			let forms = await this.$store.dispatch(
				`${this.ModelName}/GET_CLEAN_FORM`
			);

			if (this.IsCreate) {
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
						this.LoadKelas();
						this.LoadOrangtua();
						this.LoadTinggiBerat();
					});
				if (this.IsEdit) this.OnEdit();
				else this.OnView();
			}

			this.FormInformasi = pick(this.FormMain, [
				"golongan_darah",
				"transportasi",
				"reg_akta",
				"penyakit_berat",
				"kebutuhan_khusus",
				"no_kip",
				"no_kks",
				"no_kps",
			]);
		},
	},
	async mounted() {
		this.OnMounted();
	},
	beforeDestroy() {
		this.$store.dispatch(`${this.ModelName}/SetForm`, this.FormInformasi);
	},
};
</script>

<style>
</style>