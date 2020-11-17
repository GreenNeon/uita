<template>
	<i-layout class="">
		<i-layout-header class="_padding-x-4 _background-facebook">
			<h5>
				<a
					:href="base"
					class="_text-decoration-none _text-light _margin-right-1 _font-weight-bold"
				>
					<Fa :icon="faHome" /> Beranda
				</a>
				<router-link to="/logout" class="_text-orange">
					<Fa :icon="faSignOutAlt" /> Keluar
				</router-link>
			</h5>
		</i-layout-header>

		<i-layout-content class="_mx5-sm">
			<div
				v-if="Siswa.Loading"
				class="_display-flex _justify-content-center _height-100 _align-items-center"
			>
				<fulfilling-square-spinner
					:animation-duration="4000"
					:size="40"
					color="#26252e"
				/>
				<h5 class="_margin-x-1">Mengambil data ..</h5>
			</div>
			<div v-else>
				<i-row between-xs class="_margin-y-2">
					<i-column md="2">
						<img
							:src="Siswa.Data.profile_url"
							alt="Foto Profil"
							class="image -thumbnail -responsive"
						/>
					</i-column>
					<i-column>
						<h5 class="_margin-y-1">
							<b>{{ Siswa.Data.nama }}</b> <br />
							<span class="_font-size-sm">
								Kelas {{ Siswa.Data.kelas[0].nama }} Kel.
								{{ Siswa.Data.kelas[0].kelompok }}
							</span>
						</h5>
						<p>
							<Fa :icon="faVenusMars" class="_margin-x-1-2 _text-secondary" />
							{{ Siswa.Data.gender === "L" ? "Laki - Laki" : "Perempuan" }}
							<br />
							<Fa
								:icon="faBirthdayCake"
								class="_margin-x-1-2 _text-secondary"
							/>
							{{ Siswa.Data.tempat_lahir }},
							{{ dayjs(Siswa.Data.tanggal_lahir).format("D MMMM YYYY") }}
							<br />
						</p>
					</i-column>
					<i-column class="_text-right">
						<p>
							<i>NISN {{ Siswa.Data.nisn }} / NIK {{ Siswa.Data.nik }}</i>
						</p>
					</i-column>
				</i-row>
				<hr />
				<!--Wali Kelas-->
				<i-row between-xs>
					<i-column xs="12" md="7">
						<p>
							<b>
								Wali Kelas,
								<i-tooltip>
									<span class="_text-behance _cursor-pointer">
										{{ Siswa.Data.kelas[0].pegawai.nama }}
									</span>
									<template #body>
										<img
											:src="Siswa.Data.kelas[0].pegawai.profile_url"
											alt="Foto Profil"
											class="image -thumbnail -responsive _margin-1"
											style="height: 64px"
										/>
									</template>
								</i-tooltip>
							</b>
						</p>
						<div>
							<Fa :icon="faBirthdayCake" class="_margin-x-1-2 _text-info" />
							{{
								dayjs(Siswa.Data.kelas[0].pegawai.tanggal_lahir).format(
									"D MMMM YYYY"
								)
							}}
							<span class="_padding-1-3">
								<Fa :icon="faAt" class="_margin-x-1-2 _text-_text-dark" />
								{{ Siswa.Data.kelas[0].pegawai.email || "Tidak punya" }}
								<Fa
									:icon="faPhoneSquareAlt"
									class="_margin-x-1-2 _text-_text-dark"
								/>
								{{ Siswa.Data.kelas[0].pegawai.smartphone || "Tidak punya" }}
								<Fa
									:icon="faMobileAlt"
									class="_margin-x-1-2 _text-_text-dark"
								/>
								{{ Siswa.Data.kelas[0].pegawai.telepon || "Tidak punya" }}
							</span>
							<br />
						</div>
					</i-column>
					<i-column xs="12" md="4">
						<div class="_margin-y-1 _text-right">
							<a
								href="#observasi"
								@click="scrollMeTo('observasi')"
								class="_margin-right-1 _border-bottom"
								>Observasi</a
							>
							<a
								href="#catatan"
								@click="scrollMeTo('catatan')"
								class="_margin-right-1 _text-gray-90 _border-bottom"
								>Catatan</a
							>
							<a
								href="#album"
								@click="scrollMeTo('album')"
								class="_text-gray-90 _border-bottom"
								>Album</a
							>
						</div>
					</i-column>
				</i-row>
				<!--Hasil Observasi-->
				<h5 class="_margin-top-2 _text-purple _margin-bottom-1-2">
					<b>Observasi terbaru</b>
				</h5>
				<p
					v-if="Pembelajaran.Loading"
					class="_display-flex _align-items-center"
				>
					<fulfilling-square-spinner
						:animation-duration="3000"
						:size="20"
						color="#26252e"
					/>
					<span class="_margin-x-1">Mengambil data ..</span>
				</p>
				<p v-else-if="!Pembelajaran.Data.length">
					<b>Belum ada hasil observasi di kelas ..</b>
				</p>
				<i-collapsible v-else :value="['panel-1']" variant="unstyled">
					<i-collapsible-item id="panel-1" title="Rekap Terakhir">
						<i-table bordered id="tabel-1">
							<tbody>
								<tr>
									<td class="_background-dark _align-middle" colspan="5">
										Pembelajaran <br />
										<small>Indikator</small>
									</td>
								</tr>

								<tr v-if="isEmptyObject(Pembelajaran.Data)">
									<td colspan="5">Tidak ada penilaian.</td>
								</tr>
								<template
									v-else
									v-for="(pembelajaran, index) in Pembelajaran.Data"
								>
									<tr :key="'p1-' + index">
										<td class="_background-gray-70" width="5%">
											{{ index + 1 }}
										</td>
										<td class="_background-gray-70" colspan="4">
											{{ pembelajaran.nama }}
										</td>
									</tr>

									<template
										v-for="(indikator, yindex) in pembelajaran.indikator"
									>
										<tr
											v-if="isEmptyObject(indikator.nilai)"
											:key="'p2-' + index + '-' + yindex"
										>
											<td width="5%"></td>
											<td width="5%">{{ index + 1 }}-{{ yindex + 1 }}</td>
											<td>{{ indikator.nama }}</td>
											<td colspan="2">Tidak ada penilaian.</td>
										</tr>
										<template v-else>
											<tr :key="'p2-' + index + '-' + yindex">
												<td width="5%"></td>
												<td width="5%">{{ index + 1 }}-{{ yindex + 1 }}</td>
												<td>{{ indikator.nama }}</td>
												<td>
													<span
														style="display: none"
														v-for="nilai in LastIndikator(indikator.nilai)
															.nilai"
														:key="'p2-' + index + '-' + yindex + '-' + nilai"
													>
														&#9733;
													</span>

													<HeartRating
														read-only
														:spacing="2"
														:inactive-color="'#FFF'"
														:active-color="'#F14'"
														:increment="1"
														:item-size="18"
														:show-rating="false"
														class="_display-inline-block"
														:rating="LastIndikator(indikator.nilai).nilai"
													/>
												</td>
												<td>
													{{ marks1[LastIndikator(indikator.nilai).nilai] }}
												</td>
											</tr>
											<tr :key="'p3-' + index + '-' + yindex">
												<td width="5%"></td>
												<td width="5%"></td>
												<td colspan="3">
													<b>Catatan: </b
													>{{
														LastIndikator(indikator.nilai).catatan ||
														"Tidak ada."
													}}
												</td>
											</tr>
										</template>
									</template>
								</template>
							</tbody>
						</i-table>
						<i-button @click="ExportMingguan"
							>Print <Fa class="_margin-left-1" :icon="faPrint"
						/></i-button>
					</i-collapsible-item>
					<i-collapsible-item id="panel-2" title="Rekap Bulanan">
						<i-table bordered striped id="tabel-2">
							<tbody>
								<tr>
									<td class="_background-dark _align-middle" colspan="3">
										Pembelajaran <br />
										<small>Indikator</small>
									</td>
									<td class="_background-dark">
										Progress 1 <br /><small></small>
									</td>
									<td class="_background-dark">
										Progress 2 <br /><small></small>
									</td>
									<td class="_background-dark">
										Progress 3 <br /><small></small>
									</td>
									<td class="_background-dark">
										Progress 4 <br /><small></small>
									</td>
									<td class="_background-dark">
										Progress <br />
										Bulanan
									</td>
								</tr>

								<tr v-if="isEmptyObject(Pembelajaran.Data)">
									<td colspan="5">Tidak ada penilaian.</td>
								</tr>
								<template
									v-else
									v-for="(pembelajaran, index) in Pembelajaran.Data"
								>
									<tr :key="'pb1-' + index">
										<td class="_background-gray-70" width="5%">
											{{ index + 1 }}
										</td>
										<td class="_background-gray-70" colspan="7">
											{{ pembelajaran.nama }}
										</td>
									</tr>

									<tr
										v-if="isEmptyObject(pembelajaran.indikator)"
										:key="'pb2-' + index"
									>
										<td colspan="5">Tidak ada penilaian.</td>
									</tr>
									<template
										v-else
										v-for="(indikator, yindex) in pembelajaran.indikator"
									>
										<tr :key="'pb2-' + index + '-' + yindex">
											<td width="5%"></td>
											<td width="5%">{{ index + 1 }}-{{ yindex + 1 }}</td>
											<td>{{ indikator.nama }}</td>
											<td
												v-for="zindex in 5"
												:key="'pb2-' + index + '-' + yindex + '-' + zindex"
											>
												<span v-if="zindex == 5">{{
													SummaryNilai(indikator.nilai)
												}}</span>

												<span
													v-else-if="isEmptyObject(indikator.nilai[zindex - 1])"
												>
													<span
													style="display: none"
													>
														-
													</span>
													<HeartRating
														read-only
														:spacing="2"
														:inactive-color="'#FFF'"
														:active-color="'#F14'"
														:increment="1"
														:item-size="18"
														:show-rating="false"
														class="_display-inline-block"
														:rating="0"
													/>
												</span>
												<template v-else>
													<HeartRating
														read-only
														:spacing="2"
														:inactive-color="'#FFF'"
														:active-color="'#F14'"
														:increment="1"
														:item-size="18"
														:show-rating="false"
														class="_display-inline-block"
														:rating="LastIndikator(indikator.nilai).nilai"
													/>
													<span
													style="display: none"
														v-for="star in indikator.nilai[zindex - 1].nilai"
														:key="
															'pb2-' +
															index +
															'-' +
															yindex +
															'-' +
															zindex +
															'-' +
															star
														"
													>
														&#9733;
													</span>
												</template>
											</td>
										</tr>
									</template>
								</template>
							</tbody>
						</i-table>
						<i-button @click="ExportBulanan"
							>Print <Fa class="_margin-left-1" :icon="faPrint"
						/></i-button>
					</i-collapsible-item>
				</i-collapsible>

				<!--Catatan Anekdot-->
				<h5 id="catatan" class="_margin-top-2 _text-purple _margin-bottom-1-2">
					<b>Catatan Anekdot</b>
				</h5>
				<p v-if="Catatan.Loading" class="_display-flex _align-items-center">
					<fulfilling-square-spinner
						:animation-duration="3000"
						:size="20"
						color="#26252e"
					/>
					<span class="_margin-x-1">Mengambil data ..</span>
				</p>
				<p v-else-if="!Catatan.Data.length">
					<b>Tidak ada catatan anekdot untuk siswa ..</b>
				</p>
				<div
					v-else
					class="_display-flex flex-wrap"
					v-for="(catatan, catatan_i) in Catatan.Data"
					:key="catatan_i"
				>
					<i-card style="max-width: 540px" class="_width-100 _margin-1">
						<div>
							<span class="_float-left"
								><b>{{ catatan.peristiwa }}</b></span
							>
							<span class="_text-github _float-right">
								{{ catatan.tanggal }}</span
							>
							<br />
						</div>
						<p>{{ catatan.keterangan || "Tidak ada." }}</p>
						<p>
							Evaluasi: <br />
							{{ catatan.evaluasi || "Tidak ada." }}
						</p>
					</i-card>

					<i-card
						class="_width-100 _margin-1"
						style="max-width: 140px"
						variant="dark"
						v-if="Catatan.Load < Catatan.Data.length"
					>
						<div
							class="_height-100 _width-100 _display-flex _align-items-center _justify-content-center _cursor-pointer"
							@click="LebihCatatan"
						>
							<u>Lebih banyak</u>
						</div>
					</i-card>
				</div>

				<!--Album-->
				<h5 id="album" class="_margin-top-2 _text-purple _margin-bottom-1-2">
					<i-row between-xs>
						<i-column><b>Album Foto Kelas</b></i-column>
						<i-column class="_text-right" v-if="Siswa.Data.kelas.length > 0">
							<ul class="list -inline">
								<li
									v-for="(kelas, kelas_i) in Siswa.Data.kelas"
									:key="'d-kelas-' + kelas_i"
								>
									<i-button
										:active="Album.Data.fk_kelas === kelas.id"
										:disabled="Album.Loading"
										size="sm"
										@click="LoadAlbum(kelas.id)"
									>
										{{ kelas.nama }}
									</i-button>
								</li>
							</ul>
						</i-column>
					</i-row>
				</h5>
				<p v-if="Album.Loading" class="_display-flex _align-items-center">
					<fulfilling-square-spinner
						:animation-duration="3000"
						:size="20"
						color="#26252e"
					/>
					<span class="_margin-x-1">Mengambil data ..</span>
				</p>
				<p
					v-else-if="
						!isEmptyObject(Album.Data) && !Album.Data.photos.data.length
					"
				>
					<b>Tidak ada album dalam kelas ..</b>
				</p>
				<div v-else class="_display-flex _flex-wrap">
					<div
						v-for="(photo, index) in Album.Data.photos.data"
						:key="index"
						style="border: 1px black solid; position: relative"
						class="_text-center image _margin-1 _cursor-pointer album-photo"
					>
						<img
							style="object-fit: cover"
							class="image _width-100 _height-100"
							:src="photo.url"
							@click="
								Album.index = index;
								Album.Lightbox = true;
							"
						/>
					</div>
					<div
						class="_display-flex _align-items-center _justify-content-center _margin-y-1 album-photo"
						v-if="Album.Data.photos.meta.has_more === true"
					>
						<HollowDotsSpinner
							v-show="Album.Loading && Album.LoadMore"
							:animation-duration="100"
							:size="20"
							color="#333"
						/>
						<a
							v-show="!Album.Loading"
							class="_text-flickr _font-weight-bold _cursor-pointer"
							@click="LoadAlbum(Album.Data.fk_kelas, true)"
							><u>Muat lebih</u></a
						>
					</div>
				</div>
				<div
					id="jadwal"
					class="_margin-top-2 _display-flex _justify-content-space-between _text-gray-70 _margin-bottom-1"
				>
					<h5 class="_text-purple"><b>Jadwal Pembelajaran</b></h5>
					<h5 class="_text-purple"><b>Jadwal Kegiatan</b></h5>
				</div>
				<i-row>
					<i-column>
						<i-table bordered>
							<thead>
								<tr>
									<th>Tanggal</th>
									<th>Jadwal</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!Siswa.Data.kelas[0].kalender.length">
									<td>Tidak ada jadwal pembelajaran.</td>
								</tr>
								<tr
									v-else
									v-for="(kalender, kalender_i) in Siswa.Data.kelas[0].kalender"
									:key="'t-kalender-' + kalender_i"
								>
									<th scope="row">
										{{ dayjs(kalender.tanggal).format("MMM, DD YYYY") }}
									</th>
									<td colspan="3">
										<b class="_text-teal">{{ kalender.nama }}</b> <br />
										{{ kalender.deskripsi }}
									</td>
								</tr>
							</tbody>
						</i-table>
					</i-column>
					<i-column>
						<i-table bordered>
							<thead>
								<tr>
									<th>Tanggal</th>
									<th>Jadwal</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!Kegiatan.Data.length">
									<td>LLLL</td>
								</tr>
								<tr
									v-else
									v-for="(kegiatan, kegiatan_i) in Kegiatan.Data"
									:key="'t-kegiatan-' + kegiatan_i"
								>
									<th scope="row">
										{{ dayjs(kegiatan.jadwal.mulai).format("MMM, DD YYYY") }}
									</th>
									<td colspan="3">
										<b class="_text-green">{{ kegiatan.title }}</b> <br />
										{{ kegiatan.deskripsi }}
									</td>
								</tr>
							</tbody>
						</i-table>
					</i-column>
				</i-row>
			</div>
		</i-layout-content>

		<i-modal fill variant="info" size="sm" v-model="Nilai.Modal">
			<template slot="header">Deskripsi Indikator</template>
			<i-row
				class="_padding-x-1-4 _padding-y-1-3"
				v-if="!isEmptyObject(Nilai.Selected)"
			>
				<i-column xs="4">
					<img
						:src="
							!isEmptyObject(Nilai.Selected.indikator.profile_url)
								? Nilai.Selected.indikator.profile_url
								: ''
						"
						alt="Gambar"
						class="image _border _border-color-dark _width-100"
						style="object-fit: cover"
					/>
				</i-column>
				<i-column class="_padding-x-1-2">
					<div class="_padding-y-1-2 _padding-bottom-1-4">
						<b>Deskripsi:</b>
						{{
							!isEmptyObject(Nilai.Selected.indikator.deskripsi)
								? Nilai.Selected.indikator.deskripsi
								: "Tidak ada deskripsi."
						}}
					</div>
					<p>
						<b>Catatan:</b>
						{{
							!isEmptyObject(Nilai.Selected.catatan)
								? Nilai.Selected.catatan
								: "Tidak ada catatan."
						}}
					</p>
				</i-column>
			</i-row>
		</i-modal>

		<Lightbox
			:visible="Album.Lightbox"
			v-if="Album.Data && Album.Data.photos"
			:imgs="Album.Data.photos.data.map((photo) => photo.url)"
			:index="Album.IndexLB"
			@hide="Album.Lightbox = false"
		></Lightbox>

		<i-layout-footer class="_padding-x-3">
			Sistem Informasi Sekolah Millenia
		</i-layout-footer>
	</i-layout>
</template>

<script>
import { HeartRating } from "vue-rate-it";
import {
	faHome,
	faSignOutAlt,
	faBirthdayCake,
	faVenusMars,
	faAt,
	faMobileAlt,
	faPhoneSquareAlt,
} from "@fortawesome/free-solid-svg-icons";
import Fa from "vue-fa";
import { GETData } from "../utils/net";
import { FulfillingSquareSpinner, HollowDotsSpinner } from "epic-spinners";
import dayjs from "dayjs";
import { isEmptyObject } from "../utils/common";
import Lightbox from "vue-easy-lightbox";
import XLSX from "xlsx";

export default {
	name: "OrtuSiswa",
	components: {
		Fa,
		FulfillingSquareSpinner,
		HeartRating,
		HollowDotsSpinner,
		Lightbox,
	},
	data() {
		return {
			dayjs,
			faVenusMars,
			faHome,
			faSignOutAlt,
			faBirthdayCake,
			faAt,
			faMobileAlt,
			faPhoneSquareAlt,
			base: window.location.origin,
			isEmptyObject,
			marks1: {
				0: "Belum Dinilai",
				1: "Belum Berkembang",
				2: "Masih Berkembang",
				3: "Berkembang Sesuai Harapan",
				4: "Berkembang Sangat Baik",
				5: "Berkembang Sangat Baik",
			},
			Siswa: {
				Loading: true,
				Data: {},
				Forbidden: false,
			},
			Pembelajaran: {
				Loading: false,
				Data: [],
				Raw: [],
			},
			Nilai: {
				Loading: true,
				Raw: [],
				Data: [],
				Selected: {},
				Modal: false,
				Load: 5,
			},
			Catatan: {
				Loading: true,
				Raw: [],
				Data: [],
				Load: 5,
			},
			Kegiatan: {
				Loading: true,
				Data: [],
				Load: 5,
			},
			Album: {
				Loading: true,
				Lightbox: false,
				IndexLB: 0,
				Data: [],
				Page: 1,
			},
			monthStart: null,
			monthEnd: null,
		};
	},
	methods: {
		scrollMeTo(refName) {
			var element = this.$refs[refName];
			var top = element.offsetTop;

			window.scrollTo(0, top);
		},
		OnCatatanClick(row) {
			this.Nilai.Selected = row;
			this.Nilai.Modal = true;
		},
		LebihNilai() {
			this.Nilai.Load = this.Nilai.Load + 5;
			this.Nilai.Data.push(
				...this.Nilai.Raw.splice(0, this.Nilai.Load - this.Nilai.Data.length)
			);
		},
		LebihCatatan() {
			this.Catatan.Load = this.Catatan.Load + 5;
			this.Catatan.Data.push(
				...this.Catatan.Raw.splice(
					0,
					this.Catatan.Load - this.Catatan.Data.length
				)
			);
		},
		LastIndikator(nilai) {
			if (isEmptyObject(nilai)) return null;
			return nilai.reduce((prev, current) =>
				dayjs(current.created_at).diff(dayjs(prev.created_at), "day") > 0
					? current
					: prev
			);
		},
		SummaryNilai(nilai) {
			if (isEmptyObject(nilai)) return this.marks1[0];
			let sum = 0;
			for (let index = 0; index < nilai.length; index++)
				sum += nilai[index].nilai;
			const avg = sum / nilai.length || 0;
			return this.marks1[Math.floor(avg)];
		},
		ExportMingguan() {
			let kelas = this.Siswa.Data.kelas;
			if (kelas.length > 0) kelas = kelas[0];

			let wb = XLSX.utils.book_new();
			let ws = XLSX.utils.json_to_sheet([
				[""],
				[null, "Perkembangan anak pada minggu terakhir"],
				[null, this.Siswa.Data.nama],
				[null, kelas.nama],
				[""],
			]);

			XLSX.utils.sheet_add_dom(ws, document.querySelector("#tabel-1 table"), {
				origin: XLSX.utils.encode_cell({ c: 1, r: 6 }),
			});
			XLSX.utils.book_append_sheet(wb, ws, "Rekap Mingguan");
			let filename = this.Siswa.Data.nama
				.replace(/[^a-z0-9]/gi, "_")
				.toLowerCase();
			XLSX.writeFile(wb, `mingguan_${filename}.xlsx`);
		},
		LoadNilai(kelas, id) {
			this.Pembelajaran.Loading = true;
			this.Pembelajaran.Raw = [];
			this.Pembelajaran.Data = [];
			GETData(`nilai/${kelas}/${id}/report`).then((res) => {
				if (res.status < 400) {
					this.Pembelajaran.Raw = res.data;
					this.Pembelajaran.Data = res.data.filter(
						(x, i, a) => a.map((y) => y.id).indexOf(x.id) === i
					);
				}
				this.Pembelajaran.Loading = false;
			});
		},
		LoadCatatan(id) {
			GETData(`siswa/${id}/dashboard/catatan`).then((response) => {
				if (response.status < 400) {
					this.Catatan.Raw = response.data.data;
					this.Catatan.Data = this.Catatan.Raw.splice(0, this.Catatan.Load);
				}
				this.Catatan.Loading = false;
			});
		},
		LoadAlbum(id, next = false) {
			this.Album.Loading = true;
			let page = 1;
			if (next) page = this.Album.Page++;
			GETData(`kelas/${id}/album?page=${page}`).then((response) => {
				if (response.status < 400) {
					this.Album.Data = response.data.data;
				}
				this.Album.Loading = false;
			});
		},
		LoadKegiatan() {
			this.Kegiatan.Loading = true;
			let d = new Date();
			let year = d.getFullYear();
			GETData(
				`kegiatan?_limit=inf&_filter:{_symbol={"_text":"${year}-01-01","_columns":["jadwal.mulai"], "type":"gte"}}&_with[]=jadwal`
			).then((response) => {
				if (response.status < 400) {
					this.Kegiatan.Data = response.data.data;
				}
				this.Kegiatan.Loading = false;
			});
		},
		showAll(events) {
			console.log("[ROOT] show-all:", events);
		},
		dayClicked(day) {
			console.log("[ROOT] day-clicked", day);
		},
		eventClicked(event) {
			console.log("[ROOT] event-clicked", event);
		},
		monthChanged(start, end) {
			this.monthEnd = end;
			this.monthStart = start;

			console.log("[ROOT] month-changed:", { end, start });
		},
	},
	computed: {
		hasMonth() {
			return this.monthStart && this.monthEnd;
		},
		events() {
			return [];
			// if (this.hasMonth) {
			// 	return dataGenerator.mockEvents(this.monthStart, this.monthEnd);
			// }
		},
		disabledDays() {
			return [];
			// if (this.hasMonth) {
			// 	return dataGenerator.mockDays(this.monthStart, this.monthEnd);
			// }
		},
		highlightDays() {
			return [];
			// if (this.hasMonth) {
			// 	return dataGenerator.mockDays(this.monthStart, this.monthEnd);
			// }
		},
	},
	activated() {
		this.Siswa.Loading = true;
		let id = this.$store.getters["Base/USER"].id;
		GETData(`siswa/${id}/dashboard`).then((response) => {
			this.Siswa.Loading = false;

			if (response.status < 400) {
				this.Siswa.Data = response.data.data;
				this.LoadCatatan(id);
				this.LoadKegiatan();
				let kelas = this.Siswa.Data.kelas;
				if (kelas.length > 0) this.LoadAlbum(kelas[0].id);
				if (kelas.length > 0) this.LoadNilai(kelas[0].id, id);
			} else if (response.status === 403) {
				this.Siswa.Forbidden = true;
			}
		});
	},
};
</script>

<style>
@media screen and (min-width: 481px) {
	._mx5-sm {
		margin: 0 5em;
	}
	._px5-sm {
		padding: 0 5em;
	}
	.album-photo {
		width: 140px;
		height: 140px;
	}
}
@media screen and (max-width: 480px) {
	._mx5-sm {
		padding: 0 2em 0 0;
	}
	._px5-sm {
		padding: 0 2em 0 0;
	}
	.album-photo {
		width: 80px;
		height: 80px;
	}
}
</style>
