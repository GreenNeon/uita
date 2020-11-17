<template>
	<div>
		<i-modal size="sm" variant="danger" v-model="ModalDelete">
			<template slot="header">Hapus ?!</template>
			<p class="_text-justify _margin-0">
				Apakah anda yakin ingin <b>menghapus</b>?! <br />
				<i class="_text-red">{{ TextPilihan }}</i> yang dihapus
				<b>tidak dapat dikembalikan!</b>
			</p>
			<template slot="footer">
				<div class="_text-right">
					<i-button
						link
						size="sm"
						variant="danger"
						class="_margin-right-1"
						@click="OnModalDelete(false, false)"
					>
						Tidak
					</i-button>
					<i-button size="sm" variant="secondary" @click="OnModalDelete()"
						>Ya</i-button
					>
				</div>
			</template>
		</i-modal>
		<Table
			v-on:page-change="EmitChange"
			v-on:limit-change="EmitLimitChange"
			v-on:text-change="EmitTextChange"
			v-on:sort-change="EmitSortChange"
			v-on:select-change="EmitSelectChange"
			v-on:select-cancel="EmitSelectCancel"
			v-on:select-download="EmitSelectDownload"
			v-on:select-delete="EmitSelectDelete"
			v-on:filter-change="EmitFilterChange"
			v-on:table-add="EmitTambah"
			:Rows="Rows"
			:Columns="Columns"
			:Meta="Meta"
			:Loading="Loading"
			:Filters="Filters"
			:MoreActions="true"
			:Multiple="true"
			:Selecteds="Selecteds"
			:IsSelected="IsSelected"
		>
			<template #head-action>
				<i-dropdown placement="right-start">
					<i-dropdown-item>
						<Fa :icon="faLink" class="_margin-right-1-2 _text-primary" />
						Sambungkan
					</i-dropdown-item>
					<i-dropdown-menu>
						<i-dropdown-item>Dengan <b>Kelas</b></i-dropdown-item>
						<i-dropdown-item>Dengan <b>Orangtua</b></i-dropdown-item>
					</i-dropdown-menu>
				</i-dropdown>
				<i-dropdown-item class="_cursor-pointer" @click="EmitSelectDelete">
					<Fa :icon="faTrash" class="_margin-right-1-2 _text-danger" />
					Hapus
				</i-dropdown-item>
				<i-dropdown-item class="_cursor-pointer" @click="EmitSelectDownload">
					<Fa
						:icon="faDownload"
						class="_margin-right-1-2 _text-info"
						:disabled="true"
					/>
					Download
				</i-dropdown-item>
			</template>

			<template #action="{ row }">
				<i-button @click.stop="OnView(row)" circle class="-xs" variant="light">
					<Fa :icon="faEye" />
				</i-button>
				<i-button
					@click.stop="OnEdit(row)"
					circle
					variant="light"
					class="_margin-x-1-3 -xs"
				>
					<Fa :icon="faEdit" />
				</i-button>
				<i-button
					@click.stop="OnDelete(row)"
					circle
					class="-xs"
					variant="secondary"
				>
					<Fa :icon="faTrash" />
				</i-button>
			</template>
		</Table>
	</div>
</template>

<script>
import MixinTable from "../../mixins/Table";
import { faLink, faDownload } from "@fortawesome/free-solid-svg-icons";
import { ExportToCsv } from "export-to-csv";

export default {
	name: "Siswa-Table",
	mixins: [MixinTable],
	props: {
		ModelName: { type: String, default: "Siswa" },
	},
	data() {
		return {
			faLink,
			faDownload,
			Columns: [
				{
					key: "profile_url",
					name: "Foto",
					sort: -1,
					search: false,
					type: "image",
				},
				{ key: "nama", name: "Nama", sort: 50, search: true },
				{ key: "nis", name: "NIS", sort: 50, search: true },
				{ key: "nik", name: "NIK", sort: -1, search: false },
				{
					key: "gender",
					name: "Gender (L/P)",
					sort: 50,
					search: false,
					converter: function (value = "") {
						if (value === "L") return "Laki-Laki";
						return "Perempuan";
					},
				},
			],
		};
	},
	methods: {
		EmitSelectDownload() {
			const options = {
				filename: "generated-siswa",
				showLabels: true,
				showTitle: true,
				title: "CSV GEN Siswa",
				headers: [
					"id",
					"nama",
					"gender",
					"nis",
					"nisn",
					"nik",
					"tempat_lahir",
					"tanggal_lahir",
					"agama",
					"kewarganegaraan",
					"penyakit_berat",
					"golongan_darah",
					"kebutuhan_khusus",
					"transportasi",
					"anak_ke",
					"jumlah_saudara",
					"no_kps",
					"no_kip",
					"no_kks",
					"reg_akta",
					"created_at",
				],
			};

			const csvExporter = new ExportToCsv(options);

			csvExporter.generateCsv(this.$store.getters[`${this.ModelName}/GET_OBJ_SELECTED`]);
		},
	},
};
</script>

<style>
</style>