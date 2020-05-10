import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class Dishdetail extends Component {

    renderDish(dish){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments){
        if(comments != null){
            const dishComments = comments.map((comment) =>{
                return(
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>-- {comment.author},
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                        .format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                );
            });
            return(
                <div>
                    <h4>Comments</h4>
                    <div>{dishComments}</div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    render() {
        if(this.props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            </div>
        );
        }
        else{
        return(
            <div></div>
        );
        }
    }
}

export default Dishdetail;
