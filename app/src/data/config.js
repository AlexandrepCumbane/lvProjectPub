export default {
  pages: {
    login: {
      url: "login",
      name: "login",
    },
    logout: {
      url: "logout",
      name: "logout",
    },
    forwardinginstitution: {
      name: "forwardinginstitution",
      url: "forwardinginstitutions",
      list: true,
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
            name: "partner_feedback",
            label: "Parceiro Feedback",
            type: "text",
          },
          {
            name: "task_feedback",
            label: "Feedback da tarefa",
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
            label: "Cluster Sector",
            type: "string",
            "wq:ForeignKey": "clustersector",
            children: "cluster_agency",
          },
          {
            name: "cluster_agency",
            label: "Cluster Agency",
            type: "string",
            "wq:ForeignKey": "cluster_agency",
            children: "cluster_region",
            has_parent: true,
          },
          {
            name: "cluster_region",
            label: "Cluster Region",
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
        ],
      verbose_name: "forwardinginstitution",
      verbose_name_plural: "forwardinginstitutions",
    },
    casecomment: {
      name: "casecomment",
      url: "casecomments",
      list: true,
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
          name: "feedback",
          label: "Feedback",
          type: "text",
        },
      ],
      verbose_name: "casecomment",
      verbose_name_plural: "casecomments",
    },
    customuser: {
      cache: "all",
      name: "customuser",
      url: "users",
      list: true,
      form: [
        {
          name: "is_active",
          label: "Is Active",
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
        },
        {
          name: "email",
          label: "Email address",
          bind: {
            required: true,
          },
          "wq:length": 254,
          type: "string",
        },
        {
          name: "first_name",
          label: "First Name",
          "wq:length": 254,
          type: "string",
        },
        {
          name: "last_name",
          label: "Last Name",
          "wq:length": 30,
          type: "string",
        },
        {
          name: "groups",
          label: "Groups",
          hint:
            "The groups this user belongs to. A user will get all permissions granted to each of their groups.",
          type: "string",
          "wq:ForeignKey": "group",
        },
      ],
      verbose_name: "user",
      verbose_name_plural: "users",
    },
    province: {
      name: "province",
      url: "provinces",
      list: true,
      form: [
        {
          name: "name",
          label: "Name",
          bind: {
            required: true,
          },
          "wq:length": 25,
          type: "string",
        },
        {
          name: "district_set",
          label: "District Set",
          type: "repeat",
          children: [
            {
              name: "name",
              label: "Name",
              bind: {
                required: true,
              },
              "wq:length": 25,
              type: "string",
            },
            {
              name: "province",
              label: "Province",
              type: "string",
              "wq:ForeignKey": "province",
            },
            {
              name: "postoadministrativo_set",
              label: "Postoadministrativo Set",
              bind: {
                required: true,
              },
              type: "repeat",
              children: [
                {
                  name: "name",
                  label: "Name",
                  bind: {
                    required: true,
                  },
                  "wq:length": 25,
                  type: "string",
                },
                {
                  name: "district",
                  label: "District",
                  type: "string",
                  "wq:ForeignKey": "district",
                },
                {
                  name: "codigo",
                  label: "Codigo",
                  bind: {
                    required: true,
                  },
                  "wq:length": 25,
                  type: "string",
                },
                {
                  name: "parent_code",
                  label: "Parent Code",
                  bind: {
                    required: true,
                  },
                  "wq:length": 25,
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
      verbose_name: "province",
      verbose_name_plural: "provinces",
    },
    permission: {
      cache: "all",
      name: "permission",
      url: "permissions",
      list: true,
      form: [
        {
          name: "name",
          label: "Name",
          bind: {
            required: true,
          },
          "wq:length": 255,
          type: "string",
        },
        {
          name: "content_type",
          label: "Content Type",
          bind: {
            required: true,
          },
          type: "string",
          "wq:ForeignKey": "contenttype",
        },
        {
          name: "codename",
          label: "Codename",
          bind: {
            required: true,
          },
          "wq:length": 100,
          type: "string",
        },
      ],
      verbose_name: "permission",
      verbose_name_plural: "permissions",
    },
    lvform: {
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
          name: "who_not_receiving",
          label: "Who is not receiving assistance",
          hint: "Person not receiving",
          choices: [
            {
              name: "1",
              label: "Individual",
            },
            {
              name: "2",
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
              name: "1",
              label: "Local Leader",
            },
            {
              name: "2",
              label: "Community Member",
            },
            {
              name: "3",
              label: "Humanitarian actor",
            },
            {
              name: "4",
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
    },
    taskcomment: {
      name: "taskcomment",
      url: "taskcomments",
      list: true,
      form: [
        {
          name: "task",
          label: "Task",
          bind: {
            required: true,
          },
          type: "string",
          "wq:ForeignKey": "task",
        },
        {
          name: "feedback",
          label: "Feedback",
          type: "text",
        },
      ],
      verbose_name: "taskcomment",
      verbose_name_plural: "taskcomments",
    },
    locationtype: {
      cache: "all",
      name: "locationtype",
      url: "locationtypes",
      list: true,
      form: [
        {
          name: "name",
          label: "Name",
          bind: {
            required: true,
          },
          "wq:length": 20,
          type: "string",
        },
      ],
      verbose_name: "location type",
      verbose_name_plural: "location types",
    },
    subcategoryissue: {
      name: "subcategoryissue",
      url: "subcategoryissues",
      list: true,
      form: [
        {
          name: "subcategory",
          label: "Subcategory",
          bind: {
            required: true,
          },
          type: "string",
          "wq:ForeignKey": "subcategory",
        },
        {
          name: "subcategory_issue",
          label: "Sub Category Issue",
          bind: {
            required: true,
          },
          hint: "Sub Category Issue",
          type: "text",
        },
      ],
      verbose_name: "subcategoryissue",
      verbose_name_plural: "subcategoryissues",
    },
    casetipology: {
      name: "casetipology",
      url: "casetipologys",
      list: true,
      form: [
        {
          name: "category",
          label: "Case Category",
          bind: {
            required: true,
          },
          hint: "Case Category",
          type: "text",
        },
        {
          name: "subcategory_set",
          label: "Subcategory Set",
          type: "repeat",
          children: [
            {
              name: "casetipology",
              label: "Casetipology",
              bind: {
                required: true,
              },
              type: "string",
              "wq:ForeignKey": "casetipology",
            },
            {
              name: "subcategory",
              label: "Sub Category",
              bind: {
                required: true,
              },
              hint: "Sub Category",
              type: "text",
            },
            {
              name: "subcategoryissue_set",
              label: "Subcategoryissue Set",
              type: "repeat",
              children: [
                {
                  name: "subcategory",
                  label: "Subcategory",
                  bind: {
                    required: true,
                  },
                  type: "string",
                  "wq:ForeignKey": "subcategory",
                },
                {
                  name: "subcategory_issue",
                  label: "Sub Category Issue",
                  bind: {
                    required: true,
                  },
                  hint: "Sub Category Issue",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
      verbose_name: "linha verde case tipology",
      verbose_name_plural: "casetipologys",
    },
    group: {
      cache: "all",
      name: "group",
      url: "groups",
      list: true,
      form: [
        {
          name: "name",
          label: "Name",
          bind: {
            required: true,
          },
          "wq:length": 150,
          type: "string",
        },
        {
          name: "permissions",
          label: "Permissions",
          type: "string",
        },
        {
          name: "permissions_label",
          label: "Permissions Label",
          bind: {
            required: true,
          },
          type: "string",
        },
      ],
      verbose_name: "group",
      verbose_name_plural: "groups",
    },
    district: {
      cache: "all",
      name: "district",
      url: "districts",
      list: true,
      form: [
        {
          name: "name",
          label: "Name",
          bind: {
            required: true,
          },
          "wq:length": 25,
          type: "string",
        },
        {
          name: "province",
          label: "Province",
          type: "string",
          "wq:ForeignKey": "province",
        },
        {
          name: "postoadministrativo_set",
          label: "Postoadministrativo Set",
          bind: {
            required: true,
          },
          type: "repeat",
          children: [
            {
              name: "name",
              label: "Name",
              bind: {
                required: true,
              },
              "wq:length": 25,
              type: "string",
            },
            {
              name: "district",
              label: "District",
              type: "string",
              "wq:ForeignKey": "district",
            },
            {
              name: "codigo",
              label: "Codigo",
              bind: {
                required: true,
              },
              "wq:length": 25,
              type: "string",
            },
            {
              name: "parent_code",
              label: "Parent Code",
              bind: {
                required: true,
              },
              "wq:length": 25,
              type: "string",
            },
          ],
        },
      ],
      verbose_name: "district",
      verbose_name_plural: "districts",
    },
    subcategory: {
      name: "subcategory",
      url: "subcategorys",
      list: true,
      form: [
        {
          name: "casetipology",
          label: "Casetipology",
          bind: {
            required: true,
          },
          type: "string",
          "wq:ForeignKey": "casetipology",
        },
        {
          name: "subcategory",
          label: "Sub Category",
          bind: {
            required: true,
          },
          hint: "Sub Category",
          type: "text",
        },
        {
          name: "subcategoryissue_set",
          label: "Subcategoryissue Set",
          type: "repeat",
          children: [
            {
              name: "subcategory",
              label: "Subcategory",
              bind: {
                required: true,
              },
              type: "string",
              "wq:ForeignKey": "subcategory",
            },
            {
              name: "subcategory_issue",
              label: "Sub Category Issue",
              bind: {
                required: true,
              },
              hint: "Sub Category Issue",
              type: "text",
            },
          ],
        },
      ],
      verbose_name: "subcategory",
      verbose_name_plural: "subcategorys",
    },
    task: {
      name: "task",
      url: "tasks",
      list: true,
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
          name: "task_title",
          label: "Task Title",
          choices: [
            {
              name: "1",
              label: "Request for information",
            },
            {
              name: "2",
              label: "Send Feedback",
            },
          ],
          type: "select one",
        },
        {
          name: "description",
          label: "Description",
          type: "text",
        },
        {
          name: "assignee",
          label: "Assigned to",
          type: "string",
          "wq:ForeignKey": "customuser",
        },
        {
          name: "task_status",
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
              label: "Completed",
            },
          ],
          type: "select one",
        },
        {
          name: "task_priority",
          label: "Task Priority",
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
          name: "start_date",
          label: "Start Date",
          type: "date",
        },
        {
          name: "end_date",
          label: "End Date",
          type: "date",
        },
        {
          name: "call_attempts",
          label: "Number of attempts to reach the other person",
          type: "int",
        },
      ],
      verbose_name: "task",
      verbose_name_plural: "tasks",
    },
    locationclassification: {
      cache: "all",
      name: "locationclassification",
      url: "locationclassifications",
      list: true,
      form: [
        {
          name: "name",
          label: "Name",
          bind: {
            required: true,
          },
          "wq:length": 20,
          type: "string",
        },
      ],
      verbose_name: "location classification",
      verbose_name_plural: "location classifications",
    },
    forwardcasetofocalpoint: {
      name: "forwardcasetofocalpoint",
      url: "forwardcasetofocalpoints",
      list: true,
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
          name: "cluster_sector",
          label: "Cluster Sector",
          type: "string",
          "wq:ForeignKey": "clustersector",
          children: "cluster_agency",
        },
        {
          name: "cluster_agency",
          label: "Cluster Agency",
          type: "string",
          children: "cluster_region",
          "wq:ForeignKey": "cluster_agency",
          has_parent: true,
        },
        {
          name: "cluster_region",
          label: "Cluster Region",
          type: "string",
          has_parent: true,
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
      ],
      verbose_name: "forward case to focalpoint",
      verbose_name_plural: "forward case to focalpoints",
    },
    contenttype: {
      cache: "all",
      name: "contenttype",
      url: "contenttypes",
      list: true,
      form: [
        {
          name: "app_label",
          label: "App Label",
          bind: {
            required: true,
          },
          "wq:length": 100,
          type: "string",
        },
        {
          name: "model",
          label: "Python model class name",
          bind: {
            required: true,
          },
          "wq:length": 100,
          type: "string",
        },
      ],
      verbose_name: "content type",
      verbose_name_plural: "content types",
    },
    location: {
      cache: "all",
      name: "location",
      url: "locations",
      list: true,
      form: [
        {
          name: "classification",
          label: "Classification",
          type: "string",
          "wq:ForeignKey": "locationclassification",
        },
        {
          name: "district",
          label: "District",
          type: "string",
          "wq:ForeignKey": "district",
        },
        {
          name: "location_type",
          label: "Location Type",
          type: "string",
          "wq:ForeignKey": "locationtype",
        },
        {
          name: "codigo",
          label: "Codigo",
          "wq:length": 20,
          type: "string",
        },
        {
          name: "name",
          label: "Name",
          bind: {
            required: true,
          },
          "wq:length": 200,
          type: "string",
        },
        {
          name: "province",
          label: "Province",
          type: "string",
          "wq:ForeignKey": "province",
        },
        {
          name: "parent_code",
          label: "Parent Code",
          "wq:length": 20,
          type: "string",
        },
      ],
      verbose_name: "location",
      verbose_name_plural: "locations",
    },

    partners: {
      name: "partner",
      url: "users/0/get_partners",
      list: true,
      form: [],
    },
    clustersector: {
      name: "clustersector",
      url: "clustersectors",
      list: true,
      form: [],
    },
  },
  debug: true,
};
