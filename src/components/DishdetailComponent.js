import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Media } from 'reactstrap';

class Dishdetail extends Component {


    constructor(props) {
      super(props);

    }

    renderDish(dish) {

      if (dish != null) {
        console.log(dish.name);
        return(
          <Card>
            <CardImg width="100%" object src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        )
      }

      else {
        return(
          <div></div>
        )
      }
    }

    renderComments(dish) {

      if (dish != null) {
        console.log('comments');
        const comments = dish.comments.map((comment) => {
          return (
            <div key={comment.id}>
              <ul className = "list-unstyled">
                <li>{comment.comment}</li>
                <li></li>
                <li>-- {comment.author}, {comment.date}</li>
              </ul>
            </div>
          )
        });
        return(
          <div>
            <h1>Comments</h1>
            {comments}
            </div>
          )
      }

      else {
        return(
          <div></div>
        )
      }
    }

    render() {

      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1 ">
          {this.renderDish(this.props.selectedDish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.selectedDish)}
          </div>
        </div>

      );
    }

  }

export default Dishdetail;
