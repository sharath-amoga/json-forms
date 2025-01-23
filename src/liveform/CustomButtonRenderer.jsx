import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { rankWith, scopeEndsWith } from '@jsonforms/core';

const CustomButtonRenderer = (props) => {
    const { data, handleChange, path, uischema } = props;
    const { buttonText, isVisible, isDisabled } = uischema.options || {};

    if (!isVisible) return null;

    return (
        <button
            onClick={() => handleChange(path, !data)} // Toggle boolean value
            disabled={isDisabled}
            style={{ marginTop: '10px', padding: '8px 16px' }}
        >
            {buttonText}
        </button>
    );
};

// Tester function: Use this renderer for boolean properties with a "buttonText" option
const customButtonTester = rankWith(
    10, // Priority (higher number = higher priority)
    scopeEndsWith('Button')

);

export default withJsonFormsControlProps(CustomButtonRenderer);
export { customButtonTester };