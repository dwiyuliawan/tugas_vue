import feather from 'feather-icons'

export default {
  install(Vue) {
    Vue.mixin({
      mounted() {
        feather.replace()
      },
      updated() {
        feather.replace()
      }
    })
  }
}
