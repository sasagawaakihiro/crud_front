import React from 'react'
import axios from 'axios'
import CategoryDetail from './CategoryDetail'
import { Form, Col, Card, ListGroup, Button } from 'react-bootstrap'
import update from 'react-addons-update'

class CategoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      insertName: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/count')
    .then((results) => {
      console.log(results)
      this.setState({categories: results.data})
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  //カテゴリ名変更時
  onChangetext(e) {
    this.setState({insertName: e.target.value})
  }

  //カテゴリ追加
  createCategory = () => {
    if (!this.state.insertName) {
      alert('カテゴリ名を入力してください。')
      return
    }
    axios.post('http://localhost:3001/categories', {
      name: this.state.insertName
    })
      .then((results) => {
        console.log(results)
        this.setState({ categories: results.data })
        this.setState({insertName:''})
      })
      .catch((data) =>{
        console.log(data)
      }
    )
  }

  //カテゴリ名更新
  updateCategory = (id, name) => {
    axios.patch(`http://localhost:3001/categories/${id}`,{name: name})
    .then((response) => {
      const categoryIndex = this.state.categories.findIndex(x => x.id === id)
      const categories = update(this.state.categories, {[categoryIndex]: {$set: response.data}})
      this.setState({categories: categories})
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  //カテゴリ削除
  deleateCategory = (id) => {
    axios.delete(`http://localhost:3001/categories/${id}`)
    .then((response) => {
      const categoryIndex = this.state.categories.findIndex(x => x.id === id)
      const categories = update(this.state.categories, {$splice: [[categoryIndex, 1]]})
      this.setState({categories: categories})
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
              return (
                <ListGroup.Item>
                  <CategoryDetail data={data} key={data.id} onUpdate={this.updateCategory} onDelete={this.deleateCategory}/>
                  </ListGroup.Item>
              )
            })}
            <ListGroup.Item>
              <Form>
                  <Form.Control type="text" value={this.state.insertName} onChange={e => this.onChangetext(e)} />
              </Form>
              <Button variant="outline-secondary" onClick={this.createCategory}>追加</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    )
  }
}

export default CategoryList