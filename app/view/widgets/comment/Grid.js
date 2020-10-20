Ext.define('App.view.widgets.comment.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'widgetscommentgrid',
    flex: 1,       
    layout: 'fit',
    columns: [{
        text: 'Comment',
        dataIndex: 'Text',
        flex: 1
    }],
    selectable: {
        rows: true,
        deselectable: true,
        checkbox: true,
        checkboxSelect: true,
        headerCheckbox: true,
        checkboxColumnIndex: 0,
        mode: 'multi',
        selection: {
            type: 'records'
        }
    },
    items: [
        {
            xtype: 'toolbar',
            docked: 'bottom',
            items: ['->',
                {
                    text: 'Add selected comments',
                   handler: function(button) {
                        /*using Ext.fireEventto call function in App.view.widgets.comment.MenuController and not App.view.viewport.ViewportController*/
                        Ext.fireEvent('ontapcommentadd', button); //Fires the specified event with the passed parameters , caught in controller
                    }
                }
            ]
        }
    ]
});