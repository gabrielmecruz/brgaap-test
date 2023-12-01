sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
], function (Controller, History) {
	"use strict";

  return Controller.extend("brgaap-test.controller.Detail", {

    onInit: function() {
      var router = this.getOwnerComponent().getRouter();
			router.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function(oEvent) {
      this.getView().bindElement({
        path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoiceData),
        model: "invoice"
      });
    },

    onBack: function() {
			var history = History.getInstance();
			var previousHash = history.getPreviousHash();

			if (previousHash !== undefined) {
				window.history.go(-1);
			} else {
				var router = this.getOwnerComponent().getRouter();
				router.navTo("overview", {}, true);
			}
		}
  });
});