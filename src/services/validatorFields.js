export default (fields, body) => {
  const bodyResponse = [];

  fields.forEach((field) => {
    if(!body[field]) bodyResponse.push({
      type: 'error',
      message: `The field ${field} is required!`
    });
  })

  return bodyResponse;
}