<template>
  <div class="slider container">
    <div class="slider-visual" @touchmove="touchStart">
      <img class="slider-img" :src="imageSrc" />
    </div>
    <div class="slider-controller">
      <input
        type="range"
        min="0"
        :max="imageCollection.length - 1"
        class="slider"
        v-model="value"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: ['content'],
  data() {
    return {
      value: 50,
      // imgSrc: '@/assets/slider/slide_',
    }
  },
  computed: {
    imageCollection() {
      let collection = []

      this.content.media.data.forEach((image) => {
        const name = image.attributes.name
        const value = name.slice(
          name.lastIndexOf('_') + 1,
          name.lastIndexOf('.')
        )
        image.value = parseInt(value)

        collection.push(image)
      })

      if (typeof collection[0].value === 'number')
        collection = collection.sort((a, b) => {
          if (a.value < b.value) return -1
          else return 1
        })

      return collection
    },
    imageSrc() {
      const image = this.imageCollection.find(
        (image) => image.value === parseInt(this.value)
      )

      if (!image) return null

      return process.env.MEDIA_URL + image.attributes.url
    },
  },
  methods: {
    touchStart(event) {
      // console.log(event.changedTouches[0])
    },
  },
}
</script>

<style lang="sass">
.slider
    &-visual
        background-color: #f2f2f2
        width: 1024px
        height: 576px

    &-img
        -webkit-touch-callout: none
        -webkit-user-select: none
        -khtml-user-select: none
        -moz-user-select: none
        -ms-user-select: none
        user-select: none
</style>
