import { LazyImport } from '../utils/common.js'
export default {
	path: '/dashboard',
	component: LazyImport('Dashboard.vue'),
	children: [
		{
			path: '',
			name: 'Panel',
			meta: { loading: 'content', login: true, module: '' },
			component: LazyImport('Home.vue')
		},
		{
			path: 'siswa',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Siswa-Table',
					meta: { type: 'table', module: 'Siswa', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Siswa')
				},
				{
					path: 'tambah',
					name: 'Siswa-Tambah',
					meta: { type: 'create', module: 'Siswa', crumbs: 'Tambah', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Siswa')
				},
				{
					path: ':id',
					name: 'Siswa-Lihat',
					meta: { type: 'view', module: 'Siswa', crumbs: 'Detail', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Siswa')
				},
				{
					path: ':id/edit',
					name: 'Siswa-Edit',
					meta: { type: 'edit', module: 'Siswa', crumbs: 'Edit', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Siswa')
				}
			]
		},
		{
			path: 'orangtua',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Orangtua-Table',
					meta: { type: 'table', module: 'Orangtua', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Orangtua')
				},
				{
					path: 'tambah',
					name: 'Orangtua-Tambah',
					meta: { type: 'create', module: 'Orangtua', crumbs: 'Tambah', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Orangtua')
				},
				{
					path: ':id',
					name: 'Orangtua-Lihat',
					meta: { type: 'view', module: 'Orangtua', crumbs: 'Detail', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Orangtua')
				},
				{
					path: ':id/edit',
					name: 'Orangtua-Edit',
					meta: { type: 'edit', module: 'Orangtua', crumbs: 'Edit', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Orangtua')
				}
			]
		},
		{
			path: 'pegawai',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Pegawai-Table',
					meta: { type: 'table', module: 'Pegawai', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Pegawai')
				},
				{
					path: 'tambah',
					name: 'Pegawai-Tambah',
					meta: { type: 'create', module: 'Pegawai', crumbs: 'Tambah', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Pegawai')
				},
				{
					path: ':id',
					name: 'Pegawai-Lihat',
					meta: { type: 'view', module: 'Pegawai', crumbs: 'Detail', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Pegawai')
				},
				{
					path: ':id/edit',
					name: 'Pegawai-Edit',
					meta: { type: 'edit', module: 'Pegawai', crumbs: 'Edit', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Pegawai')
				}
			]
		},
		{
			path: 'kelas',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Kelas-Table',
					meta: { type: 'table', module: 'Kelas', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Kelas')
				},
				{
					path: 'tambah',
					name: 'Kelas-Tambah',
					meta: { type: 'create', module: 'Kelas', crumbs: 'Tambah', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Kelas')
				},
				{
					path: ':id',
					name: 'Kelas-Lihat',
					meta: { type: 'view', module: 'Kelas', crumbs: 'Detail', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Kelas')
				},
				{
					path: ':id/edit',
					name: 'Kelas-Edit',
					meta: { type: 'edit', module: 'Kelas', crumbs: 'Edit', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Kelas')
				}
			]
		},
		{
			path: 'pembelajaran',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Pembelajaran-Table',
					meta: { type: 'table', module: 'Pembelajaran', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Pembelajaran')
				},
				{
					path: 'tambah',
					name: 'Pembelajaran-Tambah',
					meta: { type: 'create', module: 'Pembelajaran', crumbs: 'Tambah', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Pembelajaran')
				},
				{
					path: ':id',
					name: 'Pembelajaran-Lihat',
					meta: { type: 'view', module: 'Pembelajaran', crumbs: 'Detail', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Pembelajaran')
				},
				{
					path: ':id/edit',
					name: 'Pembelajaran-Edit',
					meta: { type: 'edit', module: 'Pembelajaran', crumbs: 'Edit', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Pembelajaran')
				}
			]
		},
		{
			path: 'indikator',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Indikator-Table',
					meta: { type: 'table', module: 'Indikator', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Indikator')
				},
				{
					path: 'tambah',
					name: 'Indikator-Tambah',
					meta: { type: 'create', module: 'Indikator', crumbs: 'Tambah', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Indikator')
				},
				{
					path: ':id',
					name: 'Indikator-Lihat',
					meta: { type: 'view', module: 'Indikator', crumbs: 'Detail', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Indikator')
				},
				{
					path: ':id/edit',
					name: 'Indikator-Edit',
					meta: { type: 'edit', module: 'Indikator', crumbs: 'Edit', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Indikator')
				}
			]
		},
		{
			path: 'nilai',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Nilai-Table',
					meta: { type: 'table', module: 'Nilai', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Nilai')
				}
			]
		},
		{
			path: 'catatan',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Catatan-Table',
					meta: { type: 'table', module: 'Catatan', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Catatan')
				},
				{
					path: 'tambah',
					name: 'Catatan-Tambah',
					meta: { type: 'create', module: 'Catatan', crumbs: 'Tambah', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Catatan')
				},
				{
					path: ':id',
					name: 'Catatan-Lihat',
					meta: { type: 'view', module: 'Catatan', crumbs: 'Detail', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Catatan')
				},
				{
					path: ':id/edit',
					name: 'Catatan-Edit',
					meta: { type: 'edit', module: 'Catatan', crumbs: 'Edit', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Catatan')
				}
			]
		},
		{
			path: 'kegiatan',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Kegiatan-Table',
					meta: { type: 'table', module: 'Kegiatan', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Kegiatan')
				},
				{
					path: 'tambah',
					name: 'Kegiatan-Tambah',
					meta: { type: 'create', module: 'Kegiatan', crumbs: 'Tambah', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Kegiatan')
				},
				{
					path: ':id',
					name: 'Kegiatan-Lihat',
					meta: { type: 'view', module: 'Kegiatan', crumbs: 'Detail', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Kegiatan')
				},
				{
					path: ':id/edit',
					name: 'Kegiatan-Edit',
					meta: { type: 'edit', module: 'Kegiatan', crumbs: 'Edit', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Kegiatan')
				}
			]
		},
		{
			path: 'blog',
			component: LazyImport('Content-View.vue'),
			children: [
				{
					path: '',
					name: 'Blog-Table',
					meta: { type: 'table', module: 'Blog', loading: 'content', login: true },
					component: LazyImport('Table.vue', 'Blog')
				},
				{
					path: 'tambah',
					name: 'Blog-Tambah',
					meta: { type: 'create', module: 'Blog', crumbs: 'Tambah', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Blog')
				},
				{
					path: ':id',
					name: 'Blog-Lihat',
					meta: { type: 'view', module: 'Blog', crumbs: 'Detail', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Blog')
				},
				{
					path: ':id/edit',
					name: 'Blog-Edit',
					meta: { type: 'edit', module: 'Blog', crumbs: 'Edit', loading: 'content', login: true },
					component: LazyImport('Form.vue', 'Blog')
				}
			]
		},
		{
			path: 'laporan/siswa',
			meta: { crumbs: 'Laporan - Siswa', loading: 'content', login: true },
			component: LazyImport('Siswa.vue', 'Laporan'),
		},
		{
			path: 'laporan/orangtua',
			meta: { crumbs: 'Laporan - Orangtua', loading: 'content', login: true },
			component: LazyImport('Orangtua.vue', 'Laporan'),
		},
		{
			path: 'laporan/nilai',
			meta: { crumbs: 'Laporan - Nilai', loading: 'content', login: true },
			component: LazyImport('Nilai.vue', 'Laporan'),
		},
	]
}