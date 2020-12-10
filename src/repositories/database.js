import {v4} from "uuid";

function getId() {
  return v4();
}

const student = [
  {
    id: "7753ac30-dd29-4950-8003-881a9134e1a1",
    name: "Jon",
    email: "jon@gmail.com",
  },
];
const teacher = [];
const course = [];

export { student, teacher, course, getId };
