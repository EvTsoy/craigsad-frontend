<template>
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <a
        href="/"
        class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
      >
        <svg
          class="bi me-2"
          width="40"
          height="32"
          role="img"
          aria-label="Bootstrap"
        >
          <use xlink:href="#bootstrap"></use>
        </svg>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <router-link
            :to="{ name: 'AdsPage' }"
            class="nav-link px-2 link-secondary"
            >Home</router-link
          >
        </li>
      </ul>

      <div class="col-md-3 text-end" v-if="!getUser">
        <router-link
          :to="{ name: 'LoginPage' }"
          class="btn btn-outline-primary me-2"
        >
          Login
        </router-link>
        <!-- <button type="button" class="btn btn-primary">Sign-up</button> -->
      </div>

      <div class="col-md-3 text-end" v-else>
        <router-link
          :to="{ name: 'AdCreatePage' }"
          class="btn btn-success me-2"
        >
          Create Ad
        </router-link>
        <a class="btn btn-outline-danger me-2" @click.prevent="logout">
          Logout
        </a>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  created () {
    this.fetchUser()
  },

  methods: {
    fetchUser () {
      this.$store.dispatch('fetchUser')
    },

    logout () {
      this.$store.dispatch('logout')
    }
  },

  computed: {
    getUser () {
      return this.$store.getters.getUser
    },

    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
