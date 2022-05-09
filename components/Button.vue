<template>
  <a
    :href="data.link"
    :target="data.external ? '_blank' : '_self'"
    :class="'button--' + data.style"
    class="button"
    :data-light="data.light"
    :data-outlined="data.outlined"
  >
    <span class="button--label">{{ data.label }}</span>
  </a>
</template>

<script>
export default {
  name: 'Button',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style lang="sass">
.button
    border: none
    text-decoration: none
    margin: var(--layout--space-s) var(--layout--space-s) var(--layout--space-s) 0
    display: inline-flex
    justify-content: center
    align-items: center
    cursor: pointer

    &--wrapper
        display: flex
        flex-wrap: wrap

    &--primary
        flex: 0 1 calc(var(--layout--space) * 4)
        font-family: var(--font--h1-family)
        background-color: var(--color--primary)
        height: var(--btn--primary-height)
        border: 1px solid var(--color--primary-lighter)
        border-radius: var(--btn--primary-radius)
        padding: var(--btn--primary-padding)
        color: #fff
        max-width: 50%
        text-transform: uppercase
        transition: background-color 0.4s ease-in-out
        text-overflow: ellipsis

        &:hover
            background-color: var(--color--primary-light)

        &[data-outlined="true"]
            background-color: transparent
            color: var(--color--primary)
            border: 1px solid var(--color--primary)

            &[data-light="true"]
                color: #fff
                border: 1px solid var(--color--primary-lighter)

                &:hover
                    background-color: var(--color--primary-light)
</style>
