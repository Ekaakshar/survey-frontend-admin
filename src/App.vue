<template>
    <v-app>
      <div v-if="loggedIn">
      <v-app-bar  >
            <v-img
                class="mx-2"
                :src="logo"
                max-height="40"
                max-width="40"
                contain
            ></v-img>
            <v-app-bar-title  >Survey</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn 
                    variant="text"
                    @click="goList"
                    >
                  List
                </v-btn>
                <v-btn 
                    variant="text"
                    @click="goAdd"
                    >
                  Add
                </v-btn>
            </v-toolbar-items>
      </v-app-bar>
      </div>
      <v-main >
        <v-container>
          <router-view />
        </v-container>
      </v-main>  
    </v-app>
</template>

<script>
import logo from './assets/oc-logo-white.png'
export default {
  name: 'App',

  data: () => ({
    logo,
    loggedIn:localStorage.getItem('session_token'),
  }),
  methods: {
    goAdd() {
      this.$router.push({ name: 'add' });
    },
    goList() {
      this.$router.push({ name: 'tutorials' });
    }
  },

}

</script>

