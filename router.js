var express = require("express");
var router = express.Router();

const credential = {
    user: "admin",
    password: "hytam"
}

// login user
router.post('/login', (req, res) => {
    if (req.body.user == credential.user && req.body.password == credential.password) {
        req.session.user = req.body.user;
        res.redirect('/route/admin');
        //res.end("Login Successful...!");
    } else {
        res.end("Invalid Username")
    }
});

// route for dashboard
router.get('/admin', (req, res) => {
    if (req.session.user) {
        res.render('admin', { user: req.session.user })
    } else {
        res.send("Unauthorized User")
    }
})

// route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send("Error")
        } else {
            res.render('base', { title: "Express", logout: "logout Successfully...!" })
        }
    })
})

module.exports = router;