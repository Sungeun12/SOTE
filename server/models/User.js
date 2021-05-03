const mongoose =require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const crypto=require('crypto')

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required:[true,'이름을 입력해주세요!'],
        trim: true,
        maxlength: 50
    },
    email:{
        type: String,
        required:[true,'이메일을 입력해주세요!'],
        match:[/^[a-zA-Z0-9._%+-]+@sookmyung.ac.kr/,'유효한 학교이메일이어야합니다.'],
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        required:[true,'비밀번호를 입력해주세요!'],
        minlength: 5
    },
    id:{
        type: String,
        required:[true,'학번을 입력해주세요!'],
        length: 7,
        unique: 1
    },
    major:{
        type: String,
        required:[true,'학과를 입력해주세요!'],
        maxlength: 50
    },
    isAdmin:{
        type: Boolean,
        defalut: false
    },
    token:{
        type: String
    },
    tokenExp:{
        type:Number
    },
    Vote:{
        type: Array
    },
    code:{
        type: String
    },
    codetoken:{
        type: String
    }
})



userSchema.pre('save', function (next){
    //비밀번호를 암호화 시킨다.
    var user =this
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err) return next (err)
    
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else{
        next()
    }
})


userSchema.pre('save', function (next){
    // 코드를 암호화 시킨다.
    var user =this

    var key='code key'
    var data=user.code
    var cipher=crypto.createCipher("aes-256-cbc",key)
    var result=cipher.update(data,"utf8","base64")
    result+= cipher.final("base64")
    user.code=result
    next()
})



userSchema.methods.comparePassword =function(plainPassword, cb){
    //암호화된 비밀 번호와 그냥 비밀번호가 같은지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })

}

userSchema.methods.compareCode =function(plainCode, cb){
    //암호화된 코드와 입력받은코드가 같은지 확인
    var user =this
    var key='code key'
    var data=plainCode
    var cipher=crypto.createCipher("aes-256-cbc",key)
    var result3=cipher.update(data,"utf8","base64")
    result3+= cipher.final("base64")
    if(result3==user.code){
        cb(null,isMatch)
    }
    else{
        return cb(err)
    }

    /*bcrypt.compare(plainCode, this.code, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })*/

}

userSchema.methods.generateToken =function(cb){
    var user =this
    //jsonwebtoken을 이용해 token생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' =token
    //->
    //'secretToken' -> user._id

    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.methods.generateCodeToken =function(cb){
    var user =this
    //jsonwebtoken을 이용해 codetoken생성
    var codetoken = jwt.sign(user._id.toHexString(), 'secretcodeToken')

    // user._id + 'secretToken' =token
    //->
    //'secretToken' -> user._id

    user.codetoken = codetoken
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken=function(token, cb){
    var user =this

    //user._id+''=token
    //토큰을 decode한다.
    jwt.verify(token,'secretToken',function(err,decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지  확인

        user.findOne({"_id":decoded,"token":token},function(err,user){
            
            if(err) return cb(err)

            console.log('user',user)
            cb(null,user)
        })
    })
}

const User=mongoose.model('User',userSchema)

module.exports = {User}
