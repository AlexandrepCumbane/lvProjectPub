import { forwarding_lvform} from "./forwarding.lvform.config"
export default {
  pages: {
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
          bind: {
            required: true,
          },
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
          hint: "The groups this user belongs to. A user will get all permissions granted to each of their groups.",
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
      ],
      verbose_name: "Case",
      verbose_name_plural: "lvforms",
    },
    lvform_forwarding: forwarding_lvform,
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
        }
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
          name: "id",
          label: "Task #",
          type: "string",
        },
        {
          name: "datetime_created",
          label: "Created at",
          hint: "Created at",
          type: "datetime",
        },
        {
          name: "task_title",
          label: "Task Title",
          choices: [
            {
              name: "Request for information",
              label: "Request for information",
            },
            {
              name: "Send Feedback",
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
          "wq:ForeignKey": "operator",
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
    focalpoints: {
      name: "focalpoint",
      url: "users/0/get_focalpoints",
      list: true,
      form: [],
    },

    article: {
      cache: "all",
      name: "article",
      url: "articles",
      list: true,
      form: [
        {
          name: "title",
          label: "Title",
          bind: {
            required: true,
          },
          "wq:length": 100,
          type: "string",
        },
        {
          name: "text",
          label: "Article Description",
          type: "text",
        },
        {
          name: "category",
          label: "Category",
          bind: {
            required: true,
          },
          type: "string",
          "wq:ForeignKey": "clustersector",
        },
        {
          name: "language",
          label: "Language",
          choices: [
            {
              name: "pt",
              label: "Portuguese",
            },
            {
              name: "en",
              label: "English",
            },
          ],
          type: "select one",
        },
        {
          name: "file",
          label: "File",
          // bind: {
          //   required: true,
          // },
          type: "binary",
        },
        {
          name: "aproved_by",
          label: "Aproved By",
          bind: {
            required: true,
          },
          type: "string",
          "wq:ForeignKey": "customuser",
        },
        {
          name: "published_date",
          label: "Published Date",
          type: "date",
        },
        {
          name: "expiration_date",
          label: "Expiration Date",
          type: "date",
        },
        {
          name: "published",
          label: "Published",
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
          name: "active_revision",
          label: "Active Revision",
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
          name: "external_link",
          label: "External Link",
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
      ],
      verbose_name: "article",
      verbose_name_plural: "articles",
    },
    articlefile: {
      name: "articlefile",
      url: "articlefiles",
      list: true,
      form: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "file",
          label: "File",
          type: "binary",
        },
      ],
      verbose_name: "article file",
      verbose_name_plural: "article files",
    },
    category: {
      name: "category",
      url: "categorys",
      list: true,
      form: [
        {
          name: "name",
          label: "Name",
          hint: "Name",
          "wq:length": 255,
          type: "string",
        },
      ],
      verbose_name: "category",
      verbose_name_plural: "categorys",
    },
    operator: {
      name: "operator",
      url: "users/0/get_operators",
      list: true,
    },
    clusterregion: {
      cache: "all",
      name: "clusterregion",
      url: "clusterregions",
      list: true,
      form: [
        {
          name: "cluster_agency",
          label: "Cluster Agency",
          hint: "cluster_agency",
          type: "string",
          "wq:ForeignKey": "clusteragency",
          bind: {
            required: true,
          },
        },
        {
          name: "name",
          label: "Region Name",
          "wq:length": 254,
          type: "string",
          bind: {
            required: true,
          },
        },
        {
          name: "focalpoints",
          label: "Focalpoints",
          type: "select",
        },
        {
          name: "partners",
          label: "Partners",
          type: "select",
        },
      ],
      verbose_name: "cluster region",
      verbose_name_plural: "cluster regions",
    },

    clusteragency: {
      cache: "all",
      name: "clusteragency",
      url: "clusteragencys",
      list: true,
      form: [
        {
          name: "cluster_sector",
          label: "Cluster Sector",
          hint: "cluster_sector",
          type: "string",
          "wq:ForeignKey": "clustersector",
          bind: {
            required: true,
          },
        },
        {
          name: "name",
          label: "Name",
          "wq:length": 254,
          type: "string",
          bind: {
            required: true,
          },
        },
      ],
      verbose_name: "cluster agency",
      verbose_name_plural: "cluster agencys",
    },

    agencypartner: {
      cache: "all",
      name: "agencypartner",
      url: "user/0/agencypartner",
      list: true,
      form: [
        {
          name: "region",
          label: "Name",
          "wq:length": 254,
          type: "foreign",
        },
        {
          name: "partner",
          label: "Partners",
          hint: "User",
          type: "string",
          "wq:ForeignKey": "partner",
        },
      ],
    },
    agencyfocalpoint: {
      cache: "all",
      name: "agencyfocalpoint",
      url: "user/0/agencyfocalpoint",
      list: true,
      form: [
        {
          name: "region",
          label: "Name",
          "wq:length": 254,
          type: "foreign",
        },
        {
          name: "focalpoint",
          label: "Focalpoints",
          hint: "User",
          type: "string",
          "wq:ForeignKey": "focalpoint",
        },
      ],
    },
    clustersector: {
      cache: "all",
      name: "clustersector",
      url: "clustersectors",
      list: true,
      form: [
        {
          name: "name",
          label: "Name",
          "wq:length": 254,
          type: "string",
        },
        {
          name: "cluster_agency",
          label: "Cluster Agency",
          type: "repeat",
          children: [
            {
              name: "name",
              label: "Name",
              "wq:length": 254,
              type: "string",
            },
            {
              name: "cluster_sector",
              label: "Cluster Sector",
              hint: "cluster_sector",
              type: "string",
              "wq:ForeignKey": "clustersector",
            },
            {
              name: "cluster_region",
              label: "Cluster Region",
              type: "repeat",
              children: [
                {
                  name: "name",
                  label: "Name",
                  "wq:length": 254,
                  type: "string",
                },
                {
                  name: "cluster_agency",
                  label: "Cluster Agency",
                  hint: "cluster_agency",
                  type: "string",
                  "wq:ForeignKey": "clusteragency",
                },
                {
                  name: "focalpoints_label",
                  label: "Focalpoints Label",
                  bind: {
                    required: true,
                  },
                  type: "string",
                },
                {
                  name: "partners_label",
                  label: "Partners Label",
                  bind: {
                    required: true,
                  },
                  type: "string",
                },
                {
                  name: "focalpoints",
                  label: "Focalpoints",
                  type: "repeat",
                  children: [
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
                      hint: "The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                      type: "string",
                    },
                    {
                      name: "groups_label",
                      label: "Groups Label",
                      bind: {
                        required: true,
                      },
                      type: "string",
                    },
                  ],
                },
                {
                  name: "partners",
                  label: "Partners",
                  type: "repeat",
                  children: [
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
                      hint: "The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                      type: "string",
                    },
                    {
                      name: "groups_label",
                      label: "Groups Label",
                      bind: {
                        required: true,
                      },
                      type: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      verbose_name: "cluster sector",
      verbose_name_plural: "cluster sectors",
    },
  },
  debug: true,
};
