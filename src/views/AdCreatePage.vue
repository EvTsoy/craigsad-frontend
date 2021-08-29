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
            <div class="mb-3">
              <label>Image</label>
              <div class="input-group">
                <input
                  type="file"
                  class="form-control"
                  name="image"
                  multiple="multiple"
                  @change="onFileChange"
                />
              </div>
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
      images: null
    }
  },

  methods: {
    submit () {
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('description', this.description)
      for (var i = 0; i < this.images.length; i++) {
        formData.append('images[]', this.images[i])
      }

      this.$store
        .dispatch('createAd', formData)
        .then(response => {
          this.$router.push({
            name: 'AdPage',
            params: { id: response.data.id }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },

    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.images = files
    }
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      const user = await vm.$store.dispatch('fetchUser')
      if (!user) {
        return vm.$router.push({ name: 'AdsPage' })
      }
    })
  }
}
</script>
