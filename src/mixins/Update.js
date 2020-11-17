import debounce from "lodash/debounce";
import { mapState } from "vuex";

export default {
	data() {
		return {
			id: -1,
			FormErrors: {
				Field: {},
				Form: []
			}
		};
	},
	methods: {
		ChangeStep(step) {
			this.$router.push({
				query: { steps: this.steps + step }
			});
		},
		ExitForm() {
			this.$store.dispatch(`${this.ModelName}/ClearForm`);
			this.$router.push(`/${this.ModelName.toLowerCase()}`);
		},
		ExitWindow(refresh = false) {
			this.$store.dispatch(`${this.ModelName}/ClearForm`);
			this.$emit("update-exit", refresh)
		}
	},
	computed: {
		...mapState({
			//* state
			Loading(state) {
				return state[this.ModelName].Loading;
			}
		}),
		steps() {
			let step = 1;
			if (!isNaN(this.$route.query.steps))
				step = parseInt(this.$route.query.steps);
			return step;
		},
		FormMain: {
			set: debounce(function(values) {
				this.$store.dispatch(`${this.ModelName}/SetForm`, values);
			}, 650),
			get() {
				return this.$store.getters[`${this.ModelName}/GET_FORM`];
			}
		}
	},
	mounted() {
		this.id = this.$route.params.id;
		this.$nextTick(function() {
			this.$store.dispatch(`${this.ModelName}/SetItem`, this.id).then(() => {
				this.$store.dispatch("Base/ToggleLoading", {
					value: false,
					page: false
				});
			});
		});
	}
}