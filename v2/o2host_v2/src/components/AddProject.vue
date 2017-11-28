<template>
  <v-stepper class="o2_project_add" v-model="addStep">
    <v-stepper-header class="o2_project_add_hd">
      <v-stepper-step step="1" :complete="addStep > 1">填写项目基础信息</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="addStep > 2">添加项目成员</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">为项目配置 HOST 方案</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items class="o2_project_add_bd">
      <v-stepper-content step="1" class="o2_project_add_info">
        <v-container fluid>
          <v-layout align-center justify-center class="grey lighten-5" mb-4>
            <v-flex xs12 sm12 md12 lg10 xl6>
              <com-info-form />
            </v-flex>
          </v-layout>
          <v-btn color="primary"
            @click.native="addStep = 2"
            :disabled="!infoValid" >
            下一步
          </v-btn>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="2" class="o2_project_add_member">
        <v-container fluid>
          <v-layout align-center justify-center class="grey lighten-5" mb-4>
            <v-flex xs12 sm12 md12 lg10 xl6>
              <com-member-form />
            </v-flex>
          </v-layout>
          <v-btn color="primary" @click.native="addStep = 3">下一步</v-btn>
          <v-btn flat @click.native="addStep = 1">上一步</v-btn>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="3" class="o2_project_add_host">
        <v-container fluid>
          <v-layout align-center justify-center class="grey lighten-5" mb-4>
            <v-flex xs12 sm12 md12 lg10 xl6>
              <com-host-form />
            </v-flex>
          </v-layout>
          <v-btn
            color="primary"
            :to="{ path: 'list' }"
            :disabled="!hostValid" >
            完成
          </v-btn>
          <v-btn flat @click.native="addStep = 2">上一步</v-btn>
        </v-container>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import ProjectInfoForm from '@/components/ProjectInfoForm'
  import ProjectMemberForm from '@/components/ProjectMemberForm'
  import ProjectHostForm from '@/components/ProjectHostForm'
  export default {
    components: {
      comInfoForm: ProjectInfoForm,
      comMemberForm: ProjectMemberForm,
      comHostForm: ProjectHostForm
    },
    data () {
      return {
        addStep: 0,
        infoValid: true,
        memberValid: true,
        hostValid: true
      }
    }
  }
</script>

<style lang="scss">
.o2_project {
  &_form {
    padding: 40px 20px;
    min-height: 500px;
    &_tit {
      height: 65px;
      &.required {
        &:after {
          content: "*";
          font-size: 18px;
          margin: -10px 0 0 5px;
        }
      }
    }
  }
}
</style>
