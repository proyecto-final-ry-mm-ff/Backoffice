import React, { useEffect } from "react";

const FacebookLogin = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "912440837717866", // Reemplaza con tu App ID
        cookie: true,
        xfbml: true,
        version: "v21.0",
      });
    };

    // Cargar el SDK de Facebook de manera asincrónica
    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Función para iniciar sesión en Facebook
  const loginWithFacebook = () => {
    window.FB.login(
      function (response) {
        if (response.status === "connected") {
          const userAccessToken = response.authResponse.accessToken;

          console.log(userAccessToken);

          // Enviar el token al backend
          fetch("/api/auth/facebook/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken: userAccessToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Token de Página:", data.pageAccessToken);
            })
            .catch((error) => console.error("Error:", error));
        } else {
          console.error("El usuario no autorizó la aplicación.");
        }
      },
      {
        scope: "pages_show_list,pages_manage_metadata,pages_messaging,pages_read_engagement,business_management",
      }
    );
  };

  return (
    <button onClick={loginWithFacebook} style={{ padding: "10px", fontSize: "16px" }}>
      Iniciar sesión con Facebook
    </button>
  );
};

export default FacebookLogin;
