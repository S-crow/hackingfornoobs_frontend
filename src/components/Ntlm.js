import React from 'react';
import SchemaNTLM from "../img/ntlm_schema.png"

class Ntlm extends React.Component {
    render() {
      return (
        <div className="article">
          <h1>Le protocole NTLM</h1>
          <hr/> 

          <h2>Les formats de Hash</h2>
          <ul>
              <li><strong>LM</strong> : hash des anciennes versions de Windows, obsolète (sécurité très faible).</li>
              <li><strong>NTLM</strong> : hash des versions récentes de Windows, (robuste).</li>
          </ul>
          <p className="tabulation">Ces hash sont stockés dans la base <strong>SAM</strong> pour les comptes locaux ou dans la mémoire du processus <strong>lsass</strong> et dans la base <strong>NTDS.dit</strong> de l'AD pour les comptes de domaine.<br/><br/>

          Il est possible de les bruteforcer pour obtenir des comptes ou de s'en servir dans une attaque Pass-The-Hash pour augmenter ses accès.</p>

          <br/>
          
          <h2>Les protocoles d'authentification (Challenge/Response)</h2>

          <ul>
              <li>Protocole <strong>LM</strong> : associé au hash LM et au chiffrement DES, obsolète (sécurité très faible)</li>
              <li>Protocole <strong>NTLMv1</strong> : similaire mais associé au hash NTLM (obsolète également, faible)</li>
              <li>Procole <strong>NTLMv2</strong> : version la plus récente (robuste), associé au chiffrement HMAC-DES</li>
          </ul>

          <br/>

          <strong>L'authentification NTLM s'effectue en plusieurs étapes :</strong>

          <img id="schema_ntlm" src={SchemaNTLM} alt="schema NTLM"/>

          <ol>
              <li>Le client envoie au serveur une demande d'authentification avec les versions du protocole NTLM qu'il accepte. (NTLMSSP_Negociate)</li>
              <li>Le serveur répond au client avec les version du protocole NTLM acceptées et un 'challenge' à résoudre. (NTLMSSP_Challenge)</li>
              <li>le client chiffre le challenge avec le hash du mot de passe de l'utilisateur et envoie sa 'response' au serveur. (NTLMSSP_Auth)</li>
              <li>Dans le cas d'une authentification avec un compte de domaine, le serveur envoie ces infos au DC.</li>
              <li>Le DC renvoie une réponse qui valide ou non l'authentification.</li>
          </ol>
          <p className="tabulation">L'authentification NTLM peut être encapsulée dans plusieurs protocoles : SMB, LDAP, HTTP(S), IMAP, SMTP ou MS-SQL.</p>

          <br/>
          
          <h2>L'attaque du relai NTLM </h2>
        </div>
      );
    }
  }

  export default Ntlm;