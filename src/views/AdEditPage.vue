<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row offset-2">
        <div class="col-md-8">
          <form @submit.prevent="submit">
            <div class="mb-3">
              <label>Title</label>
              <input v-model="title" class="form-control" name="title" />
            </div>
            <div class="mb-3">
              <label>Description</label>
              <textarea
                v-model="description"
                class="form-control"
                name="description"
              ></textarea>
            </div>

            <button class="btn btn-outline-secondary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],

  data () {
    return {
      title: '',
      description: '',
      images: ''
    }
  },

  created () {
    this.fetchAd()
  },

  computed: {
    imagePath () {
      return this.axios.defaults.baseURL
    }
  },

  methods: {
    submit () {
      this.$store
        .dispatch('patchAd', {
          id: this.id,
          title: this.title,
          description: this.description
        })
        .then(() => {
          this.$router.push({ name: 'AdPage', params: { id: this.id } })
        })
        .catch(error => {
          console.log(error)
        })
    },

    async fetchAd () {
      return await this.$store.dispatch('fetchAd', this.id).then(response => {
        this.title = response.data.data.title
        this.description = response.data.data.description
        this.images = response.data.data.images
        return response
      })
    }
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      const ad = await vm.fetchAd()
      const user = await vm.$store.dispatch('fetchUser')
      if (!user || ad.data.data.user.id !== user.data.data.id) {
        return vm.$router.push({ name: 'AdsPage' })
      }
    })
  }
}
</script>
