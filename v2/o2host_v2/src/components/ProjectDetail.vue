<template>
  <v-tabs fixed centered class="o2_project_detail elevation-3">
    <v-tabs-bar class="o2_project_detail_hd elevation-3">
      <v-tabs-slider color="amber"></v-tabs-slider>
      <v-tabs-item
        ripple
        href="#tab-0">
        项目配置
      </v-tabs-item>
      <v-tabs-item
        ripple
        href="#tab-1">
        方案配置
      </v-tabs-item>
      <v-tabs-item
        ripple
        href="#tab-2">
        模拟接口
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items class="o2_project_detail_bd">
      <v-tabs-content
        id="tab-0">
        <v-container fluid>
          <v-layout pt-5 pb-5 align-center justify-center class="grey lighten-5">
            <v-flex class="o2_project_detail_main" xs12 sm12 md12 lg10 xl6>
              <v-layout wrap row justify-end>
                <v-flex xs12 mb-4>
                  <div class="o2_project_detail_name title grey--text text--darken-4">
                    排行榜二期
                    <v-btn
                      class="o2_project_detail_icon edit"
                      dark 
                      icon
                      v-if="isAdmin" >
                      <v-icon color="primary">edit</v-icon>
                    </v-btn>
                  </div>
                </v-flex>
                <v-flex xs12 mb-4>
                  <div class="o2_project_detail_tit subheading">项目地址</div>
                </v-flex>
                <v-flex xs11 mb-4>
                  <div class="o2_project_detail_ctn">
                    <p class="o2_project_detail_url indigo lighten-5 grey--text text--darken-2" v-for="item in urlArr">{{ item.url }}</p>
                  </div>
                </v-flex>
                <v-flex xs12 mb-4>
                  <div class="o2_project_detail_tit subheading">项目成员</div>
                </v-flex>
                <v-flex xs11>
                  <v-layout wrap>
                    <v-flex xs6 sm4 md3 lg3 xl2 v-for="item in items">
                      <v-avatar
                        size="60px"
                        class="o2_project_detail_avatar indigo lighten-4 grey--text text--darken-2"
                        :class="{'admin': item.isAdmin}">
                        {{ item.title.slice(0, 1).toUpperCase() }}
                      </v-avatar>
                      <p class="o2_project_detail_member grey--text text--darken-2">{{ item.title }}</p>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tabs-content>
      <v-tabs-content
        id="tab-1">
        <v-container fluid>
          <v-layout pt-5 wrap align-center justify-center class="grey lighten-5">
            <v-flex class="o2_project_detail_main" xs12 sm12 md12 lg10 xl6>
              <v-layout class="o2_project_detail_tool" pb-4>
                <v-flex xs12>
                  <v-btn class="o2_project_detail_btn search" dark round>
                    <v-icon>search</v-icon>
                  </v-btn>
                  <v-btn class="o2_project_detail_btn add" dark round>
                    <v-icon>add</v-icon>添加方案
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout wrap pb-5 class="o2_project_detail_item" justify-end v-for="(caseItem, idx) in caseArr">
                <!-- <v-flex xs12 mb-2>
                  <div class="o2_project_detail_name title grey--text text--darken-4">
                    {{ caseItem.name }}
                    <v-icon
                      class="o2_project_detail_icon"
                      color="primary"
                      v-if="isAdmin" >
                      edit
                    </v-icon>
                  </div>
                </v-flex>
                <v-flex xs12 mb-4>
                  <div class="o2_project_detail_subname subheading grey--text text--darken-2">
                    {{ caseItem.desc }}
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="o2_project_detail_ctn">
                    <div class="o2_project_detail_host indigo lighten-5 grey--text text--darken-2">
                      <v-layout class="o2_project_detail_host_item" wrap row v-for="item in caseItem.hostArr">
                        <v-flex class="o2_project_detail_host_ip">{{ item.ip }}</v-flex>
                        <v-flex class="o2_project_detail_host_domain">{{ item.domain }}</v-flex>
                      </v-layout>
                    </div>
                  </div>
                </v-flex>
                <div class="o2_project_detail_idx indigo--text text--lighten-5">{{ String.fromCharCode(idx+65) }}</div> -->
                <v-flex xs12 mb-4>
                  <div class="o2_project_detail_tit subheading">{{ caseItem.name }}
                    <span class="o2_project_detail_subtit body-2 grey--text">
                      - {{ caseItem.desc }}
                    </span>
                      <v-btn
                        class="o2_project_detail_icon del"
                        dark 
                        icon
                        v-if="isAdmin" >
                        <v-icon color="primary">delete</v-icon>
                      </v-btn>
                      <v-btn
                        class="o2_project_detail_icon edit"
                        dark 
                        icon
                        v-if="isAdmin" >
                        <v-icon color="primary">edit</v-icon>
                      </v-btn>
                  </div>
                </v-flex>
                <v-flex xs11>
                  <div class="o2_project_detail_ctn">
                    <div class="o2_project_detail_host indigo lighten-5 grey--text text--darken-2">
                      <v-layout class="o2_project_detail_host_item" wrap row v-for="item in caseItem.hostArr">
                        <v-flex class="o2_project_detail_host_ip">{{ item.ip }}</v-flex>
                        <v-flex class="o2_project_detail_host_domain">{{ item.domain }}</v-flex>
                      </v-layout>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tabs-content>
      <v-tabs-content
        id="tab-2">
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
  export default {
    data () {
      return {
        isAdmin: true,
        urlArr: [
          {
            url: '//www.jd.com/*'
          },
          {
            url: '//mtd.jd.com/index_2017/*'
          }
        ],
        items: [
          { isAdmin: true, title: 'Jason Oner', avatar: '//placeimg.com/300/300' },
          { title: 'Travis Howard', avatar: '//placeimg.com/300/300' },
          { title: 'Ali Connors', avatar: '//placeimg.com/300/300' },
          { title: 'Cindy Baker', avatar: '//placeimg.com/300/300' },
          { title: 'Travis Howard', avatar: '//placeimg.com/300/300' },
          { title: 'Ali Connors', avatar: '//placeimg.com/300/300' },
          { title: 'Cindy Baker', avatar: '//placeimg.com/300/300' },
          { title: 'Travis Howard', avatar: '//placeimg.com/300/300' },
          { title: 'Ali Connors', avatar: '//placeimg.com/300/300' },
          { title: 'Cindy Baker', avatar: '//placeimg.com/300/300' }
        ],
        caseArr: [
          {
            name: '方案名啊方案名',
            desc: '方案描述啊方案描述啊方案描述啊方案描述啊方案描述',
            hostArr: [
              { ip: '1231.342.134', domain: 'www.jd.com' },
              { ip: '1231.342.134', domain: 'www.jd.com' }
            ]
          },
          {
            name: '方案名啊方案名',
            desc: '方案描述啊方案描述啊方案描述啊方案描述啊方案描述',
            hostArr: [
              { ip: '1231.342.134', domain: 'www.jd.com' }
            ]
          },
          {
            name: '方案名啊方案名',
            desc: '方案描述啊方案描述啊方案描述啊方案描述啊方案描述',
            hostArr: [
              { ip: '1231.342.134', domain: 'www.jd.com' },
              { ip: '1231.342.134', domain: 'www.jd.com' }
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
.o2_project_detail {
  background: #fff;
  &_hd {
    height: 72px;
  }
  &_bd {
    padding: 16px;
  }
  &_main {
    padding: 0 20px
  }
  &_tit {
    position: relative;
    border-left: 3px solid #3f51b5;
    padding: 0 10px;
  }
  &_name {
    position: relative;
    z-index: 1;
  }
  &_icon {
    position: absolute;
    right: -5px;
    top: -5px;
    margin: 0;
    &.del {
      right: 30px;
    }
  }
  &_url {
    border-radius: 4px;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
  }
  &_avatar {
    display: block;
    margin: 0 auto;
    line-height: 56px;
    border: 2px solid;
    &.admin {
      border-color: #ffc107 !important;
    }
  }
  &_member {
    text-align: center;
  }
  &_item {
    position: relative;
  }
  &_idx {
    position: absolute;
    text-transform: uppercase;
    font-size: 100px;
    left: -40px;
    top: -30px;
    z-index: 0;
  }
  &_tool {
    position: relative;
    text-align: right;
  }
  &_btn {
    display: inline-block;
    margin: 0;
    &.search {
      margin-right: 10px;
    }
  }
  &_host {
    border-radius: 4px;
    padding: 20px;
    line-height: 30px;
    &_item {
      margin-bottom: 10px;
      border-bottom: 1px dashed #c5cae9;
    }
  }
}
</style>