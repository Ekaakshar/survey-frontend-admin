<template>    
        
    <h1>Completed Surveys</h1>
      <v-row>
        <v-col  cols="9"
              sm="4">
            <span class="text-h6">Name</span>
        </v-col>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Submitted By</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Duration</span>
        </v-col>
        <v-col  cols="9"
              sm="3">
            <span class="text-h6">Completed on</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">View</span>
        </v-col>
      </v-row>
    <CompletedSurveyDisplay
        v-for="survey in completedsurveys"
        :key="survey.id"
        :survey="survey"
        @viewSurvey="viewSurvey(survey)"
    />
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";
import CompletedSurveyDisplay from '@/components/CompletedSurveyDisplay.vue';
export default {
  name: "surveys-list",
  props: ['id'],
  data() {
    return {
      completedsurveys:[],
      currentSurvey: null,
      currentIndex: -1,
      email: "",
      message : "Create, Search, Edit or Delete Surveys"
    };
  },
  components: {
        CompletedSurveyDisplay
    },
  methods: {
    goDashboard() {
      this.$router.push({ name: 'home'});
    },
    viewSurvey(survey) {
      this.$router.push({ name: 'surveyview', params: { id: survey.id } });
    },
    retrieveSurveys() {
      SurveyDataService.getAllCompleted(this.id)
        .then(response => {
          this.completedsurveys = response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
        
    },
    refreshList() {
      this.retrieveSurveys();
      this.currentSurvey = null;
      this.currentIndex = -1;
    },
    setActiveSurvey(survey, index) {
      this.currentSurvey = survey;
      this.currentIndex = survey ? index : -1;
    },
    removeAllSurveys() {
      SurveyDataService.deleteAll()
        .then(response => {
          //console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchEmail() {
      SurveyDataService.findByEmail(this.email)
        .then(response => {
          this.surveys = response.data;
          this.setActiveSurvey(null);
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveSurveys();
  }
};
</script>
<style>

</style>