<template>
	<div :class="Simple ? '' : '_not-sticky-md-and-down _stick-top-custom'">
		<!--Head-->
		<i-layout-header class="_background-white _margin-bottom-1">
			<!--Search & Create-->
			<i-row middle-xs>
				<i-column xs="10" md="5">
					<i-input
						v-model="search"
						:size="Simple ? 'sm' : 'md'"
						placeholder="Cari data ..."
						v-on:input="OnCari"
					>
						<i slot="prefix"><Fa :icon="faSearch" /></i>
						<i-button
							size="sm"
							outline
							variant="secondary"
							@click="OnClear"
							slot="append"
						>
							<i><Fa :icon="faTimesCircle" /></i>
						</i-button>
					</i-input>
				</i-column>
				<i-column xs="2" md="7" class="_text-right">
					<i-button
						:size="Simple ? 'sm' : 'md'"
						variant="success"
						@click="EmitTambah"
					>
						<i><Fa :icon="faPlusSquare" /></i>
						<span class="_margin-left-1 _visible-md-and-up">Tambah</span>
					</i-button>
				</i-column>
			</i-row>
			<!--other tool-->
			<i-row class="_padding-x-1 _padding-top-1" between-xs middle-xs v-if="!Simple">
				<i-column class="_margin-bottom-1">
					<i-row middle-xs>
						<i-column xs="4" md="4" lg="3">
							<span><b>Tampilkan: </b> </span>
						</i-column>
						<i-column>
							<i-row middle-xs>
								<i-column xs="5" md="4">
									<i-select
										v-model="show"
										size="md"
										style="max-width: 70px"
										@input="EmitTampil"
									>
										<i-select-option value="5" label="5" />
										<i-select-option value="15" label="15" />
										<i-select-option value="25" label="25" />
										<i-select-option value="50" label="50" />
									</i-select>
								</i-column>
								<i-column>
									<i-button
										size="sm"
										variant="dark"
										@click="ShowFilter = !ShowFilter"
									>
										<i class="_margin-right-1"><Fa :icon="faFilter" /></i>
										Filter
									</i-button>
								</i-column>
							</i-row>
						</i-column>
					</i-row>
				</i-column>
				<i-column xs="12" md="5" class="_text-right _margin-bottom-1">
					<transition name="fade">
						<div
							v-if="IsSelected"
							class="_display-inline-flex _flex-direction-row _justify-content-end _align-items-center"
							key="action-1"
						>
						
						<div class="_margin-x-1">
							<b>Aksi Terpilih </b>
						</div>
							<i-tooltip placement="bottom" style="margin: 0 0em 0 0em">
								<i-button size="sm" variant="secondary" @click="EmitCancel">
									<i style="margin: 0 0.5em 0 0em"><Fa :icon="faTimes" /></i>
									Batal
								</i-button>
								<template slot="body">Batalkan pilihan</template>
							</i-tooltip>
							<template v-if="!MoreActions">
								<i-tooltip placement="bottom" style="margin: 0 0.5em 0 0.5em">
									<i-button size="sm" variant="info" @click="EmitDownload">
										<i><Fa :icon="faDownload" /></i>
									</i-button>
									<template slot="body">Download terpilih</template>
								</i-tooltip>
								<i-tooltip placement="bottom" style="margin: 0 0.5em 0 0em">
									<i-button size="sm" variant="danger" @click="EmitHapus">
										<i><Fa :icon="faTrashAlt" /></i>
									</i-button>
									<template slot="body">Hapus terpilih</template>
								</i-tooltip>
							</template>
							<i-dropdown v-else placement="bottom" trigger="hover">
								<i-button class="_margin-left-1-2" size="sm" variant="dark">
									Aksi Banyak
									<i class="_margin-left-1-2"><Fa :icon="faEllipsisV" /></i>
								</i-button>
								<i-dropdown-menu>
									<slot name="actions"></slot>
								</i-dropdown-menu>
							</i-dropdown>
						</div>
					</transition>
				</i-column>
			</i-row>
			<div class="after-header-left">
				<template v-for="(filter, i) in Filters">
					<i-badge
						style="margin-right: 0.5em"
						:key="i"
						size="sm"
						variant="dark"
					>
						<span style="max-width: 20px; text-overflow: ellipsis">
							{{ FilterToString(filter) }}
						</span>
						<button class="button-none" @click="FilterRemove(i)">
							<Fa :icon="faTimes" />
						</button>
					</i-badge>
				</template>
				<i-badge
					v-show="Filters.length >= 2"
					style="margin-right: 0.5em; cursor: pointer"
					size="sm"
					variant="danger"
				>
					<span @click="FilterClear">Hapus Semua</span>
				</i-badge>
			</div>
		</i-layout-header>
		<DialogFilter
			v-on:filter-add="FilterAdd"
			:Show="ShowFilter"
			:Columns="Columns"
		>
			<template #quick-filter>
				<slot name="quick-filter"></slot>
			</template>
		</DialogFilter>
	</div>
</template>

<script>
import Fa from "vue-fa";
import {
	faPlusSquare,
	faSearch,
	faFilter,
	faFileExport,
	faTrashAlt,
	faDownload,
	faTimes,
	faTimesCircle,
	faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import DialogFilter from "./FilterDialog";
export default {
	name: "Table-Header",
	components: { Fa, DialogFilter },
	props: {
		Columns: Array,
		Page: Number,
		Search: String,
		MoreActions: { type: Boolean, default: false },
		AddedFilter: {
			type: Array,
			default: function () {
				return [];
			},
		},
		Simple: { type: Boolean, default: false },
		IsSelected: { type: Boolean, default: false },
	},
	data() {
		return {
			show: this.Page,
			search: this.Search,
			ShowFilter: false,
			faPlusSquare,
			faSearch,
			faFilter,
			faFileExport,
			faTrashAlt,
			faDownload,
			faTimesCircle,
			faTimes,
			faEllipsisV,
			OnCari: function () {},
			OnClear: function () {},
			Filters: [],
		};
	},
	methods: {
		EmitTambah() {
			this.$emit("table-add");
		},
		EmitTampil(value) {
			this.$emit("limit-change", parseInt(value));
		},
		EmitDownload() {
			this.$emit("select-download");
		},
		EmitHapus() {
			this.$emit("select-delete");
		},
		EmitCancel() {
			this.$emit("select-cancel");
		},
		FilterAdd(value) {
			this.ShowFilter = false;
			this.Filters.push(value);
			this.$emit("filter-change", this.Filters);
		},
		FilterRemove(i) {
			this.Filters.splice(i, 1);
			this.$emit("filter-change", this.Filters);
		},
		FilterClear() {
			this.Filters = [];
			this.$emit("filter-change", []);
		},
		TypeToString(type) {
			switch (type) {
				case "i":
					return ":";
				case "gt":
					return ">";
				case "gte":
					return ">=";
				case "lt":
					return "<";
				case "lte":
					return "<=";

				default:
					return "=";
			}
		},
		FilterToString(filter) {
			if (filter.name && filter.name !== "") return filter.name;
			return (
				filter.column.slice(0, 3) +
				" " +
				this.TypeToString(filter.type) +
				" " +
				filter.text
			);
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.Filters.push(...this.AddedFilter);
		});
		this.OnCari = debounce(() => {
			if (this.Search === this.search)
				return console.warn("same search", this.search, this.Search);
			this.$emit("text-change", this.search);
		}, 400);
		this.OnClear = throttle(() => {
			if (this.search !== "") this.search = "";
			else return;
			this.$emit("text-change", this.search);
		}, 800);
	},
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.15s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>