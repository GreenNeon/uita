import Vue from 'vue'
import Vuex from 'vuex'
import Siswa from './Siswa'
import Pegawai from './Pegawai'
import Orangtua from './Orangtua'
import Kelas from './Kelas'
import Pembelajaran from './Pembelajaran'
import Indikator from './Indikator'
import Nilai from './Nilai'
import Catatan from './Catatan'
import Kegiatan from './Kegiatan'
import Blog from './Blog'
import Base from './Base'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
		Base,
		Siswa,
		Pegawai,
		Orangtua,
		Kelas,
		Pembelajaran,
		Indikator,
		Nilai,
		Catatan,
		Kegiatan,
		Blog
  }
})
