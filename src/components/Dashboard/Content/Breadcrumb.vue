<template>
	<i-breadcrumb v-if="crumbs.length">
		<i-breadcrumb-item
			v-for="(crumb, i) in crumbs"
			style="display:inline-block"
			:key="`bread-${i}`"
			:to="crumb.path"
			>{{ crumb.name }}</i-breadcrumb-item
		>
	</i-breadcrumb>
</template>
/*=============================================================================
  Created by NxtChg (admin@nxtchg.com), 2017. License: Public Domain.
=============================================================================*/
<script>
export default {
	name: "Content-Breadcrumb",
	props: { root: String },

	computed: {
		crumbs: function() {
			let path = "",
				title = this.root || "home";

			let cs = [{ name: title, path: "/dashboard" }];
			if (!this.$route) return [];

			let r = this.$route.path.split("/");
			let m = this.$route.matched.map(route => route.meta.crumbs);
			
			for (let i = 1; i < r.length; i++) {
				if (!m[i]) continue;
				let name = m[i] || r[i];

				title += "/" + name;
				if (i < m.length - 1) {
					path += "/" + r[i];
					cs.push({ name: name, path: path });
				} else cs.push({ name: name, path: '' });
			}

			window.document.title = title;

			return cs;
		}
	}
};
</script>