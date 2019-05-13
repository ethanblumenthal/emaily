import React, { Component } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'

class Landing extends Component {
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.slider')
      M.Slider.init(elems, { interval: 3000 })
    })
  }

  render() {
    return (
      <div className="slider" style={{ marginTop: '10%' }}>
        <ul className="slides">
          <li>
            <img src="https://lorempixel.com/1000/600/nature/1" alt="Ants" />
            <div className="caption center-align">
              <h1>Product Loop</h1>
            </div>
          </li>
          <li>
            <img src="https://lorempixel.com/1000/600/nature/2" alt="Sunset" />
            <div className="caption left-align">
              <h3>Made for product managers to collect feedback from their users.</h3>
            </div>
          </li>
          <li>
            <img src="https://lorempixel.com/1000/600/nature/5" alt="Beach" />
            <div className="caption right-align">
              <h3>Create an email survey and the results will be aggregated on the dashboard.</h3>
            </div>
          </li>
          <li>
            <img src="https://lorempixel.com/1000/600/nature/4" alt="Leaves" />
            <div className="caption center-align">
              <h3>Login above to get started!</h3>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default Landing
