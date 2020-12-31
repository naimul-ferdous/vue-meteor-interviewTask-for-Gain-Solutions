<template>
  <div>
    <h2 class="display-3 text-center bg-light mt-3">
      Student Portal
    </h2>

    <Student v-bind:students="students" />
    <Subject v-bind:subjects="subjects" />
  </div>
</template>

<script>
// load modules
import { Meteor } from "meteor/meteor";

// load components
import Student from "./Student.vue";
import Subject from "./Subject.vue";

// load backend api
import { Students } from "../api/students.js";
import { Subjects } from "../api/subjects.js";

export default {
  name: "App",
  components: {
    Student,
    Subject,
  },

  data() {
    return {};
  },

  meteor: {
    $subscribe: {
      students: [],
      subjects: [],
    },
    students() {
      return Students.find({}).fetch();
    },

    subjects() {
      return Subjects.find({}).fetch();
    },
  },
};
</script>
