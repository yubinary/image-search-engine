import React from 'react';

const Checkbox = ({ id, type = 'checkbox', name, checked = false, onChange }) => {
  return (<input id={id} type={type} name={name} checked={checked} onChange={onChange} />)
}
export default Checkbox;