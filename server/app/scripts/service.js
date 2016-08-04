'use strict';

angular.module('yapp')
  .factory('DB', ['$location', '$firebaseObject', '$firebaseAuth', function($location, $firebaseObject, $firebaseAuth){

    var url = "https://miomuseo.firebaseio.com"
    var ref = new Firebase(url);
    var users = ref.child('users');
    var audioref = ref.child('audiolist');

    function createUser(user, psw, nick) {
      ref.createUser({
        email    : user,
        password : psw
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          return error;
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          //return userData;
          //dopo la creazione dell'utente lo logga direttamente
          var profile = $firebaseObject(users.child(userData.uid));
          profile.nick = nick;
          profile.$save();
          authUser(user, psw);
        }
      });
    }

    function authUser(user, psw) {
      ref.authWithPassword({
        email    : user,
        password : psw
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          return error;
        } else {
          //console.log("Authenticated successfully with payload:", authData);
          return false;
        }
      });
    }


    function registerOnAuth() {
      ref.onAuth(function(authData) {
        if (authData) {
          console.log("Authenticated with uid:", authData.uid);
          window.location.href = '/#/dashboard';
        } else {
          console.log("Client unauthenticated.");
          window.location.href = '/#/login';
        }
      });
    }

    function unauth() {
      return ref.unauth();
    }

    function getAuth() {
      return ref.getAuth();
    }

    function profile(userData) {
      return $firebaseObject(users.child(userData.uid));
    }

    function audiolist(userData) {
      return $firebaseObject(audioref.child(userData.uid));
    }

    return{
      ref: ref,
      users: users,
      audioref: audioref,
      data: $firebaseObject(ref),
      authUser: authUser,
      createUser: createUser,
      unauth: unauth,
      registerOnAuth: registerOnAuth,
      getAuth: getAuth,
      profile: profile,
      audiolist: audiolist
    }
  }]);
