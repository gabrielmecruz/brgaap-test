sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter",
  "sap/m/MessageBox",
  "sap/m/MessageToast",
], function (Controller, Filter, FilterOperator, Sorter, MessageBox, MessageToast) {
  "use strict";

  return Controller.extend("brgaap-test.controller.InvoiceList", {
    onInit: function(){
      this._sorting = false;
    },

    onSearch: function(oEvent) {
      var list = this.byId("invoice-list");
      var binding = list.getBinding("items");
      
      var filter = [];
      var query = oEvent.getParameters("value").newValue;
      if(query && query.length>0) {
        filter.push(new Filter ("title", FilterOperator.Contains, query));
      }

      binding.filter(filter);
    },

    onPress: function(oEvent) {
      var item = oEvent.getSource().getBindingContext("invoice").getPath().substr(1);
      var router = this.getOwnerComponent().getRouter();
      router.navTo("detail", {
        invoiceData: window.encodeURIComponent(item)
      });
    },

    onCompleted: function(oEvent) {
      var selected = oEvent.getParameter("selected");
      var object = oEvent.getSource().getBindingContext("invoice").getObject();
      MessageBox.information("Objeto: " + JSON.stringify(object), {
        onClose: function() {
          MessageToast.show("Completed: "+ selected)
        }
      });
    },

    onSort: function(param) {
      var list = this.byId("invoice-list");
      var binding = list.getBinding("items"), sorter = new Sorter(param, this._sorting);

      this._sorting = !this._sorting;
      binding.sort(sorter);
    }
  });
});