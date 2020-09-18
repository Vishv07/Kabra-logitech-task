const { axios} = require("axios");

axios.post('http://localhost:3001/api/signup',{
    "name":"Vishv",
    "email":"krishnakakadiya9@gmail.com"
})
  .then(response => response.json())
  .then(data => console.log(data));