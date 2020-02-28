
'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    addMomentPackage();
})

const addMomentPackage = function() {

    const moment = require('moment');
    const View = use('View')
    View.global('moment', moment)
}