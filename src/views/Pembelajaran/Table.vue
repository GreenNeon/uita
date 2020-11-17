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
					<i-button size="sm" variant="secondary" @click="OnModalDelete()">
						Ya
					</i-button>
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
			v-on:row-click="OnView"
			v-on:table-add="EmitTambah"
			:Rows="Rows"
			:Columns="Columns"
			:Meta="Meta"
			:Loading="Loading"
			:Selecteds="Selecteds"
			:IsSelected="IsSelected"
		>
			<template #action="{row}">
				<i-button @click.stop="OnView(row)" circle class="-xs" variant="light">
					<Fa :icon="faUserGraduate" />
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
			<template #head-actions>
				<i-button circle class="-xs" variant="light">
					<Fa :icon="faUserGraduate" />
				</i-button>
				<i-button
				
					circle
					variant="light"
					class="_margin-x-1-3 -xs"
				>
					<Fa :icon="faEdit" />
				</i-button>
				<i-button
				
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
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons"
import { isEmpty } from "../../utils/common";
export default {
	name: "Pembelajaran-Table",
	mixins: [MixinTable],
	components: { },
	props: {
		ModelName: { type: String, default: "Pembelajaran" }
	},
	data() {
		return {
			faUserGraduate,
			id: -1,
			ShowForm: false,
			ShowFormNumber: 0,
			Withs: ['indikator'],
			Columns: [
				{
					key: "profile_url",
					name: "Foto",
					sort: -1,
					search: false,
					type: "image"
				},
				{
					key: "nama",
					name: "nama",
					sort: 50,
					search: true
				},
				{
					key: "deskripsi",
					name: "Deskripsi",
					sort: 50,
					search: false,
					converter: function(value) {
						if (isEmpty(value)) return "-";
						return `${value}`;
					}
				},
				{
					key: "indikator_count",
					name: "Indikator",
					sort: -1,
					search: false,
					converter: function(value) {
						if (isEmpty(value)) return "0 indikator";
						return `${value} indikator`;
					}
				}
			]
		};
	}
};
</script>

<style>
</style>