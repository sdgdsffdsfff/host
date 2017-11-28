<template>
  <v-navigation-drawer
    :value="showNav"
    :persistent="true"
    :clipped="false"
    :floating="false"
    :mini-variant="false"
    :dark="true"
    class="indigo"
    absolute
    overflow
    app >
    <com-user />
    <com-menu />
  </v-navigation-drawer>
</template>

<script>
  import User from '@/components/User'
  import Menu from '@/components/Menu'
  import { mapState } from 'vuex'
  export default {
    components: {
      comUser: User,
      comMenu: Menu
    },
    computed: {
      ...mapState({
        showNav: state => state.showNav
      })
    }
  }
</script>