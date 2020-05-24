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

  render() {
    return(
      <div>
      <Button onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm>
                <Row className="form-group">
                    <Label className="col-12" htmlFor="rating">Rating</Label>
                    <Col className="col-12">
                      <Control.select model=".rating" id="rating" name="rating"
                      classname="form-control">
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Control.select>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label className="col-12" htmlFor="author" md={2}>Your Name</Label>
                    <Col className="col-12">
                      <Control.text  model=".author" id="author" name="author"
                      classname="form-control"
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
                    <Label className="col-12" htmlFor="comment" md={2}>Your Comment</Label>
                    <Col className="col-12" >
                      <Control.textarea model=".comment" id="comment" name="comment"
                      classname="form-control" rows="6">
                      </Control.textarea>
                    </Col>
                </Row>
                <Button type="submit" value="submit" color="primary">Submit</Button>
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

function RenderCommentsForm(){
  return(
    <CommentForm />
  );
}

function RenderComments({comments}){
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

const DishDetails = (props) => {

    if(props.dish != null) {
      return (
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to='/menu '>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
              </div>
              <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                        <RenderCommentsForm />
                    </div>
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
