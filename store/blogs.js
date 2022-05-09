// GET PREVIEWS api/blogs?publicationState=preview

const API_URL = process.env.API_URL

export const state = () => ({
  status: '',
  message: '',
  data: [],
})

export const mutations = {
  load(state) {
    state.status = 'is--loading'
  },
  success(state, data) {
    state.status = 'is--success'
    state.data = data
  },
  error(state, message) {
    state.status = 'is--error'
    state.message = message
    state.data = []
  },
}

export const actions = {
  async getAllBlogs({ commit }) {
    commit('load')

    try {
      const data = await fetch(API_URL + '/blogs?publicationState=live')
      const json = await data.json()

      commit('success', json.data)
    } catch (error) {
      commit('error', error.message)
    }
  },

  async getBlogData({ commit }, payload) {
    commit('load')

    try {
      const blogData = await fetch(process.env.API_URL + '/blogs')
      const json = await blogData.json()

      const theme =
        payload &&
        payload.themeID &&
        (await json.themes.indexOf(payload.themeID)) > -1
          ? payload.themeID
          : false

      if (json.error) return commit('error', json.message)
      if (theme) commit('changeTheme', theme)

      commit('success', json)
    } catch (error) {
      console.error('CATCH BLOCK ERROR', error)
      commit(error)
    }
  },
}
