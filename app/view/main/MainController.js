Ext.define('App.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    routes: {
        ':type(/:args)?': {
            action: 'handleNavigationRoute',
            conditions: {
                ':type': '(locations)',
                ':args': '(.*)'
            }
        },
        ':type/:id(/:args)?': {
            action: 'handleDataRoute',
            conditions: {
                ':type': '(location)',
                ':id': '([a-f0-9-]{36}|create|edit|wizard)',
                ':args': '(.*)'
            }
        }
    },

    listen: {
        global: {
            togglemainmenu: 'onToggleMainMenu',
            navigationback: 'onNavigationBack'
        }
    },


    init: function (cmp) {
       //set the language
            var me = this,
                language = App.util.State.get('language');

            language = (language === 'en' || language === 'fr') ? language : 'en';
            App.util.State.set('language', language);
            App.app.currentLocale = language;

        me.translateNavigation();
    },

    /**
     * @param {String} ref Component reference, MUST be valid.
     */
    activate: function(ref) {
        var view = ref.isComponent? ref : this.lookup(ref),
            child = view,
            parent;

        while (parent = child.getParent()) {
            parent.setActiveItem(child);
            child = parent;
        }


        return view;
    },

    getContainerForViewId: function() {
        return this.getView();
    },

    ensureView: function(id, config, route) {
        var container = this.getContainerForViewId(id),
            item = container.child('component[viewId=' + id + ']'),
            reset = !!item;
      
        if (!item) {
            item = container.add(Ext.apply({ viewId: id }, config));
        }

        if (Ext.isDefined(item.config.route)) {
            item.setRoute(route);
        }

        // Reset the component (form?) only if previously instantiated (i.e. with outdated data).
        if (reset && Ext.isFunction(item.reset)) {
            item.reset();
        }

        return item;
    },

    handleNavigationRoute: function(type, args) {
        var store = Ext.getStore('Menu'),
            entry = store.getById(type);

        this.lookup('mainmenu').setSelection(entry);
        if (!entry) {
            return null;
        }

        this.activate(
            this.ensureView(type, {
                xtype: entry.get('xtype'),
                title: entry.get('text')
            }, args));
    },

    handleDataRoute: function(type, id, args) {
        var me = this,
            view = me.getView(),
            activeItem = view.getActiveItem(),
            args = Ext.Array.clean((args || '').split('/')),
            hashtag = type + '/' + id,
            action, xtype, item, viewmodel, record;

        if (activeItem) {
            if (activeItem.reference === 'views') {
                viewmodel = activeItem.down(type+'browse').getViewModel();
            } else {
                viewmodel = activeItem.getViewModel();
            }
            record = viewmodel.get('record');  //set on onChildTap
        }
        // determine the requested action for the given "type":
        // - #{type}/create: create a new "type"
        // - #{type}/{id}: show record with "id"
        // - #{type}/{id}/edit: edit record with "id"
      
        if (id == 'create') {
            action = 'create';
            id = null;
        } else if (args[0] == 'edit') {
            action = 'edit';
            args.shift();
        }  else {
            action = 'show';
        }

        xtype = type + action;
       
        // leave a developer message in case of new types addition
        if (!Ext.ClassManager.getNameByAlias('widget.' + xtype)) {
            Ext.log.error('Invalid route: no view for xtype: ' + xtype);
        }
        
        view = me.ensureView(xtype, { xtype: xtype });
       
        item = view.child('component[routeId=' + xtype + ']');
     
        if (!item) {
            item = {
                xtype: xtype,
                routeId: hashtag
            };
        }

        view.setRecord(record);
        me.activate(view);

       
    },

    onToggleMainMenu: function(expanded) {
        var menu = this.lookup('mainmenu');
        if (expanded === undefined) {
            expanded = !menu.getExpanded();
        }

        menu.setExpanded(expanded);
    },

    onNavigationBack: function() {
        Ext.util.History.back();
    },


    translateNavigation: function () {
        var me = this,
            menu = me.lookup('mainmenu'),
            store = menu.down('dataview').getStore();

        try {
            //translate the menu   
            store.each(function (record, idx) {
                record.set('text', App.locale.Language.menu[record.id][App.app.currentLocale]);
            });            
        }
        catch (e) {
            console.log(e)
        }


    }
});
