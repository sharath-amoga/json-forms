import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { schema1, uischema1 } from '../liveform/schema1'
import { schema2, uischema2 } from '../liveform/schema2'

import { IFrameControl, IFrameControlTester } from '../components/button'
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);
ajvErrors(ajv);

// Custom validation function for the name field
const validateName = (name) => {
    if (!name) {
        return 'Name cannot be empty';
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
        return 'Name should not contain numbers or special characters';
    }
    if (name[0] !== name[0].toUpperCase()) {
        return 'First letter of the name should be capitalized';
    }
    return null; // No error
};

// Main data for countries, states, and cities
const countryStateCityData = {
    USA: {
        California: ['Los Angeles', 'San Francisco'],
        'New York': ['New York City', 'Buffalo'],
    },
    India: {
        Maharashtra: ['Mumbai', 'Pune'],
        Karnataka: ['Bangalore', 'Mysore'],
    },
    Canada: {
        Ontario: ['Toronto', 'Ottawa'],
        Quebec: ['Montreal', 'Quebec City'],
    },
};

// JSON Schema
// const schema = {
//     type: 'object',
//     properties: {
//         name: {
//             type: 'string',
//             minLength: 4,
//             errorMessage: {
//                 minLength: 'Name must be at least 4 characters long',
//             },
//         },
//         email: {
//             type: 'string',
//             format: 'email',
//             errorMessage: {
//                 format: 'Please enter a valid email address',
//             },
//         },
//         age: {
//             type: 'number',
//             minimum: 18,
//             maximum: 100,
//             errorMessage: {
//                 minimum: 'You must be at least 18 years old',
//                 maximum: 'Age cannot exceed 100 years',
//                 type: 'Age must be a number',
//             },
//         },
//         country: {
//             type: 'string',
//             enum: ['', ...Object.keys(countryStateCityData)],
//             errorMessage: {
//                 required: 'Country is required',
//             },
//         },
//         state: {
//             type: 'string',
//             enum: [''], // Dynamically populated based on the selected country
//             errorMessage: {
//                 required: 'State is required',
//             },
//         },
//         city: {
//             type: 'string',
//             enum: [''], // Dynamically populated based on the selected state
//             errorMessage: {
//                 required: 'City is required',
//             },
//         },
//     },
//     required: ['name', 'email', 'age', 'country'],
//     errorMessage: {
//         required: {
//             name: 'Name is required',
//             email: 'Email is required',
//             age: 'Age is required',
//             country: 'Country is required',
//         },
//     },
// };

// // UI Schema
// const uiSchema = {
//     type: 'VerticalLayout',
//     elements: [
//         {
//             type: 'Control',
//             scope: '#/properties/name',
//             label: 'Full Name',
//         },
//         {
//             type: 'Control',
//             scope: '#/properties/email',
//             label: 'Email Address',
//         },
//         {
//             type: 'Control',
//             scope: '#/properties/age',
//             label: 'Age',
//         },
//         {
//             type: 'Control',
//             scope: '#/properties/country',
//             label: 'Country',
//         },
//         {
//             type: 'Control',
//             scope: '#/properties/state',
//             label: 'State',
//             rule: {
//                 effect: 'ENABLE',
//                 condition: {
//                     scope: '#/properties/country',
//                     schema: { enum: Object.keys(countryStateCityData) }, // Enable state only if a country is selected
//                 },
//             },
//         },
//         {
//             type: 'Control',
//             scope: '#/properties/city',
//             label: 'City',
//             rule: {
//                 effect: 'ENABLE',
//                 condition: {
//                     scope: '#/properties/state',
//                     schema: { enum: [] }, // Enable city only if a state is selected
//                 },
//             },
//         },
//     ],
// };

// // Initial Data
// const initialData = {
//     name: '',
//     email: '',
//     age: null,
//     country: '',
//     state: '',
//     city: '',
// };

const CustomJsonForm = () => {
    const [data, setData] = useState({});
    const [data2, setData2] = useState({});

    const [errors, setErrors] = useState([]);
    const [schemas, setschemas] = useState({
        schema: schema1,
        uischema: uischema1
    })

    // Simulated backend errors
    const backendErrors = [
        {
            instancePath: '/email',
            message: 'Email already registered in system',
            keyword: 'backend',
            schemaPath: '#/properties/email',
        },
    ];

    // Handle form changes
    const handleChange = ({ data, errors }) => {
        setData(prev => data);
    };

    const handleChange2 = ({ data, errors }) => {
        setData2(prev => data);
    };

    // Reset form to initial state
    const handleReset = () => {
        setData(initialData);
        setErrors([]);
    };

    // Compile the schema for validation
    const validate = ajv.compile(schemas.schema);

    const renderers = [
        ...materialRenderers,
        //register custom renderers
        { tester: IFrameControlTester, renderer: IFrameControl },

    ];
    console.log({ validate });

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <JsonForms
                schema={schemas.schema}
                uiSchema={schemas.uiSchema}
                data={data}
                renderers={renderers}
                ajv={ajv}
                // validationMode="ValidateAndShow"
                // additionalErrors={backendErrors}
                onChange={handleChange}
            />
            <br />
            <br />
            <br />

            <JsonForms
                schema={schema2}
                uiSchema={uischema2}
                data={data2}
                renderers={renderers}
                ajv={ajv}
                // validationMode="ValidateAndShow"
                // additionalErrors={backendErrors}
                onChange={handleChange2}
            />

            {/* Reset Button */}
            {/* <div className="mt-4">
                <button
                    type="button"
                    onClick={handleReset}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Reset Form
                </button>
            </div> */}

            {/* Display validation errors */}
            <div className="mt-4">
                {errors.length > 0 && (
                    <div className="bg-red-50 p-4 rounded-md">
                        <h3 className="text-red-800 font-medium">Validation Errors:</h3>
                        <ul className="mt-2 text-red-700">
                            {errors.map((error, index) => (
                                <li key={index}>
                                    {error.instancePath}: {error.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Display current form data for debugging */}
            <pre className="mt-4 p-4 bg-gray-100 rounded-md">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default CustomJsonForm;