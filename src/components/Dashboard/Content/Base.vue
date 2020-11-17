<template>
	<!--Content-->
	<i-layout id="content" :class="Overlay ? 'overlay-active' : ''">
		<Overlay v-show="Overlay" :top="top" />
		<!--Header-->
		<Head v-if="$store.getters['Base/HEAD_VIS']" />
		<!--View-->
		<i-layout-content id="content-view">
			<router-view />
		</i-layout-content>
	</i-layout>
</template>

<script>
import Head from "./Head";
import Overlay from "./Overlay";
export default {
	name: "Content-Base",
	components: { Head, Overlay },
	props: { Overlay: { type: Boolean, default: false } },
	data() {
		return { top: 0 };
	},
	computed: {
		collapsed: {
			get() {
				return this.$store.state.Base.SidebarVisibility;
			},
			set(value) {
				this.$store.dispatch("Base/ToggleSidebar", value);
			},
		},
	},
	watch: {
		Overlay: {
			immediate: true,
			handler() {
				let content = document.getElementById("content");
				let stop = 0;
				if (content) stop = content.scrollTop;
				if (isNaN(stop)) stop = 0;
				this.top = stop;
			},
		},
	},
	beforeMount() {
		let user = this.$store.getters["Base/USER"];
		if (user.role === "OR") this.$router.push(this.$dashboard_u);
	},
};
</script>

<style>
@media screen and (min-width: 481px) {
	#content-view {
		padding: 0 2em 0 2em;
	}
}
@media screen and (max-width: 480px) {
	#content-view {
		padding: 0 0.5em 0 0.5em;
		position: relative;
	}
}

.-hamburger {
	position: absolute;
	top: 0;
	left: 0;
	margin: 2em;
}
.overlay-active {
	overflow: hidden;
	position: relative;
}
#content {
	position: relative;
}
</style>