Ext.define('App.store.Location.locations', {
    extend: 'Ext.data.Store',
    alias: 'store.locations',
	model: 'App.model.location.Location',    
	sorters: 'name',
	proxy: {
		type: 'ajax',
		url: 'resources/data/location/locations.json',
		reader: {
			type: 'json',
			rootProperty: 'd'
		}
	}
});