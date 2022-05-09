<template>
  <div
    :id="data.hash"
    :class="{ 'is--visible': visible }"
    class="textblog textblog--fullscreen flex"
  >
    <div
      class="container textblog--container flex flex--center"
      :class="{ 'is--visible': visible }"
    >
      <aside class="textblog--share"></aside>
      <article
        class="textblog--article"
        v-html="$md.render(data.text)"
      ></article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Textblog',
  props: { data: { type: Object, default: () => {} }, visible: Boolean },
}
</script>

<style lang="sass" scoped>
.textblog
    &--fullscreen
        min-height: 100vh

    &--container
      transform: matrix(1,0,0,1,0,100)
      opacity: 0
      transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity .4s ease-in

      &.is--visible
        transform: matrix(1,0,0,1,0,0)
        opacity: 1

    &--article
      flex: 0 1 700px


      .textblog
</style>
