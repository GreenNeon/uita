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
			:errors="FormErrors.Field"
			v-model="FormMain"
			@submit="OnSubmitMain"
		>
			<i-row>
				<i-column offset-md="1" md="10">
					<div class="blue-cloud _rounded _margin-bottom-1" style="height: 80px;">
						<img
							src="https://source.unsplash.com/CYlPykF-qAM"
							alt="Landscape"
							class="-image _width-100 _rounded"
							style="object-fit: cover; height: 80px;"
						/>
					</div>
				</i-column>
				<i-column offset-md="1" md="5">
					<div style="position: relative;" class="_rounded _margin-top-1">
						<div
							class="_height-100 _width-100 _rounded"
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
						label="Foto"
						help="pilih gambar dengan format png, jpg atau gif. maks ukuran 500kb"
						validation="mime:image/jpeg,image/png,image/gif"
						:uploader="OnUpload"
					/>
				</i-column>
				<i-column md="5" class="_margin-bottom-1">
					<p class="vselect label">Pilih Kategori Pembelajaran *</p>
					<v-select
						:disabled="IsView"
						class="vselect"
						label="id"
						:filterable="false"
						:options="Pembelajaran.Search"
						v-model="FormMain.pembelajaran"
						@search="onSearchPembelajaran"
						placeholder="Cari dan pilih pembelajaran"
					>
						<template slot="no-options">
							Cari dan pilih pembelajaran ..
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
					<FormulateInput
						:disabled="IsView"
						type="text"
						name="nama"
						label="Nama *"
						placeholder="Masukan nama pembelajaran .."
						validation="required"
					/>

					<FormulateInput
						:disabled="IsView"
						type="textarea"
						name="deskripsi"
						label="Deskripsi"
						placeholder="Deskripsikan pembelajaran .."
					/>
				</i-column>
			</i-row>
		</FormulateForm>
	</SimpleForm>
</template>

<script>
import MixinCreate from "../../mixins/Create";
import debounce from "lodash/debounce";
import { UPFile,Search } from "../../utils/net";
import { isEmptyObject } from "../../utils/common";
import SimpleForm from "../../components/Form/SimpleForm";
import Noty from "noty";

export default {
	name: "Indikator-Create",
	mixins: [MixinCreate],
	props: {
		ModelName: { type: String, default: "Indikator" },
	},
	components: { SimpleForm },
	data() {
		return {
			NOIMG: `${window.location.origin}/noimg.webp`,
			Pembelajaran: {
				Loading: true,
				Selected: null,
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
			this.FormMain.fk_pembelajaran = this.FormMain.pembelajaran.id
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
		},
		UpdateData() {
			this.FormMain.fk_pembelajaran = this.FormMain.pembelajaran.id
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
		onSearchPembelajaran: debounce(function(search, loading) {
			loading(true);
			Search("pembelajaran/search", {
				value: escape(search),
				column: "nama"
			}).then(res => {
				if (res.status < 400) this.Pembelajaran.Search = res.data.data;
				loading(false);
			});
		}, 350),
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
			this.onSearchPembelajaran('', function(){})

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
				this.LoadIndikator();
			}
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