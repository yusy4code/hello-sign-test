const express = require('express')
const hellosign = require('hellosign-sdk')({ key: '0d1a4defdbf9fa4d194578a92fb028249ea80ec3b427fb6d02f8f9f2a4b3eb86' });

const app = express()
app.set("view engine", "ejs")

app.get('/', (req, res) => {
	res.render("sign")
});

app.get('/getTemplateURL', (req, res) => {
const opts = {
  test_mode: 1,
  clientId: '622ea1732196de754ff4ae9b7f77ca01',
  template_id: '1044372cf3e87a7e19abf2a9c98a754417c9f556',
  subject: 'Sample Receipt using Template',
  message: 'Please sign this sample Receipt',
  signers: [
    {
      email_address: 'yusuf@test.com',
      name: 'Yusuf',
      role: 'Travel Lead'
    }
  ],
};

hellosign.signatureRequest.createEmbeddedWithTemplate(opts)
    .then(function(response){
        //console.log(response);
        var signatureId = response.signature_request.signatures[0].signature_id;
        const sId = hellosign.embedded.getSignUrl(signatureId); 
        return sId;
    })
    .then(function(response){
        const url = response.embedded.sign_url;
        console.log('URL = ' + url);
        //console.log(response)
        res.json({"url":url})
    })
    .catch(function(err){
        //catch error
        console.log(err)
        res.send(err)
    });

})

app.get('/getURL', (req, res) => {
const opts = {
  test_mode: 1,
  clientId: '622ea1732196de754ff4ae9b7f77ca01',
  subject: 'Sample Reciept',
  message: 'Please sign this sample Receipt',
  signers: [
    {
      email_address: 'yusuf@test.com',
      name: 'Yusuf'
    }
  ],
  files: ['TipCashPayout.pdf']
};

hellosign.signatureRequest.createEmbedded(opts)
    .then(function(response){
        //console.log(response);
        var signatureId = response.signature_request.signatures[0].signature_id;
        const sId = hellosign.embedded.getSignUrl(signatureId); 
        return sId;
    })
    .then(function(response){
        const url = response.embedded.sign_url;
	console.log('URL = ' + url);
        //console.log(response)
        res.json({"url":url})
    })
    .catch(function(err){
        //catch error
        console.log(err)
        res.send(err)
    });

})

app.post('/post', (req, res) => {
	console.log('Received POST from  some where');
	res.json({"success":true, "message":"Hello API Event Received"})
})

app.listen(80, () => console.log('server started at port 80'))
