<template>
  <li class="card--item">
    <nuxt-link :to="link" @click.native="defineBlog(data)">
      <header class="card--item-header">
        <img :src="thumbnail" />
      </header>
      <main class="card--item-main">
        <h4 class="card--item-title">{{ title }}</h4>
      </main>
    </nuxt-link>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Card',
  props: {
    data: {
      type: Object,
      default() {
        return { attributes: {}, id: {} }
      },
    },
    link: {
      type: String,
      default: '/',
    },
  },
  computed: {
    title() {
      return this.data.attributes.title
    },
    thumbnail() {
      return (
        process.env.MEDIA_URL +
        this.data.attributes.meta.thumbnail.data.attributes.formats.small.url
      )
    },
  },
  methods: {
    ...mapMutations({
      defineBlog: 'blog/success',
    }),
  },
}
</script>

<style lang="sass">
.card
  &--wrapper
    display: flex
    flex-wrap: wrap

  &--item
      flex: 0 1 calc(var(--layout--space) * 4)
      background-color: #fff
      border-radius: 6px
      box-shadow: 0 2px 24px rgba(0,0,0,0.2)
      padding: var(--layout--space-xs)
      overflow: hidden
      margin: var(--layout--space-s)

      &-header
          background-color: var(--color--grey)
          width: calc(100% + calc(var(--layout--space-xs) * 2 ))
          left: calc( -1 * var(--layout--space-xs))
          top: calc( -1 * var(--layout--space-xs))
          aspect-ratio: 16 / 9

      &-title
          color: var(--color--primary)
</style>
