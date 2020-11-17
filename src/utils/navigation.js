import {
	faColumns,
	faUserGraduate,
	faUsers,
	faUserFriends,
	faChalkboard,
	faBook,
	faFileContract,
	faListAlt,
	faStickyNote
} from "@fortawesome/free-solid-svg-icons"

export default [
	{
		subs: [
			{ id: 99, name: "Panel", url: "/dashboard/", active: true, icon: faColumns }
		]
	},
	{
		name: "MENU DATA SEKOLAH",
		subs: [
			{ id: 1, name: "Siswa", url: "/dashboard/siswa", active: false, icon: faUserGraduate },
			{ id: 2, name: "Orangtua", url: "/dashboard/orangtua", active: false, icon: faUsers },
			{ id: 3, name: "Pegawai", url: "/dashboard/pegawai", active: false, icon: faUserFriends },
			{ id: 4, name: "Kelas", url: "/dashboard/kelas", active: false, icon: faChalkboard },
		]
	},
	{
		name: "MENU DATA PELAJARAN",
		subs: [
			{ id: 5, name: "Pembelajaran", url: "/dashboard/pembelajaran", active: false, icon: faBook },
			{ id: 6, name: "Indikator", url: "/dashboard/indikator", active: false, icon: faFileContract },
			{ id: 7, name: "Nilai", url: "/dashboard/nilai", active: false, icon: faListAlt },
			{ id: 8, name: "Catatan", url: "/dashboard/catatan", active: false, icon: faStickyNote },
		]
	},
	{
		name: "MENU LAIN",
		subs: [
			{ id: 9, name: "Blog", url: "/dashboard/blog", active: false, icon: faBook },
			{ id: 10, name: "Kegiatan", url: "/dashboard/kegiatan", active: false, icon: faFileContract }
		]
	}
]