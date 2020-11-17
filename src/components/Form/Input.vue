<template>
	<div class="_display-inline">
		<div style="width:25px; height:25px" class="_background-green"></div>
		<input
			type="text"
			v-model="context.model"
			v-bind="context.attributes"
			@blur="context.blurHandler"
		/>
	</div>
</template>
<script>
export default {
	props: {
		context: {
			type: Object,
			required: true
		}
	}
};
</script>

<style>
</style>