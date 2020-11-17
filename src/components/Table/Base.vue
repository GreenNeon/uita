<template>
	<i-layout id="my-table">
		<!--Head-->
		<Head
			v-if="!NoHead"
			v-on:limit-change="EmitLimitChange"
			v-on:text-change="EmitTextChange"
			v-on:select-cancel="EmitSelectCancel"
			v-on:select-delete="EmitSelectDelete"
			v-on:select-download="EmitSelectDownload"
			v-on:filter-change="EmitFilterChange"
			v-on:table-add="EmitAdd"
			:AddedFilter="Filters"
			:Page="Meta._limit"
			:MoreActions="MoreActions"
			:Columns="Columns"
			:IsSelected="IsSelected"
			:Search="Meta._like._text"
			:Simple="Simple"
		>
			<template #actions>
				<slot name="head-action"></slot>
			</template>
			<template #quick-filter>
				<slot name="quick-filter"></slot>
			</template>
		</Head>
		<!--Body-->
		<Body
			:Multiple="Multiple"
			v-on:sort-change="EmitSortChange"
			v-on:selected-row="EmitSelectedChange"
			v-on:click-row="EmitSelectedClick"
			:Loading="Loading"
			:Rows="Rows"
			:Selecteds="Selecteds"
			:Columns="Columns"
			:Page="Meta._limit"
			:Simple="Simple"
			:HasActionSlot="HasActionSlot"
		>
			<template #action="{row, index, click}">
				<slot name="action" v-bind:row="row" v-bind:index="index" v-bind:click="click"></slot>
			</template>
			<template #custom-row="{row, index, click}">
				<slot name="custom-row" v-bind:row="row" v-bind:index="index" v-bind:click="click"></slot>
			</template>
		</Body>
		<!--Foot-->
		<Foot
			v-on:change="EmitPageChange"
			:Loading="Loading"
			:Page="Meta.page"
			:Total="Meta.total"
			:Limit="Meta._limit"
			:Simple="Simple"
		/>
	</i-layout>
</template>

<script>
import Body from "./Body";
import Head from "./Head";
import Foot from "./Foot";
export default {
	name: "Table",
	components: { Body, Head, Foot },
	props: {
		Rows: [Array, Object],
		Columns: Array,
		Filters: {
			type: Array,
			default: function () {
				return [];
			},
		},
		MoreActions: { type: Boolean, default: false },
		NoHead: { type: Boolean, default: false },
		Simple: { type: Boolean, default: false },
		Multiple: { type: Boolean, default: false },
		Meta: {
			default: function () {
				return { page: 1, total: 1, _limit: 25, _like: { _text: "" } };
			},
		},
		Loading: { type: Boolean, default: false },
		Selecteds: Array,
		IsSelected: { type: Boolean, default: false },
	},
	methods: {
		EmitPageChange(value) {
			this.$emit("page-change", value);
		},
		EmitLimitChange(value) {
			this.$emit("limit-change", value);
		},
		EmitTextChange(value) {
			this.$emit("text-change", value);
		},
		EmitSortChange(value) {
			this.$emit("sort-change", value);
		},
		EmitSelectedClick(value) {
			this.$emit("row-click", value);
		},
		EmitSelectCancel() {
			this.$emit("select-cancel");
		},
		EmitSelectDelete() {
			this.$emit("select-delete", this.Selecteds);
		},
		EmitSelectDownload() {
			this.$emit("select-download", this.Selecteds);
		},
		EmitSelectedChange(value) {
			this.$emit("select-change", value);
		},
		EmitFilterChange(value) {
			this.$emit("filter-change", value);
		},
		EmitAdd() {
			this.$emit("table-add");
		},
	},
	computed: {
		HasActionSlot() {
			return !!this.$slots["action"] || !!this.$scopedSlots["action"];
		}
	},
	mounted() {},
};
</script>

<style>
@media screen and (max-width: 480px) {
	._pull-right-md-and-down {
		text-align: right;
		padding: 12.8px !important;
	}
	._not-sticky-md-and-down {
		position: relative !important;
		top: initial;
		z-index: 20 !important;
	}
}

.image.-table {
	height: auto;
	width: 45px;
	border-radius: 5px;
	border: solid 1px white;
}
._badge-right-top {
	position: absolute !important;
	top: -15px !important;
	right: -8px !important;
}

#my-table header {
	margin: 0 -2em 2em -2em;
	padding: 1em 3em 0 3em;
	z-index: 99;
}
#my-table header {
	/* -webkit-box-shadow: -3px 12px 18px -6px rgba(0, 0, 0, 0.048);
	-moz-box-shadow: -3px 12px 18px -6px rgba(0, 0, 0, 0.048);
	box-shadow: -3px 12px 18px -6px rgba(0, 0, 0, 0.048); */
}
#my-table td,
#my-table th {
	vertical-align: middle;
}
#my-table .after-header-left {
	position: absolute;
	bottom: 1.2em;
	left: 2em;
}

#my-table .after-header-right {
	position: absolute;
	bottom: 1.2em;
	right: 2em;
}

#my-table .selected-box {
	background: #333;
	color: #fff;
	padding: 6px 1em 10px 1em;
	margin-right: -5px;
	margin-bottom: -5px;
	border-bottom-left-radius: 5px;
	border-top-left-radius: 5px;
}

.button-none {
	cursor: pointer;
	background: none;
	border: none;
	color: white;
}

tbody:before {
	content: "@";
	display: block;
	line-height: 1em;
	text-indent: -99999px;
}

thead th {
	background-color: #3a3a3a !important;
	vertical-align: middle !important;
	color: #fff;
}
thead th:first-child {
	border-radius: 5px 0 0 5px;
}
thead th:last-child {
	border-radius: 0 5px 5px 0;
}

tbody > tr > th .invisible-box {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 50;
	background: transparent;
}
tbody > tr > .first {
	border-bottom-left-radius: 5px;
	border-top-left-radius: 5px;
	border-top: none !important;
}
tbody > tr > td {
	border-bottom: none !important;
	border-top: none !important;
	min-width: 40px;
	text-overflow: ellipsis;
}
tbody > tr > td:last-child {
	border-bottom-right-radius: 5px;
	border-top-right-radius: 5px;

	max-width: 125px;
}

tbody.not-loading tr:hover th,
tbody.not-loading tr:hover td {
	background-color: #8f8888 !important;
	color: white;
	cursor: pointer;
}
#my-table footer {
	background: white !important;
}
</style>