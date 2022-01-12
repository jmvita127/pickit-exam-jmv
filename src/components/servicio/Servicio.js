import React, { useEffect, useState, useCallback } from "react";

const Servicio = ({ servicio, handleCheck }) => {
  const [checked, setChecked] = useState(false);
  const { nombre, precio } = servicio;

  const handleOnChange = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  useEffect(() => {
    handleCheck(checked, servicio);
  }, [handleOnChange]);

  return (
    <div className="mt-1">
      <input
        type="checkbox"
        className="m-1"
        checked={checked}
        onChange={handleOnChange}
        name="checkbox"
      />
      <label>{nombre + " ($" + precio + ")"}</label>
    </div>
  );
};

export default Servicio;