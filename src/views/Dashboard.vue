<template>
	<i-layout vertical style="height: 100%">
		<!--Sidebar-->
		<!--system menu-->
		<SystemBar />
		<!--navigation menu-->
		<NavigationBar :nav-list="Navigation" @nav-change="OnNavChange" />

		<!--Content-->
		<Content :page="false" :Overlay="ContentOverlay" />
	</i-layout>
</template>

<script>
import SystemBar from "../components/Dashboard/Systembar";
import Navigation from "../utils/navigation";
import NavigationBar from "../components/Dashboard/Navigationbar";
import Content from "../components/Dashboard/Content/Base";
import { mapGetters } from "vuex";

export default {
	components: {
		SystemBar,
		NavigationBar,
		Content,
	},
	name: "Dashboard",
	data() {
		return { Navigation };
	},
	computed: {
		...mapGetters("Base", {
			ContentOverlay: "LOADING_CONTENT",
			PageOverlay: "LOADING_PAGE",
		}),
	},
	methods: {
		OnNavChange(group_index, nav_index) {			
			let subs = this.Navigation.map((group) => group.subs).flat() || [];
			let navFrom = subs.find((nav) => nav.active);
			if (navFrom) {
				navFrom.active = false;
			}
			this.Navigation[group_index].subs[nav_index].active = true;
		},
	},
};
</script>
<style>
.vb > .vb-dragger {
	z-index: 5;
	width: 12px;
	right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-transform: rotate3d(0, 0, 0, 0);
	transform: rotate3d(0, 0, 0, 0);
	-webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
		height 100ms ease-out;
	transition: background-color 100ms ease-out, margin 100ms ease-out,
		height 100ms ease-out;
	background-color: transparent;
	margin: 5px 0px 5px 0;
	height: calc(100% - 10px);
	display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
	background-color: rgba(30, 35, 43, 0.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
	background-color: rgba(30, 35, 43, 0.3);
	margin: 0px;
	height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
	background-color: rgba(30, 35, 43, 0.3);
	margin: 0px;
	height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
	background-color: rgba(30, 35, 43, 0.3);
}
</style>
