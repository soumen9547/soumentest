import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AutoMatchPoppup(props: any) {
  return (
    <div>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // backdrop="static"
      >
        <Modal.Body>
          <p>{props?.message}</p>
        </Modal.Body>
        <Modal.Footer className="text-center  m-auto">
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AutoMatchPoppup;
