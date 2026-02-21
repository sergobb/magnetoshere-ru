"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export default function LoadingModal({ show, className }) {
  const [modal, setModal] = useState(show);

  useEffect(() => {
    setModal(show);
  }, [show]);

  return (
    <Modal
      isOpen={modal}
      toggle={() => setModal(false)}
      className={className}
      backdrop="static"
    >
      <ModalBody>Calculating and loading</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setModal(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
