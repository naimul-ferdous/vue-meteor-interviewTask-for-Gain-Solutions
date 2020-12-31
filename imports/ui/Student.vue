<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 my-5">
        <div class="d-flex justify-content-between mb-2">
          <h4>Students</h4>

          <button class="btn btn-primary" @click="showAddStudentForm">
            Add Student
          </button>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Subjects</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <StudentItem
              v-bind:key="student._id"
              v-bind:student="student"
              v-for="student in students"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// load components
import StudentItem from "./StudentItem.vue";
import AddStudentModal from "./AddStudentModal.vue";

export default {
  props: ["students"],

  components: {
    StudentItem,
    AddStudentModal,
  },

  methods: {
    showAddStudentForm() {
      this.$modal.show(
        AddStudentModal,
        { student: { name: null, email: null, phone: null, DoB: null } },
        {
          draggable: true,
          height: "auto",
        }
      );
    },
  },
};
</script>
