<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h4>Subjects</h4>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Students</th>
            </tr>
          </thead>
          <tbody>
            {{
              convertSubjectToObject
            }}

            <tr v-for="(subTitle, idx) in subTitles" v-bind:key="idx">
              <td>{{ subTitle }}</td>
              <td>{{ obj[subTitle].join(", ") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["subjects"],

  data() {
    return {
      subTitles: [],
      obj: {},
    };
  },

  computed: {
    convertSubjectToObject() {
      const obj = {};

      // setting subjects as  object key

      // map each doc in subjects collection
      this.subjects.map((doc) => {
        // iterate through subject array of each document
        doc.subs.forEach((sub) => {
          // omit empty submissions
          if (sub !== "") {
            obj[sub] = [];
          }
        });
      });

      /*
        obj after passed through above code block
        obj = {
          "Subject1": [],
          "Subject2": [],
          "Subject3": [],
        }
      */

      // putting students into array field
      this.subjects.map((doc) => {
        doc.subs.forEach((sub) => {
          if (sub !== "") {
            obj[sub].push(doc.student.name);
          }
        });
      });

      /*
        obj after passed through above code block
        obj = {
          "Subject1": ["John", "Jane"],
          "Subject2": ["John"],
          "Subject3": ["John", "Tom"]
        }
      */

      // putting all subjects into one array as key
      this.subTitles = Object.keys(obj);

      // setting obj state after final formation of obj
      this.obj = obj;
    },
  },
};
</script>
