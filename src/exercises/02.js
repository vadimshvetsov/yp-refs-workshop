/*
  Та же самая форма, что и в первом задании. Только теперь нет прямого доступа 
  к инпуту, потому что его перенесли в переиспользуемый компонент.

  😱 Проблема:

  После отправки пустой формы и получения ошибки инпут не получает фокус.

  🎯 Задача:

  При возникновении ошибки переводить фокус на инпут программно, чтобы юзер мог
  сразу заполнить его, не делая лишний клик.

  ⛑ Подсказки:

  Подсказки закодированы, чтобы случайно их не прочитать. 
  Чтобы воспользоваться подсказкой нужно вызвать функцию `decodeHint` в консоли,
  передав зашифрованный текст подсказки как аргумент.

  1. 0JzQvtC20L3QviDQstC+0YHQv9C+0LvRjNC30L7QstCw0YLRjNGB0Y8gYFJlYWN0LmZvcndhcmRSZWYoKWAg0LTQu9GPINC/0LXRgNC10LTQsNGH0LggYHJlZmAg0LIgYElucHV0V2l0aExhYmVsYA==
*/

import React, { useState } from "react";

const InputWithLabel = ({ labelText, name, isError, onChange }) => (
  <>
    <label htmlFor={name}>
      {labelText}{" "}
      {isError && <span style={{ color: "red" }}>* Обязательно</span>}
    </label>
    <input name={name} id={name} type="text" onChange={onChange} />
  </>
);

const FormWithError = ({ onSubmit }) => {
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");

  const onSubmitAction = (event) => {
    event.preventDefault();
    if (!name) {
      setIsError(true);
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
