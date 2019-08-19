import AV from 'leancloud-storage'
import { updateExpression } from '@babel/types';

var APP_ID = 'DLnGYV5wDEmLJUbvwBnXWQIP-gzGzoHsz';
var APP_KEY = 'S753khDqda46cJQUwvHSKtbG';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export const TodoModel = {
  getByUser(user, successFn, errorFn){
    let query = new AV.Query('Todo')
    query.equalTo('deleted', false)
    query.find().then((response) => {
      let array = response.map((t) => {
        console.log(t)
        return {id: t.id, ...t.attributes}
      })
      successFn.call(null, array)
    }, (error) => {
      errorFn.call(null, error)
    })
  },

  create({title, content, status, deleted},successFn, errorFn){
    var Todo = AV.Object.extend('Todo')
    var todo = new Todo()
    todo.set('title', title)
    todo.set('content', content)
    todo.set('status', status)
    todo.set('deleted', deleted)
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setReadAccess(AV.User.current(),true)
    acl.setWriteAccess(AV.User.current(),true)
    todo.setACL(acl)
    todo.save().then(function (response) {
      console.log('保存成功。objectId：' + todo.id)
      successFn.call(null,response.id)
      }, function (error) {
        errorFn.call(null,error)
    })
  },

  update({id,title,content,status,deleted},successFn,errorFn){
    let todo = AV.Object.createWithoutData('Todo',id)
    title !== undefined && todo.set('title', title)
    content !== undefined && todo.set('content', content)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)
    todo.save().then((response)=>{
      successFn && successFn.call(null) //如果成功函数存在 才执行 前面的语句是判断
    }, (error)=>{
      errorFn && errorFn.call(null,error)
    })
  },

  destroy(todoid,successFn,errorFn){
    this.update({id:todoid, deleted:true},successFn,errorFn)
  }

}


export function signUp(email,username,password,successFn,errorFn){
  var user = new AV.User()

  user.setUsername(username);
  user.setPassword(password);
  user.setEmail(email);
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUSer(loginedUser)
    successFn(user)
  },(function(error){
    errorFn(error)
  }))
}

export function signIn(username,password,successFn,errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUSer(loginedUser)
    successFn(user)
  }, function (error) {
    errorFn(error)
  })
}

export function getUserCurrent(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUSer(user)
  }else{
    return null
  }
} 

export function signOut(){
  AV.User.logOut()
}

export function sendPasswordResetEmail(email,successFn,errorFn){
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn() 
  }, function (error) {
    errorFn(error)
  })
}

function getUserFromAVUSer(AVUser){
  return({
    id:AVUser.id,
    ...AVUser.attributes
  })
}
