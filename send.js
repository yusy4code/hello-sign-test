const hellosign = require('hellosign-sdk')({ key: '0d1a4defdbf9fa4d194578a92fb028249ea80ec3b427fb6d02f8f9f2a4b3eb86' });

exports.getSignURL = () => {

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
  files: ['Tip_V2.pdf']
};

hellosign.signatureRequest.createEmbedded(opts)
    .then(function(response){
	//console.log(response);
        var signatureId = response.signature_request.signatures[0].signature_id;
        const sId = hellosign.embedded.getSignUrl(signatureId); 
	return sId;
    })
    .then(function(response){
	console.log('URL = ' + response.embedded.sign_url);
	//console.log(response)
	return response.embedded.sign_url;
    })
    .catch(function(err){
        //catch error
	console.log(err)
	return err
    });

}

