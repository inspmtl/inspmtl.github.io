Ext.define('App.view.phone.main.MainController', {
    extend: 'App.view.main.MainController',
    alias: 'controller.phone-main',

    getContainerForViewId: function(id) {
        var regex = /^(location)(create|edit|show)$/;
        return this.lookup(id.match(regex)? 'navigation' : 'views');
    }
});
