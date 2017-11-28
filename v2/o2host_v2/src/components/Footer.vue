<template>
  <v-footer :fixed="true" color="transparent" class="o2_footer">
    <span>&copy; {{ new Date().getFullYear() }} 凹凸实验室</span>
  </v-footer>
</template>

<script>
  export default {}
</script>

<style lang="scss">
.o2_footer {
  height: 40px;
  line-height: 40px;
  color: rgba(255,255,255,0.6);
}
</style>
