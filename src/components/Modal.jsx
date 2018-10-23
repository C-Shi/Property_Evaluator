import React, {Component} from 'react';

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showModal = this.showModal.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  showModal = () => {
    this.setState({
      ...this.state,
      show: !this.state.show
    });
  }
  render() {


    return (
      <div>
        <p>Click to get the full Modal experience!</p>

        <button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Launch demo modal
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.handleClose}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Example;