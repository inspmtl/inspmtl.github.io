Ext.define('App.view.location.Browse', {
    extend: 'App.view.widgets.Browse',

    controller: 'locationbrowse',
    viewModel: {
        type: 'locationbrowse'
    },

    cls: 'locationbrowse',
    bind: {
        store: '{locations}'
    }
});
