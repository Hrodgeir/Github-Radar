<template>
    <div class="col">
      <div class="card">
        <div class="card-header">
          <span> <button class="closebtn" @click="$emit('removeRepo')"> <icon scale="1.25" name="close"></icon> </button> </span>
          <span :style="healthStyle" class="health float-left"> <icon style="margin-right: 5px" scale="1.25" name="heartbeat"></icon>{{ community.health_percentage }} %</span>
          <span class="name"> {{ repo.full_name }} </span>
          <span v-if="current" class="other card-subtitle mb-2 text-muted"> {{ current.name }}  </span>
          <span class="stars float-right"> {{ repo.stargazers_count }} <icon name="star"></icon> </span>
          <div>
            <span class="description"> {{ repo.description }} </span>
          </div>
        </div>
        <div class="card-body">
          <CommitGraph :repo="repo"/>
          <IssueGraph :repo="repo"/>
          <div class="row">
            <div class="col-6">
              <span class="name"> <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" style="width: 60px; height: 60px;"><img> Repository Metrics </span>
              <Badges class="row-3" :repo="repo"/>
              <CommunityFiles class="row-3" :files="community.files"/>
              <Referers class="row-3" :repo="repo"/>
            </div>
            <StackOverflow class="col-6" :repo="repo"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import github from 'octonode'
import request from 'request'
import CommitGraph from './CommitGraph'
import IssueGraph from './IssueGraph'
import CommunityFiles from './CommunityFiles'
import Badges from './Badges'
import Referers from './Referers'
import StackOverflow from './StackOverflow'

export default {
  name: 'RepoCard',
  components: {
    CommitGraph,
    CommunityFiles,
    Badges,
    IssueGraph,
    Referers,
    StackOverflow
  },

  props: {
    repo: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  data () {
    return {
      community: {},
      tags: {},
      current: {}
    }
  },

  created () {
    this.initGithub()
  },

  computed: {
    healthStyle () {
      if (this.community.health_percentage <= 33) {
        return {color: 'red'}
      } else if (this.community.health_percentage <= 66) {
        return {color: 'orange'}
      }
      return {color: 'green'}
    }
  },

  methods: {
    initGithub () {
      this.client = github.client()
      this.ghrepo = this.client.repo(this.repo.full_name)
      this.getTags()
      this.getCommunity()
    },

    getTags () {
      this.ghrepo.tags((err, data, headers) => {
        this.tags = data
        if (this.tags.length > 0) {
          this.current = this.tags[0]
        }
      })
    },

    getCommunity () {
      let uri = 'https://api.github.com/repos/' + this.repo.full_name + '/community/profile'
      let headers = {'Accept': 'application/vnd.github.black-panther-preview+json'}
      let req = {uri: uri, headers: headers, json: true}

      request(req, (err, res, body) => {
        this.community = body
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.health {
  font-size: 30px;
  color: green;
}
.name {
  font-size: 30px;
}
.stars {
  font-size: 20px;
}
.description {
  font-size: 15px;
}
.closebtn {
  background-color: red;
  border: none;
  border-radius: 5px; 
  outline: none;
  color: white;
  padding: 3px 5px;
  font-size: 2px;
  cursor: pointer;
  margin-right: 5px;
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
