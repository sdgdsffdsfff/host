<template>
  <v-form v-model="infoRules.valid" class="o2_project_form o2_project_form_info" ref="info_form">
    <v-layout row>
      <v-flex xs2>
        <v-subheader class="o2_project_form_tit required">项目名称</v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          label="项目名称"
          v-model="info.name"
          :rules="infoRules.nameRules"
          :counter="10"
          single-line />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs2>
        <v-subheader class="o2_project_form_tit">项目地址</v-subheader>
      </v-flex>
      <v-flex xs10>
        <template v-for="(item, idx) in info.urlArr">
          <v-text-field
            label="匹配规则"
            v-model="item.url"
            :rules="infoRules.urlRules"
            :key="idx"
            single-line
            append-icon="remove_circle"
            :append-icon-cb="() => {removeUrl(idx)}" />
        </template>
        <v-btn
          block
          dark
          depressed
          class="o2_project_form_btn"
          @click="addUrl" >
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  export default {
    data () {
      return {
        info: {
          name: '',
          urlArr: [{url: ''}]
        },
        infoRules: {
          valid: false,
          nameRules: [
            (v) => !!v || 'Name is required',
            (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
          ],
          urlRules: [
          ]
        }
      }
    },
    methods: {
      addUrl () {
        this.info.urlArr.push({url: ''})
      },
      removeUrl (idx) {
        this.info.urlArr.splice(idx, 1)
      }
    }
  }
</script>

<style lang="scss">
.o2_project_form_info {
  .o2_project_form_btn {
    margin-top: 15px;
  }
}
</style>
