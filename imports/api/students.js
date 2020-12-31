import { Mongo } from "meteor/mongo";
// since it's an small project,
// collection, publication and methods are
// put into one file
// for large project this should be divided into
// above directories

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import { Subjects } from "./subjects.js";

export const Students = new Mongo.Collection("students");

// publication
if (Meteor.isServer) {
  Meteor.publish("students", function studentPublication() {
    return Students.find();
  });
}

Meteor.methods({
  "students.insert"(studentData) {
    const { name, email, phone, DoB } = studentData;

    // validation
    check(name, String);
    check(email, String);
    check(phone, String);
    check(DoB, String);

    // name field is made mandatory
    // so that empty document can't be inserted
    if (name.length === 0) {
      throw new Meteor.Error("empty", "Empty name field");
    }

    Students.insert({ name, email, phone, DoB });
  },

  "students.update"(id, studentData) {
    const { name, email, phone, DoB } = studentData;
    check(name, String);
    check(email, String);
    check(phone, String);
    check(DoB, String);

    if (name.length === 0) {
      throw new Meteor.Error("empty", "Empty name field");
    }

    Students.update(id, { $set: { name, email, phone, DoB } });

    // in case user updates name
    // and since mongodb doesn't support cascade
    Subjects.update({ "student.id": id }, { $set: { "student.name": name } });
  },

  "students.remove"(id) {
    // again since mongodb doesn't support casecade
    // it has to be deleted manually
    Subjects.remove({ "student.id": id });
    Students.remove(id);
  },
});
