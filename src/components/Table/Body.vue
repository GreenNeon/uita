<template>
	<!--Body-->
	<i-layout-content
		:class="!Simple ? 'table-margin' : ''"
		style="position: relative"
	>
		<i-table striped>
			<thead>
				<tr>
					<th v-if="Multiple" width="50px" class="_text-center">
						<i-checkbox
							v-model="CheckShortcut"
							:disabled="SelectedRow.length < 1"
							:indeterminate="CheckShortcut"
						/>
					</th>
					<th v-for="(column, i) in Columns" :key="'t-head-' + i">
						<div
							class="_display-flex _justify-content-xs-space-between _align-items-center"
						>
							{{ column.name }}
							<i-button
								link
								@click="EmitSort(column, i)"
								v-if="column.sort !== -1"
							>
								<i-icon
									:icon="SortType(column.sort)"
									class="_margin-left-auto _cursor-pointer"
								/>
							</i-button>
						</div>
					</th>
					<th v-if="HasActionSlot">Aksi</th>
				</tr>
			</thead>

			<tbody :class="Loading ? '' : 'not-loading'">
				<!--Loading ROW-->
				<tr v-show="Loading" v-for="i in SkeletonCount" :key="'t-loading-' + i">
					<th v-if="Multiple" class="first" scope="row">
						<div style="position: relative; width: 100%; height: 100%">
							<div class="invisible-box"></div>
							<!-- <i-checkbox custom v-model="CheckRow[i - 1]" /> -->
							<Skeleton Type="box" Height="1em" Width="1em" Theme="gradient" />
						</div>
					</th>
					<template v-for="(column, j) in Columns">
						<td
							:key="'t-skeleton-' + j"
							:class="!Multiple && j == 0 ? 'first' : ''"
						>
							<Skeleton :Type="column.type" Theme="gradient" />
						</td>
					</template>
					<td v-if="HasActionSlot" class="_text-center">
						<Skeleton Theme="gradient" />
					</td>
				</tr>
				<!--Empty ROW-->
				<tr v-show="!Loading && Rows.length === 0">
					<td
						:colspan="
							Columns.length + (Multiple ? 1 : 0) + (HasActionSlot ? 1 : 0)
						"
						class="first"
					>
						<h4 class="_margin-1 _text-center">
							Data kosong atau tidak ditemukan.
						</h4>
					</td>
				</tr>
				<!--ROW-->
				<tr
					v-show="!Loading && Rows.length > 0"
					v-for="(row, i) in Rows"
					:key="'t-rows-' + i"
				>
					<th
						v-if="Multiple"
						class="first"
						scope="row"
						@click.stop="RowClick(i)"
					>
						<div style="position: relative; width: 100%; height: 100%">
							<div class="invisible-box"></div>
							<i-checkbox custom v-model="SelectedRow[i]" />
						</div>
					</th>
					<template v-for="(column, j) in Columns">
						<td
							@click.stop="RowClick(i)"
							v-if="row !== null && column.key !== null"
							:key="'t-cols-' + j"
							:class="!Multiple && j == 0 ? 'first' : ''"
						>
							<img
								v-if="column.type === 'image'"
								:src="RowComputed(row, column)"
								class="image -responsive -table"
							/>
							<div v-else v-html="RowComputed(row, column)" />
						</td>
					</template>
					<slot
						name="custom-row"
						v-bind:row="row"
						v-bind:click="RowClick"
						v-bind:index="i"
					></slot>
					<td
						v-if="HasActionSlot"
						class="_text-center"
						@click.stop.self="RowClick(i)"
					>
						<slot name="action" v-bind:row="row" v-bind:index="i"></slot>
					</td>
				</tr>
			</tbody>
		</i-table>
	</i-layout-content>
</template>

<script>
import Skeleton from "../Skeleton/Base";
import throttle from "lodash/throttle";
import { isEmpty } from "../../utils/common";

export default {
	name: "Table-Body",
	components: { Skeleton },
	props: {
		Rows: Array,
		Columns: Array,
		Page: { type: [Number, String], default: 5 },
		Multiple: { type: Boolean, default: false },
		Loading: { type: Boolean, default: false },
		Simple: { type: Boolean, default: false },
		HasActionSlot: { type: Boolean, default: false },
		Selecteds: Array,
	},
	data() {
		return {
			CheckAll: false,
			CheckRow: this.Selecteds,
			EmitSort: function () {},
			RowClick: function () {},
		};
	},
	methods: {
		SortType(sort) {
			if (sort > 50) return "sort-asc";
			else if (sort === 50) return "sort";
			else return "sort-desc";
		},
		RowComputed(row, column) {
			let keys = column.key.split("||");
			column.key = keys.shift();
			let computed = this.RowKeyed(row, column);

			if (!isEmpty(computed)) return computed;
			for (const value in keys) {
				column.key = keys[value];
				let keyed = this.RowKeyed(row, column);

				if (!isEmpty(keyed)) {
					computed = keyed;
					break;
				}
			}
			return computed ?? "-";
		},
		RowKeyed(row, column) {
			let keys = column.key.split(".");
			if (isEmpty(row[keys[0]])) return null;
			let computed = row[keys.shift()];

			for (const value in keys) {
				if (isEmpty(computed[keys[value]])) break;
				computed = computed[keys[value]];
			}
			if (column.converter) return column.converter(computed, row);
			return computed;
		},
	},
	computed: {
		CheckShortcut: {
			set(value) {
				let selectall = [];
				if (this.Selecteds.findIndex((row) => row === false) > -1) {
					for (let i = 0; i < this.Page; i++) selectall.push(true);
				} else {
					for (let i = 0; i < this.Page; i++) selectall.push(false);
				}
				this.$emit("selected-row", selectall);
				this.CheckAll = value;
			},
			get() {
				return (
					this.Selecteds.findIndex((row) => row === false) < 0 &&
					this.Selecteds.length > 0
				);
			},
		},
		SkeletonCount() {
			let len = this.Rows.length;
			let d_len = this.Simple ? 1 : this.Page;
			return len > 0 ? len : d_len;
		},
		SelectedRow: {
			set(value) {
				this.SelectedRow = value;
			},
			get() {
				return this.Selecteds;
			},
		},
	},
	mounted() {
		this.EmitSort = throttle((column, index) => {
			if (column.sort >= 100) column.sort = 0;
			else column.sort += 50;
			this.$emit("sort-change", column, index);
		}, 500);
		this.RowClick = throttle((i) => {
			if (!this.Multiple) return this.$emit("click-row", this.Rows[i]);
			else {
				this.$set(this.SelectedRow, i, !this.SelectedRow[i]);
				this.$emit("selected-row", this.SelectedRow);
			}
		}, 150);
	},
};
</script>

<style>
.table-margin {
	margin: 0 1em 0 1em;
}
</style>