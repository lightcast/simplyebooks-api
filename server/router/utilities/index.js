
const requiredFields = (arry, body) =>{
  for (let i = 0; i < arry.length; i++) {
    const field = arry[i];
    if (!(field in body)) {
      const message = `Missing \`${field}\` in request body`;
      return {message};
    }else if(body[field] === ''){
      const message = `${field} in request body cannot be empty`;
      return {message};
    }
  }
  return {message:null};
}



module.exports = {requiredFields};
