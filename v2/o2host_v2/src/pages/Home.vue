<template>
  <v-app id="home" class="o2_home grey lighten-3">
    <v-toolbar app absolute  class="o2_toolbar grey lighten-5">
      <v-toolbar-side-icon @click.stop="toggleNav()" />
      <v-toolbar-title>O2HOST</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <v-breadcrumbs divider="/">
              <v-breadcrumbs-item 
                v-for="item in breadcrumbs" :key="item.text"
                :disabled="item.disabled"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </v-breadcrumbs>
            <com-detail />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
 
<script>
  import Navigation from '@/components/Navigation'
  import ProjectList from '@/components/ProjectList'
  import ProjectDetail from '@/components/ProjectDetail'
  export default {
    components: {
      comNav: Navigation,
      comPro: ProjectList,
      comDetail: ProjectDetail
    },
    data: () => ({
      breadcrumbs: [
        {
          text: '项目列表'
        },
        {
          text: '项目详情'
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
