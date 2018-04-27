import React from 'react'
import '../css/form.css'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      review: '',
      rating: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (key, event) {
    this.setState({[key]: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.handleFormSubmit(this.state)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
          Name:
          <br />
            <input type='text' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
          </label>
        </div>

        <div>
          <label>
          Review:
          <br />
            <textarea rows='4' cols='50' type='text' value={this.state.review} onChange={this.handleChange.bind(this, 'review')} />
          </label>
        </div>

        <div>
          <label>
          Rating:
          <br />
            <input type='text' value={this.state.rating} onChange={this.handleChange.bind(this, 'rating')} />
          </label>
        </div>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
