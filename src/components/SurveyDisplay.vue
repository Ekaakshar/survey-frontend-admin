<template>
<v-row>
  <v-col  cols="9"
        sm="4">
      <span >{{ survey.name }}</span>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <span> {{ survey.duration }}</span>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-content-copy" @click="copySurvey"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-eye" @click="viewSurvey"/>
  </v-col>
   <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateSurvey"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteSurvey"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    survey: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteSurvey() {
      this.$emit("deleteSurvey");
    },
    updateSurvey() {
      this.$emit("updateSurvey");
    },
    viewSurvey() {
      this.$emit("viewSurvey");
    },
    copySurvey() {
      this.$emit("copySurvey");
    }
  }
};
</script>

<style></style>
