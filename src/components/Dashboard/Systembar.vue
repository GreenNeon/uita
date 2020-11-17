<template>
	<!--system menu-->
	<i-layout-aside id="systembar">
		<i-layout-header>
			<p class="logo">M</p>
			<p class="icon" @click="$router.push('/')"><Fa :icon="faHome" /></p>
			<p class="icon" @click="$router.go(-1)">
				<Fa :icon="faArrowAltCircleLeft" />
			</p>
		</i-layout-header>
		<div class="avatar">
			<i-dropdown placement="right" variant="dark">
				<img
					src="../../assets/avatar-default.jpg"
					class="image -responsive _cursor-pointer"
					alt="Thumbnail"
				/>
				<i-dropdown-menu>
					<i-dropdown-item
						to=""
						@click.native="visible = true"
						class="_font-weight-bold"
					>
						<Fa class="_font-size-sm _margin-right-1-2" :icon="faUserCircle" />
						<span>Profile</span>
					</i-dropdown-item>
					<i-dropdown-item
						to=""
						@click.native="$router.push('/logout')"
						class="_font-weight-bold _text-danger"
					>
						<Fa class="_font-size-sm _margin-right-1-2" :icon="faSignOutAlt" />
						<span>Logout</span>
					</i-dropdown-item>
				</i-dropdown-menu>
			</i-dropdown>
		</div>

		<i-modal fill v-model="visible" id="modal-profile">
			<h2 class="_margin-top-1 _margin-x-1">Keperluan demo.</h2>
			<span class="_margin-x-1">Ganti lewat admin.</span>
		</i-modal>
	</i-layout-aside>
</template>

<script>
import Fa from "vue-fa";
import {
	faSignOutAlt,
	faUserCircle,
	faHome,
	faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

export default {
	name: "Systembar",
	components: { Fa },
	data() {
		return {
			faSignOutAlt,
			faUserCircle,
			faHome,
			faArrowAltCircleLeft,
			visible: false,
		};
	},
};
</script>

<style>
@media screen and (max-width: 480px) {
	#systembar {
		display: none;
	}
}
#systembar {
	font-family: "Sitka Display";
	background: #26252e;
}
#modal-profile .body {
	border-radius: 5px;
	background: #fffdfd;
}
#systembar .logo {
	margin: 0;
	color: #fff;
	font-size: 3em;
}
#systembar .icon {
	text-align: center;
	margin: 0.4em 0 0.6em 0;
	color: #fff;
	cursor: pointer;
	font-size: 1.5em;
}

#systembar .icon:hover {
	color: orange;
}

#systembar .avatar {
	margin: 14px 14px 25px 14px;
	bottom: 0;
	left: 0;
	position: absolute;
}
#systembar .avatar img {
	border-radius: 10px;
	border: solid rgba(245, 245, 245, 0.637) 2px;
}
</style>