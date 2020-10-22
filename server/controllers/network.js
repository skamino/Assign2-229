let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Network = require('../models/network');

module.exports.displayNetList = (req, res, next) => {
    Network.find((err, netList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            var list = netList.sort(compare);
            //console.log(BookList);
            //the partial for the list page
            res.render('network/list', {title: 'Network', NetList: netList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('network/add', {title: 'Add Contact'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newNetwork = Network({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    });

    Network.create(newNetwork, (err, Network) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the network list
            res.redirect('/netList');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Network.findById(id, (err, netToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('network/edit', {title: 'Edit Contact', network: netToEdit})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedNet = Network({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Network.updateOne({_id: id}, updatedNet, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/netList');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Network.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/netList');
        }
    });
}

function compare(a, b){
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if(nameA > nameB) {
        comparison = 1;
    } else if(nameA < nameB){
        comparison = -1;
    }
    return comparison;  
}