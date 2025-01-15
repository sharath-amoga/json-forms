import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { Button } from '@mui/material';

const schema = {
    "type": "object",
    "properties": {
        "textField": {
            "type": "string",
            "minLength": 5,
            "maxLength": 20,
            "pattern": "^[a-zA-Z]+$",
            "description": "Enter a text value",
            "errorMessage": {
                "minLength": "Text must be at least 5 characters long.",
                "maxLength": "Text must not exceed 20 characters.",
                "pattern": "Text must contain only alphabetic characters."
            }
        },
        "numberField": {
            "type": "number",
            "minimum": 10,
            "maximum": 100,
            "multipleOf": 5,
            "description": "Enter a numeric value",
            "errorMessage": {
                "minimum": "Number must be at least 10.",
                "maximum": "Number must not exceed 100.",
                "multipleOf": "Number must be a multiple of 5."
            }
        },
        "emailField": {
            "type": "string",
            "format": "email",
            "pattern": "^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
            "description": "Enter your email address",
            "errorMessage": {
                "format": "Email must be in a valid format (e.g., user@example.com).",
                "pattern": "Email must follow the proper email structure.",
                "required": "Email is required."
            }
        }
    },
    "required": ["textField", "numberField", "emailField"],
    "errorMessage": {
        "required": {
            "textField": "Text field is required.",
            "numberField": "Number field is required.",
            "emailField": "Email field is required."
        }
    }
};

const uischema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "label": "Text Field",
            "scope": "#/properties/textField",
            "options": {
                "placeholder": "Enter text (5-20 alphabetic characters)"
            }
        },
        {
            "type": "Control",
            "label": "Number Field",
            "scope": "#/properties/numberField",
            "options": {
                "placeholder": "Enter a number (10-100, multiple of 5)"
            }
        },
        {
            "type": "Control",
            "label": "Email Field",
            "scope": "#/properties/emailField",
            "options": {
                "placeholder": "Enter a valid email (e.g., user@example.com)"
            }
        }
    ]
};



const JsonFormsComponent = () => {
    const [data, setData] = useState({});

    const handleSubmit = () => {
        console.log('Form Data Submitted:', data);
        // You can add your submission logic here, e.g., sending data to an API
    };

    return (
        <div>
            <h3>Custom Validation</h3>
            <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setData(data)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '16px' }}
            >
                Submit
            </Button>
        </div>
    );
};

export default JsonFormsComponent;