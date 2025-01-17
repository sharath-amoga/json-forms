import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import config from './config'; // Import the config from another file

// Function to convert config to JSON Forms schema and UI schema
function convertConfigToJsonFormsSchema(config) {
  const schema = {
    type: 'object',
    properties: {},
    required: [],
  };

  const uischema = {
    type: 'VerticalLayout',
    elements: [],
  };

  config.forEach((item) => {
    if (item.hide) return;

    schema.properties[item.key] = {
      type: item.component === 'date-picker' ? 'string' : 'string',
      title: item.key.replace(/([A-Z])/g, ' $1').trim(),
    };

    const control = {
      type: 'Control',
      scope: `#/properties/${item.key}`,
    };

    if (item.component === 'select') {
      control.options = {
        format: 'select',
      };
    } else if (item.component === 'date-picker') {
      control.options = {
        format: 'date',
      };
    }

    uischema.elements.push(control);
  });

  return { schema, uischema };
}

// Main React component
const DynamicForm = () => {
  const [data, setData] = useState({});

  // Convert the imported config to JSON Forms schema and UI schema
  const { schema, uischema } = convertConfigToJsonFormsSchema(config.config);

  const handleChange = (state) => {
    setData(state.data);
  };

  return (
    <div>
      <h1>Dynamic Form</h1>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={handleChange}
        validationMode="ValidateAndShow"
      />
      <div>
        <h2>Form Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DynamicForm;