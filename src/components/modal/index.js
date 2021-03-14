import React, {useState, useEffect, useRef} from "react";
import classnames from "classnames";
import classes from "./index.module.css";

function Modal({ onClose, children, hasMask = true, actived = false }) {
  const [isModalOpen, setIsModalOpen] = useState(actived);
  const modalRef = useRef();

  useEffect(() => {
    setIsModalOpen(actived)

    if (!actived) {
      onClose();
    }
  }, [actived])

  const handleModalClose = () => {
    if (onClose) onClose();
    setIsModalOpen(false);
  }

  // If click outside will hidden modal
  const handleModalOutsideClick = (e) => {
    if (!(modalRef.current.contains(e.target))) {
      handleModalClose();
    }
  }

  return (
    <div className={classnames(classes.modalWrapper, isModalOpen && classes.actived)} onClick={handleModalOutsideClick}>
      {hasMask && <div className={classes.modalMask}/>}
      <div className={classes.contentWrapper}>
        <div className={classes.content} ref={modalRef} >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
