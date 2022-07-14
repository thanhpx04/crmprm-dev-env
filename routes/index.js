export default function routes(app, addon) {
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.post('/installed', (req, res) => {
        console.log("HEADER-LOG");
        console.log(req.headers);
        console.log("BODY-LOG");
        console.log(req.body);
    });

    app.get('/hello-world', (req, res) => {
      console.log("hello-world");
      console.log(req);
      res.render(
        'hello-world.jsx',
        {
          title: `Hello Thanh's world`
        }
      );
    });

    app.get('/uikit', (req, res) => {
      console.log("uikit");
      console.log(res);
      res.render(
        'uikit-demo.jsx',
        {
          title: `Hello uikit demo`
        }
      );
    });

    app.get('/main', addon.authenticate(), (req, res) => {
      console.log("main");
      console.log(addon);
      const {issueKey} = req.query
      getIssueSummary(addon, req, issueKey).then((issueSummary) => {
        res.render(
          'main.hbs',
          {
              title: 'Demo require authentication',
              issueSummary: issueSummary,
              issueKey: issueKey
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
