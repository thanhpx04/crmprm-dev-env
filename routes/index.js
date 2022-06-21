export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/hello-world', (req, res) => {
      // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
      // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
      const {issueKey} = req.query;
      res.render(
        'hello-world.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
        {
          title: 'Hello world',
          issueKey: issueKey
          //, issueId: req.query['issueId']
          //, browserOnly: true // you can set this to disable server-side rendering for react views
        }
      );
    });

    app.get('/main', (req, res) => {
      // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
      // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
      const {issueKey} = req.query
      getIssueSummary(addon, req, issueKey).then((issueSummary) => {
          res.render(
              'main.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
              {
                  title: 'Main',
                  issueSummary: issueSummary,
                  issueKey: issueKey
                  //, issueId: req.query['issueId']
                  //, browserOnly: true // you can set this to disable server-side rendering for react views
              }
          );
      })
    });

    async function getIssueSummary (addon, req, issueKey)  {
      return new Promise((resolve, reject) => {

          var httpClient = addon.httpClient(req);
          httpClient.get(`/rest/api/3/issue/${issueKey}`, function (err, res, body) {
              resolve(JSON.parse(body).fields.summary)
          });
      })
    }

    // Add additional route handlers here...
}
