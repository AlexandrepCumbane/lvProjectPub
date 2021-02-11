export const operator = {
  name: "lvform",
  url: "lvforms",
  list: true,
  form: [
    {
      name: "case_number",
      label: "Case Number",
      hint: "Case number",
      type: "int",
    },
    {
      name: "datetime_created",
      label: "Created at",
      hint: "Created at",
      type: "datetime",
    },
    {
      name: "provincia",
      label: "Province",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "province",
      children: "district",
    },
    {
      name: "distrito",
      label: "District",
      bind: {
        required: true,
      },
      hint: "District",
      type: "string",
      "wq:ForeignKey": "district",
      has_parent: true,
      children: "location",
    },
    {
      name: "localidade",
      label: "Locality",
      hint: "Locality",
      type: "string",
      "wq:ForeignKey": "location",
      has_parent: true,
    },
    {
      name: "sector",
      label: "Sector",
      bind: {
        required: true,
      },
      choices: [
        {
          name: "1",
          label: "Shelter",
        },
        {
          name: "2",
          label: "WASH",
        },
        {
          name: "3",
          label: "Education",
        },
        {
          name: "4",
          label: "Food Security",
        },
        {
          name: "5",
          label: "Health",
        },
        {
          name: "6",
          label: "Child Protection",
        },
        {
          name: "7",
          label: "Gender-based violence",
        },
        {
          name: "8",
          label: "Protection from Sexual Exploitation and Abuse",
        },
        {
          name: "9",
          label: "Protection",
        },
        {
          name: "10",
          label: "CCCM",
        },
        {
          name: "11",
          label: "Resilience",
        },
        {
          name: "12",
          label: "INGD",
        },
        {
          name: "13",
          label: "IDP Registration",
        },
        {
          name: "14",
          label: "Social Protection/INAS",
        },
        {
          name: "15",
          label: "Other",
        },
      ],
      type: "select one",
    },
    {
      name: "category",
      label: "Case category",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "casetipology",
      children: "subcategory",
    },
    {
      name: "subcategory",
      label: "Sub-category",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "subcategory",
      has_parent: true,
      children: "subcategoryissue",
    },
    {
      name: "subcategory_issue",
      label: "Sub-category issue",
      type: "string",
      "wq:ForeignKey": "subcategoryissue",
      has_parent: true,
    },
    {
      name: "vulnerability",
      label: "Vulnerability",
      bind: {
        required: true,
      },
      hint: "Vulnerability",
      choices: [
        {
          name: "1",
          label: "Person with disability",
        },
        {
          name: "2",
          label: "Child headed household",
        },
        {
          name: "3",
          label: "Single parent",
        },
        {
          name: "4",
          label: "Pregnant or lactating woman",
        },
        {
          name: "5",
          label: "Elderly head of household",
        },
        {
          name: "6",
          label: "Chronic patient",
        },
        {
          name: "7",
          label: "None",
        },
        {
          name: "8",
          label: "Other",
        },
      ],
      type: "select one",
    },
    {
      name: "call_notes",
      label: "Call Notes",
      bind: {
        required: true,
      },
      type: "text",
    },
    {
      name: "case_priority",
      label: "Case Priority",
      bind: {
        required: true,
      },
      choices: [
        {
          name: "1",
          label: "Medium",
        },
        {
          name: "2",
          label: "High",
        },
        {
          name: "3",
          label: "Low",
        },
      ],
      type: "select one",
    },
    {
      name: "lvform_status",
      label: "Status",
      choices: [
        {
          name: "1",
          label: "Not started",
        },
        {
          name: "2",
          label: "In Progress",
        },
        {
          name: "3",
          label: "Closed",
        },
      ],
      type: "select one",
    },
    {
      name: "contact_group",
      label: "Who is contacting",
      choices: [
        {
          name: "1",
          label: "Beneficiary",
        },
        {
          name: "2",
          label: "Representative of beneficiary",
        },
        {
          name: "3",
          label: "Non beneficiary",
        },
        {
          name: "4",
          label: "Community leader",
        },
        {
          name: "5",
          label: "Humanitarian partner",
        },
        {
          name: "6",
          label: "Other",
        },
      ],
      type: "select one",
    },
    {
      name: "gender",
      label: "Gender",
      bind: {
        required: true,
      },
      hint: "Gender",
      choices: [
        {
          name: "male",
          label: "Male",
        },
        {
          name: "female",
          label: "Female",
        },
        {
          name: "other",
          label: "Not specified",
        },
      ],
      type: "select one",
    },
    {
      name: "age_group",
      label: "Age",
      hint: "Age",
      bind: {
        required: true,
      },
      choices: [
        {
          name: "1",
          label: "17 and below",
        },
        {
          name: "2",
          label: "18 - 59",
        },
        {
          name: "3",
          label: "60 and above",
        },
        {
          name: "4",
          label: "Not disclosed",
        },
      ],
      type: "select one",
    },

    {
      name: "community",
      label: "Community",
      hint: "Community",
      "wq:length": 255,
      type: "string",
    },
    {
      name: "distribution_point",
      label: "Distribution Point",
      hint: "Distribution Point",
      "wq:length": 255,
      type: "string",
    },
    {
      name: "transfermod",
      label: "Transfer modality",
      hint: "Transfer modality",
      choices: [
        {
          name: "1",
          label: "Food",
        },
        {
          name: "2",
          label: "Value voucher",
        },
        {
          name: "3",
          label: "Money",
        },
        {
          name: "4",
          label: "Commodity voucher",
        },
        {
          name: "5",
          label: "Non-food Items",
        },
        {
          name: "6",
          label: "Not relevant",
        },
        {
          name: "7",
          label: "FFA",
        },
        {
          name: "8",
          label: "School feeding",
        },
      ],
      type: "select one",
    },
    {
      name: "location_type",
      label: "Accommodation or resettlement centre",
      hint: "Accommodation or resettlement centre",
      choices: [
        {
          name: "1",
          label: "Yes",
        },
        {
          name: "2",
          label: "No",
        },
        {
          name: "3",
          label: "Not relevant",
        },
      ],
      type: "select one",
    },
    {
      name: "ressetlement_name",
      label: "Resettlement name",
      hint: "Resettlement name",
      "wq:length": 255,
      type: "string",
    },

    {
      name: "call_solution",
      label: "Call Solution",
      type: "text",
    },

    {
      name: "is_closed",
      label: "Is Closed",
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
      has_boolean_options: true,
    },
    {
      name: "case_close_category",
      label: "Case Close Category",
      choices: [
        {
          name: "1",
          label: "With Feedback",
        },
        {
          name: "2",
          label: "Without Feedback",
        },
      ],
      type: "select one",
      depends_on: "is_closed",
    },
    {
      name: "means_of_communication",
      label: "How did they contact us?",
      hint: "How did they contact us?",
      choices: [
        {
          name: "1",
          label: "Linha verde (own phone)",
        },
        {
          name: "2",
          label: "Linha verde (borrowed phone)",
        },
        {
          name: "3",
          label: "WFP hotline (own phone)",
        },
        {
          name: "4",
          label: "WFP hotline (borrowed phone)",
        },
        {
          name: "5",
          label: "Helpdesk",
        },
        {
          name: "6",
          label: "SMS",
        },
        {
          name: "7",
          label: "Email",
        },
        {
          name: "8",
          label: "Suggestion box",
        },
      ],
      type: "select one",
    },
    {
      name: "how_knows_lv",
      label: "How did you hear about linha verde?",
      hint: "How did you hear about linha verde?",
      choices: [
        {
          name: "1",
          label: "Radio",
        },
        {
          name: "2",
          label: "Pamphlet",
        },
        {
          name: "3",
          label: "People working in the community",
        },
        {
          name: "4",
          label: "SMS",
        },
        {
          name: "5",
          label: "Posters or other visibility material",
        },
        {
          name: "6",
          label: "Suggestion box",
        },
      ],
      type: "select one",
    },
    {
      name: "how_callback",
      label: "How would you like to be contacted?",
      hint: "How would you like to be contacted?",
      choices: [
        {
          name: "1",
          label: "Same phone",
        },
        {
          name: "2",
          label: "Other phone ",
        },
      ],
      type: "select one",
    },
    {
      name: "other_contact",
      label: "Other number",
      hint: "Other number",
      type: "int",
    },
    {
      name: "call_feedback",
      label: "How do you feel you issue was managed during this call?",
      hint: "How do you feel you issue was managed during this call? ",
      choices: [
        {
          name: "1",
          label: "Very satisfied",
        },
        {
          name: "2",
          label: "Satisfied",
        },
        {
          name: "3",
          label: "Neutral",
        },
        {
          name: "4",
          label: "Unsatisfied",
        },
        {
          name: "5",
          label: "Very unsatisfied",
        },
      ],
      type: "select one",
    },
    {
      name: "callback_required",
      label: "Callback Required",
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
      has_boolean_options: true,
    },
    {
      name: "unavailable_contact",
      label: "Unavailable Contact",
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
      has_boolean_options: true,
    },
  ],
  verbose_name: "Case",
  verbose_name_plural: "lvforms",
};
export const partner = {
  name: "lvform",
  url: "lvforms",
  list: true,
  form: [
    {
      name: "case_number",
      label: "Case Number",
      hint: "Case number",
      type: "int",
    },
    {
      name: "datetime_created",
      label: "Created at",
      hint: "Created at",
      type: "datetime",
    },
    {
      name: "provincia",
      label: "Province",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "province",
      children: "district",
    },
    {
      name: "distrito",
      label: "District",
      bind: {
        required: true,
      },
      hint: "District",
      type: "string",
      "wq:ForeignKey": "district",
      has_parent: true,
      children: "location",
    },
    {
      name: "localidade",
      label: "Locality",
      hint: "Locality",
      type: "string",
      "wq:ForeignKey": "location",
      has_parent: true,
    },
    {
      name: "sector",
      label: "Sector",
      bind: {
        required: true,
      },
      choices: [
        {
          name: "1",
          label: "Shelter",
        },
        {
          name: "2",
          label: "WASH",
        },
        {
          name: "3",
          label: "Education",
        },
        {
          name: "4",
          label: "Food Security",
        },
        {
          name: "5",
          label: "Health",
        },
        {
          name: "6",
          label: "Child Protection",
        },
        {
          name: "7",
          label: "Gender-based violence",
        },
        {
          name: "8",
          label: "Protection from Sexual Exploitation and Abuse",
        },
        {
          name: "9",
          label: "Protection",
        },
        {
          name: "10",
          label: "CCCM",
        },
        {
          name: "11",
          label: "Resilience",
        },
        {
          name: "12",
          label: "INGD",
        },
        {
          name: "13",
          label: "IDP Registration",
        },
        {
          name: "14",
          label: "Social Protection/INAS",
        },
        {
          name: "15",
          label: "Other",
        },
      ],
      type: "select one",
    },
    {
      name: "category",
      label: "Case category",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "casetipology",
      children: "subcategory",
    },
    {
      name: "subcategory",
      label: "Sub-category",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "subcategory",
      has_parent: true,
      children: "subcategoryissue",
    },
    {
      name: "subcategory_issue",
      label: "Sub-category issue",
      type: "string",
      "wq:ForeignKey": "subcategoryissue",
      has_parent: true,
    },
    {
      name: "vulnerability",
      label: "Vulnerability",
      bind: {
        required: true,
      },
      hint: "Vulnerability",
      choices: [
        {
          name: "1",
          label: "Person with disability",
        },
        {
          name: "2",
          label: "Child headed household",
        },
        {
          name: "3",
          label: "Single parent",
        },
        {
          name: "4",
          label: "Pregnant or lactating woman",
        },
        {
          name: "5",
          label: "Elderly head of household",
        },
        {
          name: "6",
          label: "Chronic patient",
        },
        {
          name: "7",
          label: "None",
        },
        {
          name: "8",
          label: "Other",
        },
      ],
      type: "select one",
    },
    {
      name: "call_notes",
      label: "Call Notes",
      bind: {
        required: true,
      },
      type: "text",
    },
    {
      name: "case_priority",
      label: "Case Priority",
      bind: {
        required: true,
      },
      choices: [
        {
          name: "1",
          label: "Medium",
        },
        {
          name: "2",
          label: "High",
        },
        {
          name: "3",
          label: "Low",
        },
      ],
      type: "select one",
    },
    {
      name: "lvform_status",
      label: "Status",
      choices: [
        {
          name: "1",
          label: "Not started",
        },
        {
          name: "2",
          label: "In Progress",
        },
        {
          name: "3",
          label: "Closed",
        },
      ],
      type: "select one",
    },
    {
      name: "contact_group",
      label: "Who is contacting",
      choices: [
        {
          name: "1",
          label: "Beneficiary",
        },
        {
          name: "2",
          label: "Representative of beneficiary",
        },
        {
          name: "3",
          label: "Non beneficiary",
        },
        {
          name: "4",
          label: "Community leader",
        },
        {
          name: "5",
          label: "Humanitarian partner",
        },
        {
          name: "6",
          label: "Other",
        },
      ],
      type: "select one",
    },
    {
      name: "gender",
      label: "Gender",
      bind: {
        required: true,
      },
      hint: "Gender",
      choices: [
        {
          name: "male",
          label: "Male",
        },
        {
          name: "female",
          label: "Female",
        },
        {
          name: "other",
          label: "Not specified",
        },
      ],
      type: "select one",
    },
    {
      name: "age_group",
      label: "Age",
      hint: "Age",
      bind: {
        required: true,
      },
      choices: [
        {
          name: "1",
          label: "17 and below",
        },
        {
          name: "2",
          label: "18 - 59",
        },
        {
          name: "3",
          label: "60 and above",
        },
        {
          name: "4",
          label: "Not disclosed",
        },
      ],
      type: "select one",
    },

    {
      name: "community",
      label: "Community",
      hint: "Community",
      "wq:length": 255,
      type: "string",
    },
    {
      name: "distribution_point",
      label: "Distribution Point",
      hint: "Distribution Point",
      "wq:length": 255,
      type: "string",
    },
    {
      name: "transfermod",
      label: "Transfer modality",
      hint: "Transfer modality",
      choices: [
        {
          name: "1",
          label: "Food",
        },
        {
          name: "2",
          label: "Value voucher",
        },
        {
          name: "3",
          label: "Money",
        },
        {
          name: "4",
          label: "Commodity voucher",
        },
        {
          name: "5",
          label: "Non-food Items",
        },
        {
          name: "6",
          label: "Not relevant",
        },
        {
          name: "7",
          label: "FFA",
        },
        {
          name: "8",
          label: "School feeding",
        },
      ],
      type: "select one",
    },
    {
      name: "location_type",
      label: "Accommodation or resettlement centre",
      hint: "Accommodation or resettlement centre",
      choices: [
        {
          name: "1",
          label: "Yes",
        },
        {
          name: "2",
          label: "No",
        },
        {
          name: "3",
          label: "Not relevant",
        },
      ],
      type: "select one",
    },
    {
      name: "ressetlement_name",
      label: "Resettlement name",
      hint: "Resettlement name",
      "wq:length": 255,
      type: "string",
    },

    {
      name: "call_solution",
      label: "Call Solution",
      type: "text",
    },

    {
      name: "is_closed",
      label: "Is Closed",
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
      has_boolean_options: true,
    },
    {
      name: "case_close_category",
      label: "Case Close Category",
      choices: [
        {
          name: "1",
          label: "With Feedback",
        },
        {
          name: "2",
          label: "Without Feedback",
        },
      ],
      type: "select one",
      depends_on: "is_closed",
    },
    {
      name: "means_of_communication",
      label: "How did they contact us?",
      hint: "How did they contact us?",
      choices: [
        {
          name: "1",
          label: "Linha verde (own phone)",
        },
        {
          name: "2",
          label: "Linha verde (borrowed phone)",
        },
        {
          name: "3",
          label: "WFP hotline (own phone)",
        },
        {
          name: "4",
          label: "WFP hotline (borrowed phone)",
        },
        {
          name: "5",
          label: "Helpdesk",
        },
        {
          name: "6",
          label: "SMS",
        },
        {
          name: "7",
          label: "Email",
        },
        {
          name: "8",
          label: "Suggestion box",
        },
      ],
      type: "select one",
    },
    {
      name: "how_knows_lv",
      label: "How did you hear about linha verde?",
      hint: "How did you hear about linha verde?",
      choices: [
        {
          name: "1",
          label: "Radio",
        },
        {
          name: "2",
          label: "Pamphlet",
        },
        {
          name: "3",
          label: "People working in the community",
        },
        {
          name: "4",
          label: "SMS",
        },
        {
          name: "5",
          label: "Posters or other visibility material",
        },
        {
          name: "6",
          label: "Suggestion box",
        },
      ],
      type: "select one",
    },
    {
      name: "how_callback",
      label: "How would you like to be contacted?",
      hint: "How would you like to be contacted?",
      choices: [
        {
          name: "1",
          label: "Same phone",
        },
        {
          name: "2",
          label: "Other phone ",
        },
      ],
      type: "select one",
    },
    {
      name: "other_contact",
      label: "Other number",
      hint: "Other number",
      type: "int",
    },
    {
      name: "call_feedback",
      label: "How do you feel you issue was managed during this call?",
      hint: "How do you feel you issue was managed during this call? ",
      choices: [
        {
          name: "1",
          label: "Very satisfied",
        },
        {
          name: "2",
          label: "Satisfied",
        },
        {
          name: "3",
          label: "Neutral",
        },
        {
          name: "4",
          label: "Unsatisfied",
        },
        {
          name: "5",
          label: "Very unsatisfied",
        },
      ],
      type: "select one",
    },
    {
      name: "callback_required",
      label: "Callback Required",
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
      has_boolean_options: true,
    },
    {
      name: "unavailable_contact",
      label: "Unavailable Contact",
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
      has_boolean_options: true,
    },
  ],
  verbose_name: "Case",
  verbose_name_plural: "lvforms",
};
