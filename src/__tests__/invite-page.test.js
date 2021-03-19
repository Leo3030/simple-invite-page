import { render, fireEvent, screen, findByText } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import App from "../App";
import InvitaionPopupContent from "~containers/invitation-popup-content";

jest.mock("axios");

test("render page correctly", () => {
  const { container } = render(<App />);
  expect(
    container.querySelector("[jest-id='request-btn']")
  ).toBeInTheDocument();
  expect(container.querySelector("[jest-id='header']")).toBeInTheDocument();
  expect(container.querySelector("[jest-id='footer']")).toBeInTheDocument();
});

test("render page without modal", () => {
  const { container } = render(<App />);
  expect(container.querySelector("[jest-id='popup-content']")).toBeNull();
});

test("show modal when click request btn", () => {
  const { container } = render(<App />);
  const { container: popupContainer } = render(<InvitaionPopupContent />);

  const btn = container.querySelector("[jest-id='request-btn']");
  fireEvent.click(btn);
  expect(
    container.querySelector("[jest-id='popup-content']")
  ).toBeInTheDocument();
  expect(popupContainer).toBeInTheDocument();
});

test("hidden modal when click mask", () => {
  const { container } = render(<App />);
  const btn = container.querySelector("[jest-id='request-btn']");
  fireEvent.click(btn);
  const mask = container.querySelector("[jest-id='modal-mask']");
  fireEvent.click(mask);
  expect(container.querySelector("[jest-id='popup-content']")).toBeNull();
});

test("invite popup will close after click success modal btn", async () => {
  axios.post.mockResolvedValue("Registered");
  const { container } = render(<App />);

  const btn = container.querySelector("[jest-id='request-btn']");
  fireEvent.click(btn);

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
  expect(container.querySelector("[jest-id='popup-content']")).toBeNull();
});