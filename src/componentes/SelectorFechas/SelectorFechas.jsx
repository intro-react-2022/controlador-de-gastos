import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function SelectorFechas(props) {
  const { style, label, size, onChange, value, disabled } = props;
  //const [value, setValue] = React.useState(null);
  const handleChangeFecha = (newValue) => {
    /*   setValue(newValue.toLocaleDateString());
    console.log(newValue.toLocaleDateString()); */
    onChange?.(newValue.toLocaleDateString());
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        disabled={disabled}

        onChange={handleChangeFecha}
        renderInput={(params) => (
          <TextField
            {...params}
            size={size}
            style={style}
            disabled={disabled}
          />
        )}
      />
    </LocalizationProvider>
  );
}
