Ext.define('App.view.tablet.location.Browse', {
    extend: 'App.view.location.Browse',
    // xtype: 'locationbrowse', -- set by profile

    tbar: {
        xtype: 'locationbrowsetoolbar'
    },

    items: [{
        xtype: 'grid',
        emptyText: 'No location was found to match your search',
        bind: '{locations}',
        ui: 'listing',
        plugins: [{
            type: 'listswiper',
            right: [{
                iconCls: 'x-fa fa-remove',
                commit: 'onActionDelete',
                // undoable: true,
                text: 'Delete',
                ui: 'action'
            }]
        }],
        selectable: {
            disabled: true
        },

        columns: [{
            text: 'Name',
            dataIndex: 'name',
            flex: 2            
        }, {
            text: 'Address',
            dataIndex: 'address',
            flex: 2,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<div class="item-title">{city}, {country}</div>',
                '<div class="item-caption">{address}<div>'
            ]
        }],

        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});
