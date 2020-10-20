Ext.define('App.view.main.Menu', {
    extend: 'App.view.widgets.Sidebar',
    xtype: 'mainmenu',

    config: {
        selection: null
    },

    controller: 'mainmenu',

    cls: 'main-menu',
    layout: 'vbox',
    weighted: true,

    items: {
        trigger: {
            xtype: 'button',
            handler: 'onTriggerTap',
            iconCls: 'x-fa fa-bars',
            ui: 'large flat dark',
            docked: 'top'
        },
        navigator: {
            xtype: 'dataview',
            scrollable: 'y',
            store: 'Menu',
            weight: 0,
            flex: 1,
            ui: 'dark large',
            selectable: {
                deselectable: false
            },
            itemTpl: [
                '<span class="icon x-fa fa-{icon}"></span>',
                '<span class="text">{text}</span>'
            ],
            listeners: {
                childtap: 'onMenuChildTap'
            }
        }
    },

    updateSelection: function(value) {
        this.child('#navigator').setSelection(value);
    }
});
