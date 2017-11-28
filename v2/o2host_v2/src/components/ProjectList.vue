<template>
  <v-container fill-height fluid class="o2_project">
    <v-layout wrap>
      <v-flex v-for="(item, idx) in projects" v-bind:key="item.id" xs12 sm6 md4 lg3 xl2 px-2 @click="" class="o2_project_item">
        <com-item :item="item" />
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 xl2 px-2 @click="" class="o2_project_item o2_project_add">
        <router-link :to="{ path: 'add' }">
          <div class="o2_project_add_main">
            <v-icon class="o2_project_add_icon">add</v-icon>
          </div>
        </router-link>
      </v-flex>
    </v-list>
    </v-layout>
  </v-container>
</template>

<script>
  import ProjectItem from '@/components/ProjectItem'
  export default {
    components: {
      comItem: ProjectItem
    },
    data () {
      return {
        projects: [
          {
            id: '1',
            name: '新版首页',
            admin: '管理员',
            isAdmin: true,
            caseNum: 10,
            memberNum: 3,
            addressNum: 4
          },
          {
            id: '2',
            name: '排行榜',
            admin: '管理员',
            isAdmin: false,
            caseNum: 6,
            memberNum: 3,
            addressNum: 4
          },
          {
            id: '3',
            name: '新版首页',
            admin: '管理员',
            isAdmin: false,
            caseNum: 30,
            memberNum: 3,
            addressNum: 4
          },
          {
            id: '4',
            name: '新版首页',
            admin: '管理员',
            isAdmin: false,
            caseNum: 4,
            memberNum: 3,
            addressNum: 4
          },
          {
            id: '5',
            name: '排行榜',
            admin: '管理员',
            isAdmin: true,
            caseNum: 2,
            memberNum: 3,
            addressNum: 4
          },
          {
            id: '6',
            name: '新版首页',
            admin: '管理员',
            isAdmin: true,
            caseNum: 5,
            memberNum: 3,
            addressNum: 4
          },
          {
            id: '7',
            name: '新版首页',
            admin: '管理员',
            isAdmin: true,
            caseNum: 10,
            memberNum: 3,
            addressNum: 4
          },
          {
            id: '8',
            name: '排行榜',
            admin: '管理员',
            isAdmin: true,
            caseNum: 10,
            memberNum: 3,
            addressNum: 4
          },
          {
            id: '9',
            name: '新版首页',
            admin: '管理员',
            isAdmin: false,
            caseNum: 10,
            memberNum: 3,
            addressNum: 4
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
.o2_project {
  &_add {
    &_main {
      height: 100%;
      border: 1px dashed rgba(0, 0, 0, .2);
      border-radius: 2px;
      background: rgba(255, 255, 255, .4);
    }
    &_icon {
      line-height: 200px;
      font-size: 50px;
      color: rgba(0, 0, 0, .2) !important;
    }
  }
  &_num {
    font-size: 20px;
  }
}
</style>