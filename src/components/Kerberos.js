import React from 'react';
import Cerbere from "../img/kerberos.png"
import KerberosImg from "../img/kerberos.jpg"

class Kerberos extends React.Component {
    render() {
      return (
        <div className="article">
          <h1>Kerberos</h1>
          <hr/>
          <p className="tabulation">En mythologie, Kerberos (plus connu sous le nom de Cerbère) est un énorme chien à trois têtes qui garde l’entrée des Enfers. Dans le domaine informatique il s'agit du protocole d'authentification dans un réseau informatique qui a besoin de 3 entités distincte pour fonctionner, d'où la référence pour le nom.</p>

          <img id="cerbere_img" src={Cerbere} alt="schéma Kerberos"/>

          <h2>Qu'est-ce que Kerberos ?</h2>
          <p className="tabulation">Protocole d'authentification des utilisateurs dans un réseau développé par le MIT, fonctionnant de pair avec un Active Directory, il permet l'accès des utilisateurs à des services de manière authentifiée.</p>

          <p>Le principe de Kerberos est de centraliser la gestion de l'authentification, de sorte que les identifiants n'aient pas besoin de circuler sur le réseau et les serveurs d'en avoir connaissance. Toute l'authentification est gérée par le <strong>KDC (Key Distribution Center)</strong> suivant 3 étapes :</p>
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
            <li>1.Le client demande à s'authentifier auprès du Serveur d'Authentification (AS) en demandant un TGT</li>
            <li>2.Le KDC vérifie les données d’identification et renvoie en cas de succès au client un TGT</li>

            <li>3. Le client envoie son TGT au TGS avec le Service Principal Name (SPN) de la ressource à laquelle il souhaite accéder</li>

            <li>4.Le KDC vérifie le TGT et s’assure que l’utilisateur a droit d'accèder au service demandé</li>

            <li>5.S'il y est autorisé, le TGS va alors fournir un ticket de service au client</li>

            <li>6.Le client présente son ticket au service concerné, qui lui accordera l'accès au ressource selon ses privilèges</li>
          </ol>

          <p>Dans un environnement Active Directory, les contrôleurs de domaine (Domain controllers ou DC) jouent le rôle de KDC et assurent donc les services d'Authentication Server (AS) et de Ticket Granting Service (TGS)</p>


          <p>[Comparaison foireuse] En gros on pourrait comparer le principe de ticketing de Kerberos à celui de certains parcs d'attraction : il faut d'abord un ticket d'entrée général pour accèder au parc (TGT) avant de faire la demande de tickets spécifiques pour accèder à chacune des attractions (TGS). A la différence que dans Kerberos il n'y a ni coupe-file ni fast-pass ;)</p>

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
          <p>Kerberos étant la solution la plus déployée pour tout ce qui concerne l'authentification dans un réseau d'entreprise il est évidemment cibles de nombreuses attaques qui peuvent en cas de réussite mener jusqu'à la compromission totale du SI. </p>
          <ul>
            <li><a href="#spn">Scan des SPN</a></li>
            <li>Pass-the-ticket : falsification d'une clé de session pour la présenter à une ressource sous la forme de données d’identification</li>
            <li><a href="#kerberoasting">Kerberoasting</a></li>
            <li><a href="#asreproasting">AS-REPRoasting</a></li>
            <li><a href="#golden">Golden Ticket</a> : falsification d'un ticket accordant à un utilisateur un accès administrateur du domaine</li>
            <li><a href="#silver">Silver Ticket</a> : falsification d'un ticket donnant accès à un service</li>
            <li>Credential stuffing (bruteforce) : tentatives répétées automatisées visant à cracker un mot de passe</li>
            <li>Affaiblissement du chiffrement via un Skeleton Key : malware capable de passer outre Kerberos (nécessitant un accès admin)
            </li>
            <li>Attaque DCShadow : nouvelle attaque consistant à définir son propre contrôleur de domaine afin de s’infiltrer plus en profondeur</li>
          </ul>
          

          <br/>
          <hr id="spn"/>
          <br/>

          <h3>Scan des Service Principal Name (SPN)</h3>

          <p className="tabulation">Afin de gagner en furtivité dans un réseau en environnement AD, le traditionnel scan de ports est à remplacer par un scan SPN. Il s'agit des chaînes de caractères associées à un service qui sont répertoriées pour chaque compte dans l'annuaire LDAP. <br/><br/> En faisant une requête LDAP sur le DC on peut donc énumérer l'ensemble des services. L'avantage étant qu'il n'y a pas besoin d'initier une connexion sur chacun des serveurs hébergeant un service. Cette méthode, plus discrète, peut être réaliser sur n'importe quel poste connecté à l'AD via la commande : <strong>setspn.exe</strong></p>

          <br/>
          <hr id="kerberoasting"/>
          <br/>

          <h3>Kerberoasting</h3>
          <p className="tabulation">C'est une attaque qui cible les comptes de services qui sont répertoriés au niveau de l'annuaire LDAP (SPN). <br/> Le Kerberoasting consiste à demander au TGS des tickets de services pour chacun des SPN énumérés (récupérés auparavant via Setspn.exe par exemple), cela nécessite évidemment d'avoir un TGT donc au moins un compte user simple. <br/> Comme chaque ticket de service est chiffré avec une clé correspondant au hash du mot de passe il est ensuite possible de lancer une attaque par bruteforce pour casser le mot de passe du compte ciblé. 
          <br/><br/> 
          Le script GetUsersSPNs.py d'Impacket permet d'obtenir les hash des mots de passe des comptes de services à distance en fournissant l'adresse IP du DC et des creds d'un compte user simple.</p>

          <br/>
          <hr id="asreproasting"/>
          <br/>

          <h3>AS-REPRoasting</h3>

          <p className="tabulation">[attaque asreproasting]</p>

          <br/>
          <hr id="golden"/>
          <br/>

          <h3>Golden Ticket</h3>

          <p className="tabulation">Dans un environnement Active Directory, les comptes sont identifiés par un nom d’utilisateur et un mot de passe, l’utilisateur identifié obtient alors un ticket Kerberos contenant son jeton d’authentification.<br/><br/>

          Le Golden Ticket est le jeton d’authentification associé au compte KRBTG, un compte spécial servant à chiffrer tous les jetons d’authentification du DC. Ce Golden Ticket peut être utiliser avec une technique de <strong>Pass-the-hash</strong> pour se connecter à n’importe quel compte.
          </p>

          <ol>
            <li>Infecter une machine cible avec un malware qui permet un premier accès avec un compte utilisateur pour accéder à d’autres ressources réseau (souvent à partir d’un e-mail de phishing)</li>
            <li>Augmenter suffisamment ses privilèges pour avoir accès au Contrôleur de domaine (DC)</li>
            <li>Se connecter au DC et dumper le hash du mot de passe du compte KRBTG pour créer un Golden Ticket. (via mimikatz)</li>
            <li>Le Golden Ticket permet d'accéder à toutes les ressources présentes sur le réseau</li>
          </ol>

          <p>Même une modification du mot de passe du compte KRBTG n'entraîne pas l'invalidation du jeton d’authentification, donc le Golden Ticket est immuable.</p>

          <br/>
          <hr id="silver"/>
          <br/>

          <h3>Silver Ticket</h3>

          <p className="tabulation">Avec le mot de passe d’un compte il est possible de l’utiliser pour créer un faux ticket d’authentification de service appelé <strong>Silver Ticker</strong>. La création de Silver Ticket est possible car Kerberos permet aux services de se connecter sans que la validité de leur jeton ne soit vérifiée.<br/><br/>

          [Sean Metcalf] <br/><br/>
          
          Un Silver Ticket est un faux ticket d’authentification utilisé pour se connecter à certains comptes. Ils sont plus difficiles à détecter que les Golden Tickets en raison de l’absence de communication entre le service et le DC et comme la journalisation se fait en local sur l’ordinateur cible.<br/><br/>

          Les tickets Kerberos sont vérifiés par le Certificat de compte habilité (PAC) mais les comptes de services (comme CIFS ou le pare-feu Windows) ne sont pas toujours vérifiés.<br/><br/>

          Avec un Silver Ticket, on peut s'authentifier auprès du contrôleur de domaine ou utiliser une technique Pass-the-ticket pour augmenter ses accès. 
          </p>

          <br/>
          <hr/>
          <br/>

          <h3>Conclusion</h3>

          <p className="tabulation">Kerberos est un protocole d'authentification robuste et efficace qui est encore loin d’être obsolète.</p>
        </div>
      );
    }
  }

  export default Kerberos;  