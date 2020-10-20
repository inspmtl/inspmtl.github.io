Ext.define('App.view.viewport.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',

    listen: {
        controller: {
            '*': {  // selectors are either Controller's id or '* ' wildcard for any Controller.
                unmatchedroute: 'handleUnmatchedRoute'
            }
        }
    },

    onLaunch: function() {
        this.showMain();
    },

    showView: function(xtype) {
        var view = this.lookup(xtype),
            viewport = this.getView();

        if (!view) {
            viewport.removeAll(true);
            view = viewport.add({
                xtype: xtype,
                reference: xtype
            });
        }

        viewport.setActiveItem(view);
    },

    showMain: function() {
        this.showView('main');
    },

    // ROUTING


    handleUnmatchedRoute: function(route) {
        var me = this;


        // There is an authenticated user, so let's simply redirect to the default token.
        var target = App.getApplication().getDefaultToken();
        Ext.log.warn('Route unknown: ', route);
        if (route !== target) {
            me.redirectTo(target, {replace: true});
        }
    }

});

