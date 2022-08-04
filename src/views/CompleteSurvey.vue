<template>
    <h1 style="text-align:center;">{{survey.name}}</h1>
    <p style="text-align:center;">{{survey.description}}</p>
    <h3 style="text-align:center;">Complete {{survey.duration}}</h3>
    <h4>{{ message }}</h4>
    <v-form>
        <div class="test-survey-builder">
    <QuestionsView :questions="questionsList" :readOnly="false" />
    <div v-if="addQuestion">
      <SurveyBuilder :options="sampleQuestion" />
    </div>
  </div>
        
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveSurvey()"
                    >Save</v-btn
                >
            </v-col>
            <v-col col="2">
                <v-btn color="info" @click="cancel()">Cancel</v-btn>
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
</template>
<script>
import SurveyBuilder from './SurveyBuilder.vue';
import QuestionsView from './QuestionsView.vue';
import SurveyDataService from "../services/SurveyDataService";
export default {
  name: "edit-survey",
  props: ['id'],
  data() {
    return {
      survey: {},      
      questionsList: [],
      addQuestion: false,
      message: "Select data and click save"
    };
  },
  components: { SurveyBuilder, QuestionsView },
  methods: {
    retrieveSurvey() {
      SurveyDataService.get(this.id)
        .then(response => {
          this.survey= response.data;
          console.log(JSON.parse(this.survey.content));
          this.questionsList = JSON.parse(this.survey.content);
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    saveSurvey() {
      /*var data = {
        name: this.survey.name,
        description: this.survey.description,
        duration: this.survey.duration,
        content: JSON.stringify(this.questionsList),        

      };
      SurveyDataService.update(this.id,data)
        .then(response => {
          this.survey.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'surveys' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });*/
        console.log(this.questionsList);
    },
    cancel(){
        this.$router.push({ name: 'surveys' });
    },
  },
    mounted() {
    this.retrieveSurvey();
    this.emitter.on('add-update-question', q => {
      this.updateQuestionsList(q);
    });
  }
}

</script>
<style>

</style>