Ext.define('App.store.location.lov.Materials', {
    extend: 'Ext.data.Store',
    alias: 'store.locationlovmaterials',
    /**
      * @cfg {String}  model: Name of the Model associated with this store. The string is used as an argument for Ext.ModelManager.getModel.
      */
    model: 'App.model.lov.LOV',  
	proxy: {
		type: 'ajax',
		url: 'resources/data/location/lov/Materials.json',
		reader: {
			type: 'json',
			rootProperty: 'd'
		}
	}
});

