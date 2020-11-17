<template>
	<i-layout class="container">
		<i-row class="_margin-bottom-1">
			<i-column offset-md="1">
				<div class="_display-inline-flex _align-items-center">
					<h4 class="_text-facebook">
						{{ TypeName }} <b>{{ Name }}</b>
					</h4>
					<i-button
						v-if="this.Type === 'view'"
						size="sm"
						class="_height-25 _margin-bottom-1-3 _margin-x-1 _margin-top-2"
						variant="default"
						@click="EditClick"
					>
						<Fa :icon="faPencilAlt" />
					</i-button>
				</div>
			</i-column>
		</i-row>

		<slot>No Forms.</slot>

		<i-alert
			variant="danger"
			v-show="!isEmpty(FormErrors)"
			dismissible
			class="_margin-x-4 _margin-top-1"
		>
			<template slot="icon"><i-icon icon="danger"></i-icon></template>
			<p>
				{{ FormErrors }}
			</p>
		</i-alert>

		<i-row class="_margin-y-2">
			<i-column md="2" first-md :offset-md="Type !== 'view'?'7':'9'" class="_text-right  _margin-bottom-1-2">
				<i-button
					:variant="Type !== 'view'?'default':'secondary'"
					block
					:class="Type !== 'view' ? ' _margin-right-1' : ''"
					@click="BackClick"
					:disabled="Loading"
				>
					{{ Type !== "view" ? "Batal" : "Kembali" }}
				</i-button>
			</i-column>
			<i-column md="2" class="_text-right _margin-bottom-1-2" v-if="Type !== 'view'">
				<i-button
					block
					:loading="Loading"
					variant="primary"
					:class="Type !== 'view' ? '' : ''"
					@click="NextClick"
				>
					Simpan
					<template v-slot:loading>
						<hollow-dots-spinner
						class="_padding-bottom-1 _padding-top-1-3"
							:animation-duration="700"
							:dot-size="10"
							:dots-num="3"
							color="#fff"
						/>
					</template>
				</i-button>
			</i-column>
		</i-row>
	</i-layout>
</template>

<script>
import { HollowDotsSpinner } from "epic-spinners";
import { isEmpty } from "../../utils/common";
import Fa from "vue-fa";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default {
	name: "SimpleForm",
	components: { HollowDotsSpinner, Fa },
	data() {
		return {
			faPencilAlt,
		};
	},
	props: {
		FieldErrors: {
			type: Object,
			default: () => {
				return {};
			},
		},
		FormErrors: {
			type: Array,
			default: () => {
				return [];
			},
		},
		Name: { type: String, default: "sesuatu" },
		Type: { type: String, default: "create" },
		Loading: { type: Boolean, default: false },
	},
	methods: {
		isEmpty,
		NextClick() {
			this.$emit("onnext");
		},
		BackClick() {
			this.$emit("onback");
		},
		EditClick() {
			this.$emit("onedit");
		},
	},
	computed: {
		TypeName() {
			if (this.Type === "view") return "Lihat detail";
			else if (this.Type === "edit") return "Form edit";
			else return "Form tambah";
		},
	},
};
</script>

<style>
@media screen and (min-width: 481px) {
	.margin-optional {
		padding: 0 4rem 0 4rem;
	}
	.margin-optional-content {
		padding: 0 5rem 0 5rem;
	}
}
@media screen and (max-width: 480px) {
	.margin-optional {
		padding: 0 0.5em 0 0.5em;
	}
	.margin-optional-content {
		padding: 0 1rem 0 1rem;
	}
}
</style>