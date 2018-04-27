import React from 'react'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '../css/table.css'
import Form from '../components/form'
import Pusher from 'pusher-js'

const columns = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Review',
    accessor: 'review'
  },
  {
    Header: 'Rating',
    accessor: 'rating'
  }
]
const data = [
  {
    name: 'Stan Lee',
    review: 'This movie was awesome',
    rating: '9.5'
  }
]

const pusher = new Pusher(process.env.key, {
  cluster: 'eu',
  encrypted: true
})

const channel = pusher.subscribe('rotten-pepper')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: data
    }
  }

  componentDidMount () {
    this.receiveUpdateFromPusher()
  }

  receiveUpdateFromPusher () {
    channel.bind('new-movie-review', data => {
      this.setState({
        data: [...this.state.data, data]
      })
    })
  }

  handleFormSubmit (data) {
    axios.post('http://localhost:8080/add-review', data)
    .then(res => {
      console.log('received by server')
    })
    .catch(error => {
      throw error
    })
  }

  render () {
    return (
      <div>
        <h1>Rotten <strike>tomatoes</strike> pepper</h1>
        <strong>Movie: Infinity wars </strong>
        <Form handleFormSubmit={this.handleFormSubmit.bind(this)} />
        <ReactTable
          data={this.state.data}
          columns={columns}
          defaultPageSize={10}
    />
      </div>
    )
  }
}
