sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (UIComponent, JSONModel, Device) {
	"use strict";

	return UIComponent.extend("brgaap-test.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

    init: function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// set data model
			var data = {
				recipient: {
					name: "World"
				}
			};
			var model = new JSONModel(data);
			this.setModel(model);

			// set device model
			var deviceModel = new JSONModel(Device);
			deviceModel.setDefaultBindingMode("OneWay");
			this.setModel(deviceModel, "device");

			// create routes
			this.getRouter().initialize();
		},

	});
});