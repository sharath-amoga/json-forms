import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';

// Mock API responses (with data persistence)
const mockResponses = {
  initial: {
    data: { email: '', isOTPInputVisible: false, isSignInEnabled: false },
    schema: {
      type: 'object',
      properties: { email: { type: 'string', format: 'email' } },
      required: ['email']
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [{
        type: 'Control',
        scope: '#/properties/email',
        label: 'Email'
      }]
    }
  },
  otpSent: (currentData) => ({
    data: { ...currentData, isOTPInputVisible: true, isSignInEnabled: false },
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        otp: { type: 'string', minLength: 6, maxLength: 6 }
      },
      required: ['email', 'otp']
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        { type: 'Control', scope: '#/properties/email', label: 'Email' },
        { type: 'Control', scope: '#/properties/otp', label: 'OTP' }
      ]
    }
  }),
  otpVerified: (currentData) => ({
    data: { ...currentData, isOTPInputVisible: false, isSignInEnabled: true },
    schema: {
      type: 'object',
      properties: { email: { type: 'string', format: 'email' } },
      required: ['email']
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [{
        type: 'Control', scope: '#/properties/email', label: 'Email'
      }]
    }
  })
};

// Mock API functions (persist previous data)
const fetchInitialState = () => 
  new Promise(resolve => 
    setTimeout(() => resolve(mockResponses.initial), 500)
  );

const sendOTP = (currentData) => 
  new Promise(resolve => 
    setTimeout(() => resolve(mockResponses.otpSent(currentData)), 500)
  );

const submitOTP = (currentData) => 
  new Promise(resolve => 
    setTimeout(() => resolve(mockResponses.otpVerified(currentData)), 500)
  );

// Custom Button Component
const CustomButton = ({ label, onClick, disabled }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    style={{ marginTop: '10px', padding: '8px 16px' }}
  >
    {label}
  </button>
);

const EmailLoginWithOTP = () => {
  const [backendState, setBackendState] = useState({ data: {}, schema: {}, uischema: {} });
  const [loading, setLoading] = useState(true);

  // Initialize form
  useEffect(() => {
    const initialize = async () => {
      const response = await fetchInitialState();
      setBackendState(response);
      setLoading(false);
    };
    initialize();
  }, []);

  const handleSendOTP = async () => {
    setLoading(true);
    const response = await sendOTP(backendState.data);
    setBackendState(response);
    setLoading(false);
  };

  const handleSubmitOTP = async () => {
    setLoading(true);
    const response = await submitOTP(backendState.data);
    setBackendState(response);
    setLoading(false);
  };

  const handleSignIn = () => {
    console.log('Signing in with:', backendState.data.email);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <JsonForms
        data={backendState.data}
        schema={backendState.schema}
        uischema={backendState.uischema}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setBackendState(prev => ({ ...prev, data }))}
      />

      <div style={{ marginTop: '20px' }}>
        {!backendState.data.isOTPInputVisible && (
          <CustomButton
            label="Send OTP"
            onClick={handleSendOTP}
            disabled={!backendState.data.email?.includes('@')}
          />
        )}

        {backendState.data.isOTPInputVisible && (
          <CustomButton
            label="Submit OTP"
            onClick={handleSubmitOTP}
            disabled={!backendState.data.otp || backendState.data.otp.length !== 6}
          />
        )}

        {backendState.data.isSignInEnabled && (
          <CustomButton
            label="Sign In"
            onClick={handleSignIn}
            disabled={!backendState.data.isSignInEnabled}
          />
        )}
      </div>
    </div>
  );
};

export default EmailLoginWithOTP;