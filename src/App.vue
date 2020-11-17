<template>
	<div id="app">
		<keep-alive>
			<router-view />
		</keep-alive>
	</div>
</template>

<script>
export default {
	name: "App"
};
</script>

<style>

.-primary {
	background: #ea433d !important;
	border-color: #eb3c36 !important;
}

.tabs > .tab {
	border-width: 0 !important;
}

.tab > .body {
	padding: 1em 0 0 0 !important;
}

.overlay-loading {
	z-index: 99199;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: linear-gradient(
		to bottom right,
		rgba(255, 255, 255, 0.7) 30%,
		rgb(255, 255, 255, 0.73) 60%,
		rgba(255, 255, 255, 0.76) 90%
	);
	background-size: 500px 100px;
	animation-name: moving-gradient;
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	animation-fill-mode: forwards;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.overlay-loading > div > div {
	display: flex;
	justify-content: center;
}

.overlay-loading > div > h4.-black {
	margin-top: 1em;
	color: rgb(247, 236, 228);
}

.overlay-loading > div > h4 {
	margin-top: 1em;
	color: rgb(66, 59, 53);
}

.-xs {
	font-size: 0.8em !important;
	border-radius: 0.2rem !important;
	padding: 0.4rem 0.4rem !important;
}
.-xs.-circle {
	border-radius: 100% !important;
	width: 1.78rem !important;
	height: 1.78rem !important;
	font-size: 0.7em !important;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
	transition: all 0.1s ease;
}
.slide-fade-leave-active {
	transition: all 0.1s ease;
}
.slide-fade-enter {
	transform: translateX(400px);
}
.slide-fade-leave-to {
	opacity: 0;
	transform: translateX(400px);
}

#app {
	height: 100%;
}

._stick-top-custom {
	position: sticky;
	top: 0;
	z-index: 50;
}

</style>
