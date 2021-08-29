<template>
  <div class="album py-5 bg-light" v-if="ads">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-4">
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="sortField"
          >
            <option selected disabled>Sort Field</option>
            <option value="created_at">Created date</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div class="col-md-4">
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="sortBy"
          >
            <option selected disabled>Sort By</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      <div
        class="card mb-3"
        v-for="(ad, index) in ads.data"
        :key="`ad-${index}`"
      >
        <div class="card-header">
          Created by {{ ad.user.name }} {{ ad.created_at }}
        </div>
        <div class="card-body d-flex flex-column">
          <div>
            <h5 class="card-title">{{ ad.title }}</h5>
            <img
              v-for="image in ad.images"
              :key="`image-${image.id}`"
              :src="
                imagePath.substring(0, imagePath.length - 4) + image.image_path
              "
              class="img-thumbnail float-end ms-5 mb-5"
              alt="..."
              style="height: 200px;"
            />

            <p class="card-text">
              {{ ad.description }}
            </p>
          </div>

          <div class="d-flex justify-content-between">
            <router-link
              :to="{ name: 'AdPage', params: { id: ad.id } }"
              class="btn btn-primary"
              >More info</router-link
            >
            <div v-if="userId === ad.user.id">
              <router-link
                :to="{ name: 'AdEditPage', params: { id: ad.id } }"
                class="btn btn-info"
                >Edit</router-link
              >
              <button class="btn btn-danger ms-2" @click="destroy(ad.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vue-pagination">
      <pagination
        v-model="page"
        :records="ads.meta.total"
        :per-page="ads.meta.per_page"
        @paginate="fetchAds"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      perPage: 0,
      total: 0,
      sortBy: 'desc',
      sortField: 'created_at'
    }
  },

  watch: {
    sortBy () {
      this.fetchAds()
    },
    sortField () {
      this.fetchAds()
    }
  },

  computed: {
    ads () {
      return this.$store.getters.getAds
    },

    imagePath () {
      return this.axios.defaults.baseURL
    },

    userId () {
      const user = this.$store.getters.getUser
      if (user) return user.id
      return false
    }
  },

  created () {
    this.fetchAds()
  },

  methods: {
    fetchAds (page = 1) {
      this.$store.dispatch('fetchAds', {
        page,
        sortBy: this.sortBy,
        sortField: this.sortField
      })
      this.jumpToTop()
    },

    jumpToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    destroy (id) {
      this.$store.dispatch('deleteAd', id)
    }
  }
}
</script>

<style scoped>
.vue-pagination {
  width: 500px;
  margin: auto;
  margin-top: 100px;
  text-align: center;
}
</style>
