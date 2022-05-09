<template>
  <div
    :id="data.hash"
    :class="{ 'is--visible': visible }"
    class="cover cover--fullscreen flex"
  >
    <div class="container cover--container">
      <h1 class="cover--title" :class="{ 'is--visible': visible }">
        {{ title }}
      </h1>
      <p v-if="data.subline" class="cover--subline">{{ data.subline }}</p>
      <div v-if="data.buttons" class="cover--button-wrapper button--wrapper">
        <Button
          v-for="button in data.buttons"
          :key="'cover--button-' + button.id"
          :data="button"
        >
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button'

export default {
  name: 'Cover',
  components: { Button },
  props: { data: { type: Object, default: () => {} }, visible: Boolean },
  computed: {
    ...mapState({
      blog: (section) => section.blog,
    }),
    title() {
      if (this.data.title) return this.data.title
      return this.blog.attributes.title
    },
    media() {
      const media = []

      this.data.media.data.forEach((mediaItem) => {
        media.push({
          alt: mediaItem.attributes.alternativeText,
          url: process.env.MEDIA_URL + mediaItem.attributes.url,
          type: mediaItem.attributes.mime,
          orientation:
            mediaItem.attributes.width > mediaItem.attributes.height
              ? 'landscape'
              : 'portrait',
        })
      })

      return media
    },
  },
  mounted() {
    // DEFINE COVER IMAGES
    this.media.forEach((source) => {
      if (source.orientation === 'landscape') {
        document.documentElement.style.setProperty(
          '--cover--background-landscape',
          'url(' + source.url + ')'
        )
      }

      if (source.orientation === 'portrait') {
        document.documentElement.style.setProperty(
          '--cover--background-portrait',
          'url(' + source.url + ')'
        )
      }
    })
  },
}
</script>

<style lang="sass" scoped>
.cover
    background-color: var(--color--grey-darker)
    background-repeat: no-repeat
    background-position: center center
    background-size: cover
    background-image: linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,0) 50%), var(--cover--background-landscape)
    background-attachment: fixed
    width: 100%
    height: 100vh
    align-items: end

    @media screen and (orientation: portrait)
        background-image: var(--cover--background-portrait)


    &::before
      content: ""
      position: absolute
      width: inherit
      height: inherit
      background-color: rgba(0,0,0,0.75)
      transition: background-color 1s ease-in-out


    &--container
      padding: var(--layout--space) var(--layout--space-s)

    &--title
      color: #fff
      text-shadow: 0 2px 20px rgba(0,0,0,0.15)
      transform: matrix(1,0,0,1,0, 60)
      opacity: 0
      transition: transform 0.4s ease-out, opacity 0.2s ease-in

      &.is--visible
        transform: matrix(1,0,0,1,0, 0)
        transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease-in
        opacity: 1

    &--subline
      display: block
      color: var(--color--grey-light)
      margin: var(--layout--space-m) 0



    &--fullscreen
        min-height: 100vh

    &.is--visible
      &::before
        background-color: rgba(0,0,0,0)
</style>
