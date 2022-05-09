export default {
  load(state) {
    state.attributes = {}
    state.status = 'is--loading'
    state.message = ''
  },
  success(state, data) {
    state.attributes = data.attributes
    state.id = data.id
    state.status = 'is--success'
    state.message = ''
  },
  error(state, message) {
    state.status = 'is--error'
    state.message = message
  },
  defineTheme(state, themeID) {
    state.theme = themeID
  },
}
