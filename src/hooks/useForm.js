import { useState } from "react";

export function useForm() {
  const [value, setValue] = useState("");

  const onChangeValue = (event) => {
    setValue(event.target.value);
  };
  const clear = () => {
    setValue("");
  };
  return { value, onChangeValue, clear };
}
