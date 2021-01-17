import React, { useRef, useState } from "react";

const FormWithError = ({ onSubmit }) => {
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const nameRef = useRef();

  const onSubmitAction = (event) => {
    event.preventDefault();
    if (!name) {
      setIsError(true);
      nameRef.current.focus();
    } else {
      setIsError(false);
      onSubmit({ name });
    }
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <form onSubmit={onSubmitAction} style={{ display: "grid", gridGap: 5 }}>
      <label htmlFor="firstName">
        Имя {isError && <span style={{ color: "red" }}>* Обязательно</span>}
      </label>
      <input
        name="firstName"
        id="firstName"
        type="text"
        ref={nameRef}
        onChange={onNameChange}
      />
      <button type="submit">Отправить</button>
    </form>
  );
};

function Usage({ onSubmit = (...args) => console.log("onSubmit", ...args) }) {
  return <FormWithError onSubmit={onSubmit} />;
}

Usage.title = "Фокус на инпут с ошибкой";

export { FormWithError, Usage as default };
