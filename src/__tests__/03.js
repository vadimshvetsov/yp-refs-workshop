import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import { EditableFormWithError } from "../exercises-final/03";

test("EditableFormWithError move focus on edit and after submit", () => {
  const onSubmit = jest.fn();

  const { getByText, queryByText, getByLabelText } = render(
    <EditableFormWithError onSubmit={onSubmit} />
  );
  expect(queryByText(/изменить/i)).not.toBeInTheDocument();

  user.type(getByLabelText(/имя/i), "Anakin Skywalker");
  fireEvent.click(getByText(/подтвердить/i));

  expect(onSubmit).toBeCalled();

  expect(getByText(/anakin skywalker/i)).toBeInTheDocument();
  expect(getByText(/изменить/i)).toBeInTheDocument();
  expect(getByText(/изменить/i)).toHaveFocus();

  fireEvent.click(getByText(/изменить/i));

  expect(getByText(/подтвердить/i)).toBeInTheDocument();
  expect(getByLabelText(/имя/i)).toBeInTheDocument();
  expect(getByLabelText(/имя/i)).toHaveFocus();
});
