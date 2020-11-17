<template>
	<!--navigation menu-->
	<i-layout-aside id="navigationbar">
		<i-sidebar size="lg" collapse-position="fixed" v-model="collapsed">
			<!--vbar-->
			<div v-bar style="height: 100%; width: 100%">
				<!--vbar content-->
				<div>
					<!--logo-->
					<div class="logo _stick-top-custom">
						<img
							src="../../assets/logo.png"
							class="image -responsive"
							alt="Thumbnail"
						/>
					</div>
					<!--menu-->
					<i-nav vertical class="nav">
						<template v-for="(group, i) in NavList">
							<p v-if="group.name" :key="`header-${i}`" class="header">
								{{ group.name }}
							</p>
							<template v-for="(nav, j) in group.subs">
								<i-nav-item
									:key="`item-${i}-${j}`"
									:to="nav.url"
									@click.native.prevent="OnNavChange(i, j)"
									:class="nav.active ? 'active' : ''"
								>
									<i><Fa :icon="nav.icon" /></i> {{ nav.name }}
								</i-nav-item>
							</template>
						</template>
					</i-nav>
				</div>
			</div>
		</i-sidebar>
	</i-layout-aside>
</template>

<script>
import Fa from "vue-fa";
import { isEmptyObject } from "../../utils/common";
export default {
	name: "Navigationbar",
	props: { NavList: { type: Array } },
	components: { Fa },
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
	methods: {
		OnNavChange(group_index, nav_index) {
			this.$emit("nav-change", group_index, nav_index);
		},
	},
	activated() {
		let mModule = this.$route.meta.module;
		if (!isEmptyObject(mModule) || mModule === "") {
			let subs = this.NavList.map((group) => group.subs).flat() || [];
			let navTo = subs.find((nav) => nav.url.includes(mModule.toLowerCase()));
			if (navTo) {
				let navFrom = subs.find((nav) => nav.active);
				if (navFrom) navFrom.active = false;
				navTo.active = true;
			}
		}
	},
};
</script>

<style>
@media screen and (max-width: 480px) {
	#navigationbar.sidebar, #navigationbar .logo {
		background: rgb(41, 41, 41);
	}
	
}
@media screen and (min-width: 481px) {
	#navigationbar .sidebar {
		background: #fff;
	}

	#navigationbar .logo {
		margin: 1em 1em 0em 1em;

		background: rgba(255, 255, 255, 1);
		background: -moz-linear-gradient(
			top,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 1) 83%,
			rgba(255, 255, 255, 0.75) 100%
		);
		background: -webkit-gradient(
			left top,
			left bottom,
			color-stop(0%, rgba(255, 255, 255, 1)),
			color-stop(83%, rgba(255, 255, 255, 1)),
			color-stop(100%, rgba(255, 255, 255, 0.75))
		);
		background: -webkit-linear-gradient(
			top,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 1) 83%,
			rgba(255, 255, 255, 0.75) 100%
		);
		background: -o-linear-gradient(
			top,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 1) 83%,
			rgba(255, 255, 255, 0.75) 100%
		);
		background: -ms-linear-gradient(
			top,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 1) 83%,
			rgba(255, 255, 255, 0.75) 100%
		);
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 1) 83%,
			rgba(255, 255, 255, 0.75) 100%
		);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=0 );
	}
}
#navigationbar {
	z-index: 99;
	box-shadow: 0 4.8px 20.4px rgba(0, 0, 0, 0.086);
}

#navigationbar .sidebar a {
	width: 100%;
	margin: 0.2em 0 0.2em 0;
	text-align: left;
	color: #4a4a4a;
	font-weight: 600;
	border-radius: 4px;
	font-family: "Open Sans";
	font-size: 0.9rem;
}
#navigationbar .sidebar-content {
	overflow-y: hidden;
}
#navigationbar .nav {
	margin: 0em 2em 2em 2.5em;
}
#navigationbar .sidebar a > i {
	margin-right: 10px;
	font-size: 1.1em;
}
#navigationbar .sidebar a.active {
	color: #fff;
	background: #4a4a4a;
}
#navigationbar .sidebar a:hover {
	color: #fff;
	background: #282729;
}
#navigationbar .nav .header {
	font-family: "Open Sans";
	font-weight: bold;
	font-size: 0.7em;
	color: rgb(10, 34, 43);
	margin-left: 10px;
}
</style>