from form_extra_manager.models import ExtraFields, FieldValue, ExtraFieldOptions


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
            save_extra_field_helper(
                table_name, field_data, {table_name: kwargs[table_name]}
            )
    except KeyError:
        pass


def save_extra_field_helper(
    table_name: str, field_data: dict, initial_data: object
) -> None:
    """Helper functions to save extra field data in the database.

    Parameters:
        table_name (string): the string name of the table data the extra field data belongs to.
        field_dta (dict): a dictionary of the extra field values to be saved on the database.
        initial_data:object: a instance of the table that the extra field data belongs to

    Returns:
        Returns None.
    """

    extra_field_row = ExtraFields.objects.get(
        field_name=field_data["extra_field_name"], table_name=table_name
    )
    initial_data["field"] = extra_field_row
    initial_data["value"] = field_data["extra_field_value"]

    field_value = FieldValue(**initial_data)
    field_value.save()
