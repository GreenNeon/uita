<template>
	<div
		:class="`formulate-input-element formulate-input-element--${context.type}`"
		:data-type="context.type"
	>
		<input
			type="text"
			v-model="context.model"
			v-bind="context.attributes"
			autocomplete="no"
			@keydown.enter.prevent="context.model = selection.label"
			@keydown.down.prevent="increment"
			@keydown.up.prevent="decrement"
			@blur="context.blurHandler"
		/>
		<ul v-if="filteredOptions.length" class="formulate-input-dropdown">
			<li
				v-for="(option, index) in filteredOptions"
				:key="option.value"
				v-text="option.label"
				:data-is-selected="selection && selection.value === option.value"
				@mouseenter="selectedIndex = index"
				@click="context.model = selection.label"
			/>
		</ul>
		<div v-show="context.attributes.loading" class="loader"></div>
	</div>
</template>

<script>
export default {
	props: {
		context: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			selectedIndex: 0
		};
	},
	watch: {
		model() {
			this.selectedIndex = 0;
		}
	},
	computed: {
		model() {
			return this.context.model;
		},
		selection() {
			if (this.filteredOptions[this.selectedIndex]) {
				return this.filteredOptions[this.selectedIndex];
			}
			return false;
		},
		filteredOptions() {
			if (Array.isArray(this.context.options) && this.context.model) {
				const isAlreadySelected = this.context.options.find(
					option => option.label === this.context.model
				);
				if (!isAlreadySelected) {
					return this.context.options.filter(option =>
						option.label
							.toLowerCase()
							.includes(this.context.model.toLowerCase())
					).slice(0,5);
				}
			}
			return [];
		}
	},
	methods: {
		increment() {
			const length = this.filteredOptions.length;
			if (this.selectedIndex + 1 < length) {
				this.selectedIndex++;
			} else {
				this.selectedIndex = 0;
			}
		},
		decrement() {
			const length = this.filteredOptions.length;
			if (this.selectedIndex - 1 >= 0) {
				this.selectedIndex--;
			} else {
				this.selectedIndex = length - 1;
			}
		}
	}
};
</script>
<style>
.formulate-input-element {
	position: relative;
}
.formulate-input-dropdown {
	background-color: #fff;
	margin: -3px 0 0;
	padding: 0em;
	list-style-type: none;
	border: 1px solid #cecece;
	border-top-color: rgb(206, 206, 206);
	border-top-color: #41b883;
	border-radius: 0 0 4px 4px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.formulate-input-dropdown > li {
	color: rgb(37, 32, 32);
	padding: 0.5em;
	cursor: pointer;
}
.formulate-input-dropdown > li[data-is-selected="true"],
.formulate-input-dropdown > li:hover {
	background-color: #fd3f00;
	color: aliceblue;
}
.loader {
	position: absolute;
	top: 0.4em;
	right: 0.4em;
	border: 16px solid #f3f3f3; /* Light grey */
	border-top: 16px solid #fd3f00; /* Blue */
	border-radius: 50%;
	max-width: 45px;
	max-height: 45px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>