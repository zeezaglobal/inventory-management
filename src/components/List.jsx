import React from "react";

const List = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.name}: {item.count}
        </li>
      ))}
    </ul>
  );
};

export default List;
