<template>
  <v-form v-model="hostRules.valid" class="o2_project_form o2_project_form_host" ref="host_form">
    <v-layout row v-if="host.name !== undefined">
      <v-flex xs2>
        <v-subheader class="o2_project_form_tit required">方案名称</v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          label="方案名称"
          v-model="host.name"
          :rules="hostRules.nameRules"
          :counter="10"
          single-line />
      </v-flex>
    </v-layout>
    <v-layout row v-if="host.desc !== undefined">
      <v-flex xs2>
        <v-subheader class="o2_project_form_tit required">方案描述</v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          label="方案描述"
          v-model="host.desc"
          :rules="hostRules.descRules"
          single-line />
      </v-flex>
    </v-layout>
    <v-layout row v-if="host.text !== undefined">
      <v-flex xs2>
        <v-subheader class="o2_project_form_tit">HOST 规则</v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          label="HOST 规则"
          v-model="host.text"
          single-line
          textarea />
      </v-flex>
    </v-layout>
    <v-layout justify-center row>
      <v-flex xs12>
        <v-btn
          block
          dark
          depressed
          class="o2_project_form_btn o2_project_host_form_btn"
          @click="toggleCase" >
          {{ hostBtnText }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  export default {
    data () {
      return {
        host: {
          name: '',
          desc: '',
          text: ''
        },
        hostRules: {
          valid: false,
          nameRules: [
            (v) => !!v || 'Name is required',
            (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
          ],
          descRules: [
            (v) => !!v || 'Name is required'
          ]
        },
        hostBtnText: '暂不添加方案'
      }
    },
    methods: {
      toggleCase () {
        if (this.host.name !== undefined) {
          this.host = {}
          this.hostRules.valid = true
          this.hostBtnText = '添加方案'
        } else {
          this.host = {
            name: '',
            desc: '',
            text: ''
          }
          this.hostRules.valid = false
          this.hostBtnText = '暂不添加方案'
        }
      }
    }
  }
</script>
