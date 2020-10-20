Ext.define('App.store.Menu', {
    extend: 'Ext.data.Store',
    alias: 'store.menu',

    data: [ {
        id: 'locations',
        xtype: 'locationbrowse',
        text: 'Locations',
        icon: 'home'
     }]
});
