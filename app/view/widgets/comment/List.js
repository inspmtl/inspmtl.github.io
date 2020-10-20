Ext.define('App.view.widgets.comment.List', {
extend: 'Ext.dataview.List',
xtype: 'widgetscommentlist',
minHeight: 80,
margin: '0, 0, 0, 100',
ui: 'listing',
store: 'store.widgetcomments',
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
    '<div class="item-title">{Text}</div>',
    '</div>'
]

});
