
export const forwarding_lvform = {
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
      has_boolean_options: true,
    },
    {
      name: "consent_share_pi",
      label: "Consent Share Pi",
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
      label: "Full Name",
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
      name: "contact_group",
      label: "Who is contacting",
      choices: [
        {
          name: "Beneficiary",
          label: "Beneficiary",
        },
        {
          name: "Representative of beneficiary",
          label: "Representative of beneficiary",
        },
        {
          name: "Non beneficiary",
          label: "Non beneficiary",
        },
        {
          name: "Community leader",
          label: "Community leader",
        },
        {
          name: "Humanitarian partner",
          label: "Humanitarian partner",
        },
        {
          name: "Other",
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
          name: "17 and below",
          label: "17 and below",
        },
        {
          name: "18 - 59",
          label: "18 - 59",
        },
        {
          name: "60 and above",
          label: "60 and above",
        },
        {
          name: "Not disclosed",
          label: "Not disclosed",
        },
      ],
      type: "select one",
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
          name: "Food",
          label: "Food",
        },
        {
          name: "Value voucher",
          label: "Value voucher",
        },
        {
          name: "Money",
          label: "Money",
        },
        {
          name: "Commodity voucher",
          label: "Commodity voucher",
        },
        {
          name: "NFI",
          label: "NFI",
        },
        {
          name: "Not relevant",
          label: "Not relevant",
        },
        {
          name: "FFA",
          label: "FFA",
        },
        {
          name: "School feeding",
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
          name: "Yes",
          label: "Yes",
        },
        {
          name: "No",
          label: "No",
        },
        {
          name: "Not relevant",
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
      name: "sector",
      label: "Sector",
      bind: {
        required: true,
      },
      choices: [
        {
          name: "Shelter",
          label: "Shelter",
        },
        {
          name: "WASH",
          label: "WASH",
        },
        {
          name: "Education",
          label: "Education",
        },
        {
          name: "Food Security",
          label: "Food Security",
        },
        {
          name: "Health",
          label: "Health",
        },
        {
          name: "Child Protection",
          label: "Child Protection",
        },
        {
          name: "Gender-based violence",
          label: "Gender-based violence",
        },
        {
          name: "PSEA",
          label: "Protection from Sexual Exploitation and Abuse",
        },
        {
          name: "Protection",
          label: "Protection",
        },
        {
          name: "CCCM",
          label: "CCCM",
        },
        {
          name: "INGD",
          label: "INGD",
        },
        {
          name: "IDP Registration",
          label: "IDP Registration",
        },
        {
          name: "Social Protection/INAS",
          label: "Social Protection/INAS",
        },
        {
          name: "Other",
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
      name: "othercategory",
      label: "Other category",
      type: "string",
    },
    {
      name: "subcategory",
      label: "Sub-category",
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
      name: "who_not_receiving",
      label: "Who is not receiving assistance",
      hint: "Person not receiving",
      choices: [
        {
          name: "Individual",
          label: "Individual",
        },
        {
          name: "Community",
          label: "Community",
        },
      ],
      type: "select one",
      depend_on_value: {
        field: "subcategory",
        value: ["4"],
      },
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
          name: "Person with disability",
          label: "Person with disability",
        },
        {
          name: "Child headed household",
          label: "Child headed household",
        },
        {
          name: "Single parent",
          label: "Single parent",
        },
        {
          name: "Pregnant or lactating woman",
          label: "Pregnant or lactating woman",
        },
        {
          name: "Elderly head of household",
          label: "Elderly head of household",
        },
        {
          name: "Chronic patient",
          label: "Chronic patient",
        },
        {
          name: "IDP's",
          label: "IDP's",
        },
        {
          name: "None",
          label: "None",
        },
        {
          name: "Other",
          label: "Other",
        },
      ],
      type: "select one",
    },
    {
      name: "response",
      label: "Response",
      type: "string",
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
      name: "call_solution",
      label: "Call Solution",
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
          name: "Medium",
          label: "Medium",
        },
        {
          name: "High",
          label: "High",
        },
        {
          name: "Low",
          label: "Low",
        },
      ],
      type: "select one",
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
          name: "With Feedback",
          label: "With Feedback",
        },
        {
          name: "Without Feedback",
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
          name: "Linha verde (own phone)",
          label: "Linha verde (own phone)",
        },
        {
          name: "Linha verde (borrowed phone)",
          label: "Linha verde (borrowed phone)",
        },
        {
          name: "SMS",
          label: "SMS",
        },
        {
          name: "Email",
          label: "Email",
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
          name: "Radio",
          label: "Radio",
        },
        {
          name: "Pamphlet",
          label: "Pamphlet",
        },
        {
          name: "People working in the community",
          label: "People working in the community",
        },
        {
          name: "SMS",
          label: "SMS",
        },
        {
          name: "Posters or other visibility material",
          label: "Posters or other visibility material",
        },
        {
          name: "Suggestion box",
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
          name: "Same phone",
          label: "Same phone",
        },
        {
          name: "Other phone",
          label: "Other phone",
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
          name: "Very satisfied",
          label: "Very satisfied",
        },
        {
          name: "Satisfied",
          label: "Satisfied",
        },
        {
          name: "Neutral",
          label: "Neutral",
        },
        {
          name: "Unsatisfied",
          label: "Unsatisfied",
        },
        {
          name: "Very unsatisfied",
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
      name: "month",
      label: "Month",
      hint: "Other number",
      type: "string",
    },
    {
      name: "casecomment_set",
      label: "Comments",
      hint: "Comments",
      "wq:ForeignKey": "casecomment",
      list: true,
      type: "string",
      depends_on: "consent_pi",
    },
  ],
  verbose_name: "Case",
  verbose_name_plural: "lvforms",
}
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
        bind: {
          required: true,
        },
      },
      {
        name: "cluster_agency",
        label: "Agency",
        type: "string",
        children: "cluster_region",
        "wq:ForeignKey": "cluster_agency",
        has_parent: true,
        bind: {
          required: true,
        },
      },
      {
        name: "cluster_region",
        label: "Region",
        type: "string",
        has_parent: true,
        bind: {
          required: true,
        },
        children: "focalpoints",
        "wq:ForeignKey": "cluster_region",
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
  