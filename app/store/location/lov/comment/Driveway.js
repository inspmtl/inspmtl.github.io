Ext.define('App.store.Location.lov.comment.Driveway', {
    extend: 'Ext.data.Store',
	alias: 'store.locationlovcommentdriveway',
	model: 'App.model.lov.LOV',  
	proxy: {
		type: 'ajax',
		url: 'resources/data/location/lov/comment/Driveway.json',
		reader: {
			type: 'json',
			rootProperty: 'd'
		}
	}
});