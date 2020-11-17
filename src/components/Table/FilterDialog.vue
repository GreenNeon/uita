<template>
	<transition name="scaley">
		<div
			style="margin:1em;margin-top:-2.8em; position:relative;z-index:9999; background:#333; border-radius:5px;padding:1.5em;padding-top:2em;color:#fff;font-weight:500;"
			v-show="Show"
			ref="filter"
		>
			<slot name="quick-filter"></slot>
			<p class="_margin-0 _font-weight-bold">Pencarian Lanjut</p>
			<i-form v-model="form" size="sm">
				<i-row>
					<i-column>
						<i-form-group>
							<i-form-label>Pilih Kolom</i-form-label>
							<i-select :schema="form.Column" placeholder="Pilih kolom">
								<template v-for="column in Columns">
									<i-select-option
										:key="column.key"
										:value="column.key"
										:label="column.name"
									/>
								</template>
							</i-select>
						</i-form-group>
					</i-column>
					<i-column md="3">
						<i-form-group>
							<i-form-label>Pilih Simbol</i-form-label>
							<i-select :schema="form.Type" placeholder="Pilih simbol">
								<i-select-option value="gt" label="Lebih dari (>)" />
								<i-select-option value="gte" label="Lebih dari sama (>=)" />
								<i-select-option value="lt" label="Kurang dari (<)" />
								<i-select-option value="lte" label="Kurang dari sama (<=)" />
								<i-select-option value="e" label="Sama dengan (=)" />
								<i-select-option value="i" label="Memiliki" />
							</i-select>
						</i-form-group>
					</i-column>
					<i-column>
						<i-form-group>
							<i-form-label>Input</i-form-label>
							<i-input :schema="form.Item" placeholder="Ketikan filter ..." />
							<span v-show="form.Type === 'i'" style="font-size: 0.7em">
								Pisahkan dengan koma.
							</span>
						</i-form-group>
					</i-column>
				</i-row>

				<i-form-group class="_margin-top-1 _text-right">
					<i-button @click="EmitTambah" outline variant="light"
						>Tambah</i-button
					>
				</i-form-group>
			</i-form>
		</div>
	</transition>
</template>

<script>
export default {
	name: "Table-Filter-Dialog",
	props: {
		Show: { type: Boolean, default: false },
		Columns: Array
	},
	data() {
		return {
			ItemType: "text",
			form: this.$inkline.form({
				Item: {
					validateOn: "blur",
					value: "",
					validators: [{ rule: "required", message: "Perlu diisi!" }]
				},
				Column: {
					value: "",
					validators: [{ rule: "required", message: "Perlu diisi!" }]
				},
				Type: {
					value: "gt",
					validators: [{ rule: "required", message: "Perlu diisi!" }]
				}
			})
		};
	},
	watch: {
		Show(value) {
			this.$nextTick(() => {
				if (!value) return;
				this.$refs.filter.style.marginBottom =
					"-" + (this.$refs.filter.clientHeight-50) + "px";
			});
		}
	},
	methods: {
		EmitTambah() {
			this.form.validate();
			if (!this.form.valid) return;
			let text = this.form.Item.value;
			if (this.form.Type.value === "i")
				text = JSON.parse(`[${this.form.Item.value}]`);
			let symbol = "";
			switch (this.form.Type.value) {
				case "i":
					symbol = ":";
					break;
				case "gt":
					symbol = ">";
					break;
				case "gte":
					symbol = ">=";
					break;
				case "lt":
					symbol = "<";
					break;
				case "lte":
					symbol = "<=";
					break;

				default:
					symbol = "=";
					break;
			}

			let filter = {
				type: this.form.Type.value,
				column: this.form.Column.value,
				symbol: symbol,
				text: text
			};
			this.$emit("filter-add", filter);
		}
	}
};
</script>

<style>
.scaley-enter-active,
.scaley-leave-active {
	transform: scaleY(1);

	transform-origin: top;
	transition: transform 0.26s ease, opacity 0.15s ease;
}
.scaley-enter, .scaley-leave-to /* .fade-leave-active below version 2.1.8 */ {
	transform: scaleY(0);
	transform-origin: top;
	opacity: 0;
}
</style>