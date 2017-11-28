<template>
  <v-breadcrumbs divider="/">
    <v-breadcrumbs-item 
      v-for="item in breadcrumbs"
      :key="item.text"
      :href="item.href"
      :disabled="item.disabled" >
        {{ item.text }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>
 
<script>
  export default {
    props: {
      breadcrumbs: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="scss">
.breadcrumbs {
  a {
    color: #3f51b5;
  }
}
</style>
