<template>
	<!--Foot-->
	<i-layout-footer>
		<i-row>
			<i-column xs="1">
				<i-button circle variant="secondary" @click="EmitUp" v-if="!Simple">
					<i><Fa :icon="faArrowUp"/></i>
				</i-button>
			</i-column>
			<i-column xs="11" md="11" v-if="Total > 2">
				<i-pagination
					v-model="page"
					variant="dark"
					quick-link
					class="_float-right"
					:limit="3"
					:items="Total"
					:items-per-page="Limit"
				></i-pagination>
			</i-column>
			<i-column xs="11" md="11" v-else-if="Loading">
				<div class="_float-right _display-inline-flex">
					<Skeleton Type="box" Height="2.5em" Width="2.5em" Theme="gradient" />
					<Skeleton
						class="_margin-x-1"
						Type="box"
						Height="2.5em"
						Width="2.5em"
						Theme="gradient"
					/>
					<Skeleton Type="box" Height="2.5em" Width="2.5em" Theme="gradient" />
					<Skeleton
						class="_margin-x-1"
						Type="box"
						Height="2.5em"
						Width="2.5em"
						Theme="gradient"
					/>
					<Skeleton Type="box" Height="2.5em" Width="2.5em" Theme="gradient" />
				</div>
			</i-column>
		</i-row>
	</i-layout-footer>
</template>

<script>
import Fa from "vue-fa";
import Skeleton from "../Skeleton/Base";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
export default {
	name: "Table-Footer",
	components: { Fa, Skeleton },
	props: {
		Page: { type: Number, default: 1 },
		Total: { type: Number, default: 1 },
		Limit: { type: Number, default: 5 },
		Simple: { type: Boolean, default: false },
		Loading: { type: Boolean, default: false }
	},
	data() {
		return {
			faArrowUp
		};
	},
	computed: {
		page: {
			set(value) {
				this.$emit("change", value);
			},
			get() {
				return this.Page;
			}
		}
	},
	methods: {
		EmitUp() {
			document
				.getElementById("content")
				.scrollTo({ top: 0, behavior: "smooth" });
		},
		EmitChange(value) {
			this.$emit("change", value);
		}
	}
};
</script>

<style>
</style>