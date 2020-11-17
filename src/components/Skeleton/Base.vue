<script>
export default {
	name: "Skeleton",
	render: function (createElement) {
		if (this.Visible) {
			let children = [
				createElement("div", { class: this.classed.p1, style: this.styled.p1 }),
			];
			if (this.Type.includes("long", "text-2")) {
				children.push(
					createElement("div", {
						class: this.classed.p2,
						style: this.styled.p2,
					})
				);
			}
			return createElement("div", { class: "skeleton" }, children);
		} else {
			return this.$slots.default;
		}
	},
	props: {
		Visible: { type: Boolean, default: true },
		Type: { type: String, default: "text" },
		Theme: { type: String, default: "color" },
		Width: { type: String, default: "0" },
		Height: { type: String, default: "0" },
	},
	data() {
		return {
			styled: {
				p1: "",
				p2: "",
			},
			classed: {
				p1: "",
				p2: "",
			},
		};
	},
	mounted() {
		switch (this.Type) {
			default:
			case "text":
				if (this.Height === "0") this.styled.p1 += "height:1em;";
				if (this.Width === "0") this.styled.p1 += "width:100%;";
				break;
			case "text-2":
				if (this.Height === "0") {
					this.styled.p1 += "height:1em; margin-bottom: 0.5em;";
					this.styled.p2 += "height:1em;";
				}
				if (this.Width === "0") {
					this.styled.p1 += "width:100%;";
					this.styled.p2 += "width:0%;";
				}
				break;
			case "long":
				if (this.Height === "0") {
					this.styled.p1 += "height:1em; margin-bottom: 0.5em;";
					this.styled.p2 += "height:1em;";
				}
				if (this.Width === "0") {
					this.styled.p1 += "width:100%;";
					this.styled.p2 += "width:40%;";
				}
				break;
			case "long-2":
				if (this.Height === "0") {
					this.styled.p1 += "height:1em; margin-bottom: 0.5em;";
					this.styled.p2 += "height:1em;";
				}
				if (this.Width === "0") {
					this.styled.p1 += "width:100%;";
					this.styled.p2 += "width:100%;";
				}
				break;
			case "box":
				if (this.Height === "0") this.styled.p1 += "height:15px;";
				if (this.Width === "0") this.styled.p1 += "width:15px;";
				break;
			case "image":
				if (this.Height === "0") this.styled.p1 += "height:45px;";
				if (this.Width === "0") this.styled.p1 += "width:45px;";
				break;
			case "circle":
				if (this.Height === "0")
					this.styled.p1 += "height:15px; border-radius:9999px;";
				if (this.Width === "0")
					this.styled.p1 += "width:15px; border-radius:9999px;";
				break;
		}
		switch (this.Theme) {
			default:
			case "color":
				this.classed.p1 = "normal";
				this.classed.p2 = "normal";
				break;
			case "gradient":
				this.classed.p1 = "gradient";
				this.classed.p2 = "gradient";
				break;
		}
		if (this.Height !== "0") {
			this.styled.p1 += `height: ${this.Height};`;
			this.styled.p2 += `height: ${this.Height};`;
		}
		if (this.Width !== "0") {
			this.styled.p1 += `width: ${this.Width};`;
			this.styled.p2 += `width: ${this.Width};`;
		}
	},
};
</script>

<style>
@keyframes moving-gradient {
	0% {
		background-position: -250px 0;
	}
	100% {
		background-position: 250px 0;
	}
}
.skeleton > p {
	margin: auto 0 0 0;
}

.skeleton > .gradient {
	background: linear-gradient(
		to right,
		rgb(233, 233, 233) 20%,
		rgb(220, 220, 220) 50%,
		rgb(233, 233, 233) 80%
	);
	background-size: 500px 100px;
	animation-name: moving-gradient;
	animation-duration: 2s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	animation-fill-mode: forwards;
}

.skeleton > .normal {
	background-color: rgba(0, 0, 0, 0.267);
}
</style>