const express = require('express');

// Express app
const app = express();

const path = require('path');

const admin = require("firebase-admin");

const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Connecting to the firebase
const db = admin.firestore();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Importing the styling
app.use(express.static(path.join(__dirname, 'public')))

// Creating a post
// app.post('/create', async(req,res)=>{
    
//     try {
//         const employee = {
//             name: req.body.name,
//             surname: req.body.surname,
//             emailAddress: req.body.emailAddress,
//             employeePosition: req.body.employeePosition,
//             phoneNumber: req.body.phoneNumber
//         }
//         const response = await db.collection('employees').add(employee);
//         res.send(response)
//     }catch (err){
//         console.log(err)
//     }
// })


// // Reading  data from firestore collection
// const employeeCollection = db.collection('emplyoyees');
// employeeCollection.get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, '=>', doc.data());
//         })
//     }).catch((error) => {
//         console.error('Error getting documents: ', error);
//     });



// Register view engine
app.set('view engine', 'ejs');

// Listen for request
app.listen(3000);

// Adding data to the firestore database
app.post('/addnew', async(req, res) => {

    try {
        const employee = {
            name: req.body.name,
            surname: req.body.surname,
            emailAddress: req.body.emailAddress,
            employeePosition: req.body.employeePosition,
            phoneNumber: req.body.phoneNumber
        }
        const response = await db.collection('employees').add(employee);
        res.render('index');
        res.send(response)
        console.log('added')
    }catch (err){
        console.log(err)
    }
})

app.get('/addnew', (req,res) => {
    res.render('index');
})


// Reading data from firestore database
app.get('/', async (req, res) => {

    try {
        const employeeRef = db.collection("employees");
        const response = await employeeRef.get();
        let responseArray = [];
        response.forEach((results) => {
            responseArray.push({...results.data(),id: results.id})
        })
        res.render('employeeslist', {responseArray})
        // res.status(200).send(responseArray)
    }catch(err){
        console.log(err)
    }
})

// Delete data from firestore database
app.delete('/delete/:id',async (req,res) => {
    try {
        const response = await db.collection('employees').doc(req.params.id).delete();
        res.send(response)
        console.log("Employee Deleted")
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

// Update data from firestore database
app.put('/update/:id', (req, res) => {
    const id = req.params.id;

    const updateData = {
        name: req.body.name,
        // surname: req.body.surname,
        // emailAddress: req.body.emailAddress,
        // employeePosition: req.body.employeePosition,
        // phoneNumber: req.body.phoneNumber
    }
    db.collection('employees').doc(id).update(updateData)
    .then(()=>{
        console.log('Employee Updated')
        res.send('Empployee Updated')
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
})

// 404 page
app.use((req,res) => {
    res.status(404).render('404')
})