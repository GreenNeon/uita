<template>
	<i-layout class="_height-100">
		<div style="position: fixed; z-index: 9999" class="_width-100 ">
			<i-navbar
				style="background-color: rgba(0, 0, 0, 0.588)"
				class="_font-weight-bold"
			>
				<i-navbar-brand class="_text-orange" :to="{ path: '' }">
					TK Millenia
				</i-navbar-brand>
				<i-navbar-items>
					<i-nav>
						<i-nav-item class="_text-white" href="#beranda">Beranda</i-nav-item>
						<i-nav-item class="_text-white" :to="{ path: '#kontak' }"
							>Kontak</i-nav-item
						>
						<i-nav-item class="_text-white" :to="{ path: '#informasi' }"
							>Informasi</i-nav-item
						>
					</i-nav>
					<i-nav>
						<i-nav-item class="_text-info" :to="{ path: '/login' }"
							><Fa :icon="faUserCircle" class="_margin-x-2-3" />Masuk
							<span v-if="!isEmptyObject(User)">, {{ User.username }}</span>
						</i-nav-item>
					</i-nav>
				</i-navbar-items>
			</i-navbar>
		</div>
		<h5 v-if="Blog.Loading" class="_display-flex _align-items-center _margin-8 _height-100">
			<fulfilling-square-spinner
				:animation-duration="3000"
				:size="28"
				color="#26252e"
			/>
			<span class="_margin-x-1">Mengambil data ..</span>
		</h5>
		<template v-else>
			<div class="_width-100" style="height: 45vh; position: relative">
				<div
					style="background-color: rgba(73, 73, 73, 0.588); position: absolute"
					class="_width-100 _height-100 _display-flex _justify-content-center _align-items-center"
				>
					<div class="_text-center _margin-x-2" style="max-width: 600px">
						<h3
							class="_text-white _margin-bottom-0 _text-monospace _text-uppercase"
							v-html="Blog.Data.title"
						></h3>
						<p class="_margin-0 _text-red">
							{{ dayjs(Blog.Data.created_at).format("DD/MM/YYYY") }}
						</p>
						<p class="_margin-top-1 _text-gray-20" v-html="Blog.Data.subtitle">
							Meningkatkan daya cipta anak-anak dan memacu mereka untuk belajar.
						</p>
					</div>
				</div>
				<img
					src="https://source.unsplash.com/collection/4448510"
					alt="pic"
					class="_width-100 _height-100"
					style="object-fit: cover"
				/>
				<div style="height:300px"></div>
			</div>
			<div class="blog-body">
				<h5 v-html="Blog.Data.body"></h5>
			</div>
		</template>
		<i-layout-footer class="_padding-x-4 _background-gray-80">
			TK Millenia {{ new Date().getUTCFullYear() }}
		</i-layout-footer>
	</i-layout>
</template>

<script>
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Fa from "vue-fa";
import { isEmptyObject } from "../utils/common";
import { FulfillingSquareSpinner } from "epic-spinners";
import { GETData } from "../utils/net";
import dayjs from "dayjs";
export default {
	name: "Blog",
	components: {
		Fa,
		FulfillingSquareSpinner,
	},
	data() {
		return {
			dayjs,
			isEmptyObject,
			faUserCircle,
			User: this.$store.getters["Base/USER"],
			Blog: {
				Data: {},
				Loading: true,
			},
		};
	},
	mounted() {
		GETData(`blog/${this.$route.params.id}`).then((res) => {
			if (res.status < 400) this.Blog.Data = res.data.data;
			this.Blog.Loading = false;
		});
	},
};
</script>

<style>
@media screen and (min-width: 480px) {
	.blog-body {
		padding: 0em 8em 1em 8em;
	}
}
@media screen and (max-width: 481px) {
	.blog-body {
		padding: 0em 1em 1em 1em;
	}
}
</style>