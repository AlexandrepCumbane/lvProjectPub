from call_manager.models import Call, Contactor
from case_manager.models import Case, PersonsInvolved
from form_extra_manager.models import ExtraFieldOptions, ExtraFields, FieldValue

# def parse_extra_field(data, **kwargs):
#     try:
#         contactor = Contactor.objects.get(contactor_id)
#         save_extra_call_fields(
#             request.data["extra_fields"], call=call, contactor=contactor
#         )
#     except KeyError:
#         pass


def save_extra_call_fields(data: dict, **kwargs):
    """Save extra fields value of a form on the database.

    Parameters:
        field_dta (dict): a dictionary of the extra field values to be saved on the database.
        kwargs: database row instace of the model that the extra fields belongs to

    Returns:
        Returns None.
    """
    try:
        for table_name, field_data in data.items():
            query = "{}.objects.get(pk={})".format(
                table_name.capitalize(), kwargs[table_name]
            )
            table_info = eval(query)
            save_extra_field_helper(table_name, field_data, {table_name: table_info})
    except KeyError as error:
        print("{} not found".format(str(error)))


def save_extra_field_helper(
    table_name: str, fields_data: list, initial_data: object
) -> None:
    """Helper functions to save extra field data in the database.

    Parameters:
        table_name (string): the string name of the table data the extra field data belongs to.
        field_dta (dict): a dictionary of the extra field values to be saved on the database.
        initial_data:object: a instance of the table that the extra field data belongs to

    Returns:
        Returns None.
    """

    for item in fields_data:
        extra_field_row = ExtraFields.objects.get(
            field_name__iexact=item["extra_field_name"], table_name__iexact=table_name
        )
        initial_data["field"] = extra_field_row
        initial_data["value"] = item["extra_field_value"]

        field_value = FieldValue(**initial_data)
        field_value.save()
        print("data saved", field_value.id)
