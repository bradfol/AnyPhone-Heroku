## Migrating your Cloud Code to Heroku

Take your existing cloud code files and place them in the `cloud/` folder.  Add the following line at the very top of each file:

```
var Parse = require('parse-cloud-express').Parse;
```

Set up the necessary details in your Heroku config and deploy:

```
heroku config:set HOOKS_URL=yourherokuurl
heroku config:set PARSE_APP_ID=yourappid
heroku config:set PARSE_MASTER_KEY=yourmasterkey
heroku config:set PARSE_WEBHOOK_KEY=yourkeyhere

git push heroku master
```

A post-install script (`scripts/register-webhooks.js`) will enumerate your webhooks and register them with Parse.

### Caveats

Cloud Code required you to use `cloud/` as a prefix for all other .js files, even though they were in the same folder.  That doesn't apply here, so you'll need to update any require statements in files under `cloud/` to reference just `./` instead.

The first-party modules hosted by Parse will not be available (sendgrid, mailgun, stripe, image, etc.) and you'll need to update your code to use the official modules available via npm.

The base mount path is set in both `server.js` and `scripts/register-webhooks.js` and must be equal.

