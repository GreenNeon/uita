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
					<div style="position: relative" class="_rounded">
						<div
							class="_height-100 _width-100 _rounded"
							style="background: #26252e; position: absolute; opacity: 0.7"
						></div>
						<img
							:src="FormMain.profile_url || NOIMG"
							alt="Foto Profile"
							class="image _width-100 -thumbnail"
							style="object-fit: cover; height: 100px"
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
						label="Judul *"
						validation="required"
						placeholder="Nama kegiatan"
					/>

					<FormulateInput
						:disabled="IsView"
						type="textarea"
						name="subtitle"
						label="Subtitle *"
						validation="required"
						help="isi singkat blog .."
					/>
				</i-column>
				<i-column offset-md="1" md="10">
					<p class="_margin-y-1 _font-weight-bold">Isi blog</p>
					<ckeditor
						:editor="editor"
						v-model="FormMain.body"
						:config="editorConfig"
						:disabled="IsView"
					></ckeditor>
				</i-column>
			</i-row>
		</FormulateForm>
	</SimpleForm>
</template>

<script>
import MixinCreate from "../../mixins/Create";
import { isEmptyObject } from "../../utils/common";
import { UPFile } from "../../utils/net";
import SimpleForm from "../../components/Form/SimpleForm";
import Noty from "noty";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "../../utils/CKEditor/ckeditor";

export default {
	name: "Blog-Create",
	mixins: [MixinCreate],
	props: {
		ModelName: { type: String, default: "Blog" },
	},
	components: { SimpleForm, ckeditor: CKEditor.component },
	data() {
		return {
			OnIndikatorCari: function () {},
			NOIMG: `${window.location.origin}/noimg.webp`,
			editor: ClassicEditor,
			editorConfig: {
				// The configuration of the editor.
				toolbar: {
					items: [
						'heading',
						'|',
						'fontColor',
						'bold',
						'italic',
						'strikethrough',
						'underline',
						'link',
						'bulletedList',
						'numberedList',
						'|',
						'alignment',
						'indent',
						'outdent',
						'|',
						'imageUpload',
						'blockQuote',
						'insertTable',
						'mediaEmbed',
						'horizontalLine',
						'specialCharacters',
						'|',
						'undo',
						'redo'
					]
				},
				language: 'id',
				image: {
					toolbar: [
						'imageTextAlternative',
						'imageStyle:full',
						'imageStyle:side'
					]
				},
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells',
						'tableCellProperties',
						'tableProperties'
					]
				},
				placeholder: "Konten dari blog.",
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
		},
	},
	async mounted() {
		this.OnMounted();
	},
};
</script>

<style>
.ck-editor__editable {
	min-height: 150px;
}
</style>