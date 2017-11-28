<template>
  <v-app id="home" class="o2_home grey lighten-3">
    <com-toolbar />
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <com-breadcrumb :breadcrumbs="breadcrumbs" />
            <com-add />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
 
<script>
  import Navigation from '@/components/Navigation'
  import Breadcrumb from '@/components/Breadcrumb'
  import AddProject from '@/components/AddProject'
  import Toolbar from '@/components/Toolbar'
  export default {
    components: {
      comNav: Navigation,
      comBreadcrumb: Breadcrumb,
      comAdd: AddProject,
      comToolbar: Toolbar
    },
    data: () => ({
      breadcrumbs: [
        {
          text: '项目列表',
          href: '#/list'
        },
        {
          text: '新增项目'
        }
      ]
    }),
    methods: {
      toggleNav () {
        this.$store.commit('toggleNav')
      }
    }
  }
</script>

<style lang="scss">
.o2_toolbar {
}
</style>
