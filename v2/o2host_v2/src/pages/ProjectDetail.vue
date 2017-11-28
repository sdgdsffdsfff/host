<template>
  <v-app id="home" class="o2_home grey lighten-3">
    <com-toolbar />
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <com-breadcrumb :breadcrumbs="breadcrumbs" />
            <com-detail />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
 
<script>
  import Navigation from '@/components/Navigation'
  import ProjectDetail from '@/components/ProjectDetail'
  import Breadcrumb from '@/components/Breadcrumb'
  import Toolbar from '@/components/Toolbar'
  export default {
    components: {
      comNav: Navigation,
      comDetail: ProjectDetail,
      comBreadcrumb: Breadcrumb,
      comToolbar: Toolbar
    },
    data () {
      return {
        breadcrumbs: [
          {
            text: '项目列表',
            href: '#/list'
          },
          {
            text: '项目详情'
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
.o2_toolbar {
}
</style>
