import React from 'react';


class Ntlm extends React.Component {
    render() {
      return (
        <div className="article">
          <h1>Le protocole NTLM</h1>
          <hr/>

          <h4>Les formats de Hash</h4>
          <ul>
              <li>LM : hash des anciennes versions de Windows, obsolète car de sécurité très faible.</li>
              <li>NTLM : hash plus robuste présent sur les versions récentes de Windows.</li>
          </ul>
          <p>Ces hash sont stockés dans la base SAM pour les comptes locaux ou dans la mémoire du processus lsass et dans la base NTDS.dit de l'AD pour les comptes de domaine.

          Il est possible de les bruteforcer pour obtenir des comptes ou de s'en servir dans une attaque Pass-The-Hash pour augmenter ses accès.</p>

          <br/>
          
          <h4>Les protocoles d'authentification (Challenge/Response)</h4>

          <ul>
              <li>Protocole LM : fonctionne avec le hash LM et l'algorithme de chiffrement DES, obsolète (sécurité très faible)</li>
              <li>Protocole NTLMv1 : similaire mais associé avec le hash NTLM (obsolète également, faible)</li>
              <li>Procole NTLMv2 : version la plus récente (robuste), fonctionne avec l'algorithme de chiffrement HMAC-DES</li>
          </ul>

          <br/>

          <strong>L'authentification NTLM s'effectue suivant 3 grandes étapes :</strong>
          <ol>
              <li>Le client envoie au serveur une demande d'authentification avec les versions du protocole NTLM qu'il accepte. (NTLMSSP_Negociate)</li>
              <li>Le serveur répond au client avec les version du protocole NTLM acceptées et un 'challenge' à résoudre. (NTLMSSP_Challenge)</li>
              <li>le client chiffre le challenge avec le hash du mot de passe de l'utilisateur et envoie sa 'response' au serveur. (NTLMSSP_Auth)</li>
          </ol>
          <p>Dans le cas d'une authentification avec un compte de domaine, le serveur enverra ces infos au DC qui validera ou non l'authentification. <br/><br/>
          L'authentification NTLM peut être encapsulée dans plusieurs protocoles : SMB, LDAP, HTTP(S), IMAP, SMTP ou MS-SQL.</p>

          <br/>
          
          <h2>L'attaque du relai NTLM </h2>
        </div>
      );
    }
  }

  export default Ntlm;