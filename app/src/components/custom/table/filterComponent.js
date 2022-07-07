/**
 * Custom filter component for aggridTable
 * @returns
 */
export function getFilterComponent() {
  function CustomFilter() {}
  CustomFilter.prototype.init = function (params) {
    this.valueGetter = params.valueGetter;
    this.params = params;
    this.setupGui();
  };

  /**
   * Setup GUI to show the filter view
   */
  CustomFilter.prototype.setupGui = function () {
    this.gui = document.createElement("div");

    const { field } = this.params.column.userProvidedColDef;
    var that = this;
    const vals = that.params.agGridReact.props.rowData.map(
      (item) => item[field]
    );

    const values =
      field === "datetime_created_label"
        ? vals.filter((v, i, a) => {
            return a.indexOf(v) === i;
          })
        : vals
            .filter((v, i, a) => {
              return a.indexOf(v) === i;
            })
            .map((item) =>
              that.params.agGridReact.props.translate(item ?? "None")
            );

    this.gui.innerHTML = renderView(that, values);
    this.filterValues = values;

    var el = this.gui.querySelector("#selectAll");

    this.onFilterChanged = function () {
      this.extractFilterText();
      this.params.filterChangedCallback();
    };

    let checkboxes = that.gui.getElementsByTagName("input");

    for (var index in checkboxes) {
      const item = checkboxes[index];

      if (
        index < checkboxes.length &&
        item.getAttribute("id") !== "selectAll"
      ) {
        item.addEventListener(
          "click",
          function () {
            that.eFilterText = null;
            that.filterText = null;
            el.checked = false;
            if (item.checked && !that.filterValues.includes(item.value)) {
              that.filterValues.push(item.value);
            } else {
              that.filterValues.splice(
                that.filterValues.indexOf(item.value),
                1
              );
            }
            that.onFilterChanged();
          },
          false
        );
      }
    }

    el.addEventListener(
      "click",
      function () {
        that.filterValues = []; // remove all selected values on filtervalues state

        for (var index in checkboxes) {
          /**
           * Check or uncheck in select all is checked or unchecked
           */
          const checkbox = checkboxes[index];
          if (index < checkboxes.length) checkbox.checked = el.checked;
          if (el.checked) that.filterValues.push(checkbox.value);
          else
            that.filterValues.splice(
              that.filterValues.indexOf(checkbox.value),
              1
            );
        }

        if (el.checked) {
          that.filterValues = values;
          that.eFilterText = "All";
          that.onFilterChanged();
        } else {
          that.eFilterText = null;
          that.filterValues = [];
          that.onFilterChanged();
        }
      },
      false
    );
  };

  /**
   * Extract input text and store to filterText Variable
   */
  CustomFilter.prototype.extractFilterText = function () {
    this.filterText = this.eFilterText;
  };

  /**
   * Get the gui component
   * @returns
   */
  CustomFilter.prototype.getGui = function () {
    return this.gui;
  };

  /**
   * Filter select text value
   * @param {*} params
   * @returns
   */
  CustomFilter.prototype.doesFilterPass = function (params) {
    var valueGetter = this.valueGetter;
    var value = valueGetter(params);
    var filterValue = this.filterText;

    if (this.filterValues.includes(value) && filterValue === null) return true;

    if (filterValue === "All") return true;

    if (this.isFilterActive()) {
      if (!value) return false;
      return value === filterValue;
    }
  };

  /**
   * Verifyies filter value
   * @returns
   */
  CustomFilter.prototype.isFilterActive = function () {
    return (
      // this.filterText !== null &&
      this.filterText !== undefined && this.filterText !== ""
    );
  };

  /**
   * Get aggridtable model
   * @returns
   */
  CustomFilter.prototype.getModel = function () {
    return this.isFilterActive() ? Number(this.eFilterText) : null;
  };

  /**
   * Set aggridTableModel
   * @param {*} model
   */
  CustomFilter.prototype.setModel = function (model) {
    this.eFilterText = model;
    this.extractFilterText();
  };

  CustomFilter.prototype.getModelAsString = function () {
    return this.isFilterActive() ? ">" + this.filterText : "";
  };
  return CustomFilter;
}

function renderView(that, values) {
  let options = `<div class="form-check px-1 m-1">
                    <input class="form-check-input" checked type="checkbox" value="" id="selectAll">
                      <label class="form-check-label" style="cursor:pointer;" for="selectAll">
                       ${that.params.agGridReact.props.translate("Select All")}
                      </label>
                  </div>`;

  values.forEach(
    (item) =>
      (options += `
            <div class="form-check px-1 m-1">
              <input name="options" class="form-check-input" checked type="checkbox" defaultCheck value="${item}" id="${String(
        item
      ).replace(" ", "")}">
                <label class="form-check-label" style="cursor:pointer;" for="${String(
                  item
                ).replace(" ", "")}">
                  ${item}
                </label>
            </div>`)
  );

  return (
    '<div class="p-1 mb-2">' +
    `<div><strong class="px-1 m-1 text-primary">${that.params.agGridReact.props.translate(
      "Filter"
    )}</strong> <hr class="m-1 px-1" /></div>` +
    options +
    "</div>"
  );
}
