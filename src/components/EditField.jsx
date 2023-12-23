import React from "react";
import PropTypes from "prop-types";

class EditField extends React.Component {
  render() {
    const {
      name,
      defaultValue,
      onChange,
      label,
      type = "input",
      styleName,
    } = this.props;

    return (
      <div className={styleName}>
        <label>{label}</label>
        {type === "textarea" ? (
          <textarea
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        )}
      </div>
    );
  }
}

EditField.propTypes = {
  name: PropTypes.any,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  styleName: PropTypes.any,
};

export default EditField;
