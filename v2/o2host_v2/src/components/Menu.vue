<template>
  <v-list class="o2_menu">
    <v-list-tile ripple v-for="(item, idx) in items" v-bind:key="item.title" @click="" class="o2_menu_item">
      <v-list-tile-action class="o2_menu_icon">
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content class="o2_menu_title">
        <v-list-tile-title v-text="item.title"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          icon: 'dashboard',
          title: 'HOST 配置'
        },
        {
          icon: 'style',
          title: '常用配置'
        },
        {
          icon: 'supervisor_account',
          title: '团队管理'
        },
        {
          icon: 'settings',
          title: '个人设置'
        },
        {
          icon: 'mail',
          title: '联系我们'
        }
      ]
    })
  }
</script>

<style lang="scss">
.o2_menu {
  &_item {
  }
  &_icon {
    i {
      font-size: 40px;
    }
  }
  &_title {
  }
}
</style>
