import AV from 'leancloud-storage'

var APP_ID = 'DLnGYV5wDEmLJUbvwBnXWQIP-gzGzoHsz';
var APP_KEY = 'S753khDqda46cJQUwvHSKtbG';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username,password,successFn,errorFn){
  var user = new AV.User()

  user.setUsername(username);
  user.setPassword(password);

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


function getUserFromAVUSer(AVUser){
  return({
    id:AVUser.id,
    ...AVUser.attributes
  })
}

