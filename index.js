const core = require('@actions/core')
const github = require('@actions/github')

const labelGifMap = {
  'bug': 'Bug? \n ![Michael no](https://media.giphy.com/media/1T96TRBBGYThC/giphy.gif)',
  'documentation': 'Documentation? \n ![Documentation meme](https://media.giphy.com/media/4MjVrfDD2WrN6/giphy.gif)',
  'good first issue': 'Good first issue? \n ![Good first issue meme](https://media.giphy.com/media/CLrEXbY34xfPi/giphy.gif)',
  'help wanted': 'Help wanted? \n ![Help wanted meme](https://media.giphy.com/media/1GlDW1HBD3q2A/giphy.gif)',
  'invalid': 'Invalid? \n ![Michael hurt](https://i.redd.it/lhmmpg5pv7uz.jpg)',
  'wontfix': 'Wontfix? \n ![Andy friendship annoyed](https://media.giphy.com/media/l3Ucl5pIqSaGa82T6/giphy.gif)',
  'duplicate': 'Duplicate? \n ![Enhance meme](https://media.giphy.com/media/WzxoSXYFGpk1W/giphy.gif)',
  'enhancement': 'Enhancement? \n ![Enhance meme](https://media.giphy.com/media/E5mkciTEaBLNK/giphy.gif)'
}

async function run() {
  const eventName = github.context.eventName;
  
  const token = core.getInput('token');
  console.log('Creating client...');
  const client = github.getOctokit(token);
  console.log('Client authenticated succesfully!');

  if(eventName === 'issues') {
    const { owner, repo } = github.context.repo
    const { issue: { number : issue_number, labels } } = github.context.payload
    console.log('Handing issues event...');

    let bodyMessages = ['[Auto-message]\n']

    labels.forEach(label => {
      if(labelGifMap[label.name] !== undefined) {
        bodyMessages.push(labelGifMap[label.name])
      }
    })
    
    const body = bodyMessages.join('\n')
    client.issues.createComment({ owner, repo, issue_number, body })

  }
}

try {
  run()
} catch(error) {
  core.setFailed(error.message);
}