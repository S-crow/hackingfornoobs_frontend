import React from 'react';
import Cerbere from "../img/kerberos.png"
import KerberosImg from "../img/kerberos.jpg"
import GoldenTicket from "../img/golden_ticket.jpg"
import SilverTicket from "../img/silver_ticket.jpg"

class Kerberos extends React.Component {
    render() {
      return (
        <div className="article">
          <h1>Kerberos</h1>
          <hr/>
          <p className="tabulation">En mythologie, Kerberos (plus connu sous le nom de Cerbère) est un énorme chien à trois têtes qui garde l’entrée des Enfers. Dans le domaine informatique il s'agit du protocole d'authentification dans un réseau informatique qui a besoin de 3 entités distinctes pour fonctionner, d'où la référence pour le nom.</p>

          <img id="cerbere_img" src={Cerbere} alt="schéma Kerberos"/>

          <h2>Qu'est-ce que Kerberos ?</h2>
          <p className="tabulation">Protocole d'authentification des utilisateurs dans un réseau développé par le <strong>MIT</strong>, fonctionnant de pair avec un Active Directory, il permet l'accès des utilisateurs à des services de manière authentifiée.</p>

          <p>Le principe de Kerberos est de centraliser la gestion de l'authentification, les identifiants n'ont plus besoin de circuler sur le réseau et les serveurs d'en avoir connaissance. Toute l'authentification est gérée par le <strong>KDC (Key Distribution Center)</strong>.</p> 

          <br/>
          <hr/>
          <br/>

          <h2>Principe de fonctionnement</h2>

          <img id="principe_kerberos" src={KerberosImg} alt="schéma Kerberos"/>

          <ol>
            <li>Le client demande à s'authentifier auprès du Serveur d'Authentification (<strong>AS</strong>) en demandant un <strong>TGT</strong></li>
            <li>Le KDC vérifie les données d’identification et renvoie en cas de succès au client un TGT</li>

            <li>Le client envoie son TGT au <strong>TGS</strong> avec le Service Principal Name (SPN) de la ressource à laquelle il souhaite accéder</li>

            <li>Le KDC vérifie le TGT et s’assure que l’utilisateur a droit d'accèder au service demandé</li>

            <li>S'il y est autorisé, le TGS va alors fournir un <strong>ticket de service</strong> au client</li>

            <li>Le client présente son ticket au service concerné, qui lui accordera l'accès aux ressources selon ses privilèges</li>
          </ol>

          <p>Dans un environnement Active Directory, les contrôleurs de domaine (<strong>Domain controllers</strong> ou DC) jouent le rôle de KDC et assurent donc les services d'<strong>Authentication Server</strong> (AS) et de <strong>Ticket Granting Service</strong> (TGS)</p>


          <p><strong>[Comparaison foireuse]</strong> <br/>On pourrait comparer le principe de ticketing de Kerberos à celui de certains parcs d'attraction : il faut d'abord un ticket d'entrée général pour accèder au parc (TGT) avant de faire la demande de tickets spécifiques pour accèder à chacune des attractions (TGS). Dans Kerberos toutefois il n'y a ni coupe-file ni fast-pass ;)</p>

          <br/>
          <hr/>
          <br/>

          <h2>Quelle différence entre Kerberos et NTLM ?</h2>

          [Voir section <strong>Protocole NTLM</strong>]

          <p className="tabulation">La principale différence est la vérification tierce partie et le chiffrement plus efficace de Kerberos. Cette étape supplémentaire du processus apporte une couche supplémentaire de sécurité importante par rapport à NTLM.</p>

          <br/>
          <hr/>
          <br/>

          <h2>Les attaques sur Kerberos</h2>
          <p className="tabulation">Kerberos étant la solution la plus déployée pour l'authentification dans un réseau d'entreprise il est évidemment cible de nombreuses attaques qui peuvent mener jusqu'à la compromission totale du SI. </p>
          <ul>
            <li><strong><a href="#spn">Scan des SPN</a></strong></li>
            <li><strong>Pass-The-Ticket</strong></li>
            <li><strong><a href="#kerberoasting">Kerberoasting</a></strong></li>
            <li><strong><a href="#asreproasting">AS-REPRoasting</a></strong></li>
            <li><strong><a href="#golden">Golden Ticket</a></strong></li>
            <li><strong><a href="#silver">Silver Ticket</a></strong></li>
            <li><strong>Credential stuffing (Bruteforce)</strong></li>
            <li><strong>Affaiblissement du chiffrement (Skeleton Key)</strong></li>
            <li><strong>DCShadow</strong></li>
          </ul>
          

          <br/>
          <hr id="spn"/>
          <br/>

          <h3>Scan des Service Principal Name (SPN)</h3>

          <p className="tabulation">Afin de gagner en furtivité dans un réseau en environnement AD, le traditionnel scan de ports est à remplacer par un <strong>scan SPN</strong>. Il s'agit des chaînes de caractères associées à un service qui sont répertoriées pour chaque compte dans l'annuaire LDAP. <br/><br/> Une requête LDAP sur le DC permet donc d'<strong>énumérer l'ensemble des services</strong>. L'avantage étant qu'il n'y a pas besoin d'initier une connexion sur chacun des serveurs hébergeant un service. Cette méthode, plus discrète, peut être réaliser sur n'importe quel poste connecté à l'AD via la commande : <strong>setspn.exe</strong></p>

          <br/>
          <hr id="kerberoasting"/>
          <br/>

          <h3>Kerberoasting</h3>
          <p className="tabulation">L'attaque <strong>Kerberoasting</strong> consiste à demander au TGS des tickets de services pour chacun des SPN récupérés auparavant (via Setspn.exe par exemple), cela nécessite évidemment d'avoir un TGT donc au moins un compte user simple. <br/> Comme chaque ticket de service est chiffré avec une clé correspondant au hash du mot de passe il est ensuite possible de lancer une attaque <strong>bruteforce du mot de passe</strong> pour le compte ciblé. 
          <br/><br/> 
          Le script <strong>GetUsersSPNs.py</strong> d'Impacket permet d'obtenir les hash des mots de passe des comptes de services à distance en fournissant l'adresse IP du DC et des creds d'un compte user simple.</p>

          <br/>
          <hr id="asreproasting"/>
          <br/>

          <h3>AS-REPRoasting</h3>

          <p className="tabulation">Il existe une pré-authentification sur Kerberos qui consiste à envoyer initialement la valeur de l'horodataga chiffrée avec la clé du compte utilisateur.<br/>
          Si elle n'est pas présente càd si le flag <strong>DONT_REQ-AUTH</strong> est présent dans le champ UserAccountControl d'un compte utilisateur, alors  cela signifie que ce dernier peut faire une demande de TGT sans s'être pré-authentifié. <br/><br/>

          L'<strong>AS-REPRoasting</strong> consiste à énumérer l'ensemble des comptes avec ce flag, de faire une demande de TGT à la place de ces utilisateurs pour tenter, en "offline", de <strong>casser leur mot de passe.</strong><br/><br/>

          <strong>GetNPUsers.py</strong> d'Impacket permet de récupérer les hash de ces comptes.
          [screen]</p>

          <br/>
          <hr id="delegation"/>
          <br/>

          <h3>Delegation d'authentification (sans contrainte)</h3>

          <p className="tabulation">Certains serveurs qui ont le flag <strong>TRUSTED_FOR_DELEGATION</strong> gardent en cache  dans le processus lsass les TGT des utilisateurs pour pouvoir effectuer à leur place la demande d'accès à un autre service. Ainsi en cas de compromission d'un de ces serveurs on peut récupérer l'ensemble des TGT stockés. <br/><br/>

          L'outil <strong>ldapdomaindump</strong> permet d'énumérer ces machines. <br/>
          [add screenshot]

          <br/><br/>

          On utilise ensuite <strong>Mimikatz</strong> pour récupérer les tickets en mémoire. </p>

          <p id="terminal">kerberos::list /export></p>
      

          <br/>
          <hr id="passtheticket"/>
          <br/>

          <h3>Pass-The-Ticket</h3>

          <p className="tabulation">Cette attaque consiste à injecter des TGT précedemment récupérés directement dans la mémoire du processus lsass d'autres machines pour augmenter ses accès.</p>

          <br/>
          <hr id="golden"/>
          <br/>

          <h3>Golden Ticket</h3>

          <p className="tabulation">Dans un environnement AD, les comptes sont identifiés par un nom d’utilisateur et un mot de passe, l’utilisateur identifié obtient alors un ticket Kerberos contenant son jeton d’authentification.<br/><br/>

          Le Golden Ticket est le jeton d’authentification associé au compte KRBTG, un compte spécial servant à chiffrer tous les jetons d’authentification du DC. Ce Golden Ticket peut être utiliser avec une technique de <strong>Pass-The-Hash</strong> pour se connecter à n’importe quel compte.
          </p>

          <img id="golden_ticket" src={GoldenTicket} alt="golden ticket"/>

          <p>La méthodologie de compromission d'un AD est la suivante : </p>
          <ol>
            <li>Infecter une machine cible pour avoir un premier accès avec un compte utilisateur et accéder à d’autres ressources réseau (e-mail de phishing)</li>
            <li>Augmenter suffisamment ses privilèges pour avoir accès au Contrôleur de Domaine (DC)</li>
            <li>Se connecter au DC et dumper le hash du mot de passe du <strong>compte KRBTG</strong> pour créer un Golden Ticket. (<strong>Mimikatz</strong>)</li>
            <li>Le Golden Ticket donne accès à toutes les ressources présentes sur le réseau.</li>
          </ol>

          <p>Même une modification du mot de passe du compte KRBTG n'entraîne pas l'invalidation du jeton d’authentification, donc le Golden Ticket est <strong>immuable</strong>.</p>

          <br/>
          <hr id="silver"/>
          <br/>

          <h3>Silver Ticket</h3>

          <p className="tabulation">Il est possible d’utiliser le mot de passe d'un compte pour créer un faux ticket d’authentification de service appelé <strong>Silver Ticker</strong>. La création d'un Silver Ticket est possible car Kerberos permet aux services de se connecter sans que la validité de leur jeton ne soit vérifiée.<br/><br/>

          [Sean Metcalf] </p>

          
          <img id="silver_ticket" src={SilverTicket} alt="silver ticket"/>
          
          <p className="tabulation">Ils sont plus difficiles à détecter que les Golden Tickets en raison de l’absence de communication entre le service et le DC et vu que la journalisation se fait en local sur l’ordinateur cible.<br/><br/>

          Les tickets Kerberos sont généralement vérifiés par le Certificat de compte habilité (PAC) mais les comptes de services (comme CIFS ou le pare-feu Windows) ne le sont pas toujours.<br/><br/>

          Avec un Silver Ticket, on peut s'authentifier auprès du Contrôleur de Domaine ou utiliser une technique <strong>Pass-The-Ticket</strong> pour augmenter ses accès. 
          </p>

          <br/>
          <hr/>
          <br/>

          <h3>Contre-mesures</h3>

          <ul>
            <li>Mots de passe robustes pour les comptes de service</li>
            <li>Flag "Not_DELEGATED" sur l'attribut UserAccountControol des comptes d'utilisateurs ayant accès à des ressources sensibles.</li>
            <li>Changer le mot de passe du compte krbtgt régulièrement</li>
            <li>Détecter un nombre trop important de demandes de ticket de service (<strong>Kerberoasting</strong>)</li>
          </ul>

          <br/>
          <hr/>
          <br/>
          
          <h3>Conclusion</h3>

          <p className="tabulation">Malgré les attaques possibles, Kerberos est un protocole d'authentification robuste et efficace qui est encore loin d’être obsolète.</p>
        </div>
      );
    }
  }

  export default Kerberos;  