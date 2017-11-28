<template>
  <v-card class="o2_project_item_main">
    <router-link class="o2_project_item_lk" :to="{ path: 'detail', query: { id: item.id }}">
      <v-layout wrap pt-4>
        <v-flex xs12 pt-2>
          <div class="o2_project_name title grey--text text--darken-4">
            {{ item.name }}
          </div>
        </v-flex>
        <v-flex xs12>
          <div class="o2_project_case indigo--text">
            <span>{{ item.caseNum }}</span>方案
          </div>
        </v-flex>
        <v-flex xs6>
          <div class="o2_project_address grey--text text--darken-2">关联地址<p class="o2_project_num indigo--text text--lighten-3">{{ item.addressNum }}</p></div>
        </v-flex>
        <v-flex xs6>
          <div class="o2_project_member grey--text text--darken-2">项目成员<p class="o2_project_num indigo--text text--lighten-3">{{ item.memberNum }}</p></div>
        </v-flex>
      </v-layout>
      <div v-if="item.isAdmin" class="o2_project_tag amber">管</div>
      <div v-if="item.isAdmin" class="o2_project_aside">
        <v-btn class="o2_project_aside_btn add" small dark round>
          <v-icon>add</v-icon>方案
        </v-btn>
        <v-btn class="o2_project_aside_btn add" small dark round>
          <v-icon>add</v-icon>模拟接口
        </v-btn>
      </div>
    </router-link>
  </v-card>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style lang="scss">
.o2_project {
  &_item {
    text-align: center;
    margin-bottom: 20px;
    height: 200px;
    &_main {
      position: relative;
      height: 100% !important;
      overflow: hidden;
      transition: box-shadow ease 0.3s;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #3f51b5;
      }
      a {
        text-decoration: none;
      }
      &:hover {
        box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)!important;
        .o2_project_aside {
          transform: translateY(0%);
          opacity: 1;
        }
      }
    }
  }
  &_name {
    margin-bottom: 10px;
  }
  &_case {
    margin-bottom: 10px;
    span {
      font-size: 42px;
      padding-right: 5px;
    }
  }
  &_tag {
    position: absolute;
    width: 30px;
    height: 30px;
    line-height: 25px;
    padding-left: 5px;
    right: 0;
    top: 0;
    color: #fff;
    font-size: 14px;
    border-bottom-left-radius: 30px !important;
  }
  &_aside {
    position: absolute;
    width: 100%;
    height: 80px;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    transform: translateY(100%);
    transition: all ease 0.3s;
    opacity: 0;
    &_btn {
      margin: 20px 5px;
    }
  }
}
</style>
