import React from 'react'
import Card from 'react-bootstrap/Card';

class ContentDitail extends React.Component {
  //非表示クリック時
  handleClick = () => {
    this.props.onUpdate(this.props.data.id)
  }

  render(){
    return(
      <div>
        <Card style={{ width: '32rem' }}>
          <Card.Body>
            <Card.Title>{this.props.data.subject}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Name:{this.props.data.name}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Email:{this.props.data.email}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Subtitle</Card.Subtitle>
            <Card.Text>{this.props.data.body}</Card.Text>
            {/*自身が投稿した場合、非表示を可能とする。*/}
            {this.props.data.hide_user_id === this.props.uniqueId
              ? <Card.Link onClick={() => this.handleClick()}>非表示</Card.Link>
              : <div></div>
            }
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default ContentDitail