import { render, fireEvent } from "@testing-library/react";
import Modal from "~components/modal";

test("onClose func will be called when close", () => {
  const handleClose = jest.fn();
  const { rerender } = render(<Modal onClose={handleClose} actived={true} />);
  rerender(<Modal actived={false} onClose={handleClose} />);
  expect(handleClose).toBeCalled();
});

test("onClose func will be called when click outside", () => {
  const handleClose = jest.fn();
  const { container } = render(
    <Modal onClose={handleClose} actived={true} hasMask={true}>
      <div>modal</div>
    </Modal>
  );

  const mask = container.querySelector("[jest-id='modal-mask']");
  fireEvent.click(mask);
  expect(handleClose).toBeCalled();
});
