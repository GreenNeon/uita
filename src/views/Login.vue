<template>
	<div fluid class="_height-100 _width-100">
		<div style="position: fixed; z-index: 9999" class="_width-100">
			<i-navbar variant="dark" class="_font-weight-bold _padding-x-1 nav-login">
				<i-navbar-brand class="_text-orange" :to="{ name: 'beranda' }">
					TK Millenia
				</i-navbar-brand>
				<i-navbar-items>
					<i-nav>
						<i-nav-item class="_text-white" href="/">Beranda</i-nav-item>
						<i-nav-item
							class="_text-white"
							:to="{ name: 'beranda', hash: '#kontak' }"
							>Kontak</i-nav-item
						>
						<i-nav-item
							class="_text-white"
							:to="{ name: 'beranda', hash: '#informasi' }"
							>Informasi</i-nav-item
						>
					</i-nav>
				</i-navbar-items>
			</i-navbar>
		</div>
		<i-row bottom-xs center-md middle-md class="hero">
			<i-column lg="6" md="8" class="login">
				<i-row bottom-xs>
					<i-column md="7">
						<img
							src="../assets/491.jpg"
							alt="491"
							class="image -responsive _image-login"
						/>
					</i-column>
					<i-column class="_text-left _margin-y-2 _margin-x-1">
						<i-alert variant="danger" v-show="Error">
							<template slot="icon"><i-icon icon="danger"></i-icon></template>
							<p>Username atau password salah!!</p>
						</i-alert>

						<h4 class="">
							<b>TK Millenia</b> <br />
							<i>Masuk ke dalam sistem.</i>
						</h4>
						<!-- <i-button
							block
							variant="primary"
							:loading="Loading"
							@click="OnDemoLogin(1)"
						>
							Login Admin
							<template v-slot:loading> Loading .. </template>
						</i-button>
						<i-button
							block
							variant="primary"
							:loading="Loading"
							@click="OnDemoLogin(2)"
						>
							Login Orangtua
							<template v-slot:loading> Loading .. </template>
						</i-button> -->
						<FormulateForm @submit="OnLogin" v-model="FormMain">
							<FormulateInput
								type="text"
								name="username"
								placeholder="Masukan nis siswa / pegawai .."
								validation="required"
							/>
							<FormulateInput
								type="password"
								name="password"
								placeholder="***"
								validation="required"
							/>

							<i-button block variant="primary" :loading="Loading">
								Masuk
								<template v-slot:loading> Loading .. </template>
							</i-button>
						</FormulateForm>
					</i-column>
				</i-row>
			</i-column>
		</i-row>
	</div>
</template>

<script>
import { Login } from "../utils/net";
export default {
	name: "Login",
	data() {
		return {
			FormMain: {},
			Error: false,
			Loading: false,
		};
	},
	methods: {
		OnDemoLogin(index) {
			this.Loading = true;
			let payload = {
				username: "8035679382",
				password: "20/05/2015",
			};
			if (index === 1) {
				payload = {
					username: "38320.06.000",
					password: "38320.06.000",
				};
			}
			Login(payload).then((res) => {
				this.Loading = false;
				if (res.status < 400) {
					let user = this.$store.getters["Base/USER"];
					if (user.role === "OR") this.$router.push(this.$dashboard_u);
					else this.$router.push("/dashboard");
				} else this.Error = true;
			});
		},
		OnLogin() {
			this.Loading = true;
			Login(this.FormMain).then((res) => {
				this.Loading = false;
				if (res.status < 400) {
					let user = this.$store.getters["Base/USER"];
					if (user.role === "OR") this.$router.push(this.$dashboard_u);
					else this.$router.push("/dashboard");
				} else this.Error = true;
			});
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.$store.dispatch("Base/ToggleLoading", { value: false, page: true });
		});
	},
};
</script>

<style>
@media screen and (min-width: 481px) {
	.login {
		background: white;
		border-radius: 5px;
		border-bottom: 3px solid rgb(95, 95, 95);
		-webkit-box-shadow: 10px 10px 47px -19px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 10px 10px 47px -19px rgba(0, 0, 0, 0.75);
		box-shadow: 10px 10px 47px -19px rgba(0, 0, 0, 0.75);
	}
	.hero {
		height: 100%;
		width: 100%;
		background-color: #f9f5ff;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23bdbbc0' fill-opacity='0.61' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
	}
}
@media screen and (max-width: 480px) {
	._image-login {
		padding: 4em 4em 0em 4em;
	}
	.hero {
		height: 100%;
	}
}
.nav-login {
	background: #333;
}
</style>