Ext.define('App.view.location.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.locationbrowse',
       
    onCreate: function () {
        var me = this,
            vm = me.getViewModel(),
            record = Ext.create('App.model.location.Location');

        vm.set('record', record);
        me.redirectTo('location/create');
    },

    onChildActivate: function (dataview, location) {
        var me = this,
            vm = me.getViewModel(),
            record = location.record;
      
        vm.set('record', record);
        me.redirectTo('location/'+record.get('id'));
        //me.redirectTo(record);  // route model/id     
        // MainController.js listens to route changes
        // route changes are then handled by handleRouteRecord in MainController.js
        //me.redirectTo('location/wizard');  
      
    }
});


