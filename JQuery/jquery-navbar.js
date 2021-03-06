function checkSesionNavbar (){
  $(".sinSesionIniciada").hide();
  $(".conSesionIniciada").hide();
  //peticion para comprobar si se a iniciado Sesion
  $.ajax({
    type: "POST",
    url: "/projectSocialNetwork/PHP/Sessions/Session_Exists.php",
    data: {action: "ejecutar"},
    async: true,
    dataType: "html",
    success: function(data){
                if (data == "yes"){
                  $(".sinSesionIniciada").hide();
                  $(".conSesionIniciada").show();
                  getImgYAlias();
                }
                else{
                  $(".conSesionIniciada").hide();
                  $(".sinSesionIniciada").show();
                }
            },
  });
}

function getImgYAlias(){
  $.ajax({
      type: "POST",
      url: "../../PHP/Querys/User_Data.php",
      data: {opcion: "navbar"},
      dataType: "json",
      success: function (response) {
        $("#alias-navbar").text(response[0]['Alias']);
        if(response[0]['Foto'] == "" || response[0]['Foto'] == null){
          response[0]['Foto'] = "../img/user.jpg";
        }
        $("#img-navbar").attr('src', response[0]['Foto']);
      }
  });
}

function checkNotificaciones(){
  $.ajax({
    type: "POST",
    url: "../../PHP/Querys/Notificaciones.php",
    data: {adv: "msg"},
    async: false,
    dataType: "",
    success: function(data){
                if(data != "0"){
                  $("#msg-span").text(data);
                }
            },
  });
}

function checkPeticionesSeguimiento(){
  $.ajax({
    type: "POST",
    url: "/projectSocialNetwork/PHP/Querys/Notificaciones.php",
    data: {adv: "seg"},
    async: false,
    dataType: "html",
    success: function(data){
                if(data != "0"){
                  $("#seg-span").text(data)
                }
            },
  });
}

function checkCountNotificaciones(){
  $.ajax({
    type: "POST",
    url: "../../PHP/Querys/Notificaciones.php",
    data: {adv: "total"},
    async: false,
    dataType: "html",
    success: function(data){
                if(data != "0"){
                  $("#count-not").text(data)
                }
            },
  });
}

checkSesionNavbar();
checkNotificaciones();
checkPeticionesSeguimiento();
checkCountNotificaciones();

$("#buscar").click(function (){
  window.location.href = "usuario.html?name=" + $("#search").val();
})

$("#cerrarSesionNavbar").click(function (){
  window.location.href = "../../PHP/Sessions/Logout.php";
})
