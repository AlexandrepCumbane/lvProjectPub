import React from "react";
import { Input } from "reactstrap";

function SearchFilter({ placeholder, className, value, onChange, onBlur }) {
  return (
    <div className="table-input mr-1">
      <Input
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </div>
  );
}

export default SearchFilter;
