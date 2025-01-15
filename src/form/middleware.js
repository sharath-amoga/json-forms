import { createForm, dispatch } from '@jsonforms/core';

const customMiddleware = (next) => (state, action) => {
  // Custom logic for state updates
  if (action.type === 'DATA_CHANGED') {
    const { data } = action.payload;
    if (data.country === "USA") {
      data.state = ""; // Reset state when country changes
      data.city = ""; // Reset city when country changes
    }
  }

  // Custom validation
  if (action.type === 'VALIDATE') {
    const { data } = state;
    if (data.email && !data.email.includes("@")) {
      return {
        ...state,
        errors: { email: "Invalid email format" }
      };
    }
  }

  return next(state, action);
};