Ext.define('App.view.widgets.BrowseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.browse',

    control: {
        '#': {
            routechange: 'onRouteChange',
            storechange: 'onStoreChange'
        }
    },

    initViewModel: function(vm) {
        vm.bind(
            { bindTo: '{filters}', deep: true },
            Ext.Function.createBuffered(function() {
                if (!this.destroyed) {
                    // The view might have been destroyed (e.g. user deauthentication)
                    this.updateFilters()
                }
            }, 500, this, {}));
    },

    updateFilters: function(reload) {
        var me = this,
            view = me.getView(),
            store = view.getStore(),
            collection = store && store.getFilters(),
            filters = me.getViewModel().get('filters'),
            fields = view.getFields(),
            dirty = !!reload,
            item, value;

        if (store) { store.clearFilter(false); } // true to supress "datachanged" and "refresh" events

        if (!collection) {
            return;
        }

        Ext.Object.each(fields, function(key, field) {
            value = filters[key];
            if (value && value.isModel) {
                value = value.get('value');
            }

            key = field.property || key;
            item = collection.get(key);
            if ((item && item.getValue()) == value) {
                return;
            }

            dirty = true;
            if (value == null || value == '') {
                store.removeFilter(key, true);
            } else {
                switch (key) {
                    case '#search':
                        // SEARCH using WYSIWYG
                        var rege = new RegExp(value, 'i'),
                            flds = store.model.getFields();

                        store.filterBy(function (record) {
                            recRet = false;
                            flds.forEach(function (fld) {
                                if (fld.name) {
                                    if (rege.test(record.get(fld.name))) {
                                        recRet = true;
                                    }
                                }
                            });
                            return recRet;
                        });

                        break;
                    default:
                        var re = new RegExp(value, 'i'),
                            filterFn = function (rec) {
                                return re.test(rec.get(field.property));
                            };

                        store.filterBy(filterFn);  // replace filterFn with allVisible to keep all nodes visible

                        break;
                }
            }
        });

        if (dirty) {
            store.removeAll();
            store.load();
        }
    },

    onRouteChange: function(view, route) {
        var me = this,
            vm = me.getViewModel(),
            regex = /([^\/]+)\/([^\/]+)/g,
            fields = me.getView().getFields() || {},
            filters = {},
            field, value;

        Ext.Object.each(fields, function(key, value) {
            filters[key] = value.defaultValue || null
        });

        while (match = regex.exec(route)) {
            field = match[1];
            value = match[2];
            if (Ext.isDefined(filters[field])) {
                filters[field] = field !== 'search'?
                    Ext.create(App.model.Filter, { value: value }) :
                    value;
            }
        }

        vm.set('filters', filters);
        me.updateFilters();
    },

    onStoreChange: function() {
        this.updateFilters(true);
    },

    onChildActivate: function(dataview, location) {
        var me = this,
            vm = me.getViewModel(),
            record = (location.record) ? location.record : location[0];  //location[0]=record from treegrid

        if (record) {
            vm.set('record', record);
            me.redirectTo(record);  // route model/id
        }        
    },

    onEditAction: function(list, data) {
        this.redirectTo(data.record.toEditUrl());
    },

    onRefreshTap: function() {
        var store = this.getView().getStore();
        if (store) {
            store.reload();
        }
    },

    onClearFiltersTap: function() {
        this.getViewModel().set('filters', {});
    }
});
