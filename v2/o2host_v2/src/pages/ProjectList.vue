<template>
  <v-app id="home" class="o2_home grey lighten-3">
    <com-toolbar />
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex class="o2_project_list" xs12>
            <com-breadcrumb :breadcrumbs="breadcrumbs" />
            <v-btn class="o2_project_list_btn search" dark round>
              <v-icon>search</v-icon>
            </v-btn>
            <com-pro />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
 
<script>
  import Navigation from '@/components/Navigation'
  import ProjectList from '@/components/ProjectList'
  import Breadcrumb from '@/components/Breadcrumb'
  import Toolbar from '@/components/Toolbar'
  export default {
    components: {
      comNav: Navigation,
      comPro: ProjectList,
      comBreadcrumb: Breadcrumb,
      comToolbar: Toolbar
    },
    data: () => ({
      breadcrumbs: [
        {
          text: '项目列表'
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
.o2_project_list {
  position: relative;
  &_btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
}
</style>
