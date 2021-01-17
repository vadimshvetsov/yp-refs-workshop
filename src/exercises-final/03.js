import React, { useState, useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

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
  const wasEditing = usePrevious(isEditing);

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

  useEffect(() => {
    if (name !== "" && isEditing) {
      nameRef.current.value = name;
    }
  }, [name, isEditing]);

  useEffect(() => {
    if (name !== "" && !wasEditing && isEditing) {
      nameRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing, name]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

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
