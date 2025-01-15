import { rankWith, scopeEndsWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

export const IFrame = ({ data, handleChange, path }) => {
  return (
    <iframe
      id='inlineFrameExample'
      title='Inline Frame Example'
      width='600'
      height='200'
      src='https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik'
    ></iframe>
  );
};

const IFrameController = ({ data, handleChange, path }) => {
  return (
    <iframe
      id='inlineFrameExample'
      title='Inline Frame Example'
      width='600'
      height='200'
      src='https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik'
    ></iframe>
  );
};

export const IFrameControl = withJsonFormsControlProps(IFrameController);

export const IFrameControlTester = rankWith(
  3, //increase rank as needed
  scopeEndsWith('button')
);
