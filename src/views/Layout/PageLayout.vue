<template>
  <div>
    <top-navbar></top-navbar>
    <dashboard-content> </dashboard-content>
  </div>
</template>
<script>
import DashboardContent from './Content.vue'
import TopNavbar from './TopNavbar.vue'
export default {
  components: {
    DashboardContent,
    TopNavbar
  }
}
</script>
