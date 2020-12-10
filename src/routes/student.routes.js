import { Router } from "express";
import { students, getId } from "../repositories/database";
import hasEmail from "../services/hasEmail";
import validatorFields from "../services/validatorFields";

const studentRouter = Router();

studentRouter.get("/", (request, response) => {
  return response.status(200).json(students);
});

studentRouter.get("/:email", (request, response) => {
  const { email } = request.params;
  const student = hasEmail(students, email);

  if (!student) {
    return response.status(204).json();
  }

  return response.status(200).json(student);
});

studentRouter.post("/", (request, response) => {
  const { name, email } = request.body;
  let required = ["name", "email"];

  const isValid = validatorFields(required, request.body);

  if (isValid.length) {
    return response.status(400).json(isValid);
  }

  if (!!hasEmail(students, email)) {
    return response.status(409).json({
      type: "error",
      message: "This email already exists",
    });
  }

  const newStudent = {
    id: getId(),
    name,
    email,
  };

  students.push(newStudent);

  return response.status(201).json(newStudent);
});

studentRouter.put("/:email", (request, response) => {
  const { name, email } = request.body;
  let required = ["name", "email"];

  const studentFound = hasEmail(students, request.params.email);

  if (!studentFound) {
    return response.status(400).json({
      type: 'error',
      message: 'The student is not found'
    });
  }

  const isValid = validatorFields(required, request.body);

  if (isValid.length) {
    return response.status(400).json(isValid);
  }

  const newStudents = students.filter((student) => student !== studentFound);

  newStudents.push({ id: studentFound.id, name, email });

  students = newStudents;

  return response.status(200).json({ id: studentFound.id, name, email });
});

studentRouter.patch("/:email", (request, response) => {
  const { name, email } = request.body;

  const studentFound = hasEmail(students, request.params.email);

  if (!studentFound) {
    return response.status(400).json({
      type: 'error',
      message: 'The student is not found'
    });
  }

  const newStudents = students.filter((student) => student !== studentFound);

  const studentUpdated = {
    id: studentFound.id, 
    name: name || studentFound.name, 
    email: email || studentFound.email
  }

  newStudents.push(studentUpdated);

  students = newStudents;

  return response.status(200).json(studentUpdated);
});

studentRouter.delete("/:email", (request, response) => {
  const studentFound = hasEmail(students, request.params.email);

  if (!studentFound) {
    return response.status(400).json({
      type: 'error',
      message: 'The student is not found'
    });
  }

  const newStudents = students.filter((student) => student !== studentFound);

  students = newStudents;

  return response.status(200).json();
});

export default studentRouter;
