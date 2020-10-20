Ext.define('App.view.tablet.location.BrowseToolbar', {
    extend: 'App.view.widgets.BrowseToolbar',
    // xtype: 'locationbrowsetoolbar', -- set by profile

    items: {
        create: {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            handler: 'onCreate',
            text: 'Create',
            weight: 50
        }
    }
});
