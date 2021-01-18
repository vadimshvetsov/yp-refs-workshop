/*
  Представлена простая форма с инпутом `name`. При заполнении инпута и
  отправки формы имя попадает в консоль. При попытке отправить пустую форму,
  возвращается ошибка валидации.

  😱 Проблема

  После отправки пустой формы и возникновения ошибки инпут не получает фокус.

  🎯 Задача

  При поялении ошибки переводить фокус на инпут программно, чтобы
  пользователь мог сразу заполнить его, не делая лишний клик.

  ⛑ Подсказки

  Подсказки закодированы, чтобы случайно их не прочитать. 
  Чтобы воспользоваться подсказкой нужно вызвать функцию `decodeHint` в консоли,
  передав зашифрованный текст подсказки как аргумент.

  1. 0J3Rg9C20L3QviDQv9C+0LvRg9GH0LjRgtGMIGByZWZgIERPTS3RjdC70LXQvNC10L3RgtCwINC40L3Qv9GD0YLQsCwg0YfRgtC+0LHRiyDRg9GB0YLQsNC90L7QstC40YLRjCDQvdCwINC90LXQvCDRhNC+0LrRg9GB
*/

import React, { useState } from "react";

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
      <label htmlFor="firstName">
        Имя {isError && <span style={{ color: "red" }}>* Обязательно</span>}
      </label>
      <input
        name="firstName"
        id="firstName"
        type="text"
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

Usage.title = "Фокус на инпут с ошибкой";

export { FormWithError, Usage as default };
