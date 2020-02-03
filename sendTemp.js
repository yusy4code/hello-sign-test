const hellosign = require('hellosign-sdk')({ key: '0d1a4defdbf9fa4d194578a92fb028249ea80ec3b427fb6d02f8f9f2a4b3eb86' });

const opts = {
  test_mode: 1,
  clientId: '622ea1732196de754ff4ae9b7f77ca01',
  template_id: '1044372cf3e87a7e19abf2a9c98a754417c9f556',
  subject: 'Sample Reciept',
  message: 'Please sign this sample Receipt',
  signers: [
    {
      email_address: 'yusuy4code@gmail.com',
      name: 'Yusuf',
      role: 'Travel Lead'
    }
  ] 
};

hellosign.signatureRequest.createEmbeddedWithTemplate(opts)
    .then(function(response){
        //console.log(response);
        var signatureId = response.signature_request.signatures[0].signature_id;
        const sId = hellosign.embedded.getSignUrl(signatureId); 
        return sId;
    })
    .then(function(response){
        console.log('URL = ' + response.embedded.sign_url);
        //console.log(response)
    })
    .catch(function(err){
        //catch error
        console.log(err)
    });
