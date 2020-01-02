import React from 'react';
import Cerbere from "../img/kerberos.png"
import KerberosImg from "../img/kerberos.jpg"

class Kerberos extends React.Component {
    render() {
      return (
        <div className="article">
          <h1>Kerberos</h1>
          <hr/>
          <p className="tabulation">En mythologie, Kerberos (plus connu sous le nom de Cerbère) est un énorme chien à trois têtes qui garde l’entrée des Enfers. Dans notre article il s'agit du protocole d'authentification dans un réseau informatique qui a besoin de 3 entités distincte pour fonctionner, d'où la référence pour le nom.</p>

          <img id="cerbere_img" src={Cerbere} alt="schéma Kerberos"/>

          <h2>Qu'est-ce que Kerberos ?</h2>
          <p className="tabulation">Protocole d'authentification des utilisateurs dans un réseau, fonctionnant de pair avec un Active Directory, il permet l'accès des utilisateurs à des services de manière authentifiée.</p>

          <p>Le principe de Kerberos est de centraliser le processus d'authentification, de sorte que les identifiants n'aient pas besoin de circuler sur le réseau et les serveurs d'en avoir connaissance. Toute l'authentification est gérée par le <strong>KDC (Key Distribution Center)</strong> suivant 3 étapes :</p>
          <ol>
            <li><strong>Authentification</strong> du client auprès du KDC Authentication Service (AS)</li>
            <li>Demande du client d'un <strong>Ticket de Service</strong> (TGS)</li>
            <li><strong>Accès au service</strong> en lui fournissant le ticket associé</li>
          </ol>  

          <br/>
          <hr/>
          <br/>

          <h2>Principe de fonctionnement</h2>

          <img id="principe_kerberos" src={KerberosImg} alt="schéma Kerberos"/>

          <ol>
            <li>Le client demande un ticket d’authentification (TGT) au Key Distribution Center (KDC)</li>
            <li>Le KDC vérifie les données d’identification et renvoie un TGT chiffré et une clé de session</li>
            <li>Le TGT est chiffré à l’aide de la clé secrète Ticket Granting Service (TGS)</li>
            <li>Le client conserve le TGT et, lorsqu’il arrive à expiration, le gestionnaire de session local en demande un autre (cette procédure est transparente pour l’utilisateur)</li>
          </ol>
          
          Si le client demande l'accès à un service ou à une autre ressource du réseau, la procédure est la suivante :

          <ol>
            <li>Le client envoie le TGT en cours du TGS avec le Service Principal Name (SPN) de la ressource à laquelle le client souhaite accéder</li>
            <li>Le KDC vérifie le TGT de l’utilisateur et s’assure que l’utilisateur a accès au service</li>
            <li>Le TGS envoie une clé de session valide pour le service au client</li>
            <li>Le client transmet la clé de session au service pour prouver que l’utilisateur dispose d’un accès, et le service accorde l’accès</li>
          </ol>


          <p>[Comparaison parc attraction]</p>

          <br/>
          <hr/>
          <br/>

          <h2>Quelle différence entre Kerberos et NTLM ?</h2>

          [Définir NTLM]

          <p className="tabulation">La principale différence entre les deux systèmes est la vérification tierce partie et le chiffrement plus efficace de Kerberos. Cette étape supplémentaire du processus apporte une couche supplémentaire de sécurité importante par rapport à NTLM.

          Actuellement, la technologie NTLM est obsolète et n'assure plus correctement la protection des données sensibles.</p>

          <br/>
          <hr/>
          <br/>

          <h2>Les attaques sur Kerberos</h2>
          <ul>
            <li>Pass-the-ticket : consiste à falsifier une clé de session et à la présenter à la ressource sous la forme de données d’identification</li>
            <li><a href="#golden">Golden Ticket</a> : un ticket qui accorde à un utilisateur un accès administrateur au domaine</li>
            <li><a href="#silver">Silver Ticket</a> : un ticket falsifié qui donne accès à un service</li>
            <li>Credential stuffing / force brute : tentatives répétées automatisées visant à deviner un mot de passe</li>
            <li>Affaiblissement du chiffrement au moyen d’un Skeleton Key : un malware capable de passer outre Kerberos, mais l’attaque doit disposer d’un accès Admin
            </li>
            <li>Attaque DCShadow : nouvelle attaque grâce à laquelle les hackers pénètrent dans le réseau pour définir leur propre contrôleur de domaine afin de s’infiltrer plus en profondeur</li>
          </ul>

          <br/>
          <hr id="golden"/>
          <br/>

          <h3>Golden Ticket</h3>

          <p className="tabulation">
          Dans un Active Directory, les comptes sont identifiés par un nom d’utilisateur et un mot de passe, l’utilisateur identifié obtient alors un ticket Kerberos contenant son jeton d’authentification.<br/><br/>

          Le Golden Ticket est le jeton d’authentification associé au compte KRBTG, un compte spécial servant à chiffrer tous les jetons d’authentification pour le DC. Ce Golden Ticket peut être utiliser avec une technique de <strong>Pass-the-hash</strong> pour se connecter à n’importe quel compte.
          </p>

          <ol>
            <li>Infecter une machine cible avec un malware qui permet un premier accès avec un compte utilisateur pour accéder à d’autres ressources réseau (souvent à partir d’un e-mail de phishing)</li>
            <li>Augmenter suffisamment ses privilèges pour avoir accès au Contrôleur de domaine (DC)</li>
            <li>Se connecter au DC et obtenir via un dump le hash du mot de passe du compte KRBTG afin de créer un Golden Ticket. (dump du hash via mimikatz)</li>
            <li>Utiliser ce Golden Ticket pour accéder à toutes les ressources du réseau</li>
          </ol>

          <p>La subtilité de cette attaque c’est que même en modifiant le mot de passe du compte KRBTG, le jeton d’authentification restera valide, donc le Golden Ticket aussi.</p>

          <br/>
          <hr id="silver"/>
          <br/>

          <h3>Silver Ticket</h3>

          <p className="tabulation">Après avoir craqué le mot de passe d’un compte il est possible de l’utiliser pour créer un faux ticket d’authentification de service falsifié appelé <strong>Silver Ticker</strong>. Kerberos permet aux services de se connecter sans que la validité de leur jeton ne soit vérifiée, c'est cette caractéristique qui est exploitée pour créer des Silver Tickets.<br/><br/>

          Sean Metcalf <br/><br/>
          
          Un Silver Ticket est un ticket d’authentification falsifié utilisable pour se connecter à certains comptes. Ils sont plus difficiles à détecter que les Golden Tickets en raison de l’absence de communication entre le service et le contrôleur de domaine et comme la journalisation se fait en local sur l’ordinateur cible.<br/><br/>

          Les tickets Kerberos sont vérifiés par le Certificat de compte habilité (PAC) tierce partie mais les comptes de services (comme CIFS ou le pare-feu Windows) ne sont pas toujours vérifiés.<br/><br/>

          Avec un Silver Ticket, on peut authentification Kerberos auprès du contrôleur de domaine ou utiliser une technique pass-the-ticket pour augmenter ses droits d’accès. 
          </p>

          <br/>
          <hr/>
          <br/>

          <h3>Conclusion</h3>

          <p className="tabulation">Kerberos est encore loin d’être obsolète et a prouvé son efficacité en tant que protocole d'authentification au moyen d' algorithmes de chiffrement forts qui protégent les mots de passe et tickets d’authentification.</p>
        </div>
      );
    }
  }

  export default Kerberos;  