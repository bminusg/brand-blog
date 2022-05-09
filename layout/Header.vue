<template>
  <header class="header flex">
    <div class="container header--container flex flex--between">
      <Logo class="header--logo" :themeID="theme"></Logo>

      <nav class="header--nav">
        <nuxt-link to="/blogs">Blogs</nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo.vue'

export default {
  name: 'Header',
  components: { Logo },
  computed: {
    ...mapState({
      theme: (state) => state.theme.active,
    }),
  },
}
</script>

<style lang="sass" scoped>
.header
  position: absolute
  width: 100%
  height: var(--layout--space)
  background-color: var(--header--background-color)
  z-index: 100

  &--logo
    flex:0 1 var(--header--logo-width)
    fill: var(--header--logo-fill)
</style>
