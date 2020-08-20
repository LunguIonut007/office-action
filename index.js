const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload;
  const eventName = github.context.eventName;
  
  const token = core.getInput('token');
  console.log('Creating client...');
  const client = github.getOctokit(token);
  console.log('Client authenticated succesfully!');

  if(eventName === 'issues') {
    const { owner, repo } = github.context.repo
    const { issue } = github.context.payload
    console.log('Handing issues event...');

    const { data: labels } = client.issues.listLabelsOnIssue({
      owner, repo, issue_number: ''
    })

    console.log(labels)
    client.issues.createComment({
      owner, repo,
      issue_number,
      body: '![Family guy meme](http://www.sheawong.com/wp-content/uploads/2013/08/keephatin.gif)'
    })
    console.log(payload.issue)
    console.log(payload)
    console.log(payload.issue.labels)
  }
}

try {
  run()
} catch(error) {
  core.setFailed(error.message);
}