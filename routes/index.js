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
      debugger;
      console.log(addon);
      console.log(req);
      var httpClient = addon.httpClient(req);
      const {issueKey} = req.query;

      httpClient.get(`/rest/api/2/issue/${issueKey}/changelog`, function (err, res, body) {
        debugger;
        console.log("err");
        console.log(err);
        console.log("res");
        console.log(res);
        console.log("body");
        console.log(body);
      });
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
      debugger;
      console.log(addon);
      console.log(req);
      var httpClient = addon.httpClient(req);
      const {issueKey} = req.query;

      httpClient.get(`/rest/api/2/issue/${issueKey}/changelog`, function (err, res, body) {
        debugger;
        console.log("err");
        console.log(err);
        console.log("res");
        console.log(res);
        console.log("body");
        console.log(body);
      });
      res.render(
          'main.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
          {
            title: 'Main',
            issueKey: issueKey
            //, issueId: req.query['issueId']
            //, browserOnly: true // you can set this to disable server-side rendering for react views
          }
        );
    });

    // Add additional route handlers here...
}
