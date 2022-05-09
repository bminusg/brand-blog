export default {
  LOAD_THEME(state) {
    state.status = 'is--loading'
    state.active = ''
    state.message = ''
    state.assigned = []
  },
  SUCCESS_THEME(state, payload) {
    state.status = 'is--success'
    state.active = payload.active
    state.assigned = payload.assigned
  },
  ERROR_THEME(state, error) {
    state.status = 'is--error'
    state.message = error.message
  },
}
