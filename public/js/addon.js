/* App frontend script */
function getIssuesOfCurrentUser() {
    AP.request('/rest/api/2/search?jql=assignee=currentuser()', {
        success: function(res) {
            let obj, result;

            obj = JSON.parse(res);
            result = obj.issues.map(issue => ({
                id: issue.id,
                key: issue.key,
                summary: issue.fields.summary,
                project: issue.fields.project.name
            }));
        
            loadTableData(result);
      }
    });
  }
  
function loadTableData(items) {
  AP.request('/rest/api/2/serverInfo', {
    success: function(res) {
      let obj;
      
      obj = JSON.parse(res);
      const jiraSite = obj.baseUrl;
      console.log(jiraSite);
      const table = document.getElementById("listIssuesOfCurrentUser");
    
      // clean table data
      $("#listIssuesOfCurrentUser").empty();
    
      // populate table data
      items.forEach( item => {
        let row, id, key, summary, project;
        
        row = table.insertRow();
        id = row.insertCell(0);
        key = row.insertCell(1);
        summary = row.insertCell(2);
        project = row.insertCell(3);
        id.innerHTML = `<a href="${jiraSite}browse/${item.key}" target="_blank">${item.id}</a>`;
        key.innerHTML = item.key;
        summary.innerHTML = item.summary;
        project.innerHTML = item.project;
      });
    }
  });
}