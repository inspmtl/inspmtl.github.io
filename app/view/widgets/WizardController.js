Ext.define('App.view.widgets.WizardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wizard',

    requires: [
        'Ext.dataview.listswiper.ListSwiper',
        'Ext.History'
    ],

    listen: {
        global: {  // event fired from global Ext. and not from controller
            ontapcomment: 'onTapComment',
            ontapcommentadd: 'onTapCommentAdd'
        }
    },


    //add comments
    onTapComment: function (area) {
        var me = this,
            store = me.getViewModel().getStore(area),
            menu = Ext.create('App.view.widgets.comment.Menu', {
                width: 400,
                items: [{
                    xtype: 'widgetscommentgrid',
                    store: store
                }]
            });

        Ext.Viewport.setMenu(menu, {
            side: 'right'
        });
        Ext.Viewport.showMenu('right');

    },

    onActionDelete: function (list, data) {
        var me = this,
            store = list.getStore(),
            record = data.record;

        store.remove(record);        
    },

    onChangeFileInput: function (evt, input) {
        var me = this,
            id = input.id
            file = document.querySelector('input[id=' + id + ']').files[0],
            vm = me.getViewModel(),
            reader = new FileReader(); ;


        reader.addEventListener("load", function () {
            console.log(reader.result);
            vm.set(id, reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    },
 
    onTapCommentAdd: function (button) {
        var me = this,
            grid = button.up('grid'),
            selection = grid.getSelectable().getSelectedRecords(),
            store = grid.getStore(),
            type = store.type;

        me.fireEvent('addcomments', type, selection);
               

    },



    //delete record
    onTapDelete: function (button) {
        var me = this,
            record = me.getViewModel().get('record'),
            store = record.getStore();

        Ext.Msg.confirm('DELETE', 'Delete this record?',
            function (choice) {
                if (choice === 'yes') {
                    store.remove(record);
                }
            }
        );

    },

    // create a new record
    onTapSubmit: function (type) {
        var me = this,
            form = me.getView();

        if (!form.validate()) {
            Ext.Msg.alert(App.locale.Language.messages.validation.title[App.app.currentLocale], App.locale.Language.messages.validation.msg[App.app.currentLocale]);

            return;
        }

        var vm = me.getViewModel(),
            record = vm.get('record'),
            store = record.getStore();

        if (record.phantom) {
            store.add(record);
        }

    },



    getItemCount: function(tabs) {
        return tabs.getInnerItems().length;
    },

    getActiveIndex: function(tabs) {
        return tabs.getInnerItems().indexOf(tabs.getActiveItem());
    },

    advance: function(increment) {
        var me = this,
            tabs = me.lookup('tabs'),
            index = me.getActiveIndex(tabs),
            count = me.getItemCount(tabs),
            next = index + increment;

        tabs.setActiveItem(Math.max(0, Math.min(count-1, next)));
    },

    resync: function() {
        var me = this,
            vm = me.getViewModel(),
            tabs = me.lookup('tabs'),
            prev = me.lookup('prev'),
            next = me.lookup('next'),
            index = me.getActiveIndex(tabs),
            count = me.getItemCount(tabs),
            single = count < 2;

        tabs.getTabBar().setHidden(single);
        prev.setDisabled(index <= 0).setHidden(single);
        next.setDisabled(index == -1 || index >= count-1).setHidden(single);
    },

    finalize: function() {
        var view = this.getView();
        if (view.getFloated()) {
            view.close();
        } else {
            Ext.History.back();
        }
    },

    onSubmitTap: function() {
        var me = this,
            form = me.getView(),
            record = me.getViewModel().get('record');

        if (!form.validate()) {
            return;
        }

        if (!record.isDirty()) {
            me.finalize();
            return;
        }

        form.setMasked({ xtype: 'loadmask' });
        form.clearErrors();
        record.save({
            callback: function(result, operation) {
                form.setMasked(false);
                if (!App.util.Errors.process(operation, form)) {
                    me.finalize();
                }
            }
        });
    },

    onCancelTap: function() {
        this.finalize();
    },

    onPrevTap: function() {
        this.advance(-1);
    },

    onNextTap: function() {
        this.advance(1);
    },

    onScreenAdd: function() {
        this.resync();
    },

    onScreenRemove: function(tabs) {
        if (!tabs.destroying) {
            this.resync();
        }
    },

    onScreenActivate: function(tabs) {
        // This event is triggered when the view is being destroyed!
        if (!tabs.destroying) {
            this.resync();
        }
    }
});
