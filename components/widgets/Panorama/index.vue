<template>
  <div class="panorama fullscreen flex">
    <component :is="data.theme" :content="data"></component>
  </div>
</template>

<script>
import Slider from './themes/Slider.vue'

export default {
  name: 'Panorama',
  props: ['data'],
  components: { slider: Slider },
}
</script>

<style lang="sass">
.panorama
    background-color: var(--color--grey-lighter)
</style>
