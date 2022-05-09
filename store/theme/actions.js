export default {
  define({ commit }, blog) {
    commit('LOAD_THEME')

    try {
      const blogThemes = blog.attributes.themes || []
      const payload = {
        assigned: [],
        active: '',
      }

      // DEFINE ASSIGNED THEMES
      blogThemes.forEach((blogTheme) => {
        const theme = blogTheme.__component.replace('themes.', '')
        payload.assigned.push(theme)
      })

      // DEFINE ACTIVE THEME
      const queryThemeID = this.$router.currentRoute.query.themeID
      payload.active = payload.assigned.includes(queryThemeID)
        ? queryThemeID
        : ''

      commit('SUCCESS_THEME', payload)
    } catch (error) {
      console.error(error)
      commit('ERROR_THEME', error)
    }
  },
}
