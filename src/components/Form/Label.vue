<template>
	<label :for="context.id">
		{{ context.validation & validation }}
		<i-tooltip v-if="tooltip">
			
			<template slot="body">{{ tooltip }}</template>
		</i-tooltip>
	</label>
</template>

<script>
export default {
	props: {
		context: {
			type: Object,
			required: true
		},
		validation: {
			type: [String, Boolean],
			default: false
		}
	}
};
</script>