<template>
  <v-form class="o2_project_form o2_project_form_member" ref="member_form">
    <v-layout row>
      <v-flex xs2>
        <v-subheader class="o2_project_form_tit">项目成员</v-subheader>
      </v-flex>
      <v-flex xs10>
        <v-select
          label="Async items"
          autocomplete
          :loading="member.loading"
          single-line
          multiple
          cache-items
          chips
          :items="member.items"
          :search-input.sync="member.search"
          v-model="member.select" >
          <template slot="selection" slot-scope="data">
            <v-chip
              @input="data.parent.selectItem(data.item)"
              class="chip--select-multi"
              :selected="data.selected"
              :disabled="data.disabled"
              :key="JSON.stringify(data.item)">
              <v-avatar class="accent">{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  export default {
    data () {
      return {
        member: {
          loading: false,
          items: [],
          search: null,
          select: [],
          states: [
            'Alabama',
            'Alaska',
            'American Samoa',
            'Arizona',
            'Arkansas'
          ]
        }
      }
    },
    watch: {
      search (val) {
        val && this.querySelections(val)
      }
    },
    methods: {
      querySelections (v) {
        this.member.loading = true
        setTimeout(() => {
          this.member.items = this.member.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.member.loading = false
        }, 500)
      }
    }
  }
</script>
