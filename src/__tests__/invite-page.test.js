import { render, fireEvent } from '@testing-library/react';
import App from "../App";

test('render page correctly', () => {
  const {container} = render(<App />);
  expect(container.querySelector("[jest-id='request-btn']")).toBeInTheDocument();
  expect(container.querySelector("[jest-id='header']")).toBeInTheDocument();
  expect(container.querySelector("[jest-id='footer']")).toBeInTheDocument();
});

test('render page without modal', () => {
  const {container} = render(<App />);
  expect(container.querySelector("[jest-id='popup-content']")).toBeNull();
});

test('show modal when click request btn', () => {
  const {container} = render(<App />);
  const btn = container.querySelector("[jest-id='request-btn']");
  fireEvent.click(btn);
  expect(container.querySelector("[jest-id='popup-content']")).toBeInTheDocument();
});

test('hidden modal when click mask', () => {
  const {container} = render(<App />);
  const btn = container.querySelector("[jest-id='request-btn']");
  fireEvent.click(btn);
  const mask = container.querySelector("[jest-id='modal-mask']");
  fireEvent.click(mask);
  expect(container.querySelector("[jest-id='popup-content']")).toBeNull();
});