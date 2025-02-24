import React, { useCallback, useState } from "react";
import { FormPlus, FormMinus } from "../icon";

interface NumberInputProps {
  initialValue?: number;
  min?: number;
  max?: number;
  value: number;
  setValue: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  min = 0,
  max = 999,
  value,
  setValue,
}) => {
  const callbackValue = useCallback(
    (v: number) => {
      setValue(v);
    },
    [setValue]
  );

  const handleIncrement = () => {
    if (value < max) {
      const newValue = value + 1;
      callbackValue(newValue);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      const newValue = value - 1;
      callbackValue(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      callbackValue(newValue);
    }
  };

  return (
    <div className="numbers-btn">
      <button className="numbers-btn__plus" onClick={handleDecrement}>
        <FormMinus />
      </button>
      <input type="number" value={value} onChange={handleInputChange} />
      <button className="numbers-btn__minus" onClick={handleIncrement}>
        <FormPlus />
      </button>
    </div>
  );
};

export default NumberInput;
