import React from "react";
import { DropdownMenu, DropdownItem } from "reactstrap";

function DropDownMenu({ side, items, filterSize }) {
  return (
    <DropdownMenu side>
      {items.map((item) => (
        <DropdownItem tag="div" onClick={() => filterSize(item)}>
          {item}
        </DropdownItem>
      ))}
    </DropdownMenu>
  );
}

export default DropDownMenu;
