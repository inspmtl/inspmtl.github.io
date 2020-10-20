Ext.define('App.view.location.Show', {
    extend: 'App.view.widgets.Show',
    xtype: [
        'locationshow',
        'locationcreate',
        'locationedit'
    ],
    controller: 'locationshow',
    viewModel: {
        type: 'locationshow'
    },

  
    items: {
        header: {
            items: {
                title: {
                    tpl: [
                        '<div class="icon x-fa fa-home"></div>',
                        '<div class="name">{name}</div>',
                        '<div class="desc">{city}, <b>{country}</b><div>'
                    ]
                }
            }
        },

        content: {
            items: {
                    details: {
                        xtype: 'locationwizard'
                    }

            }
        }
    }
});
