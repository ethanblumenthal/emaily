const keys = require('../../config/keys')

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center; background-color: lightgrey">
          <h1>I'd like your input!</h1>
          <h3>Please answer the following question:</h3>
          <h3>${survey.question}</h3>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `
}
