<template>
    <h1 style="text-align:center;">{{survey.name}}</h1>
    <p style="text-align:center;">{{survey.description}}</p>
    <h3 style="text-align:center;">Complete in {{survey.duration}}</h3>
    <h4>{{ message }}</h4>
    <v-form>
      <div id="divToPrint">
        <div class="hidden"><h1 style="text-align:center;">{{survey.name}}</h1>
    <p style="text-align:center;">{{survey.description}}</p>
    <h3 style="text-align:center;">Completed in {{survey.duration}}</h3>
    </div>
    <div class="survey">
          <div v-for="(question, index) in questionsList" :key="index">
      <div class="card read-only-question cursor_grab">
        <div class="row">
          <div class="p-0">
              <label :for="question.id" class="question_body">Q{{ index + 1 }}: {{question.body}}</label>
            <div v-if="question.type === 'BOOLEAN'">
            <span class="hidden" style="border:1px solid #000000; background-color:#cccccc;">Answer : {{question.answer}}</span>
                <div class="" v-for='(option, index) in question.options' :key="index">
                  <p class="radio-option">
                     <label>
                    <input disabled type="radio" :value="option.body" :name="question.id" v-model="question.answer">
                   {{option.body}}</label>
                  </p>
                </div>
              </div>
              <div class="option-section" v-if="question.type === 'DATE'">
                  <span class="hidden" style="border:1px solid #000000; background-color:#cccccc;">Answer : {{question.answer}}</span>
                  <input disabled type="date" class="input-text " placeholder="" :name="question.id" :value="question.answer" >
              </div>
              <div class="option-section" v-if="question.type === 'TIME'">
              <span class="hidden" style="border:1px solid #000000; background-color:#cccccc;">Answer : {{question.answer}}</span>
                  <input disabled type="time" class="input-text " placeholder="" :name="question.id" v-model="question.answer" >
              </div>
              <div class="option-section" v-if="question.type === 'NUMBER'">
              <span class="hidden" style="border:1px solid #000000; background-color:#cccccc;">Answer : {{question.answer}}</span>
                <div class="">
                  <input disabled type="number" class="input-text  width-100" v-model="question.answer" :min="question.minValue" :max="question.maxValue">
                  <span v-if="question.hasUnits">{{question.units}}</span>
                </div>
              </div>
              <div class="option-section" v-if="question.type === 'SINGLE_CHOICE'">
              <span class="hidden" style="border:1px solid #000000; background-color:#cccccc;">Answer : {{question.answer}}</span>
                <div v-for='(option, index) in question.options' :key="index">
                  <label>
                    <input disabled type="radio" :value="option.body" :name="question.id" v-model="question.answer">&nbsp;{{option.body}}
                  </label>
                  <div class="" v-if="option.imageUrl">
                    <img :src="option.imageUrl" alt="" class="">
                  </div>
                </div>
              </div>
              <div class="option-section" v-if="question.type === 'MULTI_CHOICE'">
                <div v-for='(option, index) in question.options' :key="index">
                  <label>
                    <input disabled type="checkbox" :id="question.id + option.sequence" :value="option.body" :name="question.id + '[]'" v-model="option.answer">&nbsp;{{option.body}}
                  </label>
                </div>
              </div>
            
              <div v-if="question.type === 'TEXT'">
              <span class="hidden" style="border:1px solid #000000; background-color:#cccccc;">Answer : {{question.answer}}</span>
                    <textarea class="form-control" type="text" :name="question.id" v-model="question.answer"></textarea>                  
              </div>            
          </div>
        </div>
      </div>
    </div>
  </div>
        
    </div>
        <v-row justify="center">
            <v-col col="2"> <v-btn color="success" @click="printSurvey()"
                    >Print</v-btn
                ></v-col>
            <v-col col="2">
                <v-btn color="success" @click="downloadSurvey()"
                    >Download Pdf</v-btn
                >
            </v-col>
            <v-col col="2">
                <v-btn color="info" @click="cancel()">Back</v-btn>
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
</template>
<script>
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import SurveyDataService from "../services/SurveyDataService";
export default {
  name: "edit-survey",
  props: ['id'],
  data() {
    return {
      survey: {},      
      questionsList: [],
      message: "Select data and click save",
      user:user,
    };
  },
  methods: {
    retrieveSurvey() {
      SurveyDataService.getCompleted(this.id)
        .then(response => {
          this.survey= response.data;
         // console.log(JSON.parse(this.survey.content));
          this.questionsList = JSON.parse(this.survey.content);
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },
    printSurvey(){
      window.print();
    },
    downloadSurvey() {
      const pdfTable = document.getElementById('divToPrint');
          //html to pdf format
          var html = htmlToPdfmake(pdfTable.innerHTML);
        
          const documentDefinition = { content: html };
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          pdfMake.createPdf(documentDefinition).open();
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
<style scoped lang="scss">
$color-primary: #f8f8f8;
$color-secondary: #eaf0f4;
$color-blue: #4c8ce4;
$color-orange: #ff9635;
$color-red: #f06559;
$color-green: #48bf7a;
h1,
h2,
h3 {
  font-weight: 200;
}
.wid300 {
  max-width: 300px !important;
}
.img-style {
  padding-top: 20px;
  height: 300px;
  width: 500px;
  padding-bottom: 20px;
}

.question_body {
  word-break: break-all;
  color: #555;
}

.read-only-question {
  background-color: #fafafa;
}

.icon-style {
  color: #57dd7a;
  font-size: 25px;
  padding-top: 20px;
  background-color: #d6f0de;
  padding: 7px;
  padding-bottom: 3px;
  border-radius: 25px;
}

.font-style {
  color: #57dd7a;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 30px;
}

.font-style {
  color: #57dd7a;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 30px;
}

.text-style {
  color: #969090;
  text-align: right;
}

.btn-style {
  margin-top: 10px;
  width: 80px;
  height: 29px;
  margin-bottom: 50px;
}
button {
  cursor: pointer;
}

.custom-btn {
  background: #00baf9;
  color: #fff;
  width: 220px;
}

.pad-top50 {
  padding-top: 50px;
}

.form-control {
  border-radius: 2px;
}

.custom-para {
  padding-bottom: 20px;
  font-size: 20px;
}

.mar-bot20 {
  margin-bottom: 20px;
}

.error-style {
  font-size: 12px;
  color: #ff4848;
  padding-bottom: 5px;
}

.btn-disabled {
  color: white;
  background-color: #c6c2c2;
  border: #c6c2c2;
}

.text-color {
  color: #888;
}

.survey-name {
  color: #00baf9;
  font-size: 20px;
}

.pad-left50 {
  padding-left: 50px;
}
.branching_section {
  background-color: #f5f8fa;
  border: solid 1px #d3dfe4;
  padding: 5px 10px;
  .branching_image {
    max-width: 120px;
    max-height: 120px;
    width: 100%;
    border: 1px solid #ccc;
  }
}
.hidden{
  display: none;
}
.custom-btn-bg {
  background: linear-gradient(to left, #4b6fe6, #00baf9);
  color: #fff;
}

.mar-bot20 {
  margin-bottom: 20px;
}

.pad-left100 {
  padding-left: 100px;
}

.mar-bot0 {
  margin-bottom: 0px !important;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 12px;
  margin-bottom: 12px;
}

.question_color,
input {
  color: #555;
  font-size: 16px;
}
p {
  margin: 8px 0;
}
.radio-option {
  margin: 0px;
}

.input-text {
  width: 100%;
  border-radius: 2px;
  outline: none;
  border: 1px solid #ccc;
  height: 35px;
  text-indent: 10px;
}

.DATE-input {
  border-radius: 20px;
  outline: none;
  border: 1px solid #ccc;
  height: 35px;
  text-indent: 10px;
}

.pad-top20 {
  padding-top: 20px;
}

.vertical-vue-slider {
  height: 300px !important;
  width: 4px;
  padding: 11px;
  margin-left: 30px;
}

.horizontal-vue-slider {
  height: 8px;
  width: 100%;
}

.img-size {
  width: 100%;
  height: auto;
  float: none;
  padding: 10px 0 0;
  max-width: 120px;
  max-height: 120px;
}

label {
  font-weight: normal !important;
  word-break: break-all;
  color: #555;
}

.modal-dialog {
  width: 500px !important;
}
.width-90 {
  width: 90% !important;
}
.sb-btn-link {
  border: none;
  background: none;
  padding: 5px;
  color: #f06559;
  font-size: 14px;
  margin-top: 16px;
}
.color-blue {
  color: $color-blue;
}
.color-orange {
  color: $color-orange;
}
.color-red {
  color: $color-red;
}
.color-green {
  color: $color-green;
}
.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}
</style>