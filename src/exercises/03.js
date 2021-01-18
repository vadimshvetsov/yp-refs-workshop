/*
  Форма эволюционировала в редактируемое поле, но пользователи стали жаловаться,
  что фокус не переводится на ближайшую кнопку после подтверждения изменения.

  😱 Проблема

  - После подтверждения имени фокус не переходит на кнопку "Изменить"
  - При нажатии на кнопку "Изменить" фокус не переходит в появившийся инпут

  🎯 Задача

  - После подтверждения имени фокус должен перемещаться на кнопку "Изменить"
  - После нажатия на кнопку "Изменить" фокус переходит на инпут
  - При первом рендере фокус не должен быть на инпуте

  ⛑ Подсказки

  Подсказки закодированы, чтобы случайно их не прочитать. 
  Чтобы воспользоваться подсказкой нужно вызвать функцию `decodeHint` в консоли,
  передав зашифрованный текст подсказки как аргумент.

  1. 0J3Rg9C20L3QviDQstGL0Y/RgdC90LjRgtGMINC/0YDQtdC00YvQtNGD0YnQtdC1INGB0L7RgdGC0L7Rj9C90LjQtSBgaXNFZGl0ZWRgLCDRh9GC0L7QsdGLINC/0YDQuCDQtdCz0L4g0LjQt9C80LXQvdC10L3QuNC4INC80LXQvdGP0YLRjCDRhNC+0LrRg9GB
  2. 0JzQvtC20L3QviDQuNC80L/Qu9C10LzQtdC90YLQuNGA0L7QstCw0YLRjCDRhdGD0LogYHVzZVByZXZpb3VzYCwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDRhdGA0LDQvdC40YLRjCDQsiBgcmVmYCDQv9GA0LXQtNGL0LTRg9GJ0LXQtSDRgdC+0YHRgtC+0Y/QvdC40LUg0L/QtdGA0LXQvNC10L3QvdC+0Lk=
  3. 0KHRgtC+0LjRgiDQtNC+0LHQsNCy0LjRgtGMINGN0YTRhNC10LrRgiwg0LrQvtGC0L7RgNGL0Lkg0LLRi9GB0YLQsNCy0LvRj9C10YIg0YTQvtC60YPRgSDQv9C+0YHQu9C1INC+0LHQvdCw0YDRg9C20LXQvdC40Y8g0LjQt9C80LXQvdC10L3QuNGPINGC0LXQutGD0YnQtdCz0L4g0Lgg0L/RgNC10LTRi9C00YPRidC10LPQviDRgdC+0YHRgtC+0Y/QvdC40Y8gYGlzRWRpdGVkYA==
*/
import React, { useState, useEffect, useRef } from "react";

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

const EditableFormWithError = ({ onSubmit }) => {
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const nameRef = useRef();
  const editButtonRef = useRef();

  const onSubmitAction = (event) => {
    event.preventDefault();
    if (!name) {
      setIsError(true);
      nameRef.current.focus();
    } else {
      setIsError(false);
      onSubmit({ name });
      setIsEditing(false);
    }
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (name !== "" && isEditing) {
      nameRef.current.value = name;
    }
  }, [name, isEditing]);

  return isEditing ? (
    <form onSubmit={onSubmitAction}>
      <InputWithLabel
        name="firstName"
        labelText="Имя:"
        isError={isError}
        onChange={onNameChange}
        ref={nameRef}
      />
      <button type="submit" style={{ marginLeft: 5 }}>
        Подтвердить
      </button>
    </form>
  ) : (
    <div>
      <span>Имя: {name}</span>
      <button
        onClick={() => {
          setIsEditing(true);
        }}
        style={{ marginLeft: 5 }}
        ref={editButtonRef}
      >
        Изменить
      </button>
    </div>
  );
};

/*
 Не изменяйте компонент `Usage`. Он нужен для понимания того,
 как компонент будет использоваться, в том числе и в тестах.
*/
function Usage({ onSubmit = (...args) => console.log("onSubmit", ...args) }) {
  return <EditableFormWithError onSubmit={onSubmit} />;
}

Usage.title = "Предыдущее значение";

export { EditableFormWithError, Usage as default };
