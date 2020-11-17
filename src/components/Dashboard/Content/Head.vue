<template>
	<!--Header-->
	<i-layout-header id="content-header">
		<i-navbar :collapse="false">
			<i-hamburger-menu
				class="_visible-md-and-down"
				:active="collapsed"
				@click="collapsed = !collapsed"
			></i-hamburger-menu>
			<i-navbar-items class="_visible-md-and-down _justify-content-end">
				<p class="header">MILENIA - ADMIN</p>
			</i-navbar-items>

			<i-navbar-items class="_visible-xs-and-down _text-right _margin-x-1-2">
				<i-dropdown placement="bottom" variant="dark">
					<img
						src="../../../assets/avatar-default.jpg"
						class="image _border _rounded _border-white _cursor-pointer"
						alt="Thumbnail"
						height="38px"
						width="38px"
					/>
					<i-dropdown-menu>
						<i-dropdown-item
							to=""
							@click.native="visible = true"
							class="_font-weight-bold _text-white"
						>
							<Fa
								class="_font-size-sm _margin-right-1-2"
								:icon="faUserCircle"
							/>
							<span>Profile</span>
						</i-dropdown-item>
						<i-dropdown-item
							to=""
							@click.native="$router.push('/logout')"
							class="_font-weight-bold _text-danger"
						>
							<Fa
								class="_font-size-sm _margin-right-1-2"
								:icon="faSignOutAlt"
							/>
							<span>Logout</span>
						</i-dropdown-item>
					</i-dropdown-menu>
				</i-dropdown>
			</i-navbar-items>

			<i-navbar-items class="_margin-top-1 _margin-left-1 _visible-lg-and-up">
				<Breadcrumb root="Dashboard" />
			</i-navbar-items>
		</i-navbar>
	</i-layout-header>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
import Fa from "vue-fa";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default {
	name: "Content-Header",
	components: { Breadcrumb, Fa },
	data() {
		return {
			faSignOutAlt,
			faUserCircle,
		};
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
};
</script>

<style>
@media screen and (max-width: 480px) {
	#content-header > .navbar {
		background: #26252e !important;
	}
	#content-header > .navbar .hamburger .bars {
		background: #fff;
	}
	#content-header > .navbar .hamburger .bars::after {
		background: #fff;
	}
	#content-header > .navbar .hamburger .bars::before {
		background: #fff;
	}
	#content-header {
		padding: 0 0 1.5em 0;
		position: sticky;
		top: 0;
		z-index: 80 !important;
	}
	#content-header > .navbar {
		background: transparent;
	}
	#content-header .breadcrumb .item a {
		color: rgb(255, 255, 255) !important;
	}
	#content-header .breadcrumb .item.-active a {
		color: rgb(219, 217, 217) !important;
	}
}
#content-header > .navbar {
	background: transparent;
}
#content-header .breadcrumb .item a {
	color: #333;
}
#content-header .breadcrumb .item.-active a {
	color: rgb(102, 101, 101);
}
#content-header .header {
	color: rgb(255, 255, 255);
	font-weight: bold;
	text-align: right;
	margin: 1em 0;
}
</style>