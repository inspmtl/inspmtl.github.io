Ext.define('App.store.widget.Comments', {
    extend: 'Ext.data.Store',
	alias: 'store.widgetcomments',

    proxy: {
        type: 'memory'
    }
});