import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../../actions'
import M from 'materialize-css/dist/js/materialize.min.js'

class SurveyList extends Component {
  state = { selectValue : '' }

  componentDidMount() {
    M.AutoInit()
    this.props.fetchSurveys()
  }

  sortSurveys() {
    const { surveys } = this.props

    switch(this.state.selectValue) {
      case 'old-new':
        return this.renderSurveys(_.orderBy(surveys, ['dateSent'],['asc']))
      case 'a-z':
        return this.renderSurveys(_.orderBy(surveys, ['title'],['asc']))
      case 'z-a':
        return this.renderSurveys(_.orderBy(surveys, ['title'],['desc']))
      default:
        return this.renderSurveys(_.orderBy(surveys, ['dateSent'],['desc']))
    }
  }

  renderSurveys(sortedSurveys) {
    return sortedSurveys.map(survey => {
      return (
        <div key={survey._id} className="card darken-1">
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p className="card-subject">Subject: {survey.subject}</p>
            <p className="card-question">Question: {survey.question}</p>
            <p className="right card-sender">Sender: {survey.sender}</p>
            <p className="right card-date">Date: {new Date(survey.dateSent).toLocaleDateString()}</p>
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
        <div className="input-field col s12" style={{ width: '25vh' }}>
          <select value={this.state.selectValue} onChange={event => this.setState({ selectValue: event.target.value })}>
            <option value="" disabled defaultValue>Choose your option</option>
            <option value="new-old">Date: New-Old</option>
            <option value="old-new">Date: Old-New</option>
            <option value="a-z">Title: A-Z</option>
            <option value="z-a">Title: Z-A</option>
          </select>
          <label>Filter By:</label>
        </div>
        {this.sortSurveys()}
      </div>
    )
  }
}

const mapStateToProps = ({ surveys }) => ({
  surveys
})

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList)
