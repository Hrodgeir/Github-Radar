<template>
  <div>
    <ul class="list-group">
      <span class="stackoverflow"> <img src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.svg?v=6f4af2d2d158" style="width: 60px; height: 60px;"><img> Stack Overflow</span>
      <li v-for="(question, index) in questions" class="list-group-item text-left">
        <span v-if="index < 8">
          <span v-if="question.is_answered">
            <a class="answered font-weight-bold" :href="question.link"><icon name="check" class="checkmark"></icon> {{ formatName(question.title) }} </a>
          </span>
          <span v-else>
            <a class="unanswered font-weight-bold" :href="question.link"><icon name="times" class="cross"></icon> {{ formatName(question.title) }} </a>
          </span>
        </span>
      </li>
      <li v-if="questions.length == 0" class="list-group-item text-left">
        <span>No relevant questions</span>
      </li>
    </ul>
  </div>
</template>

<script>

import github from 'octonode';
import request from 'request';
import moment from 'moment';

export default {
  name : 'StackOverflow',
  props: {
      repo: {
          type: Object,
          required: true,
          default: () => ({})
      }
  },
  data (){
      return {
        questions: []
      }
  },
  created(){
      this.initGithub()
      this.initStackOverflow()
  },
  methods: {
      initGithub () {
        this.client = github.client()
        this.ghrepo = this.client.repo(this.repo.full_name)
      },

      initStackOverflow () {
        
        let uri = 'https://api.stackexchange.com/search?order=desc&sort=activity&site=stackoverflow&intitle=' + this.repo.full_name
        let headers = {'Accept': 'application/json'}
        let req = {uri: uri, headers: headers, json: true}

        request(req, (err, res, body) => {
            this.questions = body.items
        })
      },

      formatName (name) {
        return name.replace(/&quot;/g, '\"').replace(/&#39;/g, '\'')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item{
  padding: 5px;
  border: 0px;
}

.stackoverflow{
  font-size: 30px;
  text-align: center;
}

.answered{
  color: #F48024;
}

.unanswered{
  color: #2c3e50;
}

p{
  margin-bottom: 2px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 2px;
}

</style>