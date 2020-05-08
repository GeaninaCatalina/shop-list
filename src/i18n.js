import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

// the translations
const resources = {
    en: {
      translation: {
        "title": "Shopping List",
        "login_name" : "Name",
        "login_password" : "Password",
        "login_message" : "You don't have an account?", 
        "sign_in": "Signin here!",

        "signin_name" : "Name",
        "signin_password": "Password",
        "signin_confirm" : "Confirm password",
        "signin_message": "You have an account?",
        "log_in": "Login here!",
      


        "submit": "Submit"
      }
    }, 

  fr: {
    translation: {
      "title" : "Liste de courses",
      "login_name" : "Nom",
      "login_password" : "Mot de passe",
      "login_message" : "Vous n'avez pas de compte?", 
      "sign_in" : "Connectez-vous ici!",

      "signin_name" : "Nom",
      "signin_password" : "Mot de passe",
      "signin_confirm" : "Confirmez le mot de passe",
      "signin_message": "Vous avez un compte?",
      "log_in": "Connectez-vous ici!",


      "submit" : "Soumettre"

    }
  }
}; 

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;