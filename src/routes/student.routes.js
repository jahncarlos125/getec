import { Router } from "express";
import { student, getId} from "../repositories/database";
import validatorFields from '../services/validatorFields'

const studentRouter = Router();

studentRouter.get("/", (request, response) => {
  return response.status(200).json(student);
});

studentRouter.post("/", (request, response) => {
  const { name, email } = request.body;
  let required = ['name', 'email'];

  const isValid = validatorFields(required, request.body);

  if (isValid.length){
    return response.status(400).json(isValid);
  }

  const newStudent = {
    id: getId(),
    name,
    email 
  }

  student.push(newStudent);

  return response.status(201).json(newStudent);
});

export default studentRouter;
