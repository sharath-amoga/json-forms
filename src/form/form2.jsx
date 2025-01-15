import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { Button } from '@mui/material';

const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "dead": {
            "type": "boolean"
        },
        "kindOfDead": {
            "type": "string",
            "enum": [
                "Zombie",
                "Vampire",
                "Ghoul"
            ]
        },
        "vegetables": {
            "type": "boolean"
        },
        "kindOfVegetables": {
            "type": "string",
            "enum": [
                "All",
                "Some",
                "Only potatoes"
            ]
        }
    }
};

const uischema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "label": "Name",
            "scope": "#/properties/name"
        },
        {
            "type": "Group",
            "elements": [
                {
                    "type": "Control",
                    "label": "Is Dead?",
                    "scope": "#/properties/dead"
                },
                {
                    "type": "Control",
                    "label": "Kind of dead",
                    "scope": "#/properties/kindOfDead",
                    "rule": {
                        "effect": "ENABLE",
                        "condition": {
                            "scope": "#/properties/dead",
                            "schema": {
                                "const": true
                            }
                        }
                    }
                }
            ]
        },
        {
            "type": "Group",
            "elements": [
                {
                    "type": "Control",
                    "label": "Eats vegetables?",
                    "scope": "#/properties/vegetables"
                },
                {
                    "type": "Control",
                    "label": "Kind of vegetables",
                    "scope": "#/properties/kindOfVegetables",
                    "rule": {
                        "effect": "HIDE",
                        "condition": {
                            "scope": "#/properties/vegetables",
                            "schema": {
                                "const": false
                            }
                        }
                    }
                }
            ]
        }
    ]
}

const JsonFormsComponent = () => {
    const [data, setData] = useState({});

    const handleSubmit = () => {
        console.log('Form Data Submitted:', data);
        // You can add your submission logic here, e.g., sending data to an API
    };

    return (
        <div>
            <h3>Dependant Fields</h3>

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