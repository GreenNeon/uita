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
				<i-column offset-xs="1" lg="5">
					<FormulateInput
						type="text"
						name="nama"
						label="Nama *"
						placeholder="Masukan nama pegawai .."
						validation="required"
					/>
					<FormulateInput
						type="date"
						name="tanggal_lahir"
						label="Tanggal Lahir *"
						placeholder="Masukan nama tanggal lahir .."
						validation="required"
						:disabled="IsView"
					/>

					<FormulateInput
						type="text"
						name="nik"
						label="NIK *"
						placeholder="Masukan NIK pegawai .."
						validation="required"
						:disabled="IsView"
					/>

					<FormulateInput
						type="radio"
						name="gender"
						label="Pilih Gender *"
						value="L"
						validation="in:L,P|required"
						:options="{ L: 'Laki-Laki', P: 'Perempuan' }"
						:disabled="IsView"
					/>

					<FormulateInput
						type="select"
						name="role"
						label="Role *"
						placeholder="Pilih role .."
						validation="required"
						:options="{
							PG: 'Pegawai',
							GU: 'Guru',
						}"
						:disabled="IsView"
					/>

					<FormulateInput
						v-if="!IsCreate"
						type="text"
						name="nip"
						label="Login NIP"
						:disabled="true"
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

					<p class="_margin-y-1 _font-weight-bold">Komunikasi</p>
					<FormulateInput
						type="text"
						name="smartphone"
						label="Smartphone *"
						placeholder="Masukan smartphone pegawai .."
						validation="required"
						:disabled="IsView"
					/>
					<FormulateInput
						type="text"
						name="telepon"
						label="Telepon"
						placeholder="Masukan telepon pegawai .."
						:disabled="IsView"
					/>
					<FormulateInput
						type="text"
						name="email"
						label="Email"
						placeholder="Masukan email pegawai .."
						:disabled="IsView"
					/>
				</i-column>
			</i-row>
		</FormulateForm>

		<h5 class="_margin-top-1 _margin-x-4 _text-gray-70">Optional</h5>
		<i-tabs custom class="_margin-x-5">
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
			<i-tab title="Informasi">
				<FormulateForm name="informasi-form" v-model="FormInformasi">
					<i-row>
						<i-column>
							<FormulateInput
								type="autocomplete"
								name="provinsi"
								label="Provinsi"
								:options="Alamat.Provinsi.Data"
								:placeholder="
									Alamat.Provinsi.Loading
										? 'Loading..'
										: 'Cari nama provinsi disini ..'
								"
								:disabled="Alamat.Provinsi.Loading || IsView"
								:loading="Alamat.Provinsi.Loading"
							/>
							<i-row>
								<i-column>
									<FormulateInput
										type="autocomplete"
										name="kabupaten"
										label="Kabupaten"
										:options="Alamat.Kabupaten.Data"
										:placeholder="
											Alamat.Kabupaten.Loading
												? 'Loading..'
												: 'Cari nama kabupaten disini ..'
										"
										:disabled="Alamat.Kabupaten.Loading || IsView"
										:loading="Alamat.Provinsi.Loading"
									/>
								</i-column>
								<i-column>
									<FormulateInput
										type="autocomplete"
										name="kecamatan"
										label="Kecamatan"
										:options="Alamat.Kecamatan.Data"
										:placeholder="
											Alamat.Kecamatan.Loading
												? 'Loading..'
												: 'Cari nama kecamatan disini ..'
										"
										:disabled="Alamat.Kecamatan.Loading || IsView"
										:loading="Alamat.Provinsi.Loading"
									/>
								</i-column>
							</i-row>
							<i-row>
								<i-column xs="6">
									<FormulateInput
										type="text"
										name="kelurahan"
										label="Kelurahan"
										placeholder="Masukan kelurahan .."
										:disabled="IsView"
									/>
								</i-column>
								<i-column>
									<div class="_display-flex">
										<FormulateInput
											type="number"
											name="rt"
											label="RT"
											:disabled="IsView"
										/>
										<FormulateInput
											type="number"
											name="rw"
											label="RW"
											:disabled="IsView"
										/>
									</div>
								</i-column>
							</i-row>
						</i-column>
						<i-column lg="5">
							<FormulateInput
								rows="5"
								type="textarea"
								name="alamat"
								label="Alamat"
								placeholder="Masukan alamat .."
								:disabled="IsView"
							/>
						</i-column>
					</i-row>
				</FormulateForm>
			</i-tab>
		</i-tabs>
	</SimpleForm>
</template>

<script>
import MixinCreate from "../../mixins/Create";
import debounce from "lodash/debounce";
import pick from "lodash/pick";
import { CustomGET, POSTData, UPFile } from "../../utils/net";
import { isEmptyObject, getKeyByString } from "../../utils/common";
import SimpleForm from "../../components/Form/SimpleForm";
import Noty from "noty";

export default {
	name: "Pegawai-Create",
	mixins: [MixinCreate],
	props: {
		ModelName: { type: String, default: "Pegawai" },
	},
	components: { SimpleForm },
	data() {
		return {
			FormInformasi: {},
			LoadingReset: false,
			Alamat: {
				Provinsi: {
					Loading: true,
					Selected: null,
					Data: [],
				},
				Kabupaten: {
					Loading: true,
					Selected: null,
					Data: [],
				},
				Kecamatan: {
					Loading: true,
					Selected: null,
					Data: [],
				},
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

			this.FormMain.alamat = this.FormInformasi;
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
			this.FormMain.alamat = this.FormInformasi;
			console.info("cek form main", this.FormMain);

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
		OnResetPassword() {
			this.LoadingReset = true;
			POSTData(`pegawai/${this.id}/resetpassword`).then((res) => {
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

			this.LoadTokenAlamat();

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
					});

				if (this.IsEdit) this.OnEdit();
				else this.OnView();
			}
			let rawAlamat = pick(this.FormMain, ["alamat"]);
			this.FormInformasi = { ...rawAlamat.alamat };
		},
		LoadTokenAlamat() {
			this.Alamat.Provinsi.Loading = true;
			this.Alamat.Kabupaten.Loading = true;
			this.Alamat.Kecamatan.Loading = true;
			CustomGET("https://x.rajaapi.com/poe").then((res) => {
				if (res.data.code < 400) this.AlamatToken = res.data.token;
				CustomGET(
					`https://x.rajaapi.com/MeP7c5ne${this.AlamatToken}/m/wilayah/provinsi`
				).then((res) => {
					if (res.data.code < 400) {
						let prov = {};
						res.data.data.forEach((data) => (prov[data.id] = data.name));
						this.Alamat.Provinsi.Data = prov;
					}
					this.Alamat.Provinsi.Loading = false;
					this.Alamat.Kabupaten.Loading = false;
					this.Alamat.Kecamatan.Loading = false;
				});
			});
		},
	},
	computed: {
		WatchProvinsi() {
			if (!this.FormInformasi) return "";
			return this.FormInformasi.provinsi || "";
		},
		WatchKabupaten() {
			if (!this.FormInformasi) return "";
			return this.FormInformasi.kabupaten || "";
		},
	},
	watch: {
		WatchProvinsi: debounce(function () {
			this.Alamat.Kabupaten.Loading = true;
			this.Alamat.Kecamatan.Loading = true;
			let index = getKeyByString(
				this.Alamat.Provinsi.Data,
				this.FormInformasi.provinsi
			);
			if (!index) return (this.Alamat.Kabupaten.Data = []);
			CustomGET(
				`https://x.rajaapi.com/MeP7c5ne${this.AlamatToken}/m/wilayah/kabupaten?idpropinsi=${index}`
			).then((res) => {
				if (res.data.code < 400) {
					let kab = {};
					res.data.data.forEach((data) => (kab[data.id] = data.name));
					this.Alamat.Kabupaten.Data = kab;
				}
				this.Alamat.Kabupaten.Loading = false;
				this.Alamat.Kecamatan.Loading = false;
			});
		}, 500),
		WatchKabupaten: debounce(function () {
			this.Alamat.Kecamatan.Loading = true;
			let index = getKeyByString(
				this.Alamat.Kabupaten.Data,
				this.FormInformasi.kabupaten
			);
			if (!index) return (this.Alamat.Kecamatan.Data = []);
			CustomGET(
				`https://x.rajaapi.com/MeP7c5ne${this.AlamatToken}/m/wilayah/kecamatan?idkabupaten=${index}`
			).then((res) => {
				if (res.data.code < 400) {
					let kec = {};
					res.data.data.forEach((data) => (kec[data.id] = data.name));
					this.Alamat.Kecamatan.Data = kec;
				}
				this.Alamat.Kecamatan.Loading = false;
			});
		}, 500),
	},
	async mounted() {
		this.OnMounted();
	},
	beforeDestroy() {
		this.$store.dispatch(`${this.ModelName}/SetForm`, {
			alamat: this.FormInformasi,
		});
	},
};
</script>

<style>
</style>