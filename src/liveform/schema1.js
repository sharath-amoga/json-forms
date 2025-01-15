const schema1 = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 4,
            "errorMessage": {
                "minLength": "Full Name must have at least 4 characters."
            }
        },
        "bio": {
            "type": "string",
            "errorMessage": {
                "type": "Bio must be a valid string."
            }
        },
        "country": {
            "type": "string",
            "enum": ["USA", "Canada", "UK", "Australia"],
            "errorMessage": {
                "enum": "Please select a valid country from the list."
            }
        }
    },
    "required": ["name", "country"],
    "errorMessage": {
        "required": {
            "name": "Full Name is required.",
            "country": "Country selection is mandatory."
        }
    }
};

const uischema1 = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "scope": "#/properties/name",
            "label": "Full Name"
        },
        {
            "type": "Control",
            "scope": "#/properties/bio",
            "label": "Bio",
            "options": {
                "multi": true // Renders as a textarea
            }
        },
        {
            "type": "Control",
            "scope": "#/properties/country",
            "label": "Country"
        }
    ]
}

export {
    schema1,
    uischema1
}