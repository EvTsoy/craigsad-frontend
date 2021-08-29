<template>
  <!-- Page Content -->
  <div class="container" v-if="ad">
    <!-- Portfolio Item Heading -->
    <h1 class="my-4">
      {{ ad.title }}
    </h1>

    <!-- Portfolio Item Row -->
    <div class="row">
      <div class="col-md-8">
        <img
          class="img-fluid"
          src="https://via.placeholder.com/750x500"
          alt=""
        />
      </div>

      <div class="col-md-4">
        <h3 class="my-3">Advertisement Description</h3>
        <p>
          {{ ad.description }}
        </p>
        <h3 class="my-3">Advertisement Details</h3>
        <ul>
          <li><b>Id:</b> {{ ad.id }}</li>
          <li><b>Title:</b> {{ ad.title }}</li>
          <li><b>Created by</b>: {{ ad.user.name }}</li>
          <li><b>Contacts:</b> {{ ad.user.email }}</li>
          <li><b>Created:</b> {{ ad.created_at }}</li>
        </ul>
      </div>
    </div>
    <!-- /.row -->

    <!-- Related Projects Row -->
    <h3 class="my-4">Related Projects</h3>

    <div class="row">
      <div class="col-md-3 col-sm-6 mb-4">
        <a href="#">
          <img
            class="img-fluid"
            src="https://via.placeholder.com/500x300"
            alt=""
          />
        </a>
      </div>

      <div class="col-md-3 col-sm-6 mb-4">
        <a href="#">
          <img
            class="img-fluid"
            src="https://via.placeholder.com/500x300"
            alt=""
          />
        </a>
      </div>

      <div class="col-md-3 col-sm-6 mb-4">
        <a href="#">
          <img
            class="img-fluid"
            src="https://via.placeholder.com/500x300"
            alt=""
          />
        </a>
      </div>

      <div class="col-md-3 col-sm-6 mb-4">
        <a href="#">
          <img
            class="img-fluid"
            src="https://via.placeholder.com/500x300"
            alt=""
          />
        </a>
      </div>
    </div>
    <!-- /.row -->
  </div>
  <!-- /.container -->
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      ad: null
    }
  },
  created () {
    console.log(this.id)
    this.fetchAd()
  },

  methods: {
    fetchAd () {
      this.axios.get('ads/' + this.id).then(response => {
        this.ad = response.data.data
      })
    }
  }
}
</script>
