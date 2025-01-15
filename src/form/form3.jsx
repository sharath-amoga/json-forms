import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { Button } from '@mui/material';

const schema = {
    "type": "object",
    "properties": {
        "toggle": {
            "type": "string",
            "enum": ["yes", "no"],
            "default": "no",
            "description": "Select Yes or No"
        },
        "textField1": {
            "type": "string",
            "description": "This field is disabled if 'Yes' is selected"
        },
        "textField2": {
            "type": "string",
            "description": "This field is hidden if 'Yes' is selected"
        }
    }
};

const uischema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "label": "Select Yes or No",
            "scope": "#/properties/toggle"
        },
        {
            "type": "Control",
            "label": "Text Field 1",
            "scope": "#/properties/textField1",
            "rule": {
                "effect": "DISABLE",
                "condition": {
                    "scope": "#/properties/toggle",
                    "schema": {
                        "const": "yes"
                    }
                }
            }
        },
        {
            "type": "Control",
            "label": "Text Field 2",
            "scope": "#/properties/textField2",
            "rule": {
                "effect": "HIDE",
                "condition": {
                    "scope": "#/properties/toggle",
                    "schema": {
                        "const": "yes"
                    }
                }
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