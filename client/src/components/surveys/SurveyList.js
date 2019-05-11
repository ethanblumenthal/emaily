import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../../actions'

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div key={survey._id} className="card darken-1">
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div className="card-action valign-wrapper">
            <a href="/surveys">Yes: {survey.yes}</a>
            <a href="/surveys">No: {survey.no}</a>
            <button
              className="btn red darken-1"
              onClick={() => this.props.deleteSurvey(survey._id)}
              style={{ justifyContent: 'flex-end' }}
            >Delete Survey</button>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    )
  }
}

const mapStateToProps = ({ surveys }) => ({
  surveys
})

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList)
