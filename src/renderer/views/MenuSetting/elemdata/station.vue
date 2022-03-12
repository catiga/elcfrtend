<template>
  <!-- <v-layout>
  </v-layout> -->
  <div class="station-container">
    <v-tabs v-model="tab" vertical center-active color="light-green darken-1">
      <v-tab v-for="item in items" :key="item.id" :to="item.router">{{
        item.name
      }}</v-tab>
    </v-tabs>
    <div class="station-router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data: function () {
    return {
      tab: null,
      items: [
        {
          id: 1,
          name: "母线",
          router: "/menuSetting/ms/elemdata/station/moline",
        },
        {
          id: 2,
          name: "交流线",
          router: "/menuSetting/ms/elemdata/station/acline",
        },
        {
          id: 3,
          name: "两绕组变压器",
          router: "/menuSetting/ms/elemdata/station/_2transformer",
        },
        {
          id: 4,
          name: "三绕组变压器",
          router: "/menuSetting/ms/elemdata/station/_3transformer",
        },
        {
          id: 5,
          name: "发电机",
          router: "/menuSetting/ms/elemdata/station/dynamo",
        },
        {
          id: 6,
          name: "负荷",
          router: "/menuSetting/ms/elemdata/station/load",
        },
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
<style scoped>
.station-container {
  flex: 1;
  align-self: flex-start;
}
</style>
