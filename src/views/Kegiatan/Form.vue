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
				<i-column offset-md="1" md="5">
					<div style="position: relative;" class="_rounded _margin-top-2">
						<div
							class="_height-100 _width-100 _rounded"
							style="background: #26252e; position: absolute; opacity: 0.7;"
						></div>
						<img
							:src="FormMain.profile_url || NOIMG"
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
					<FormulateInput
						:disabled="IsView"
						type="text"
						name="title"
						label="Nama *"
						validation="required"
						placeholder="Nama kegiatan"
					/>

					<FormulateInput
						:disabled="IsView"
						type="date"
						name="tanggal"
						label="Tanggal *"
						validation="required"
						placeholder="XX-XX-XXXX"
						:value="NOW"
					/>

					<FormulateInput
						:disabled="IsView"
						type="textarea"
						name="deskripsi"
						label="Deskripsi"
						placeholder="Keterangan tentang kegiatan .."
					/>
				</i-column>
			</i-row>
		</FormulateForm>
	</SimpleForm>
</template>

<script>
import MixinCreate from "../../mixins/Create";
import debounce from "lodash/debounce";
import { isEmptyObject } from "../../utils/common";
import { UPFile, Search } from "../../utils/net";
import SimpleForm from "../../components/Form/SimpleForm";
import Noty from "noty";
import dayjs from "dayjs";

export default {
	name: "Kegiatan-Create",
	mixins: [MixinCreate],
	props: {
		ModelName: { type: String, default: "Kegiatan" },
	},
	components: { SimpleForm },
	data() {
		return {
			OnIndikatorCari: function () {},
			NOW: dayjs().format("YYYY-MM-DD"),
			NOIMG: `${window.location.origin}/noimg.webp`,
			Siswa: {
				Loading: true,
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

			this.$store.dispatch(`${this.ModelName}/PostForm`).then((response) => {
				if (response.status < 400) {
					new Noty({
						type: "success",
						text: `Berhasil menyimpan ...`,
					}).show();

					this.ExitForm();
				} else {
					if (!isEmptyObject(response.data))
						this.FormErrors.Field = response.data;
					this.FormErrors.Form = response.message;

					new Noty({
						type: "error",
						text: `Gagal menyimpan, ${response.message} ...`,
					}).show();
				}
			});
		},
		UpdateData() {
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

						if (!isEmptyObject(response.data))
							this.FormErrors.Field = response.data;
						this.FormErrors.Form = response.message;
					}
				});
		},
		onSearchSiswa: debounce(function (search, loading) {
			loading(true);
			Search("siswa/search", {
				value: escape(search),
				column: "nama",
			}).then((res) => {
				if (res.status < 400)
					this.Siswa.Search = res.data.data.filter(
						(item) => !isEmptyObject(item.kelas)
					);
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

			this.onSearchSiswa("", (flg) => (this.Siswa.Loading = flg));
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

				this.FormMain.tanggal = this.FormMain.jadwal.mulai
				if (this.IsEdit) this.OnEdit();
				else this.OnView();
			}
		},
	},
	async mounted() {
		this.OnMounted();
	},
};
</script>

<style>
/* The hero image */
.hero-image {
	/* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */

	/* Position and center the image to scale nicely on all screens */
	background-position: center;
	background-repeat: repeat;
	background-size: cover;
}
.blue-cloud {
	background-color: #a8b7aa;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%230c0934' fill-opacity='0.4' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E");
}
</style>