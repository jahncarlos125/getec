export default (db, email) => {
  const result = db.find(student => student.email === email);
  
  return result;
}