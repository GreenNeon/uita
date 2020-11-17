import debounce from "lodash/debounce";
import { mapState } from "vuex";

export default {
	data() {
		return {
			modal: false,
			id: -1,
			FormErrors: {
				Field: {},
				Form: []
			}
		};
	},
	methods: {
		async OnMounted(){},
		NextClick() {
			this.$formulate.submit("main-form");
		},
		BackClick() {
			this.ExitForm();
		},
		EditClick() {
			this.$router.push(`${this.id}/edit`, () => this.OnMounted())
		},
		OnSubmitMain() {
			if (this.IsCreate) this.SaveData();
			else this.UpdateData();
		},
		OnModal(ans = true) {
			this.modal = false;
			if (!ans) {
				this.$store.dispatch("Siswa/ClearForm");
				console.warn("Clearing form");
			}
		},
		ChangeStep(step) {
			this.$router.push({
				query: { steps: this.steps + step }
			});
		},
		ExitForm() {
			this.$store.dispatch(`${this.ModelName}/ClearForm`);
			this.$router.push(`/dashboard/${this.ModelName.toLowerCase()}`);
		},
		ExitWindow(refresh = false) {
			this.$store.dispatch(`${this.ModelName}/ClearForm`);
			this.$emit("create-exit", refresh)
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
		},
		IsNew() {
			return this.IsCreate && this.$route.query.new !== undefined;
		},
		IsView() { return this.$route.meta.type === "view"},
		IsEdit() { return this.$route.meta.type === "edit"},
		IsCreate() { return this.$route.meta.type === "create"}
	}
}