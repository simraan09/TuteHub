const mysql = require('mysql');
const routes = require('express').Router();
const bcrypt = require('bcryptjs');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "tutehubdb"
});

routes.post('/teacherReg',async(req,res)=>{

    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const query = "INSERT INTO teacher(firstName,lastName,doorNo,streetName,city,email,password,branch) VALUES('"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.doorNo+"','"+req.body.streetName+"','"+req.body.city+"','"+req.body.email+"','"+hashPassword+"','"+req.body.branch+"')";
    conn.query(query,function(err){
        if(err){
            res.status(400).send({msg:'error'});
        }
        res.status(200).send({msg:'inserted'});
    });
});

routes.post('/teacherMobile',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }

    const query = "INSERT INTO teachermobile VALUES('"+req.body.tid+"','"+req.body.mobileNumber+"')";
    conn.query(query,function(err){
        if(err){
            res.status(400).send({msg:'error'});
        }
        res.status(200).send({msg:'inserted'});
    });
});

routes.post('/studentReg',async(req,res)=>{

    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const query = "INSERT INTO student(firstName,lastName,courseName,email,password) VALUES('"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.courseName+"','"+req.body.email+"','"+hashPassword+"')";
    conn.query(query,function(err){
        if(err){
            res.status(400).send({msg:'error'});
        }
        res.status(200).send({msg:'inserted'});
    });
});

routes.post('/studentMobile',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }

    const query = "INSERT INTO studentmobile VALUES('"+req.body.sid+"','"+req.body.mobileNumber+"')";
    conn.query(query,function(err){
        if(err){
            res.status(400).send({msg:'error'});
        }
        res.status(200).send({msg:'inserted'});
    });
});

routes.post('/teacherLogin',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }
    const query = "SELECT password FROM teacher WHERE tid='"+req.body.id+"'";
    conn.query(query, async function(err, result, fields) {
        if(err) console.log(err);
        const hashPassword = await result[0].password;
        const validPassword = await bcrypt.compare(req.body.password, hashPassword);
        if(!validPassword){
            res.status(400).send({msg:'not'});
        }else{
            res.status(200).send({msg:'ok'});
        }
    });
});

routes.post('/studentLogin',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }
    const query = "SELECT password FROM student WHERE sid='"+req.body.id+"'";
    conn.query(query, async function(err, result, fields) {
        if(err) console.log(err);
        const hashPassword = await result[0].password;
        const validPassword = await bcrypt.compare(req.body.password, hashPassword);
        if(!validPassword){
            res.status(400).send({msg:'not'});
        }else{
            res.status(200).send({msg:'ok'});
        }
    });
});

routes.post('/studentCourse', async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }
    const query = "SELECT cm.cid FROM student s, coursemodule cm WHERE s.courseName = cm.courseName AND s.sid='"+req.body.sid+"'";
    conn.query(query, async function(err,result){
        const cid = await result[0].cid;
        res.send({cid:cid});
    });
});

routes.post('/postDetails',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }
    const query = "INSERT INTO post(name,path,sid,timeDate,cid) VALUES('"+req.body.postName+"','"+req.body.path+"','"+req.body.sid+"','"+req.body.timeDate+"','"+req.body.cid+"')";
    conn.query(query,function(err){
        if(err){
            console.log(err);
        }else{
            console.log('Inserted');
        }
    });
});

routes.get('/getPostData',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }
    const query = "SELECT * FROM post";
    conn.query(query,async function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

routes.post('/addComments',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }

    const query = "INSERT INTO commentonpost(comments,postid,commentby) VALUES('"+req.body.comments+"','"+req.body.commentsOn+"','"+req.body.sid+"')";
    conn.query(query,function(e){
        if(e) res.send({msg:'falied'});
    })
});

routes.post('/getComments',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }

    const query = "SELECT comments FROM commentonpost WHERE postid="+req.body.pid;
    conn.query(query,async function(err,result){
        if(err) console.log(err)
        else
        res.send(result)
    })
});

routes.post('/sendQuestion',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }

    const query = "INSERT INTO question(question,senderId) VALUES('"+req.body.question+"','"+req.body.sid+"')";
    conn.query(query,function(err){
        if(err) console.log(err)
    });
});

routes.post('/getQuestion',async(req,res)=>{
    if(!conn){
        conn.connect(function(err){
            if(err) console.log(err);
        });
    }
    const query = "SELECT question FROM question WHERE senderId="+req.body.sid;
    conn.query(query,async function(err, result){
        if(err) console.log(err)
        else
        res.send(result)
    });
});

module.exports = routes;