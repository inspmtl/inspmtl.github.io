Ext.define('App.view.location.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.locationbrowse',

    stores: {
        locations: {
            type: 'locations',
            grouper: {
                groupFn: function(record) {
                    return record.get('name')[0];
                }
            }
        }
    }
});
