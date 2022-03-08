<template>
  <v-layout>
    <v-tabs v-model="tab" vertical center-active color="light-green darken-1">
      <v-tab v-for="item in items" :key="item.id" :to="item.router">{{ item.name }}</v-tab>
      
      <router-view></router-view>
      
    </v-tabs>
  </v-layout>
</template>

<script>
export default {
  components: {},

  data: function () {
    return {
      tab: null,
      items: [
          {id:1, name:'厂站', router:'/menuSetting/ms/elemdata/station/station_stat'}, 
          {id:2, name:'母线', router:'/menuSetting/ms/elemdata/station/station_stat'}, 
          {id:3, name:'交流线', router:'/menuSetting/ms/elemdata/station/station_stat'}, 
          {id:4, name:'并联电容/电抗器', router:'/menuSetting/ms/elemdata/station/station_stat'}, 
          {id:5, name:'变压器', router:'/menuSetting/ms/elemdata/station/station_stat'}, 
          {id:6, name:'负荷', router:'/menuSetting/ms/elemdata/station/station_stat'}, 
    ],
      texts: [
        "checkcheckcheck",
        "savesavesave",
        "savesavesave",
        "savesavesave",
        "savesavesave",
        "savesavesave",
      ],
    };
  },

  methods: {
    getImgUrl: function (path) {
      return require("@/assets/" + path);
    },
  },
};
</script>