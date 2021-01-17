/*
  Представлена простая форма с инпутом `name`. При заполнении инпута и
  отправки формы имя попадает в консоль. При отправлении пустой формы получим
  ошибку валидации.

  😱 Проблема:

  После отправки пустой формы нужно кликнуть на инпут с ошибкой и только потом
  заполнить форму.

  🎯 Задача:

  При возникновении ошибки переводить фокус на инпут программно, чтобы юзер мог
  сразу заполнить его, не делая лишний клик.

  ⛑ Подсказки:

  Подсказки закодированы в base64, чтобы случайно их не прочитать. 
  Чтобы воспользоваться подсказкой нужно вызвать функцию `decodeHint` в консоли,
  передав зашифрованный текст подсказки как аргумент.

  1. 0J3Rg9C20L3QviDQv9C+0LvRg9GH0LjRgtGMIHJlZiBET00t0Y3Qu9C10LzQtdC90YLQsCDQuNC90L/Rg9GC0LAsINGH0YLQvtCx0Ysg0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0L3QsCDQvdC10Lwg0YTQvtC60YPRgQ==
*/

import React, { useState, useRef } from "react";

const InputWithLabel = React.forwardRef(
  ({ labelText, name, isError, onChange }, ref) => (
    <>
      <label htmlFor={name}>
        {labelText}{" "}
        {isError && <span style={{ color: "red" }}>* Обязательно</span>}
      </label>
      <input name={name} id={name} type="text" ref={ref} onChange={onChange} />
    </>
  )
);

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
      <InputWithLabel
        labelText="Имя:"
        name="firstName"
        isError={isError}
        onChange={onNameChange}
        ref={nameRef}
      />
      <button type="submit">Отправить</button>
    </form>
  );
};

/*
 Не изменяйте компонент `Usage`. Он нужен для понимания того,
 как компонент будет использоваться, в том числе и в тестах.
*/
function Usage({ onSubmit = (...args) => console.log("onSubmit", ...args) }) {
  return <FormWithError onSubmit={onSubmit} />;
}

Usage.title = "Передача ссылки на элемент";

export { FormWithError, Usage as default };
