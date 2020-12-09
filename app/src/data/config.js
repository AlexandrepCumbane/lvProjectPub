export default {
    "pages": {
        "login": {
            "url": "login",
            "name": "login"
        },
        "logout": {
            "url": "logout",
            "name": "logout"
        },
        "province": {
            "cache": "all",
            "name": "province",
            "url": "provinces",
            "list": true,
            "form": [
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "wq:length": 25,
                    "type": "string"
                }
            ],
            "verbose_name": "province",
            "verbose_name_plural": "provinces"
        },
        "locationclassification": {
            "cache": "all",
            "name": "locationclassification",
            "url": "locationclassifications",
            "list": true,
            "form": [
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "wq:length": 20,
                    "type": "string"
                }
            ],
            "verbose_name": "location classification",
            "verbose_name_plural": "location classifications"
        },
        "lvform": {
            "name": "lvform",
            "url": "lvforms",
            "list": true,
            "form": [
                {
                    "name": "consent_pi",
                    "label": "Consent to collect personal information",
                    "bind": {
                        "required": true
                    },
                    "hint": "Consent to collect personal information",
                    "choices": [
                        {
                            "name": "TRUE",
                            "label": "TRUE"
                        },
                        {
                            "name": "FALSE",
                            "label": "FALSE"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "consent_share_pi",
                    "label": "Consent to share personal information with third parties",
                    "bind": {
                        "required": true
                    },
                    "hint": "Consent to share personal information with third parties",
                    "choices": [
                        {
                            "name": "TRUE",
                            "label": "TRUE"
                        },
                        {
                            "name": "FALSE",
                            "label": "FALSE"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "fullname",
                    "label": "Full Name",
                    "bind": {
                        "required": true
                    },
                    "hint": "Full Name",
                    "wq:length": 255,
                    "type": "string"
                },
                {
                    "name": "contact",
                    "label": "Contact",
                    "bind": {
                        "required": true
                    },
                    "hint": "Contact",
                    "type": "int"
                },
                {
                    "name": "gender",
                    "label": "Gender",
                    "bind": {
                        "required": true
                    },
                    "hint": "Gender",
                    "choices": [
                        {
                            "name": "male",
                            "label": "Male"
                        },
                        {
                            "name": "female",
                            "label": "Female"
                        },
                        {
                            "name": "other",
                            "label": "Other"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "provincia",
                    "label": "Province",
                    "bind": {
                        "required": true
                    },
                    "type": "string",
                    "wq:ForeignKey": "province"
                },
                {
                    "name": "distrito",
                    "label": "District",
                    "bind": {
                        "required": true
                    },
                    "hint": "District",
                    "type": "string",
                    "wq:ForeignKey": "district"
                },
                {
                    "name": "localidade",
                    "label": "Locality",
                    "hint": "Locality",
                    "type": "string",
                    "wq:ForeignKey": "location"
                },
                {
                    "name": "community",
                    "label": "Community",
                    "hint": "Community",
                    "wq:length": 255,
                    "type": "string"
                },
                {
                    "name": "transfermod",
                    "label": "Transfer modality",
                    "bind": {
                        "required": true
                    },
                    "hint": "Transfer modality",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Comida"
                        },
                        {
                            "name": "2",
                            "label": "Senha de dinheiro"
                        },
                        {
                            "name": "3",
                            "label": "Dinheiro"
                        },
                        {
                            "name": "4",
                            "label": "Senha de bens"
                        },
                        {
                            "name": "5",
                            "label": "Bens N\u00e3o alimentares"
                        },
                        {
                            "name": "6",
                            "label": "Irrelevante"
                        },
                        {
                            "name": "7",
                            "label": "FFA"
                        },
                        {
                            "name": "8",
                            "label": "Alimenta\u00e7\u00e3o escolar"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "category",
                    "label": "Case category",
                    "bind": {
                        "required": true
                    },
                    "choices": [
                        {
                            "name": "1",
                            "label": "Positive feedback"
                        },
                        {
                            "name": "2",
                            "label": "Request for information"
                        },
                        {
                            "name": "3",
                            "label": "Compaint/negative feedback"
                        },
                        {
                            "name": "4",
                            "label": "Request for assistance"
                        },
                        {
                            "name": "5",
                            "label": "Data amendment"
                        },
                        {
                            "name": "6",
                            "label": "Technical problems"
                        },
                        {
                            "name": "7",
                            "label": "Other"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "subcategory",
                    "label": "Sub-category",
                    "bind": {
                        "required": true
                    },
                    "choices": [
                        {
                            "name": "1",
                            "label": "Other"
                        },
                        {
                            "name": "2",
                            "label": "SEA"
                        },
                        {
                            "name": "3",
                            "label": "Quality"
                        },
                        {
                            "name": "4",
                            "label": "Quantity"
                        },
                        {
                            "name": "5",
                            "label": "Safety problems"
                        },
                        {
                            "name": "6",
                            "label": "Abuse of power"
                        },
                        {
                            "name": "7",
                            "label": "Access"
                        },
                        {
                            "name": "8",
                            "label": "Lost card"
                        },
                        {
                            "name": "9",
                            "label": "Assistance card not working"
                        },
                        {
                            "name": "10",
                            "label": "Money"
                        },
                        {
                            "name": "11",
                            "label": "Distribution issue"
                        },
                        {
                            "name": "12",
                            "label": "Exclusion error"
                        },
                        {
                            "name": "13",
                            "label": "Undignified/ disrespect"
                        },
                        {
                            "name": "14",
                            "label": "Beneficiary card"
                        },
                        {
                            "name": "15",
                            "label": "Food"
                        },
                        {
                            "name": "16",
                            "label": "Use of personal data - who, what, how"
                        },
                        {
                            "name": "17",
                            "label": "Entitlement"
                        },
                        {
                            "name": "18",
                            "label": "Services"
                        },
                        {
                            "name": "19",
                            "label": "FFA Activity"
                        },
                        {
                            "name": "20",
                            "label": "Targeting criteria"
                        },
                        {
                            "name": "21",
                            "label": "HR"
                        },
                        {
                            "name": "22",
                            "label": "Symptoms"
                        },
                        {
                            "name": "23",
                            "label": "Prevention"
                        },
                        {
                            "name": "24",
                            "label": "Treatment"
                        },
                        {
                            "name": "25",
                            "label": "Availability of health services"
                        },
                        {
                            "name": "26",
                            "label": "Myths"
                        },
                        {
                            "name": "27",
                            "label": "Government guidance"
                        },
                        {
                            "name": "28",
                            "label": "Current situaton"
                        },
                        {
                            "name": "29",
                            "label": "Impact of Covid-19 on program"
                        },
                        {
                            "name": "30",
                            "label": "NFI"
                        },
                        {
                            "name": "31",
                            "label": "Flood assistance"
                        },
                        {
                            "name": "32",
                            "label": "Update HH, personal details"
                        },
                        {
                            "name": "33",
                            "label": "Delete personal information"
                        },
                        {
                            "name": "34",
                            "label": "Distribution timing"
                        },
                        {
                            "name": "35",
                            "label": "Duration of assistance"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "sector",
                    "label": "Sector",
                    "bind": {
                        "required": true
                    },
                    "choices": [
                        {
                            "name": "1",
                            "label": "Resili\u00eancia"
                        },
                        {
                            "name": "2",
                            "label": "INGC"
                        },
                        {
                            "name": "3",
                            "label": "CCCM"
                        },
                        {
                            "name": "4",
                            "label": "Protec\u00e7\u00e3o"
                        },
                        {
                            "name": "5",
                            "label": "Prote\u00e7\u00e3o contra Explora\u00e7\u00e3o e Abuso Sexual"
                        },
                        {
                            "name": "6",
                            "label": "Prote\u00e7\u00e3o a crian\u00e7a"
                        },
                        {
                            "name": "7",
                            "label": "Sa\u00fade"
                        },
                        {
                            "name": "8",
                            "label": "Educa\u00e7\u00e3o"
                        },
                        {
                            "name": "9",
                            "label": "Agua, saneamento e Higiene"
                        },
                        {
                            "name": "10",
                            "label": "Abrigo"
                        },
                        {
                            "name": "11",
                            "label": "Viol\u00eancia baseada no g\u00eanero"
                        },
                        {
                            "name": "12",
                            "label": "Seguran\u00e7a Alimentar"
                        },
                        {
                            "name": "13",
                            "label": "Outro"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "call_notes",
                    "label": "Call Notes",
                    "bind": {
                        "required": true
                    },
                    "type": "text"
                },
                {
                    "name": "call_solution",
                    "label": "Call Solution",
                    "bind": {
                        "required": true
                    },
                    "type": "text"
                },
                {
                    "name": "case_priority",
                    "label": "Case Priority",
                    "bind": {
                        "required": true
                    },
                    "choices": [
                        {
                            "name": "1",
                            "label": "Medium"
                        },
                        {
                            "name": "2",
                            "label": "High"
                        },
                        {
                            "name": "3",
                            "label": "Low"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "case_status",
                    "label": "Case closed",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Close case"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "case_number",
                    "label": "Case Number",
                    "hint": "Case number",
                    "type": "int"
                }
            ],
            "verbose_name": "linha verde intake form",
            "verbose_name_plural": "lvforms"
        },
        "forwardinginstitution": {
            "name": "forwardinginstitution",
            "url": "forwardinginstitutions",
            "list": true,
            "form": [
                {
                    "name": "lvform",
                    "label": "Lvform",
                    "bind": {
                        "required": true
                    },
                    "type": "string",
                    "wq:ForeignKey": "lvform"
                },
                {
                    "name": "partner_feedback",
                    "label": "Parceiro Feedback",
                    "type": "text"
                },
                {
                    "name": "task_feedback",
                    "label": "Feedback da tarefa",
                    "type": "text"
                },
                {
                    "name": "has_feedback",
                    "label": "Has Feedback",
                    "choices": [
                        {
                            "name": "TRUE",
                            "label": "TRUE"
                        },
                        {
                            "name": "FALSE",
                            "label": "FALSE"
                        }
                    ],
                    "type": "select one"
                }
            ],
            "verbose_name": "forwardinginstitution",
            "verbose_name_plural": "forwardinginstitutions"
        },
        "locationtype": {
            "cache": "all",
            "name": "locationtype",
            "url": "locationtypes",
            "list": true,
            "form": [
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "wq:length": 20,
                    "type": "string"
                }
            ],
            "verbose_name": "location type",
            "verbose_name_plural": "location types"
        },
        "district": {
            "cache": "all",
            "name": "district",
            "url": "districts",
            "list": true,
            "form": [
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "wq:length": 25,
                    "type": "string"
                },
                {
                    "name": "province",
                    "label": "Province",
                    "type": "string",
                    "wq:ForeignKey": "province"
                },
                {
                    "name": "codigo",
                    "label": "Codigo",
                    "bind": {
                        "required": true
                    },
                    "wq:length": 25,
                    "type": "string"
                },
                {
                    "name": "parent_code",
                    "label": "Parent Code",
                    "bind": {
                        "required": true
                    },
                    "wq:length": 25,
                    "type": "string"
                }
            ],
            "verbose_name": "district",
            "verbose_name_plural": "districts"
        },
        "casecomment": {
            "name": "casecomment",
            "url": "casecomments",
            "list": true,
            "form": [
                {
                    "name": "lvform",
                    "label": "Lvform",
                    "bind": {
                        "required": true
                    },
                    "type": "string",
                    "wq:ForeignKey": "lvform"
                },
                {
                    "name": "feedback",
                    "label": "Feedback",
                    "type": "text"
                }
            ],
            "verbose_name": "casecomment",
            "verbose_name_plural": "casecomments"
        },
        "task": {
            "name": "task",
            "url": "tasks",
            "list": true,
            "form": [
                {
                    "name": "lvform",
                    "label": "Lvform",
                    "bind": {
                        "required": true
                    },
                    "type": "string",
                    "wq:ForeignKey": "lvform"
                },
                {
                    "name": "task_title",
                    "label": "Task Title",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Request for information"
                        },
                        {
                            "name": "2",
                            "label": "Send Feedback"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "description",
                    "label": "Description",
                    "type": "text"
                },
                {
                    "name": "assignee",
                    "label": "Assigned to",
                    "type": "string"
                },
                {
                    "name": "task_status",
                    "label": "Status",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Not started"
                        },
                        {
                            "name": "2",
                            "label": "In Progress"
                        },
                        {
                            "name": "3",
                            "label": "Completed"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "start_date",
                    "label": "Start Date",
                    "type": "date"
                },
                {
                    "name": "end_date",
                    "label": "End Date",
                    "type": "date"
                },
                {
                    "name": "call_attempts",
                    "label": "Number of attempts to reach the other person",
                    "type": "int"
                }
            ],
            "verbose_name": "task",
            "verbose_name_plural": "tasks"
        },
        "location": {
            "cache": "all",
            "name": "location",
            "url": "locations",
            "list": true,
            "form": [
                {
                    "name": "classification",
                    "label": "Classification",
                    "type": "string",
                    "wq:ForeignKey": "locationclassification"
                },
                {
                    "name": "location_type",
                    "label": "Location Type",
                    "type": "string",
                    "wq:ForeignKey": "locationtype"
                },
                {
                    "name": "codigo",
                    "label": "Codigo",
                    "wq:length": 20,
                    "type": "string"
                },
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "wq:length": 200,
                    "type": "string"
                },
                {
                    "name": "province",
                    "label": "Province",
                    "type": "string",
                    "wq:ForeignKey": "province"
                },
                {
                    "name": "parent_code",
                    "label": "Parent Code",
                    "wq:length": 20,
                    "type": "string"
                }
            ],
            "verbose_name": "location",
            "verbose_name_plural": "locations"
        }
    },
    "debug": true
};
