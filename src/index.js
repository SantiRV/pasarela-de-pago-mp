const express = require('express');
const app = express();
const bodyParser = require('body-parser')

//SDK mercadopago
const mercadopago = require('mercadopago');

//middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))// Esto sirve para poder tomar la respuesta de mercadopago

//Agregar credenciales
mercadopago.configure({
    access_token: "" //Aca va el acces tokn del  cliente
})

//routes
app.post('/checkout', (req, res) => {
    // Crea un objeto de preferencia
let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      },
    ],
  };
  
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    
    res.redirect(response.body.init_point)
    })
    .catch(function (error) {
      console.log(error);
    });
})


//servidor 
app.listen(3000, () => {
    console.log('Server listen on port 3000')
})