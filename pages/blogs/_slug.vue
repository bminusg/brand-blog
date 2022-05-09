<template>
  <div id="app" class="blog" :data-theme="theme">
    <Header></Header>

    <main>
      <section v-for="section in blog.attributes.sections" :key="section.hash">
        <component
          :is="section.__component"
          :data="section"
          :visible="isIntersecting[section.hash]"
          class="widget"
        ></component>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/layout/Header.vue'
import Cover from '~/components/widgets/Cover'
import Textblog from '~/components/widgets/Textblog'
import Panorama from '~/components/widgets/Panorama'

export default {
  name: 'Blog',
  components: {
    Header,
    'widgets.cover': Cover,
    'widgets.textblog': Textblog,
    'widgets.panorama': Panorama,
  },
  async asyncData({ params, store, error }) {
    if (Object.keys(store.state.blog.attributes).length > 0) return
    try {
      await store.dispatch('blog/load', params.slug)
    } catch (e) {
      error({ message: e.message, statusCode: e.response.status })
    }
  },
  data() {
    return {
      isIntersecting: {},
    }
  },
  head() {
    return {
      title: this.blog.attributes.title + ' | ' + process.env.SITE_NAME,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.blog.attributes.meta.description,
        },
        {
          hid: 'keywords',
          property: 'keywords',
          content: this.blog.attributes.meta.keywords,
        },
        {
          hid: 'robots',
          property: 'robots',
          content: 'index,nofollow',
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:title',
          content: this.blog.attributes.title,
        },
        {
          property: 'og:description',
          content: this.blog.attributes.meta.description,
        },
        {
          property: 'og:image',
          content:
            process.env.MEDIA_URL +
            this.blog.attributes.meta.thumbnail.data.attributes.formats.small
              .url,
        },
        {
          property: 'og:url',
          content: 'PERMALINK',
        },
        {
          property: 'og:site_name',
          content: process.env.SITE_NAME || 'Brand Blog',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      blog: (state) => state.blog,
      theme: (state) => state.theme.active,
    }),
  },
  mounted() {
    // OBSERVER
    const sections = this.blog.attributes.sections
    const widgets = document.querySelectorAll('.widget')
    const options = {
      root: null,
      threshold: 0.5,
    }

    for (const section of sections) {
      if (!section.hash) continue
      this.$set(this.isIntersecting, [section.hash], false)
    }

    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!target.id || target.id === '') continue
        this.isIntersecting[target.id] = isIntersecting
      }
    }, options)

    widgets.forEach((widget) => {
      observer.observe(widget)
    })

    // DYNAMIC PUBLISHER THEME
    if (this.theme) import('@/sass/themes/' + this.theme + '.sass')
  },
}
</script>
