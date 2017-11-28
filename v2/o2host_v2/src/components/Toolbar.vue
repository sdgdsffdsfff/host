<template>
  <v-toolbar app absolute  class="o2_toolbar grey lighten-5">
    <v-toolbar-side-icon @click.stop="toggleNav()" />
    <v-toolbar-title>O2HOST</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>help_outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template> 

<script>
  export default {
    methods: {
      toggleNav () {
        this.$store.dispatch('TOGGLE_NAV')
      }
    }
  }
</script>
