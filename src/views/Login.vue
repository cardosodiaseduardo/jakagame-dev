<template>
  <v-container>
    

    <h2>Faça seu login</h2>

    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Item</div>
        </template>
        <v-card>
          <v-card-text class="grey lighten-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- após o login, redirecionar o player pro Logged -->
    <router-link class="routeToLink" to="/Logged">
      <v-btn class="routeToLink">
        Jogar
      </v-btn>
    </router-link>

    <!-- <AdsCard /> -->
    
  </v-container>
</template>

<script>
// import AdsCard from '@/components/AdsCard'

export default {

  // components: {
  //   AdsCard
  // },

  data: () => ({
    valid: false
  })
};
</script>

<style>

.menuClasseLinks {
  text-decoration: none;
  font-size: 11pt;
  color: red;  
}

.routeToLink {
  text-decoration: none;
  font-size: 18pt;
  color: red;  
}

</style>