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
    {
      name: "created_by",
      label: "Created by",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "customuser",
    },
    {
      name: "casecomment_set",
      label: "Comments",
      hint: "Comments",
      // "wq:ForeignKey": "casecomment",
      list: true,
      type: "string",
      depends_on: "consent_pi",
    },
  ],
  verbose_name: "Case",
  verbose_name_plural: "lvforms",
};

export const manager = {
  name: "lvform",
  url: "lvforms",
  list: true,
  form: [
    {
      name: "case_number",
      label: "case_number",
      hint: "Case number",
      type: "int",
    },
    {
      name: "id",
      label: "id",
      hint: "id",
      type: "int",
    },
    {
      name: "datetime_created",
      label: "datetime_created",
      hint: "Created at",
      type: "datetime",
    },
    {
      name: "response",
      label: "response",
      type: "string",
    },
    {
      name: "provincia",
      label: "provincia",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "province",
      children: "district",
    },
    {
      name: "distrito",
      label: "distrito",
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
      label: "localidade",
      hint: "Locality",
      type: "string",
      "wq:ForeignKey": "location",
      has_parent: true,
    },
    {
      name: "community",
      label: "community",
      hint: "Community",
      "wq:length": 255,
      type: "string",
    },
    {
      name: "distribution_point",
      label: "distribution_point",
      hint: "Distribution Point",
      "wq:length": 255,
      type: "string",
    },
    {
      name: "location_type",
      label: "location_type",
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
      label: "ressetlement_name",
      hint: "Resettlement name",
      "wq:length": 255,
      type: "string",
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
      label: "category",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "casetipology",
      children: "subcategory",
    },
    {
      name: "othercategory",
      label: "othercategory",
      type: "string",
    },
    {
      name: "subcategory",
      label: "subcategory",
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
      label: "subcategory_issue",
      type: "string",
      "wq:ForeignKey": "subcategoryissue",
      has_parent: true,
    },
    {
      name: "individual_commiting_malpractice",
      label: "individual_commiting_malpractice",
      hint: "LBL_Individual committing malpractice",
      choices: [
        {
          name: "Local Leader",
          label: "Local Leader",
        },
        {
          name: "Community Member",
          label: "Community Member",
        },
        {
          name: "Humanitarian actor",
          label: "Humanitarian actor",
        },
        {
          name: "Unknown",
          label: "Unknown",
        },
      ],
      type: "select one",
      depend_on_value: {
        field: "subcategory",
        value: ["5", "6", "3"],
      },
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
      label: "call_notes",
      bind: {
        required: true,
      },
      type: "text",
    },
    {
      name: "case_priority",
      label: "case_priority",
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
      name: "contact_group",
      label: "contact_group",
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
      name: "consent_pi",
      label: "consent_pi",
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
      name: "consent_share_pi",
      label: "consent_share_pi",
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
      depends_on: "consent_pi",
    },
    {
      name: "fullname",
      label: "fullname",
      hint: "Full Name",
      "wq:length": 255,
      type: "string",
      depends_on: "consent_pi",
    },
    {
      name: "contact",
      label: "Contact",
      hint: "Contact",
      type: "int",
      depends_on: "consent_pi",
    },
    {
      name: "gender",
      label: "gender",
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
      label: "age_group",
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
      name: "transfermod",
      label: "transfermod",
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
      name: "call_solution",
      label: "call_Solution",
      type: "text",
    },

    {
      name: "is_closed",
      label: "is_closed",
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
      label: "case_close_category",
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
      label: "means_of_communication",
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
      label: "how_knows_lv",
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
      label: "how_callback",
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
      label: "other_contact",
      hint: "Other number",
      type: "int",
    },
    {
      name: "call_feedback",
      label: "call_feedback",
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
      label: "callback_required",
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
      label: "unavailable_contact",
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
      name: "created_by",
      label: "created_by",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "customuser",
    },
    {
      name: "month",
      label: "month",
      hint: "Other number",
      type: "string",
    },
    {
      name: "casecomment_set",
      label: "Comments",
      hint: "Comments",
      // "wq:ForeignKey": "casecomment",
      list: true,
      type: "string",
      depends_on: "consent_pi",
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
      name: "individual_commiting_malpractice",
      label: "LBL_Individual committing malpractice",
      hint: "LBL_Individual committing malpractice",
      choices: [
        {
          name: "Local Leader",
          label: "Local Leader",
        },
        {
          name: "Community Member",
          label: "Community Member",
        },
        {
          name: "Humanitarian actor",
          label: "Humanitarian actor",
        },
        {
          name: "Unknown",
          label: "Unknown",
        },
      ],
      type: "select one",
      depend_on_value: {
        field: "subcategory",
        value: ["5", "6", "3"],
      },
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
    {
      name: "casecomment_set",
      label: "Comments",
      hint: "Comments",
      // "wq:ForeignKey": "casecomment",
      list: true,
      type: "string",
      depends_on: "consent_pi",
    },
  ],
  verbose_name: "Case",
  verbose_name_plural: "lvforms",
};

export const sent_to_focalpoint = {
  form: [
    {
      name: "lvform",
      label: "Lvform",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "lvform",
    },
    {
      name: "focalpoint",
      label: "Focal Point",
      bind: {
        required: true,
      },
      hint: "User",
      type: "string",
      "wq:ForeignKey": "focalpoints",
      has_parent: true,
    },
    {
      name: "datetime_created",
      label: "Sent at",
      hint: "Created at",
      type: "datetime",
    },
    {
      name: "cluster_sector",
      label: "Sector",
      type: "string",
      "wq:ForeignKey": "clustersector",
      children: "cluster_agency",
    },
    {
      name: "cluster_agency",
      label: "Agency",
      type: "string",
      children: "cluster_region",
      "wq:ForeignKey": "cluster_agency",
      has_parent: true,
    },
    {
      name: "cluster_region",
      label: "Region",
      type: "string",
      has_parent: true,
      children: "focalpoints",
      "wq:ForeignKey": "cluster_region",
    },

    {
      name: "created_by",
      label: "Forwarded by",
      type: "string",
      "wq:ForeignKey": "customuser",
    },
  ],
};

export const sent_to_partner = {
  form: [
    {
      name: "lvform",
      label: "Lvform",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "lvform",
    },
    {
      name: "datetime_created",
      label: "Sent at",
      hint: "Created at",
      type: "datetime",
    },
    {
      name: "partner_feedback",
      label: "Partner Feedback",
      type: "text",
    },
    {
      name: "task_feedback",
      label: "Focal Point Notes",
      type: "text",
    },
    {
      name: "has_feedback",
      label: "Has Feedback",
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
      name: "isFeedback_aproved",
      label: "Isfeedback Aproved",
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
      name: "cluster_sector",
      label: "Sector",
      type: "string",
      "wq:ForeignKey": "clustersector",
      children: "cluster_agency",
    },
    {
      name: "cluster_agency",
      label: "Agency",
      type: "string",
      "wq:ForeignKey": "cluster_agency",
      children: "cluster_region",
      has_parent: true,
    },
    {
      name: "cluster_region",
      label: "Region",
      type: "string",
      "wq:ForeignKey": "cluster_region",
      children: "partners",
      has_parent: true,
    },
    {
      name: "referall_to",
      label: "Referral to",
      hint: "User",
      type: "string",
      "wq:ForeignKey": "partners",
      has_parent: true,
    },
    {
      name: "created_by",
      label: "Forwarded by",
      type: "string",
      "wq:ForeignKey": "customuser",
    },
  ],
};
