import React, { useState } from 'react';
import {
    JsonForms
} from '@jsonforms/react';
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';

const schema = {
    type: "object",
    properties: {
        isMobileNumber: {
            type: "boolean",
            title: "Use Mobile Number"
        },
        contactInfo: {
            type: "string",
            title: "Contact Information"
        }
    },
    required: ["contactInfo"]
};

const uischema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "Control",
            scope: "#/properties/isMobileNumber"
        },
        {
            type: "Control",
            scope: "#/properties/contactInfo"
        }
    ]
};

// Custom validation function
const validate = (formData) => {
    const errors = [];

    if (formData.contactInfo) {
        if (formData.isMobileNumber) {
            // Mobile number validation
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(formData.contactInfo)) {
                errors.push({
                    instancePath: "/contactInfo",
                    message: "Please enter a valid 10-digit mobile number"
                });
            }
        } else {
            // Email validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(formData.contactInfo)) {
                errors.push({
                    instancePath: "/contactInfo",
                    message: "Please enter a valid email address"
                });
            }
        }
    }

    return errors;
};

const initialData = {
    isMobileNumber: false,
    contactInfo: ""
};

const Form5 = () => {
    const [data, setData] = useState(initialData);

    const handleChange = (state) => {
        setData(state.data);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px' }}>
            <h3>Custom validation on dependant fields</h3>
            <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={handleChange}
                validationMode="ValidateAndShow"
                additionalErrors={validate(data)}
            />

            <div style={{ marginTop: '20px' }}>
                <h3>Form Data:</h3>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
};

export default Form5;