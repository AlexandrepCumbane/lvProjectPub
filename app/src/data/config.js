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
                    "name": "contact_group",
                    "label": "Who is contacting",
                    "bind": {
                        "required": true
                    },
                    "choices": [
                        {
                            "name": "1",
                            "label": "Beneficiario"
                        },
                        {
                            "name": "2",
                            "label": "Alguem para beneficiario"
                        },
                        {
                            "name": "3",
                            "label": "Nao beneficiario"
                        },
                        {
                            "name": "4",
                            "label": "Lider comunitario"
                        },
                        {
                            "name": "5",
                            "label": "Parceiro Humanitario"
                        },
                        {
                            "name": "6",
                            "label": "Outro"
                        }
                    ],
                    "type": "select one"
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
                            "label": "Not specified"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "age_group",
                    "label": "Age",
                    "hint": "Age",
                    "choices": [
                        {
                            "name": "1",
                            "label": "17 e menos"
                        },
                        {
                            "name": "2",
                            "label": "18 - 59"
                        },
                        {
                            "name": "3",
                            "label": "60 e acima"
                        },
                        {
                            "name": "4",
                            "label": "Nao mencionado"
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
                    "name": "distribution_point",
                    "label": "Distribution Point",
                    "hint": "Distribution Point",
                    "type": "text"
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
                    "name": "location_type",
                    "label": "Accommodation or resettlement centre",
                    "hint": "Accommodation or resettlement centre",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Sim"
                        },
                        {
                            "name": "2",
                            "label": "Nao"
                        },
                        {
                            "name": "3",
                            "label": "Irrelevant"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "ressetlement_name",
                    "label": "Resettlement name",
                    "hint": "Resettlement name",
                    "wq:length": 255,
                    "type": "string"
                },
                {
                    "name": "category",
                    "label": "Case category",
                    "bind": {
                        "required": true
                    },
                    "type": "string",
                    "wq:ForeignKey": "casetipology"
                },
                {
                    "name": "subcategory",
                    "label": "Sub-category",
                    "bind": {
                        "required": true
                    },
                    "type": "string"
                },
                {
                    "name": "subcategory_issue",
                    "label": "Sub-category issue",
                    "type": "string"
                },
                {
                    "name": "who_not_receiving",
                    "label": "Who is not receiving assistance",
                    "hint": "Person not receiving",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Individual"
                        },
                        {
                            "name": "2",
                            "label": "Community"
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
                    "name": "vulnerability",
                    "label": "Vulnerability",
                    "bind": {
                        "required": true
                    },
                    "hint": "Vulnerability",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Pessoa com dificiencia"
                        },
                        {
                            "name": "2",
                            "label": "Familia chefiada por crianca"
                        },
                        {
                            "name": "3",
                            "label": "Pais solteiros"
                        },
                        {
                            "name": "4",
                            "label": "Mulher gravida ou lactente"
                        },
                        {
                            "name": "5",
                            "label": "Familia chefiada por idosos"
                        },
                        {
                            "name": "6",
                            "label": "Doente Cronico"
                        },
                        {
                            "name": "7",
                            "label": "Nenhum"
                        },
                        {
                            "name": "8",
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
                    "name": "means_of_communication",
                    "label": "Means of Communication",
                    "hint": "Means of Communication",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Linha verde (proprio numero)"
                        },
                        {
                            "name": "2",
                            "label": "Linha verde (telefone emprestado)"
                        },
                        {
                            "name": "3",
                            "label": "WFP hotline (proprio numero)"
                        },
                        {
                            "name": "4",
                            "label": "WFP hotline (telefone emprestado)"
                        },
                        {
                            "name": "5",
                            "label": "Mesa de apoio"
                        },
                        {
                            "name": "6",
                            "label": "sms"
                        },
                        {
                            "name": "7",
                            "label": "Email"
                        },
                        {
                            "name": "8",
                            "label": "Caixa de sugestoes"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "how_knows_lv",
                    "label": "How have you come to know about the complaints and feedback mechanism?",
                    "hint": "How have you come to know about the complaints and feedback mechanism?",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Radio"
                        },
                        {
                            "name": "2",
                            "label": "Panfletos"
                        },
                        {
                            "name": "3",
                            "label": "Pessoas trabalhando na comunidade"
                        },
                        {
                            "name": "4",
                            "label": "SMS"
                        },
                        {
                            "name": "5",
                            "label": "Cartazes ou material de visibilidade"
                        },
                        {
                            "name": "6",
                            "label": "Caixa de sugestoes"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "how_callback",
                    "label": "How would you prefer to be reached?",
                    "hint": "How would you prefer to be reached?",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Mesmo contacto"
                        },
                        {
                            "name": "2",
                            "label": "Outro contacto"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "other_contact",
                    "label": "Contact",
                    "hint": "Contact",
                    "type": "int"
                },
                {
                    "name": "call_feedback",
                    "label": "How do you feel about how your query was dealt with during this call?",
                    "hint": "How do you feel about how your query was dealt with during this call?",
                    "choices": [
                        {
                            "name": "1",
                            "label": "Muito Satisfeito"
                        },
                        {
                            "name": "2",
                            "label": "Satisfeito"
                        },
                        {
                            "name": "3",
                            "label": "Neutro"
                        },
                        {
                            "name": "4",
                            "label": "Insatisfeito"
                        },
                        {
                            "name": "5",
                            "label": "Muito insatisfeito"
                        }
                    ],
                    "type": "select one"
                },
                {
                    "name": "callback_required",
                    "label": "Callback required?",
                    "hint": "Callback required?",
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
                    "name": "unavailable_contact",
                    "label": "Contact was unavailable for feedback",
                    "hint": "Contact was unavailable for feedback",
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
                    "name": "case_number",
                    "label": "Case Number",
                    "hint": "Case number",
                    "type": "int"
                }
            ],
            "verbose_name": "linha verde intake form",
            "verbose_name_plural": "lvforms"
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
        "casetipology": {
            "name": "casetipology",
            "url": "casetipologys",
            "list": true,
            "form": [
                {
                    "name": "category",
                    "label": "Case Category",
                    "bind": {
                        "required": true
                    },
                    "hint": "Case Category",
                    "type": "text"
                }
            ],
            "verbose_name": "linha verde case tipology",
            "verbose_name_plural": "casetipologys"
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
        }
    },
    "debug": true
};
