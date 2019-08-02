import Vue from 'vue'
import App from './App'

import SongListComponent from './pages/components/song-list/songListComponent'

Vue.component('SongListComponent',SongListComponent)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
