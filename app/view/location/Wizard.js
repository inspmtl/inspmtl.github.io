Ext.define('App.view.location.Wizard', {
    extend: 'App.view.widgets.Wizard',
    xtype:'locationwizard',
    controller: 'locationwizard',
    //inherits container viewmodel
     
    screens: [{
        title: 'Location',
        iconCls: 'x-fa fa-info',  //https://fontawesome.com/v4.7.0/cheatsheet/
        defaults: {
            required: true  //default are applied on all items, but can be overrided on individual item
        },
        items: [{
            xtype: 'textfield',
            name: 'name',
            bind: {
                label: '{fields.location.name}', //language specific text, set in controller translateLabels
                bind: '{record.name}'  //bind this field's values from the viewnodel record objects' field value
            }          
        }, {
            xtype: 'textfield',
            name: 'address',
            bind: {
                label: '{fields.location.address}',  
                bind: '{record.address}'
            }
        }, {
            xtype: 'textfield',
            name: 'city',
            bind: {
                label: '{fields.location.city}',
                bind: '{record.city}'
            }
        }, {
            xtype: 'textfield',
            name: 'region',
            bind: {
                label: '{fields.location.region}',
                bind: '{record.region}'
            }
         }, {
            xtype: 'textfield',
            name: 'country',
            required: false,
             bind: {
                label: '{fields.location.country}',
                bind: '{record.country}'
            }
         }, {
            xtype: 'textfield',
            name: 'postcode',
            required: false,
             bind: {
                label: '{fields.location.postcode}',
                bind: '{record.postcode}'
            }
            }]
    }, {            
            title: 'Driveway',
            iconCls: 'x-fa fa-car',
            items: [{
                xtype: 'radiogroup',
                vertical: true,
                name: 'countries',
                bind: {
                    label: '{fields.driveway.driveway}'
                },
                items: [{
                    boxLabel: 'Serviceable', name: 'driveway', inputValue: '1'
                }, {
                    boxLabel: 'Not Present', name: 'driveway', inputValue: '0'
                }]
            },{
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'Text',
                valueField: 'Value',
                bind: {
                    label: '{fields.driveway.material}',
                    store: '{materials}'
                }
            }, {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'right'
                },
                items: [{
                    xtype: 'button', //the button to select the comments
                    bind: {
                        text: '{fields.comments}'
                    },
                    handler: function (button) {  //call to display the comments menu
                        /*using Ext.fireEvent instead of handler: 'onTapComments' direct call to controller so to allow passing custom parameter*/
                        Ext.fireEvent('ontapcomment', 'commentsdriveway'); //Fires the specified event with the passed parameters , caught in controller
                    }
                }]
                },
                { 
                    xtype: 'widgetscommentlist', //the list to display the comments
                    reference: 'commentdriveway',
                    store: Ext.create('App.store.widget.Comments')
                }, {
                   xtype: 'container',
                   flex: 1,
                    margin: '10, 0, 0, 100',
                    layout: {
                        type: 'hbox'
                    },
                   items: [{
                        flex: 1,
                            xtype: 'image',
                            //height: 200,
                            //width: 200,
                            bind: {
                                src: '{imgdriveway}'
                            }
                    },{
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'right'
                            },
                            items: [{
                                xtype: 'container',
                                width: 50,
                                html: '<div>' +
                                    '<label for= "imgdriveway" class= "btn"><i class="fa fa-camera fa-3x"></i></label>' +
                                    '<input id="imgdriveway" type="file" accept="image/*" style="visibility:hidden;">' +
                                    '</div>',
                                listeners: {
                                    change: {
                                        fn: 'onChangeFileInput',
                                        element: "element",
                                        selector: "div"
                                    }
                                }
                            }]
                        }]
                }
            ]
        }]
});
