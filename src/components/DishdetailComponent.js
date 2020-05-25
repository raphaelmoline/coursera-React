import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
 Modal, ModalHeader, ModalBody,Row, Col, Label} from 'reactstrap';
import { Link } from 'react-router-dom' ;
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component  {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isModalOpen: false
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

  }

  render() {
    return(
      <div>
        <Button onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                  <Label htmlFor="rating" md={2}>Rating</Label>
                  <Col md={10}>
                    <Control.select model=".rating" id="rating" name="rating"
                    className="form-control">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Control.select>
                  </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="author" md={2}>Your Name</Label>
                  <Col md={10}>
                    <Control.text  model=".author" id="author" name="author"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}>
                    </Control.text>
                    <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                     />
                  </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="comment" md={2}>Your Comment</Label>
                  <Col md={10} >
                    <Control.textarea model=".comment" id="comment" name="comment"
                    className="form-control" rows="6">
                    </Control.textarea>
                  </Col>
              </Row>
              <Row className='form-group'>
                  <Col md={{size: 10, offset: 2}}>
                      <Button type="submit" color='primary'>
                          Submit
                      </Button>
                  </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
        );
    }



};

function RenderDish({dish}){
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



function RenderComments({comments, addComment, dishId}){
    if(comments != null){
        const dishComments = comments.map((comment) =>{
            return(
                <div>
                  <ul key={comment.id} className="list-unstyled">
                      <li>{comment.comment}</li>
                      <li>-- {comment.author},
                      {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                      .format(new Date(Date.parse(comment.date)))}</li>
                  </ul>

                </div>
            );
        });
        return(
            <div>
                <h4>Comments</h4>
                <div>{dishComments}</div>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}

const DishDetails = (props) => {

    if(props.dish != null) {
      return (
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/menu '>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish} />
              </div>
              <div className="col-12 col-md-5 m-1">
                  <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id}/>
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


export default DishDetails;
