import { mapState } from "vuex"
import Table from "../components/Table/Base"
import Fa from "vue-fa"
import { faTrash, faEye, faEdit } from "@fortawesome/free-solid-svg-icons"
import Noty from "noty"
import isPlainObject from 'lodash/isPlainObject'


export default {
	components: { Table, Fa },
	data () {
		return {
			faTrash,
			faEye,
			faEdit,
			ModalDelete: false,
			DeletedID: 0,
			TextPilihan: "Data",
			Filters: [],
			Withs: []
		}
	},
	computed: {
		...mapState({
			//* State
			Loading (state) {
				return state[ this.ModelName ].Loading
			},
			Meta (state) {
				return state[ this.ModelName ].Meta
			},
			Rows (state) {
				return state[ this.ModelName ].Items
			},
			//* Getters
			Selecteds (state, getters) {
				return getters[ `${this.ModelName}/GET_SELECTED` ]
			},
			CountSelected (state, getters) {
				return getters[ `${this.ModelName}/COUNT_SELECTED` ]
			},
			IsSelected (state, getters) {
				return getters[ `${this.ModelName}/IS_MULTI_SELECT` ]
			}
		})
	},
	methods: {
		EmitChange (value) {
			this.$store.dispatch(`${this.ModelName}/SetOptions`, { page: value })
		},
		EmitSelectChange (value) {
			this.$store.dispatch(`${this.ModelName}/SetSelected`, value)
		},
		EmitSelectCancel () {
			this.$store.dispatch(`${this.ModelName}/CancelSelected`)
		},
		EmitLimitChange (value) {
			this.$store.dispatch(`${this.ModelName}/SetOptions`, {
				page: 1,
				_limit: value
			})
		},
		EmitTextChange (value) {
			let key = []
			this.Columns.forEach(column => {
				if (column.search) key.push(column.key)
			})
			this.$store.dispatch(`${this.ModelName}/SetOptions`, {
				page: 1,
				_like: {
					_text: value,
					_columns: key
				}
			})
		},
		EmitSortChange (column, index) {
			this.$set(this.Columns, index, column)
			let orders = []
			this.Columns.forEach(column => {
				if (column.sort !== -1 && column.sort !== 50) {
					let type = column.sort > 0 ? "asc" : "desc"
					orders.push({ _column: column.key, _type: type })
				}
			})
			this.$store.dispatch(`${this.ModelName}/SetOptions`, {
				page: 1,
				_filter: {
					_order: orders
				}
			})
		},
		EmitFilterChange (filters) {
			let includes = []
			let symbol = []
			filters.forEach(filter => {
				switch (filter.type) {
					case "i":
						includes.push({
							name: filter.name,
							texts: filter.text,
							_column: filter.column
						})
						break

					default:
					case "e":
					case "gt":
					case "gte":
					case "lt":
					case "lte":
						symbol.push({
							name: filter.name,
							_type: filter.type,
							_text: filter.text,
							_column: filter.column
						})
						break
				}
			})
			this.$store.dispatch(`${this.ModelName}/SetOptions`, {
				page: 1,
				_filter: {
					_symbol: symbol,
					_includes: includes
				}
			})
		},
		EmitTambah () {
			this.$router.push(`/dashboard/${this.ModelName.toLowerCase()}/tambah`)
		},
		OnView (row) {
			this.$router.push(`/dashboard/${this.ModelName.toLowerCase()}/${row.id}`)
		},
		OnEdit (row) {
			this.$router.push(`/dashboard/${this.ModelName.toLowerCase()}/${row.id}/edit`)

		},
		OnModalDelete (all = false, ans = true) {
			this.ModalDelete = false
			if (ans) {
				// hapus satu
				if (all) this.TextPilihan = `Data (${this.CountSelected})`
				this.$store.dispatch(`${this.ModelName}/DeleteItem`, this.DeletedID).then(value => {
					if (value) {
						new Noty({
							type: "success",
							text: `Berhasil menghapus ...`
						}).show()
					} else {
						new Noty({
							type: "error",
							text: `gagal menghapus ...`
						}).show()
					}
				})
			}
		},
		OnDelete (row) {
			this.TextPilihan = `Data`
			this.DeletedID = row.id

			this.ModalDelete = true
		},
		EmitSelectDownload () { },
		EmitSelectDelete () {
			this.TextPilihan = `Data (${this.CountSelected})`
			this.ModalDelete = true
		}
	},
	mounted () {
		let rawFilters = this.$store.state[ this.ModelName ].Meta._filter || []
		let includes = rawFilters._includes || []
		let symbols = rawFilters._symbol || []
		if (isPlainObject(includes)) includes = [ includes ]
		if (isPlainObject(symbols)) symbols = [ symbols ]

		this.Filters.push(...includes.map(include => ({
			name: include.name ?? '',
			column: include._column,
			type: 'i', 
			text: include.texts
		})))

		this.Filters.push(...symbols.map(symbol => ({
			name: symbol.name ?? '',
			column: symbol._column,
			type: symbol._type,
			text: symbol._text
		})))

		this.$nextTick(function () {
			// DOM Rendered
			this.$store.dispatch("Base/ToggleLoading", { value: false, page: false })
			this.$store.dispatch(`${this.ModelName}/SetOptions`, { 
				_with: this.Withs
			})
		})
	}
}