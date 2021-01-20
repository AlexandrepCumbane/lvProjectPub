# LvForm

LvForm is the main form for collecting data and registering cases from intake form fields to vulavula system.

The form is generated and rendered from dump script on backend models to the data/config.js on app folder. The enables to update dynimically all fields on form.

This doc guides on how to customize some unexpected behaviour on frontend forms.

## Dependent Fields

### Cascade dependent fields

To create cascade dependencies on frontend form, you must add some tags

Example:

|      Category       |   Subcategories   |
| :-----------------: | :---------------: |
| Request Information | Covid Information |
|                     |  Food Programme   |
|                     |       Other       |

To provide the dependencie between category and subcategory you must:

```javascript

form: {
      name: "form_name",
      url: "form_url",
      list: true,
      form: [
        {
          name: "category",
          label: "Category",
          bind: {
            required: true,
          },
          type: "string",
          "wq:ForeignKey": "category",


          children: "subcategory", // tells that this field has children and the option values in field must be renderend after the it's value selection
        },
        {
          name: "subcategory",
          label: "Sub-category",
          bind: {
            required: true,
          },
          type: "string",
          "wq:ForeignKey": "subcategory",
          has_parent: true, // tells that this field has_parent
        },

      ],
      verbose_name: "form_verbose_name",
      verbose_name_plural: "form_verbose_name_plural",
    },

```

Note:

- To enable children field rendering, on backend list serializer the parent field must have a list of children queryset values.
- The children value must corresponds to the "wq:ForeignKey" value in children field

### Hide/Show dependent fields

To hide/show a field after update checkbox field you must set your fields:

Example: consent_pi if true shows fullname and contact else hide

```javascript

form: {
      name: "form_name",
      url: "form_url",
      list: true,
      form: [
        {
          name: "consent_pi",
          label: "Consent Pi",
          choices: [
            {
              name: true,
              label: "Yes",
            },
            {
              name: false,
              label: "No",
            },
          ],
          type: "select one",
          has_boolean_options: true, // this enables consent_pi to be a checkbox field
        },
       {
          name: "fullname",
          label: "Full Name",
          bind: {
            required: true,
          },
          hint: "Full Name",
          "wq:length": 255,
          type: "string",
          depends_on: "consent_pi", // tells the render function that this field will be shown if consent_pi is true
        },
        {
          name: "contact",
          label: "Contact",
          bind: {
            required: true,
          },
          hint: "Contact",
          type: "int",
          depends_on: "consent_pi", // tells the render function that this field will be shown if consent_pi is true
        },

      ],
      verbose_name: "form_verbose_name",
      verbose_name_plural: "form_verbose_name_plural",
    },

```
