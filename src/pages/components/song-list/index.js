import songListComponent from './songListComponent'

const songList = {
  install: function (Vue) {
    Vue.component('songList', songListComponent)
  }
}

export default songList
