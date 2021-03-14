import React, { useState, useEffect } from "react";
import classes from "./index.module.css";
import InviteForm from "./invite-form";
import SuccessContent from "./success-content";
import inviteStep from "~constants";

function InvitaionPopupContent({ onClose, isModalOpen }) {
  const [step, setStep] = useState(inviteStep.INVTIE_FORM);

  useEffect(() => {
    if (!isModalOpen) {
      setStep(inviteStep.INVTIE_FORM);
    }
  }, [isModalOpen]);

  const handleOnClose = () => {
    onClose();
  };

  return (
    <div
      className={classes.invitationPopupContentWrapper}
      jest-id="popup-content"
    >
      {step === inviteStep.INVTIE_FORM && (
        <InviteForm
          isModalOpen={isModalOpen}
          onSuccess={() => {
            setStep(inviteStep.SUCCESS);
          }}
        />
      )}
      {step === inviteStep.SUCCESS && (
        <SuccessContent onClose={handleOnClose} />
      )}
    </div>
  );
}

export default InvitaionPopupContent;
