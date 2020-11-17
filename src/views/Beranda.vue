<template>
	<i-layout>
		<div style="position: fixed; z-index: 9999" class="_width-100">
			<i-navbar
				variant="dark"
				style="background-color: rgba(0, 0, 0, 0.588)"
				class="_font-weight-bold"
			>
				<i-navbar-brand class="_text-orange" :to="{ path: '' }">
					TK Millenia
				</i-navbar-brand>
				<i-navbar-items>
					<i-nav>
						<i-nav-item class="_text-white" href="#beranda">Beranda</i-nav-item>
						<i-nav-item class="_text-white" :to="{ path: '/#kontak' }"
							>Kontak</i-nav-item
						>
						<i-nav-item class="_text-white" :to="{ path: '/#informasi' }"
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

		<div style="z-index: 1">
			<div class="_width-100" style="height: 90vh; position: relative">
				<div
					style="background-color: rgba(73, 73, 73, 0.588); position: absolute"
					class="_width-100 _height-100 _display-flex _justify-content-center _align-items-center"
				>
					<div class="_text-center _margin-x-2" style="max-width: 600px">
						<h1 class="_text-white _text-monospace _text-uppercase">
							Taman Kanak-Kanak Millenia
						</h1>
						<h4 class="_margin-top-1 _text-gray-20">
							Meningkatkan daya cipta anak-anak dan memacu mereka untuk belajar.
						</h4>
					</div>
				</div>
				<img
					src="https://source.unsplash.com/0DPyb8t_KfI"
					alt="pic"
					class="_width-100 _height-100"
					style="object-fit: cover"
				/>
			</div>
			<!--Tentang-->
			<div class="_p4-sm _p2-sm _background-github">
				<i-row>
					<i-column md="3">
						<img
							src="../assets/logo.png"
							alt="Logo"
							class="image -responsive _visible-md-and-up"
						/>
					</i-column>
					<i-column>
						<h3 class="font-sans"><b>Tentang Sekolah</b></h3>
						<p class="_text-justify">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut cum
							dolorem autem fuga blanditiis, itaque ab officiis laboriosam.
							Rerum laborum reprehenderit et debitis iusto vel minus illo eaque
							libero minima consectetur provident, porro velit est eos nam earum
							consequatur ratione dolores! Ratione aspernatur maiores quisquam
							possimus doloribus asperiores eos porro?
						</p>
					</i-column>
				</i-row>
			</div>
			<!--Galeri-->
			<div class="_m4-sm">
				<h3 class="font-sans"><b>Galeri Sekolah</b></h3>
				<splide :options="options">
					<splide-slide>
						<img src="https://source.unsplash.com/collection/4448510" />
					</splide-slide>
					<splide-slide>
						<img src="https://source.unsplash.com/collection/4448512" />
					</splide-slide>
					<splide-slide>
						<img src="https://source.unsplash.com/collection/4448530" />
					</splide-slide>
				</splide>
				<span class="_text-muted">Kumpulan gambar fasilitas dan tempat.</span>
			</div>
			<!--KOntak-->
			<div id="kontak" class="_m4-sm _margin-bottom-2">
				<h3 class="font-sans"><b>Kontak Sekolah</b></h3>
				<i-row>
					<i-column md="4">
						<a
							href="https://www.google.com/maps/place/Jl.+Taman+Merbabu+17+No.C19,+RW.6,+Sumberjaya,+Kec.+Tambun+Sel.,+Bekasi,+Jawa+Barat+17510/"
							><img
								src="https://maps.googleapis.com/maps/api/staticmap?autoscale=2&size=400x300&maptype=roadmap&key=AIzaSyCLt7XJoU1XgWRBcTSB1zxszn1PZ94_tlw&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7CJl.+Taman+Merbabu+17+No.C19,+RW.6,+Sumberjaya,+Kec.+Tambun+Sel.,+Bekasi,+Jawa+Barat+17510"
								alt="Google Map of Jl. Taman Merbabu 17 No.C19, RW.6, Sumberjaya, Kec. Tambun Sel., Bekasi, Jawa Barat 17510"
						/></a>
					</i-column>
					<i-column>
						<div class="_margin-1 _background-white">
							<h5 class="_margin-1">Hubungi</h5>
							<p class="_margin-x-2-3 _margin-y-1-2">
								<Fa :icon="faAt" class="_margin-x-2-3 _text-_text-dark" />
								tkmillenia@gmail.com
							</p>
							<p class="_margin-x-2-3 _margin-y-1-2">
								<Fa
									:icon="faPhoneSquareAlt"
									class="_margin-x-2-3 _text-_text-dark"
								/>
								(021) 88332663
							</p>
							<p class="_margin-x-2-3 _margin-y-1-2">
								<Fa
									:icon="faMobileAlt"
									class="_margin-x-2-3 _text-_text-dark"
								/>
								0812-1949-9998
							</p>
							<p class="_margin-x-1-2 _margin-y-1-2 _text-justify">
								Jalan Taman Merbabu 17 Blok C19 No.6 Sumberjaya Tambun Selatan
								Bekasi Jawa Barat 17510 Indonesia
							</p>
						</div>
					</i-column>
					<i-column>
						<h5 class="_margin-1">Kantor buka</h5>
						<i-row>
							<i-column xs="6">
								<p class="_margin-y-1-3 _margin-x-2"><b>#</b> Senin-Selasa:</p>
								<p class="_margin-y-1-3 _margin-x-3">07.00–12.00</p>
							</i-column>
							<i-column xs="6">
								<p class="_margin-y-1-3 _margin-x-2"><b>#</b> Rabu-Jumat</p>
								<p class="_margin-y-1-3 _margin-x-3">08.00–12.00</p>
							</i-column>
							<i-column>
								<p class="_margin-y-1-3 _margin-x-2"><b>#</b> Sabtu-Minggu</p>
								<p class="_margin-y-1-3 _margin-x-3">Tutup</p>
							</i-column>
						</i-row>
					</i-column>
				</i-row>
			</div>
			<div id="informasi" class="_p4-sm _padding-bottom-2">
				<h3 class="font-sans _padding-top-1"><b>Informasi</b></h3>
				<hr />
				<p v-if="Blog.Loading" class="_display-flex _align-items-center">
					<fulfilling-square-spinner
						:animation-duration="3000"
						:size="20"
						color="#26252e"
					/>
					<span class="_margin-x-1">Mengambil data ..</span>
				</p>
				<p v-else-if="!Blog.Data.length">
					<b>Belum ada blog informasi ..</b>
				</p>
				<div v-else v-for="blog in Blog.Data" :key="'id' + blog.id">
					<h5>
						<a :href="`/blog/${blog.id}`" class="_text-dark"
							><b>{{ blog.title }}</b></a
						>
						<span class="_font-size-md _text-secondary">
							{{ dayjs(blog.created_at).format("DD/MM/YYYY") }}
						</span>
						<p v-html="blog.subtitle"></p>
					</h5>
				</div>
			</div>
		</div>

		<i-layout-footer class="_p4-sm _background-gray-80">
			TK Millenia {{ new Date().getUTCFullYear() }}
		</i-layout-footer>
	</i-layout>
</template>

<script>
import {
	faAt,
	faMobileAlt,
	faPhoneSquareAlt,
	faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Fa from "vue-fa";
import { isEmptyObject } from "../utils/common";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { FulfillingSquareSpinner } from "epic-spinners";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { GETData } from "../utils/net";
import dayjs from "dayjs";
export default {
	name: "Beranda",
	components: {
		Fa,
		Splide,
		SplideSlide,
		FulfillingSquareSpinner,
	},
	data() {
		return {
			dayjs,
			isEmptyObject,
			faAt,
			faUserCircle,
			faMobileAlt,
			faPhoneSquareAlt,
			User: this.$store.getters["Base/USER"],
			options: {
				type: "loop",
				fixedHeight: "30vh",
				fixedWidth: "30vw",
				cover: true,
			},
			Blog: {
				Data: [],
				Loading: true,
			},
		};
	},
	activated() {
		GETData("blog?_limit=inf").then((res) => {
			if (res.status < 400) this.Blog.Data = res.data.data;
			this.Blog.Loading = false;
		});
	},
};
</script>

<style>
@media screen and (min-width: 481px) {
	._p4-sm {
		padding: 0 4em;
	}
	._p2-sm {
		padding: 0 2em;
	}
	._m4-sm {
		margin: 0 4em;
	}
}
@media screen and (max-width: 480px) {
	._p4-sm {
		padding: 0 1em;
	}
	._p2-sm {
		padding: 0 1em;
	}
	._m4-sm {
		margin: 0 1em;
	}
	.font-sans {
		text-align: center;
	}
}
.font-sans {
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.font-serif {
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
</style>