import { render, fireEvent, screen, findByText } from '@testing-library/react';
import InvitaionPopupContent from "~containers/invitation-popup-content";

test('show invite form when open modal', () => {
  const {container} = render(<InvitaionPopupContent />);
  expect(container.querySelector("[jest-id='invite-form']")).toBeInTheDocument();
});

test('text name less than 4 charaters will show error message', async () => {
  const {container} = render(<InvitaionPopupContent />);
  const input = screen.getByPlaceholderText("Full name");
  fireEvent.change(input, { target: { value: 'leo' } });
  fireEvent.blur(input);
  expect(await findByText(container, 'Full name needs to be at least 3 characters long')).toBeVisible();
});

test('text email not correctly will show message', async () => {
  const {container} = render(<InvitaionPopupContent />);
  const input = screen.getByPlaceholderText("Email");
  fireEvent.change(input, { target: { value: 'leo-email' } });
  fireEvent.blur(input);
  expect(await findByText(container, 'Email needs to be in validation email format')).toBeVisible();
});

test('text confirm email not the same as email will show message', async () => {
  const {container} = render(<InvitaionPopupContent />);
  const emailInput = screen.getByPlaceholderText("Email");
  const confirmEmailInput = screen.getByPlaceholderText("Confirm Email");
  fireEvent.change(emailInput, { target: { value: 'leo.tang@gmail.com' } });
  fireEvent.change(confirmEmailInput, { target: { value: 'leo.tang+1@gmail.com' } });
  fireEvent.blur(confirmEmailInput);
  expect(await findByText(container, 'Confirm Email needs to match Email')).toBeVisible();
});

test('text confirm email empty will show message', async () => {
  const {container} = render(<InvitaionPopupContent />);
  const emailInput = screen.getByPlaceholderText("Email");
  const confirmEmailInput = screen.getByPlaceholderText("Confirm Email");
  fireEvent.change(confirmEmailInput, { target: { value: '' } });
  fireEvent.blur(confirmEmailInput);
  expect(await findByText(container, 'Please input confirm email')).toBeVisible();
});