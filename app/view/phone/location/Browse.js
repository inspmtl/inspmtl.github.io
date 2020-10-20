Ext.define('App.view.phone.location.Browse', {
    extend: 'App.view.location.Browse',
    // xtype: 'locationbrowse', -- set by profile

    requires: [
        'Ext.dataview.listswiper.ListSwiper',
        'Ext.dataview.plugin.ListPaging'
    ],

    header: {
        items: {
            create: {
                xtype: 'button',
                iconCls: 'x-fa fa-plus',
                handler: 'onCreate',
                weight: 10
            }
        }
    },

    items: [{
        xtype: 'list',
        bind: '{locations}',
        indexBar: true,
        striped: true,
        grouped: true,
        ui: 'listing',

        selectable: {
            disabled: true
        },

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

        itemTpl: [
            '<div class="item-details">',
                '<div class="item-title">{name}</div>',
                '<div class="item-caption">{city}, {country}</div>',
            '</div>'
        ],

        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});
