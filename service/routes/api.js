var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
const moment = require('moment');
var config = require('./config.json');
const pgcon=require('./connection');
const longZero="00000000000000000000000";
/* GET home page. */
router.post('/login', function(req, res, next) {
  var {username,password}=req.body;
  if(username!=undefined&&password!=undefined){
      pgcon.getOfDB(`select * from user_master u inner join role_master r on u.role=r.role_id  where username=$1 and password=SHA1($2) and flag='1'`,[username,password],result=>{
        if(result.length>0){
          var {username,role_id,first_name,last_name,role_id,role_name}=result[0];
          var user={username,role_id,first_name,last_name,role_id,role_name}
          var token=jwt.sign({user},config.secret);
          pgcon.execute(`update user_master set last_login=$1 where username=$2`,[moment().format("YYYY-MM-DD HH:mm:ss"),user.username],
          result=>{
            res.send({code:1,message:'ok',token:config.prefix_token+ token});
          },err=>{
            res.send({code:-1,message:`can't update user login`,token:""})
          })
          
        }else{
          res.send( {code:-1,message:'invalid user',token:""})
        }
      },err=>{
        res.send({code:-1,message:'invalid user',token:""})
      })
  }else{
    res.send({code:-1,message:'incomplete parameter',token:""})
  }
});
router.post("/get_room",checkLogin,(req,res)=>{
  try{
    pgcon.getOfDB(`select * from room_master`,[],
    result=>{
      res.send({code:true,message:'ok',data:result});
    },err=>{
      res.send({code:-1,message:'sql select room error'});
    })
  }catch(e){
    res.send({code:-1,message:'function get_room error'});
  }
})
router.post("/get_role",checkLogin,(req,res)=>{
  try{
    pgcon.getOfDB(`select * from role_master`,[],
    result=>{
      res.send({code:true,message:"ok",data:result});
    },err=>{
      res.send({code:-1,message:"select role_master error"});
    })
  }catch(e){
    res.send({code:-1,message:"function get_role error"});
  }
})
router.post("/upsert_room",checkLogin,(req,res)=>{
  var {room_name,num_chair,num_table}=req.body;
  if(room_name!=undefined&&num_chair!=undefined&&num_table!=undefined){
    pgcon.getOfDB('select * from room_master where room_name=$1',[room_name],result=>{
      if(result.length>0){
        pgcon.getOfDB(`update room_master set num_chair=$1,num_table=$2 where room_name=$3`,[num_chair,num_table,room_name],result=>{
          res.send({code:true,message:'ok'});
        },err=>{
          res.send({code:-1,message:'function update room error'});
        })
      }else{
        getID("room_master","room_id","",2,"").then((result)=>{
          // res.send({max_id:result})
          pgcon.execute(`insert into room_master values ($1,$2,$3,$4,$5)`,[result,room_name,num_chair,num_table,'1'],result=>{
            res.send({code:true,message:"ok"});
          },err=>{
            res.send({code:-1,message:'insert room error'});
          })
        },err=>{
          res.send({code:-1,message:"get room id error"});
        })
      }
    },err=>{
      res.send({code:-1,message:'select room error'})
    })
  }else{
    res.send({code:-1,message:"incomplete parameter"})
  }
})
router.post("/get_user",checkLogin,(req,res)=>{
  try{
    pgcon.getOfDB(`select * from user_master u inner join role_master r on u.role=r.role_id where flag='1'`,[],result=>{
      res.send({code:true,message:"ok",data:result});
    },err=>{
      res.send({code:-1,message:"sql error"})
    })
  }catch(e){
    res.send({code:-1,message:"function get_user error "});
  }
})

router.post("/add_user",checkLogin,(req,res)=>{
   try{
    var {username,password,first_name,last_name,email,role}=req.body;
    pgcon.execute(`insert into user_master values ($1,SHA1($2),$3,$4,$5,$6,$7,$8,$9)`,[username,password,first_name,last_name,email,moment().format("YYYY-MM-DD HH:mm:ss"),null,role,'1'],
      result=>{
        res.send({code:true,message:'ok'});
      },err=>{
        console.log(err);
        res.send({code:-1,message:'insert user error'})
      }
    )

   }catch(e){
     res.send({code:-1,message:"function add_user error"});
   }
})
router.post("/update_user",checkLogin,(req,res)=>{
  try{
   var {username,first_name,last_name,email,role}=req.body;
   if(username!=undefined&&email!=undefined&&role!=undefined&&first_name!=undefined&&last_name!=undefined){
    pgcon.execute(`update user_master set first_name=$1,last_name=$2,email=$3,role=$4 where username=$5`,[first_name,last_name,email,role,username],
        result=>{
          res.send({code:true,message:'ok'});
        },err=>{
          console.log(err);
          res.send({code:-1,message:'insert user error'})
        }
      )
   }else{
     res.send({code:-1,message:"invalid paramenter"});
   }
  

  }catch(e){
    res.send({code:-1,message:"function add_user error"});
  }
})
router.post("/change_password",checkLogin,(req,res)=>{
  try{
   var {username,old_password,password}=req.body;
   if(username!=undefined&&old_password!=undefined&&password!=undefined){
    
      pgcon.getOfDB(`select * from user_master where username=$1 and password=SHA1($2) and flag='1'`,[username,old_password],result=>{
        if(result.length>0){
          pgcon.execute(`update user_master set password=SHA1($1) where username=$2`,[password,username],result=>{
            res.send({code:true,message:"ok"});
          },err=>{
            res.send({code:-1,message:"can't update user"});
          })  
        }else{
          res.send( res.send({code:-1,message:'invalid old password'}))
        }
      },err=>{
        res.send({code:-1,message:'invalid user'})
      })
   }else{
     res.send({code:-1,message:"invalid paramenter"});
   }
  

  }catch(e){
    res.send({code:-1,message:"function add_user error"});
  }
})
router.post("/admin_change_password",checkLogin,(req,res)=>{
  try{
   var {username,password}=req.body;
   if(username!=undefined&&password!=undefined){
    
    pgcon.execute(`update user_master set password=SHA1($1) where username=$2`,[password,username],result=>{
      res.send({code:true,message:"ok"});
    },err=>{
      res.send({code:-1,message:"can't update user"});
    })  
   }else{
     res.send({code:-1,message:"invalid paramenter"});
   }
  

  }catch(e){
    res.send({code:-1,message:"function admin_change_password error "});
  }
})
router.post("/delete_room",checkLogin,(req,res)=>{
  try{
    var {room_id}=req.body;
    pgcon.execute(`update room_master set flag='0' where room_id=$1`,[room_id],
    result=>{
      res.send({code:true,message:'ok'})
    },err=>{
      res.send({code:-1,message:"update room error"});
    })
  }catch(e){
    res.send({code:-1,message:"function delete_room error"})
  }
})
router.post("/delete_user",checkLogin,(req,res)=>{
  try{
   var {username}=req.body;
   if(username!=undefined){
    
    pgcon.execute(`update user_master set flag='0' where username=$1`,[username],result=>{
      res.send({code:true,message:"ok"});
    },err=>{
      res.send({code:-1,message:"can't update user"});
    })  
   }else{
     res.send({code:-1,message:"invalid paramenter"});
   }
  

  }catch(e){
    res.send({code:-1,message:"function delete_user error "});
  }
})
router.post("/get_free_room",checkLogin,(req,res)=>{
  try{
    var {start_date,end_date}=req.body;
    var sql=`select * from room_master r where r.room_id not in (
      select b.room_id from booking_master b where (start_date<='${start_date}' and end_date>='${start_date}') or (start_date<='${end_date}' and end_date>='${end_date}')
      or ('${start_date}'<=start_date and '${end_date}'>=start_date) or ('${start_date}'<=end_date and '${end_date}'>=end_date)
    )`;
    // console.log(sql);
    pgcon.getOfDB(sql,[],
    result=>{
      res.send({code:1,message:"ok",data:result});
    },err=>{
      console.log("error",err);
      res.send({code:-1,message:"select room_master_error in function search_free_room"})

    })
  }catch(e){
    
    res.send({code:-1,message:"function get_free_room error"});
  }
})
router.post("/booking_room",checkLogin,(req,res)=>{
  try{
      var {username,room_id,start_date,end_date,booking_description}=req.body;
      if(username!=undefined&&room_id!=undefined&&start_date!=undefined&&end_date!=undefined&&booking_description!=undefined){
        getID("booking_master","booking_id","B",7,"").then((id)=>{
            pgcon.execute(`insert into booking_master values ($1,$2,$3,$4,$5,$6,$7,$8,'1')`,[id,booking_description,username,room_id,start_date,end_date,'1',moment().format("YYYY-MM-DD HH:mm:ss")],
            result=>{
              res.send({code:true,message:"ok"});
            },
            err=>{
              res.send({code:-1,message:"function insert booking master error"})
            })
        },err=>{
          res.send({code:-1,message:"function getmax_id error"})
        })
      }else{
        res.send({code:-1,message:"incomplete parameter"})
      }
  }catch(e){
    res.send({code:-1,message:"function booking_room error"})
  }
})

router.post("/get_booking",checkLogin,(req,res)=>{
  try{
    pgcon.getOfDB(`select * from booking_master b inner join user_master u on b.username=u.username inner join room_master r on r.room_id=b.room_id where status_id='1' and b.flag='1'`,[],
    result=>{
      res.send({code:true,message:"ok",data:result})
    },err=>{
      res.send({code:-1,message:"select booking_master error"});
    })
  }catch(e){
    res.send({code:-1,message:"function get_booking error"})
  }
})
router.post("/get_booked",checkLogin,(req,res)=>{
try{
  pgcon.getOfDB(`select * from booking_master b inner join user_master u on b.username=u.username inner join room_master r on r.room_id=b.room_id where status_id='2' and b.flag='1'`,[],
  result=>{
    res.send({code:true,message:"ok",data:result})
  },err=>{
    res.send({code:-1,message:"select booking_master error"});
  })
}catch(e){
  res.send({code:-1,message:"function get_booking error"})
}
})
router.post("/get_rejected",checkLogin,(req,res)=>{
try{
  pgcon.getOfDB(`select * from booking_master b inner join user_master u on b.username=u.username inner join room_master r on r.room_id=b.room_id where status_id='0' and b.flag='1'`,[],
  result=>{
    res.send({code:true,message:"ok",data:result})
  },err=>{
    res.send({code:-1,message:"select booking_master error"});
  })
}catch(e){
  res.send({code:-1,message:"function get_booking error"})
}
})
router.post("/get_booking_history",checkLogin,(req,res)=>{
try{
  var {start_date,end_date}=req.body;
  if(start_date!=undefined&&end_date!=undefined){
    pgcon.getOfDB(`select * from booking_master b inner join user_master u on b.username=u.username inner join room_master r on r.room_id=b.room_id inner join booking_status bs on bs.status_id=b.status_id where b.flag='1' and b.start_date>='${start_date}' and end_date<='${end_date}' order by b.start_date`,[],
    result=>{
      res.send({code:true,message:"ok",data:result})
    },err=>{
      res.send({code:-1,message:"select booking_master error"});
    })
  }else{
    res.send({code:-1,message:"incomplete parameter"})
  }
  
}catch(e){
  res.send({code:-1,message:"function get_booking_history error"})
}
})

router.post("/get_user_booking",checkLogin,(req,res)=>{
try{
  var {username}=req.body;
  if(username!=undefined){
    pgcon.getOfDB(`select * from booking_master b inner join user_master u on b.username=u.username inner join room_master r on r.room_id=b.room_id where status_id='1' and b.flag='1' and u.username=$1`,[username],
    result=>{
      res.send({code:true,message:"ok",data:result})
    },err=>{
      res.send({code:-1,message:"select booking_master error"});
    })
  }else{
    res.send({code:-1,message:"incomplete parameter"})
  }
}catch(e){
  res.send({code:-1,message:"function get_booking error"})
}
})
router.post("/get_user_booked",checkLogin,(req,res)=>{
try{
  var {username}=req.body;
  if(username!=undefined){
    pgcon.getOfDB(`select * from booking_master b inner join user_master u on b.username=u.username inner join room_master r on r.room_id=b.room_id where status_id='2' and b.flag='1' and u.username=$1`,[username],
    result=>{
      res.send({code:true,message:"ok",data:result})
    },err=>{
      res.send({code:-1,message:"select booking_master error"});
    })
  }else{
    res.send({code:-1,message:"incomplete parameter"})
  }
}catch(e){
  res.send({code:-1,message:"function get_booking error"})
}
})
router.post("/get_user_rejected",checkLogin,(req,res)=>{
try{
  var {username}=req.body;
  if(username!=undefined){
    pgcon.getOfDB(`select * from booking_master b inner join user_master u on b.username=u.username inner join room_master r on r.room_id=b.room_id where status_id='0' and b.flag='1' and u.username=$1`,[username],
    result=>{
      res.send({code:true,message:"ok",data:result})
    },err=>{
      res.send({code:-1,message:"select booking_master error"});
    })
  }else{
    res.send({code:-1,message:"incomplete parameter"})
  }
}catch(e){
  res.send({code:-1,message:"function get_booking error"})
}
})
router.post("/get_user_booking_history",checkLogin,(req,res)=>{
  try{
    var {start_date,end_date,username}=req.body;
    if(start_date!=undefined&&end_date!=undefined){
      pgcon.getOfDB(`select * from booking_master b inner join user_master u on b.username=u.username inner join room_master r on r.room_id=b.room_id inner join booking_status bs on bs.status_id=b.status_id where b.flag='1' and b.start_date>='${start_date}' and end_date<='${end_date}' and u.username=$1 order by b.start_date`,[username],
      result=>{
        res.send({code:true,message:"ok",data:result})
      },err=>{
        res.send({code:-1,message:"select booking_master error"});
      })
    }else{
      res.send({code:-1,message:"incomplete parameter"})
    }
    
  }catch(e){
    res.send({code:-1,message:"function get_booking_history error"})
  }
  })
  
router.post("/approve",checkLogin,(req,res)=>{
  try{
    var {booking_id}=req.body;
    if(booking_id!=undefined){
      pgcon.execute(`update booking_master set status_id='2' where booking_id=$1`,[booking_id],
      result=>{
        res.send({code:true,message:"ok"});
      },err=>{
        res.send({code:-1,message:"update booking_master error"})
      })
    }else{
      res.send({code:-1,message:"incomplete parameter"})
    }
  }catch(e){
    res.send({code:-1,message:"function approve error"})
  }
})
router.post("/reject",checkLogin,(req,res)=>{
  try{
    var {booking_id}=req.body;
    if(booking_id!=undefined){
      pgcon.execute(`update booking_master set status_id='0' where booking_id=$1`,[booking_id],
      result=>{
        res.send({code:true,message:"ok"});
      },err=>{
        res.send({code:-1,message:"update booking_master error"})
      })
    }else{
      res.send({code:-1,message:"incomplete parameter"})
    }
  }catch(e){
    res.send({code:-1,message:"function reject error"})
  }
})
router.post("/delete_booking",checkLogin,(req,res)=>{
  try{
    var {booking_id}=req.body;
    if(booking_id!=undefined){
      pgcon.execute(`update booking_master set flag='0' where booking_id=$1`,[booking_id],
      result=>{
        res.send({code:true,message:"ok"});
      },err=>{
        res.send({code:-1,message:"update booking_master error"})
      })
    }else{
      res.send({code:-1,message:"incomplete parameter"})
    }
  }catch(e){
    res.send({code:-1,message:"function delete_booking error"})
  }
})

router.post("/get_dashboard",checkLogin,(req,res)=>{
  try{
    var {username}=req.body;
    if(username==undefined){
      res.send({code:-1,message:"incomplete parameter"});
    }else{
      pgcon.getOfDB(`select s1.count as user_count,s2.count as room_count,
      s3.count as wait_for_approve,s4.count as approved,s5.count as all_booked,s6.count as your_wait_for_approve,s7.count as your_approved,s8.count as your_all_data from
         (select count(*) from user_master u where u.flag='1') s1,
         (select count(*) from room_master r where r.flag='1') s2,
         (select count(*) from booking_master b1 where b1.flag='1' and b1.status_id='1') s3,
         (select count(*) from booking_master b2 where b2.flag='1' and b2.status_id='2') s4,
         (select count(*) from booking_master b3 where b3.flag='1') s5,
         (select count(*) from booking_master b4 where b4.flag='1' and b4.status_id='1' and b4.username=$1) s6,
         (select count(*) from booking_master b5 where b5.flag='1' and b5.status_id='2' and b5.username=$1) s7,
         (select count(*) from booking_master b6 where b6.flag='1' and b6.username=$1) s8
         `,[username],
      result=>{
        res.send({code:true,message:"ok",data:result});
      },err=>{
        res.send({code:-1,message:"function select booking_master error"});
      })
    }
  }catch(e){
    res.send({code:-1,message:"function get_dashboard error"});
  }
  
})
function checkLogin(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(200).send({ code: -2, message: 'No token provided.' });
  if(token.length<config.prefix_token.length)  return res.status(200).send({ code: -2, message: 'invalid user' });
  if(token.substring(0,config.prefix_token.length)!=config.prefix_token)  return res.status(200).send({ code: -2, message: 'invalid user' });

  token=token.substr(config.prefix_token.length);
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(200).send({ code: -2, message: 'invalid user' });
    // savelog(decode);
    else {
      console.log(decoded);
      pgcon.execute(`update user_master set last_login=$1 where username=$2`,[moment().format("YYYY-MM-DD HH:mm:ss"),decoded.user.username],
      result=>{
        next();
      },err=>{
        res.send({code:-1,message:`can't update user login`})
      })
      
    }
  });
}

function getID(table, field_name, type, length, extraquery = "") {

  return new Promise((resolve, reject) => {
    var sql = `select max(substr(${field_name},${type.length + 1},${length})) as max_id from ${table} ${extraquery}`;
    pgcon.getOfDB(sql, [], data => {
      var max_id = type;
      if (data[0].max_id == null) {
        max_id = type + longZero.substring(0, length - type.length - 1) + "1";
      } else {
        max_id = type + (longZero.substring(0, length - type.length) + (parseInt(data[0].max_id) + 1)).substr(-(length - type.length));

      }
      resolve(max_id);
    }, err => {
      reject(err);
    })
  })
}

module.exports = router;
