import React, { useState } from "react";
import classes from "./index.module.css";
import Button from "~components/button";
import Modal from '~components/modal';
import InvitaionPopupContent from '~containers/invitation-popup-content';

function InvitationContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h2 className={classes.heading}>A better way to enjoy every day</h2>
          <p className={classes.summary}>Be the first to know when we lunch</p>
          <Button disabled={isModalOpen} onClick={() => {setIsModalOpen(true)}} jest-id="request-btn">Request an invite</Button>
        </div>
      </div>

      {isModalOpen && <Modal actived={isModalOpen} onClose={() => {setIsModalOpen(false)}}>
        <InvitaionPopupContent onClose={() => {setIsModalOpen(false)}} isModalOpen={isModalOpen}/>
      </Modal>}
    </div>
  );
}

export default InvitationContent;
