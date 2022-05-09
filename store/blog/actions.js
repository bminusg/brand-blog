const API_URL = process.env.API_URL

export default {
  async load({ commit, dispatch }, slug) {
    commit('load')

    try {
      const API = API_URL + '/blogs?filters[slug]=' + slug
      const data = await fetch(API)
      const json = await data.json()

      if (json.data.length !== 1)
        throw new Error('No excisting Blog Slug (' + slug + ') entry')

      commit('success', json.data[0])
      dispatch('theme/define', json.data[0], { root: true })
    } catch (error) {
      commit('error', error.message)
    }
  },
}
