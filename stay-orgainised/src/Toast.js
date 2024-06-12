import { Modal,Button } from "react-bootstrap";
export default function Toast(props){
  return(
    <Modal show={props.value}>
    <Modal.Header>
        <Modal.Title className="text-center">Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}