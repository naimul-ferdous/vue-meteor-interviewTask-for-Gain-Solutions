// since it's an small project,
// collection, publication and methods are
// put into one file
// for large project this should be divided into
// above directories

import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

// collection
export const Subjects = new Mongo.Collection("subjects");

// publication
if (Meteor.isServer) {
  Meteor.publish("subjects", function subjectPublication() {
    return Subjects.find();
  });
}

Meteor.methods({
  "subjects.insert"(subjectData, studentId, studentName) {
    let subjectArray = [];

    // convert the subject string into array
    // expected data from client --> subjectData = "Math, Physics, Chemistry"
    // after conversion --> subjectArray = ["Math", "Physics", "Chemistry"]
    subjectData.split(",").map((sub) => subjectArray.push(sub.trim()));

    // check if subject doc for this user does exist
    const docExist = Subjects.findOne({
      "student.id": studentId,
    });

    // update or insert conditionaly
    if (docExist) {
      Subjects.update({ _id: docExist._id }, { $set: { subs: subjectArray } });
    } else {
      Subjects.insert({
        subs: subjectArray,
        student: {
          id: studentId,
          name: studentName,
        },
      });
    }
  },

  "subjects.find"(id) {
    return Subjects.findOne({
      "student.id": id,
    });
  },
});
