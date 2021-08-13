import React from 'react'
import axios from 'axios'
import CategoryDetail from './CategoryDetail'
import {Card, ListGroup} from 'react-bootstrap'

class CategoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/categories')
    .then((results) => {
      console.log(results)
      this.setState({categories: results.data})
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  render(){
    return(
      <div>
        <Card style={{ width: '32rem' }}>
          <Card.Header>Category</Card.Header>
          <ListGroup variant="flush">
            {this.state.categories.map((data) => {
              return(
                <ListGroup.Item>
                  <CategoryDetail data={data} key={data.id}/>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Card>
      </div>
    )
  }
}

export default CategoryList