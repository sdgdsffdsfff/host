<template>
  <div class="o2_user">
    <v-avatar
      size="150px"
      class="grey lighten-4 o2_user_avatar" >
      <img src="../assets/no-img.jpg" alt="avatar">
    </v-avatar>
    <p class='o2_user_name'>{{ username }}</p>
    <p class='o2_user_team indigo lighten-2'>凹凸实验室</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        username: state => state.userInfo.username
      })
    }
  }
</script>

<style lang="scss">
.o2_user {
  text-align: center;
  margin: 50px 0 20px;
  color: #fff;
  &_avatar {
    margin-bottom: 30px;
  }
  &_name {
    font-size: 24px;
    margin-bottom: 5px;
  }
  &_team {
    display: inline-block;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 10px;
    border-radius: 20px;
  }
}
</style>