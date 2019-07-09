/* global gapi */

import React from "react";
import ReactDOM from "react-dom";

import Providers from "./morpheus/Providers";
import store from "./morpheus/store";
import App from "./morpheus/App";
import MatrixProfile from "./profile";

function renderApp() {
  ReactDOM.render(
    <Providers store={store}>
      <App />
    </Providers>,
    document.getElementById("root")
  );
}

window.onload = () => {
  gapi.load("auth2", () => {
    gapi.auth2.init().then(
      auth2 => {
        if (auth2.isSignedIn.get()) {
          const currentUser = auth2.currentUser.get();
          const basicProfile = currentUser.getBasicProfile();

          const profileData = {
            id: basicProfile.getId(),
            name: basicProfile.getName(),
            imageUrl: basicProfile.getImageUrl(),
            email: basicProfile.getEmail()
          };

          new MatrixProfile().storeProfileData(profileData);

          renderApp();
        } else {
          window.location.href = "/";
        }
      },
      () => {
        window.location.href = "/";
      }
    );
  });
};
