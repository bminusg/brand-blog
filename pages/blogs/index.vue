<template>
  <div id="app" class="blogs">
    <Header></Header>
    <main class="main">
      <section class="section section--fullscreen">
        <div class="container container--section">
          <h1>Blog Overview</h1>

          <ul v-if="blogs" class="card--wrapper">
            <Card
              v-for="blog in blogs"
              :key="blog.id"
              :data="blog"
              :link="'/blogs/' + blog.attributes.slug"
            ></Card>
          </ul>

          <div class="loader" :data-status="status"></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/layout/Header.vue'
import Card from '~/components/Card.vue'

export default {
  name: 'Blogs',
  components: { Header, Card },
  computed: {
    ...mapState({
      blogs: (state) => state.blogs.data,
      status: (state) => state.blogs.status,
      theme: (state) => state.theme.active,
    }),
  },
  mounted() {
    if (this.blogs.length > 0) return
    this.$store.dispatch('blogs/getAllBlogs')
  },
}
</script>
