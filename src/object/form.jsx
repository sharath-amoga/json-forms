import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import config from './config';
import { Button } from '@mui/material';


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

    if (item.component === 'select' && item.options) {
      schema.properties[item.key].enum = item.options.map((opt) => opt.value);
      schema.properties[item.key].enumNames = item.options.map((opt) => opt.label);
    }

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


const DynamicForm = () => {
  const [data, setData] = useState({});


  const { schema, uischema } = convertConfigToJsonFormsSchema(config.config);

  const handleChange = (state) => {
    setData(state.data);
  };

  function setDefaultValuesAfterDelay(data, defaultValues, setData, delay = 2000) {
    setTimeout(() => {
      const updatedData = { ...data, ...defaultValues };
      setData(updatedData);
    }, delay);
  }

  useEffect(() => {
    const defaultValues = {
      name: "John Doe",
      status: "open",
      priority: "medium",
      dueDate: "2023-12-31",
      assignee: "Alice",
    };


    setDefaultValuesAfterDelay(data, defaultValues, setData);
  }, []);

  const handleSubmit = () =>{
    console.log(data);
  }

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
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '16px' }}
      >
        Submit
      </Button>
      <div>
        <h2>Form Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DynamicForm;