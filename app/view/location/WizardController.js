/*Controllers are the glue that binds an application together. 
 * That said, their main purpose is to listen for events (usually from views) and take some action. */

Ext.define('App.view.location.WizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.locationwizard',


    listen: {
        controller: {
            '*': {  // selectors are either Controller's id or '* ' wildcard for any Controller.
               addcomments: 'addComments'
            }
        }
    },

    init: function () {
        var me = this;

        //set the form labels
        me.translateLabels();
    },


    //add the comments selected form the comments menu
    addComments: function (type, selection) {
        //find the comments reference and ad selection
        var me = this,
            ref='comment'+ type.split('comment')[1]
            list = me.lookup(ref),
            store=list.getStore(),
            menu = Ext.Viewport.getMenus().right;

        store.add(selection);
        Ext.Viewport.hideMenu('right');
    },

    //translate the label/text to app language
    translateLabels: function () {
        var me = this,
            vm = me.getViewModel();
        try {
            vm.set({
                fields: {
                    comments: App.locale.Language.widget.fields.comments[App.app.currentLocale],
                    driveway: {
                        driveway: App.locale.Language.location.fields.driveway[App.app.currentLocale],
                        material: App.locale.Language.location.fields.driveway.material[App.app.currentLocale],
                        servicable: App.locale.Language.location.fields.driveway.servicable[App.app.currentLocale]
                    },
                    location: {
                        address: App.locale.Language.location.fields.location.address[App.app.currentLocale],
                        city: App.locale.Language.location.fields.location.city[App.app.currentLocale],
                        country: App.locale.Language.location.fields.location.country[App.app.currentLocale],
                        name: App.locale.Language.location.fields.location.name[App.app.currentLocale],
                        postcode: App.locale.Language.location.fields.location.postcode[App.app.currentLocale],
                        region: App.locale.Language.location.fields.location.region[App.app.currentLocale]
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }

});
