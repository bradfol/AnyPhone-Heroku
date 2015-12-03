

var Parse = require('parse-cloud-express').Parse;


Parse.Cloud.define("hello", function(request, response) {
  console.log('Ran cloud function.');
  // As with Parse-hosted Cloud Code, the user is available at: request.user
  // You can get the users session token with: request.user.getSessionToken()
  // Use the session token to run other Parse Query methods as that user, because
  //   the concept of a 'current' user does not fit in a Node environment.
  //   i.e.  query.find({ sessionToken: request.user.getSessionToken() })...
  response.success("Hello world! " + (request.params.a + request.params.b));
});


Parse.Cloud.beforeSave('TestObject', function(request, response) {
  console.log('Ran beforeSave on objectId: ' + request.object.id);
  response.success();
});

Parse.Cloud.afterSave('TestObject', function(request, response) {
  console.log('Ran afterSave on objectId: ' + request.object.id);
});

Parse.Cloud.beforeDelete('TestObject', function(request, response) {
  console.log('Ran beforeDelete on objectId: ' + request.object.id);
  response.success();
});

Parse.Cloud.afterDelete('TestObject', function(request, response) {
  console.log('Ran afterDelete on objectId: ' + request.object.id);
});

