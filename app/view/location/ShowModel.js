Ext.define('App.view.location.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.locationshow',
    data: {
        record: null
    },

    stores: {
        materials: {
            autoLoad: true,
            type: 'locationlovmaterials'
        },
        commentsdriveway: {
            autoLoad: true,
            type: 'locationlovcommentdriveway'
        }
    }
});
