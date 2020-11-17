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
import dayjs from "dayjs";
import localid from "dayjs/locale/id";
import { isEmpty } from "../../utils/common";
export default {
	name: "Blog-Table",
	mixins: [MixinTable],
	components: { },
	props: {
		ModelName: { type: String, default: "Blog" }
	},
	data() {
		return {
			Columns: [
				{
					key: "image",
					name: "Foto",
					sort: -1,
					search: false,
					type: "image"
				},{
					key: "title",
					name: "Title",
					type: "text-2",
					sort: 50,
					search: true
				},
				{
					key: "subtitle",
					name: "Subtitle",
					type: "long-2",
					sort: -1,
				},
				{
					key: "created_at",
					name: "Dibuat",
					sort: -1,
					search: false,
					type: "long",
					converter: function(value) {
						if (isEmpty(value)) return "-";
						dayjs.locale(localid);
						return `${dayjs(
							value
						).format("DD MMMM YYYY")}`;
					}
				}
			]
		};
	}
};
</script>

<style>
</style>