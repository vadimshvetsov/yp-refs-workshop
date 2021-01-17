import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { FormWithError } from "../exercises/01";

test("Input has focus after submitting empty form", () => {
  const { getByText, queryByText, getByLabelText } = render(<FormWithError />);
  expect(queryByText(/обязательно/i)).not.toBeInTheDocument();

  user.click(getByText("Отправить"));

  expect(getByText(/обязательно/i)).toBeInTheDocument();
  expect(getByLabelText(/имя/i)).toHaveFocus();
});
