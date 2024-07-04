import React from 'react';

const Input = ({ type, placeholder, value, onChange }) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
    />
);

export default Input;
