const { response } = require("express");
const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const driver = require('bigchaindb-driver');

const Vaccination = require("../../models/Vaccination");
const appoinment = require("../../validation/appointment");



router.post("/appointments", (req, res) => {
    

    const {errors, isValid} = appoinment(req.body);


    if(!isValid){
        return res.status(400).json(errors);
    }


    Vaccination.findOne({amka: req.body.amka }).then(vaccination => {
        
        if(vaccination){
            return res.status(400).json({amka: "AMKA already exist"});
        }
        else{

            const newVaccination = new Vaccination({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                amka: req.body.amka,
                phone: req.body.phone,
                address: req.body.address,
                dateOfBirth: req.body.dateOfBirth,
                dateDose1: req.body.dateDose1,
                dateDose2: req.body.dateDose2,
                doseOneCompleted: req.body.doseOneCompleted,
                doseTwoCompleted: req.body.doseTwoCompleted,
                vaccineBrand: req.body.vaccineBrand,
                stage: req.body.stage,
                comments: req.body.comments,
                symptoms: req.body.symptoms
            })

            // Decode token and get user info and exp
            // if(req.body.token) {
            //     
            // }
           // console.log(req.body);
            //console.log(req.headers);
             if(newVaccination.doseTwoCompleted){
               
                    const API_PATH = 'http://localhost:9984/api/v1/';
                    const decoded = jwt_decode(req.headers.authorization);       
                    console.log(decoded);
                    //const { user } = decoded;

                const publicKey = decoded.key.publicKey
                const privateKey = decoded.key.privateKey
                const hospitalName = String(decoded.hospitalName)

                const tx = driver.Transaction.makeCreateTransaction( newVaccination,{ hospitalName: hospitalName },
                     [ driver.Transaction.makeOutput(
                             driver.Transaction.makeEd25519Condition(publicKey))
                     ],
                     publicKey
                 )
                

                 const txSigned = driver.Transaction.signTransaction(tx, privateKey);
                 const conn = new driver.Connection(API_PATH);

                 conn.postTransactionCommit(txSigned)
                     .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
            
            }

            try{
                newVaccination.save().then(vaccination => res.json(vaccination));
            }catch(error){
                return res.json(error);
            }

        }

    });


});

router.put("/appointments", (req, res) => {

    Vaccination.updateOne({ _id: req.body._id }, req.body, message => {
        if (!message) {
           return res.json({message: 'updated.'});
        }else{
            return res.json({error: message});
        }
    });

});



router.get("/dashboard", (req, res) => {

    console.log(req.query.amka);

    if(req.query.amka)
    {
        const amka = req.query.amka
        Vaccination.findOne({ amka }).then(vaccination => {
            if (!vaccination) {
                return res.status(404).json({ vaccinationnotfound: "error" });
            }

            res.json({ records: vaccination })
            
        });
    }
    else if(req.query.firstName && req.query.lastName)
    {
        const firstName = req.query.firstName
        const lastName = req.query.lastName
        console.log(firstName)

        Vaccination.find({firstName, lastName} ).then(vaccinationRecords => {
            
            if (!vaccinationRecords) {
                return res.status(404).json({ vaccinationnotfound: "error" });
            }
            
            res.json({ records : vaccinationRecords });

        });
    }
    else if(req.query.searchDate)
    {
        const dateDose1 = req.query.searchDate;
        const dateDose2 = req.query.searchDate;

        Vaccination.find({$or:[{dateDose1 : dateDose1},{dateDose2 : dateDose2}]}).then(vaccinationRecords => {

            if (!vaccinationRecords) {
                return res.status(404).json({ vaccinationnotfound: "error" });
            }
            
            res.json({ records : vaccinationRecords });

        });

    }
    else
    {
        return res.json({error : "empssdsdty request"});
    }

});

module.exports = router;