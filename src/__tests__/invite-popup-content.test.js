import {
  render,
  fireEvent,
  screen,
  findByText,
} from "@testing-library/react";
import InvitaionPopupContent from "~containers/invitation-popup-content";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock('axios');

test("show invite form when open modal", () => {
  const { container } = render(<InvitaionPopupContent />);
  expect(
    container.querySelector("[jest-id='invite-form']")
  ).toBeInTheDocument();
});

test("text name less than 4 charaters will show error message", async () => {
  const { container } = render(<InvitaionPopupContent />);
  const input = screen.getByPlaceholderText("Full name");
  fireEvent.change(input, { target: { value: "leo" } });
  fireEvent.blur(input);
  expect(
    await findByText(
      container,
      "Full name needs to be at least 3 characters long"
    )
  ).toBeVisible();
});

test("text email not correctly will show message", async () => {
  const { container } = render(<InvitaionPopupContent />);
  const input = screen.getByPlaceholderText("Email");
  fireEvent.change(input, { target: { value: "leo-email" } });
  fireEvent.blur(input);
  expect(
    await findByText(container, "Email needs to be in validation email format")
  ).toBeVisible();
});

test("text confirm email not the same as email will show message", async () => {
  const { container } = render(<InvitaionPopupContent />);
  const emailInput = screen.getByPlaceholderText("Email");
  const confirmEmailInput = screen.getByPlaceholderText("Confirm Email");
  fireEvent.change(emailInput, { target: { value: "leo.tang@gmail.com" } });
  fireEvent.change(confirmEmailInput, {
    target: { value: "leo.tang+1@gmail.com" },
  });
  fireEvent.blur(confirmEmailInput);
  expect(
    await findByText(container, "Confirm Email needs to match Email")
  ).toBeVisible();
});

test("text confirm email empty will show message", async () => {
  const { container } = render(<InvitaionPopupContent />);
  const confirmEmailInput = screen.getByPlaceholderText("Confirm Email");
  fireEvent.change(confirmEmailInput, { target: { value: "" } });
  fireEvent.blur(confirmEmailInput);
  expect(
    await findByText(container, "Please input confirm email")
  ).toBeVisible();
});

test("submit when validate failed", async () => {
  const {container} = render(<InvitaionPopupContent />);

  userEvent.type(screen.getByPlaceholderText("Full name"), "leo");
  userEvent.type(
    screen.getByPlaceholderText("Email"),
    "1111"
  );
  userEvent.type(
    screen.getByPlaceholderText("Confirm Email"),
    "1111"
  );

  userEvent.click(screen.getByText("Send"));
  expect(
    await findByText(container, "Email needs to be in validation email format")
  ).toBeVisible();
  expect(
    await findByText(
      container,
      "Full name needs to be at least 3 characters long"
    )
  ).toBeVisible();
});

test("send invite form success", async () => {
  axios.post.mockResolvedValue("Registered");
  const {container} = render(<InvitaionPopupContent />);

  userEvent.type(screen.getByPlaceholderText("Full name"), "John");
  userEvent.type(
    screen.getByPlaceholderText("Email"),
    "john.dee@someemail.com"
  );
  userEvent.type(
    screen.getByPlaceholderText("Confirm Email"),
    "john.dee@someemail.com"
  );

  userEvent.click(screen.getByText("Send"));
  expect(await findByText(container, "All done!")).toBeVisible();
});

test("send invite form error", async () => {
  axios.post.mockRejectedValue({errorMessage: "Bad Request: Email is already in use"});
  const {container} = render(<InvitaionPopupContent />);

  userEvent.type(screen.getByPlaceholderText("Full name"), "John");
  userEvent.type(
    screen.getByPlaceholderText("Email"),
    "john.dee@someemail.com"
  );
  userEvent.type(
    screen.getByPlaceholderText("Confirm Email"),
    "john.dee@someemail.com"
  );

  userEvent.click(screen.getByText("Send"));
  expect(await findByText(container, "Error message from server here.")).toBeVisible();
});

test("handleClose will be called after click success modal btn", async () => {
  axios.post.mockResolvedValue("Registered");
  const handleClose = jest.fn();
  const {container} = render(<InvitaionPopupContent onClose={handleClose}/>);

  userEvent.type(screen.getByPlaceholderText("Full name"), "John");
  userEvent.type(
    screen.getByPlaceholderText("Email"),
    "john.dee@someemail.com"
  );
  userEvent.type(
    screen.getByPlaceholderText("Confirm Email"),
    "john.dee@someemail.com"
  );

  userEvent.click(screen.getByText("Send"));
  expect(await findByText(container, "All done!")).toBeVisible();
  userEvent.click(screen.getByText("OK"));
  expect(handleClose).toBeCalled();
});

