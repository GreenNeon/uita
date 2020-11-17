<template>
	<div
		class="overlay-loading"
		:class="page ? '-black' : ''"
		ref="overlay"
		:style="{ top: `${top}px` }"
	>
		<div>
			<img
				src="../../../assets/logo.png"
				class="image -responsive"
				alt="Thumbnail"
				width="180px"
				height="180px"
				v-if="page"
			/>
			<div v-else>
				<self-building-square-spinner
					:animation-duration="3000"
					:size="60"
					color="#333"
				/>
			</div>
			<div v-if="page">
				<hollow-dots-spinner
					:animation-duration="800"
					:dot-size="18"
					:dots-num="5"
					color="#fff"
				/>
			</div>
			<h4 :class="page ? '-black' : ''">
				{{ page ? "Menyiapkan Aplikasi" : "Menyiapkan Halaman" }}
			</h4>
		</div>
	</div>
</template>

<script>
import { SelfBuildingSquareSpinner, HollowDotsSpinner } from "epic-spinners";
export default {
	name: "Table-Overlay",
	components: {
		HollowDotsSpinner,
		SelfBuildingSquareSpinner
	},
	props: { page: { type: Boolean, default: false }, top: {type: Number, default: 0} }
};
</script>

<style>

</style>