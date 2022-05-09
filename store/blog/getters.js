export default {
  getThemes(state) {
    const themes = []

    for (const theme of state.attributes.themes) {
      const themeID = theme.__component.replace('themes.', '')
      themes.push(themeID)
    }

    return themes
  },
}
