import React, { useState } from "react";
import PropTypes from "prop-types";

const BaseForm = ({ label, placeholder, buttonLabel, onClick }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label">
        {label}
        <input
          className="form-input"
          type="text"
          value={value}
          placeholder={placeholder}
          required
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </label>
      <input type="submit" value={buttonLabel}></input>
    </form>
  );
};

BaseForm.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func,
};

BaseForm.defaultProps = {
  placeholder: "Enter text",
  buttonLabel: "Submit",
  onClick: () => {},
};

export default BaseForm;
