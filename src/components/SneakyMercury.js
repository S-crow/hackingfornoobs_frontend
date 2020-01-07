import React from 'react';
import Fuzzbunch from "../img/fuzzbunch.jpg"
import Eternalblue from "../img/eternalblue.PNG"
import Help from "../img/help_sneakymercury.PNG"
import Demo from "../img/demo_sneakymercury.PNG"
import Interactive from "../img/interactive.PNG"
import NSA from "../img/nsa.svg"
import Flow from "../img/flow.PNG"
import EternalblueSuccess from "../img/eternalbluesuccess.jpg"


class SneakyMercury extends React.Component {
    render() {
      return (
      <div className="article">
        <h1>Projet SneakyMercury</h1>
        <h2 style={{"font-size": "200%", "font-family": "Proxima Nova Soft", "text-align": "center"}}>(Post-exploitation dans les réseaux Windows)</h2>
        <hr/>
        <div>
          <ul>
            <li><a href="#projet">Le projet</a></li>
            <li><a href="#PTH">Pass-The-Hash</a></li>
            <li><a href="#smb">Le protocole SMB</a></li>
          </ul>  
        </div>
        <div className="sneaky_article">
            <h2>Le Shadow Brokers Leak</h2>

            <p className="tabulation">Ces dernières années ont vu l'émergence de cyberattaques de plus en plus sophistiquées. Les attaquants comme les agences gouvernementales se servent d'outils customs développés en interne, qui sont parfois sujet à des fuites publiques.<p/> 
            <p className="tabulation"></p>L'une d'entre elles a particulièrement marqué les esprits, le <strong>Shadow Brokers Leak,</strong> qui contenait les exploits et outils utilisés par la NSA (National Security Agency) et en particulier ceux concernant le <strong>protocole SMB</strong>. Ces exploits dénommés EternalBlue, EternalChampion, EternalRomance et EternalSynergy ont été ensuite ré-implémentés dans des campagnes d'attaques comme le ransomware <strong>WannaCry</strong>. </p>

            <img id="nsa" src={NSA} alt="NSA"/>
            
            <h2>Le contexte général</h2>
            <p className="tabulation">Le leak des Shadow Brokers est une série de 2 fuites d’outils de la NSA survenues en Août 2016 et Avril 2017. Ces leaks contenaient plusieurs exploits et outils qui furent volés semble-t-il à <strong>l’Equation Group</strong>, le groupe opérationnel cyber de la NSA. Cela inclut notamment le fameux exploit <strong>EternalBlue</strong> qui n'a eu de cesse depuis de faire parler de lui. </p>
            <p>Les Shadows Brokers annoncèrent publiquement la fuite le 13 août 2016 sur plusieurs sites et forums comme teaser de la fuite suivante d'autres outils qu’ils avaient également en leur possession. </p>
            <p>Finalement le 14 avril 2017 fut release le dossier <strong>Lost in Translation</strong>. En 2017, plusieurs cyberattaques ont été lancées après cet événement, notamment les fameux ransomwares <strong>WannaCry</strong> et <strong>NotPetya</strong>. </p><br/>
            
            <h2>Les outils de la NSA</h2>
            <p>La première partie de notre stage consistait en l’étude des différents outils de la NSA, nous nous sommes particulièrement concentrés sur 3 outils : </p>
            
            <p><strong>FUZZBUNCH :</strong> Framework comparable à Metasploit. Généralement utilisé pour générer des payloads customs (charge utile servant à infecter une machine cible).</p>
            <p><strong>DOUBLEPULSAR :</strong> Payload utilisé avec les exploits SMB. Il s’agit d’une backdoor7 qui offre des fonctionnalités comme l’injection de DLL8 ou l’exécution de code malveillant sur les machines infectées. Il est utilisé pour installer PeddleCheap qui est un listener9 qui se connecte en retour à Danderspritz. </p>
            <p><strong>DANDERSPRITZ :</strong> Framework graphique de post-exploitation, il couvre entre autre la reconnaissance, la découverte du réseau, la détection d’antivirus, l’extraction de données, la persistance et plein d’autres fonctionnalités. </p>
            
            <div>Parmi les différentes fonctionnalités : <br/>
                <ul>
                    <li>Monitoring des services sur la machine victime</li>
                    <li>Récupération d’informations sur les drivers</li>
                    <li>Liste des logiciels et des services en cours d’exécution</li>
                    <li>Liste des antivirus présents</li>
                    <li>Gestion de netstat</li>
                    <li>Dump de mots de passe </li>
                </ul>
            </div>
            <p>Afin de faciliter le monitoring des hôtes infectés, plusieurs options sont disponibles pour prévenir et alerter les analystes</p>
            <p>Danderspritz offre également des modules dédiés à l’Active Directory (énumération des utilisateurs, des partages réseau, etc) et aux mouvements latéraux.</p>       
            <div>Résumé d'une attaque lancée à partir de ces outils :
              <ol>
                <li>La victime est infectée avec la backdoor <strong>Doublepulsar</strong> via un exploit (<strong>EternalBlue</strong> par exemple)</li> 
                <li>Le listener <strong>PeddleCheap</strong> est lancé dans l’interface graphique <strong>Danderspritz</strong>.</li>
                <li>PeddleCheap est uploadé via la backdoor DoublePulsar.</li>
                <li>PeddleCheap est exécuté et se connecte au listener</li>  
              </ol>
            [Diagramme Post-exploitation NSA]
            </div>
            <br/>
            <h2>Démonstration des outils </h2>
            <p>L’interface de base de Fuzzbunch est assez user-friendly : </p>
            <div><img id="fuzzbunch" src={Fuzzbunch} alt="Fuzzbunch démo"></img></div>
            -> <a href="https://www.digital.security/fr/blog/dans-la-boite-outils-dequation-group">article Digital Security sur l'Equation Group</a><br/><br/>
            <div>Après avoir renseigné certains champs, comme l’adresse IP cible ou le port d’écoute, on peut lancer des plugins qui s’organisent en différentes catégories :  
              <ul>
                <li><strong>Reconnaissance</strong> (fingerprinting) et check des vulnérabilités exploitables sur la cible : Rpctouch, Smbtouch, et d’autres outils de reconnaissance </li>
                <li><strong>Exploitation de vulnérabilités</strong> : Emeraldthread ou la suite Eternal*</li>
                <li><strong>Post-exploitation</strong> après infection de l’hôte : DouplePulsar </li>
              </ul>
              RpcTouch permet de réaliser un fingerprinting de la cible, Smbtouch en plus de récupérer la version et l’architecture du système d’exploitation remonte directement les vulnérabilités exploitables sur la machine cible.
            </div>

            <br/> 

            <p>Dans l'exemple suivant, la cible est vulnérable à 3 exploits dont EternalBlue : 
            </p>
            <img id="eternalblue_img" src={Eternalblue} alt="eternalblue success"></img>
            <p className="tabulation">L’attaque a réussi, et n’aura pris qu’un peu plus de 10 secondes. EternalBlue exploite un buffer overflow au niveau de la stack SMB et s'exécute au niveau du Kernel Windows. Après on peut déposer une backdoor sur la cible. </p>
            <a href="https://www.rapid7.com/db/modules/exploit/windows/smb/ms17_010_eternalblue">Détails de l'exploit</a>
            
            <hr/>

            <h2 id="projet">Projet SneakyMercury </h2>
            <h3>Mise en place d'un lab</h3>
            <p className="tabulation">La mise en place d’un lab était nécessaire au projet afin de pouvoir tester l'outil dans un environnement restreint et contrôlé. La plupart des entreprises de sécurité disposent de laboratoires virtuels comme celui-ci, certains sont également disponibles à l’achat. 
 
            Nous avons choisi de mettre en place l'architecture d'un réseau standard d’entreprise, à savoir un environnement Active Directory avec des serveurs (Windows Server) et des machines clientes (32bits et 64bits). Pour la machine attaquante, on se sert d’une machine virtuelle (VM) Kali Linux. </p>
            <ul>
              <li><strong>Active Directory</strong> - Collection de services pour la gestion des groupes, des utilisateurs et des machines. Les utilisateurs et les machines sont regroupés dans des domaines (ici testinfra.fr)
              
              Tous les services sont gérés par un unique serveur, <strong>le Domain Controller (DC)</strong></li>
              <li><strong>DNS</strong> - Service nécessaire pour le fonctionnement de l’Active Directory. l'AD se fie à une série d’enregistrements DNS pour établir quels services sont disponibles sur le domaine et ce qu’ils fournissent. Ces enregistrements sont gérés automatiquement.</li>
              <li><strong>LDAP</strong> - (Lightweight Directory Access Protocol) Annuaire de gestion des utilisateurs présents sur le réseau. </li>
              <li><strong>Kerberos</strong> - Service clé responsable de tout ce qui est authentification sur le domaine. Avec le SSO (Single Sign On) il est possible d'utiliser les mêmes identifiants pour se connecter sur tous les ordinateurs du domaine.</li>
            </ul>

            <p>L’ensemble de ces services sont installables lors de la mise en place d’un Active Directory :</p>
            <a href="https://www.psattack.com/articles/20160718/setting-up-an-active-directory-lab-part-1/ ">Mise en place d'un AD</a>
            <br/><br/>
            <h3>Un outil de post-exploitation pour les réseaux Windows</h3>
            <p className="tabulation">L’objectif de ce projet est de développer un nouvel outil opensource afin d’automatiser la phase de mouvement latéral dans un environnement réseau Windows avec Active Directory. L'outil devra être comparable en termes de fonctionnalités à l’outil existant <strong>CrackMapExec</strong> (CME) mais il devra être développé en RUST plutôt qu’en Python comme c'est le cas pour CME.</p>
            <a href="https://github.com/byt3bl33d3r/CrackMapExec ">github de CrackMapExec</a><br/><br/>
            <p>Rust est un langage relativement récent développé par la fondation Mozilla mais qui possède déjà de nombreux contributeurs sur GitHub.</p>
            <div><strong>Les avantages d’un développement en RUST ?</strong> <br/>
              <ul>
                <li><strong>Facilité de déploiement</strong> : Pas besoin d’environnement d’exécution (portable et multiplateforme), pas de dépendance, on compile le programme vers un binaire exécutable qu’on peut déployer sur le réseau cible.</li>
                <li><strong>Rapidité</strong> : Rust est un langage bas niveau, très optimisé par rapport au langage Python </li>  
                <li><strong>Sécurité</strong> : Rust combine programmation bas niveau avec sûreté mémoire, (pas de garbage collector). Le compilateur garantit que le code est memory safe. La syntaxe du langage et les vérifications du compilateur empêchent énormément d’erreurs, pas d’overflow ni de race condition ou autres corruptions mémoire.</li>
              </ul>
            </div>

            <ul id="list-links">
              <li><a href=" https://doc.rust-lang.org/book/ ">Rust Book</a></li>
              <li><a href="https://doc.rust-lang.org/rust-by-example/ ">Rust by example</a></li>
              <li><a href="https://aml3.github.io/RustTutorial/">Rust in 7 programs</a></li>
              <li><a href=" https://llogiq.github.io/2015/07/30/traits.html ">Rust built-in traits</a></li>
            </ul>      
            <div><strong>Cahier des charges pour l’outil :</strong>
              <ul>
                  <li>Authentification sur le réseau Windows : NTLM, Kerberos, Bruteforce de comptes </li>
                  <li>Énumération : de partages réseaux, d'utilisateurs, de groupes et d’autres informations utiles.</li>
                  <li>Commandes : Upload/Download de fichiers, shell interactif des fonctionnalités de l’outil </li>
                  <li>Exécution de code à distance : PSExec et LOLBAS (Living Off The Land Binaries And Scripts), ensemble de techniques furtives qui se servent des exécutables légitimes présents sur le système.</li>
              </ul>
            </div>
            <h3>Développement d’une bibliothèque SMB en Rust</h3>
            <p className="tabulation">Contrairement à <strong>CrackMapExec</strong> (CME) qui pouvait compter sur la bibliothèque SMB en Python <strong>Impacket</strong>, Rust étant un langage relativement récent, il n’y a pas de bibliothèque SMB déjà exitante. La principale difficulté a donc été la réimplémentation from scratch du protocole SMB en Rust. Il s’agissait de comprendre le protocole, les mécanismes de gestion de l’authentification sous Windows et de recrafter chaque paquet pour effectuer telle ou telle action.</p>
            <div>SMB (Server Message Block) est le protocole des partages Windows, il inclut notamment :  
              <ul>
                <li>L’accès aux Partages réseau (shares)</li>
                <li>La gestion des imprimantes </li>
                <li>L’administration de machines distantes </li>
                <li>La lecture et l’écriture de fichiers </li>
              </ul>
            </div>
            
            <p className="tabulation">SMB peut également fonctionner comme protocole de transport avec d’autres protocoles réseau Windows. Par exemple le protocole Windows Remote Procedure Call (DCE RPC) permet la communication interprocess. Les différents processus peuvent être sur la même machine, sur le même réseau local ou même selon la configuration, à travers le net. Cela nous permet donc l’exécution de code à distance, le management de services ou la gestion ou la modification de clés de registres Windows.</p>
            <p>Pour implémenter la 1ère bibliothèque SMB libre en RUST nous nous sommes basés sur Impacket qui en propose déjà une existante en Python et sur la documentation de Microsoft associée au protocole SMB.</p>
            
            <hr/>

            <h2>Utilisation de l’outil</h2>
            <div className="tabulation">SneakyMercury est un outil en CLI, l’interface offre un shell intéractif. Quand l’utilisateur lance l’outil il accède au menu d’aide lui indiquant les options à fournir (IP cible, nom d’utilisateur, mot de passe, nom de domaine)
            <br/>
            → Les commandes shell, script et db sont alors disponibles  
              <ul>
                <li>shell ouvre un shell intéractif avec un menu d’aide plus spécifique</li>
                <li>script permet à un utilisateur de lancer ses propres scripts</li>
                <li>db gère en background une base de données contenant les credentials déjà récupérés (fonctionnalité non implémentée)</li>
              </ul>
            </div>

            <img id="help" src={Help} alt="menu d'aide sneakymercury"/>

            <p>L’outil traite l’authentification NTLMv2 et retourne un message de connexion ou d’erreur. L’utilisateur connecté accède alors à la liste des commandes disponibles.</p>
            
            <img id="demo" src={Demo} alt="demo sneakymercury"/>

            <div>Généralement la commande suivante est « Connect » qui va permettre la connexion à un partage réseau (share). 
            
            Par défaut, il y a 3 partages réseau, visibles uniquement par l’administrateur du domaine ou l’administrateur local. Pour pouvoir monter ces partages réseau il faut avoir les droits administrateur sur le système.
            <ul>
              <li>C$ (Disque C)</li>
              <li>ADMIN$ = C:/Windows/</li>
              <li>IPC$</li>
            </ul>
            $=caché
            </div>
            <br/>
            <p className="tabulation">IPC$ est un partage spécial permettant la communication interprocess. Il ne permet pas d’accéder directement à des fichiers ou des dossiers comme les autres partages réseau mais il fournit une interface de communication avec les autres processus en cours d’exécution sur le système (Remote Procedure Call : DCERPC).  
    
            En fait $IPC expose les named pipes11 sur lesquels on peut alors écrire ou lire pour communiquer avec les processus. Chaque data qui est écrite sur un named pipe est envoyée au processus distant et inversement chaque data écrite par un processus sera accessible à partir du named pipe associé. Une fois connecté au partage réseau l’utilisateur peut lister les fichiers ou se déplacer dans les différents dossiers à la recherche de données sensibles.</p>

            <h3>Exploration des partages réseau et commandes Powershell </h3>  
            <p className="tabulation">On peut également exécuter des commandes arbitraires sur la cible grâce à la commande PowerShell :</p>    
        
            <img id="interactif" src={Interactive} alt="sneakymercury interactif"/>

            <h3>Download de fichiers ou upload de codes malveillants</h3>
            <p className="tabulation">La fonctionnalité implémentée suivante est l’<strong>Upload/Download</strong> de fichiers. Cela peut permettre à l’utilisateur de récupérer les fichiers intéressants en local avec la commande download, ou alternativement d'uploader ses propres fichiers ou exécutables via la commande upload.</p>

            <p>Pour implémenter cette fonctionnalité nous nous sommes inspirés de l’upload utilisé par CrackMapExec (CME).</p>  
            <ul><strong>Détails upload CME :</strong>
              <li>Première étape, connexion au share où l’on veut uploader (ex : ADMIN$)</li>
              <li>Création d’un fichier (Create Request File) </li>
              <li>Ecriture du fichier, on bufferise les données pour les envoyer en boucle si nécessaire (Write Request)</li> 
              <li>Fermeture (Close Request)</li>
            </ul>     

            <p className="tabulation">Le schéma présente les étapes pour ouvrir un fichier sur la machine distante, y écrire, et le fermer. On fait l’hypothèse qu’une connexion authentifiée est déjà établie avant l’envoi de ces paquets, l’établissement de la session et la connexion au partage réseau ont donc déjà eu lieu :</p>     

            <p>[Diagramme d'un upload]</p>     

            <p className="tabulation">La première requête permet la création d'un fichier sur la machine distante. La seconde va initialiser certaines métadonnées du fichier comme sa taille. On envoie des requêtes d’écriture dans lesquelles on bufferise les data à transmettre, et l’on boucle jusqu’à la fin du fichier source. Une dernière requête permet la fermeture du fichier distant. L’upload est alors terminé.</p>

            <h3>Enumération des utilisateurs, des domaines et des sessions</h3>    

            <p className="tabulation">Si l’objectif est la reconnaissance locale ou sur le domaine, l’utilisateur peut utiliser les commandes <strong>domains</strong> ou <strong>users</strong>. Elles listent respectivement les domaines auxquels les utilisateurs peuvent se connecter, et les utilisateurs enregistrés. D’autre part si elle est utilisée sur un Contrôleur de Domaine, la commande users peut lister tous les utilisateurs du domaine :  </p> 

            <p>[Diagramme liste users]</p>     

            <div>Cette fonctionnalité est basée sur le protocole <strong>SAMR</strong> (Security Account Manager Remote) avec les requêtes suivantes :  
              <ol>
                <li>Connect request</li>
                <li>EnumDomains</li>
                <li>LookupDomain</li>
                <li>OpenDomain</li>
                <li>EnumDomainUsers</li>
                <li>OpenUser</li>
                <li>QueryUserInfo2</li>
                <li>Close request </li>
              </ol>
            </div>

            <p className="tabulation">Une requête va initialiser la connexion, la suivante liste les domaines, on parse alors la réponse pour se concentrer sur un domaine en particulier. On ouvre ce domaine et une requête va réaliser l’énumération des utilisateurs sur celui-ci. Enfin on peut récupérer certaines informations spécifiques à un utilisateur, avant de fermer avec la dernière requête</p>

            <p>La capture Wireshark ci-dessous présente les requêtes SAMR dans l’ordre logique pour lister les utilisateurs.</p>     

            <p>[Diagramme wireshark énum users</p>   

            <p className="tabulation">Pour notre projet nous avons analysé les paquets en utilisant WireShark (logiciel d’écoute passive et de capture de paquets réseau). Afin d’implémenter une action particulière (comme l’énumération des utilisateurs), il faut envoyer au serveur les paquets dans un ordre précis, avec des paramètres corrects et les valeurs correspondantes. On a donc du disséquer le protocole pour comprendre les fonctions des différents paquets ainsi que les effets des différents paramètres.</p>  
            <p>Wireshark et les tests unitaires ont permis de déceler les éventuelles erreurs de valeurs dans les paramètres des paquets ou dans le parsing des réponses. Cette méthodologie pour construire les paquets, les envoyer sur le réseau et parser les réponses, reste valable quelque soit le protocole étudié.</p>

            <hr/>

            <h2>Fonctionnalités additionnelles</h2>
            <h3>Windows Remote Code Execution </h3>

            <div>Plusieurs méthodes sont possibles pour l’exécution de code à distance sous Windows : 
              <ul>
                <li>Remote Service Control Manager (Named pipe : svcctl)</li> 
                <li>Task Scheduler (atexec)</li>
                <li>Windows Management Instrumentation (WMI)</li>
                <li>Remote Registry</li>
                <li>Remote File Access</li>
                <li>Remote Desktop (RDP)</li>
                <li>Windows Remote Management</li>
                <li>MMC20.Application (DCOM) </li>
              </ul>
            </div>

            <p>Ces différentes méthodes sont expliquées dans ce lien :</p> 
            <a href="https://support.microsoft.com/en-us/help/942817/how-to-change-the-remote-uaclocalaccounttokenfilterpolicy-registry-se">Méthodes d'exécution de code à distance</a><br/>

            <p>Pour ce projet l’exécution de code à distance se fait via le protocole <strong>SCMR</strong> (Service Control Manager Remote Protocol) en se basant sur <strong>Psexec</strong> de <strong>SysInternals</strong>.</p>
            
            <p className="tabulation">L’utilisation de commandes internes propres à Windows (légitimes) permet d’éviter d’écrire des fichiers sur le disque (Fileless) donc est une méthode plus discrète pour éviter les détections via des mécanismes comme l’AMSI (Antimalware Scan Interface) ou les sondes IDS</p>
            
            <div>Smb-exec (utilisé par CME) permet également d’exécuter du code sur des hôtes distants. Parmi ses fonctionnalités : 
              <ul>
                <li>Dump de hash12 sur les serveurs et machines</li>
                <li>Enregistrement des registres HKLM (HKEY_LOCAL_MACHINE) et de la base SAM (Security Account Manager)</li>
                <li>Recherche de fichiers intéressants (ex : unattended.xml contenant souvent des mots de passe en clair)</li>
              </ul> 
            </div>

              <p>
              Il a également l’avantage d’être peu détecté en comparaison des payloads du framework Metasploit (basé sur psexec de SysInternals). <br/>   <br/>
    
              <a href="https://github.com/SecureAuthCorp/impacket/blob/master/examples/smbexec.py">github de smbexec</a>  
              </p>
              <br/>
          
              <div>
              <strong>Détails de Smb-exec:</strong>
              <ol>
                <li>Première étape, connexion à IPC$ et création svcctl (Create Request)</li>
                <li>Récupération du Context Handle (Open SC Manager Request)</li>
                <li>Création d’un Named service spécifiant la commande à exécuter dans le path du binaire (Create Service Request). Cette commande redirige l'output vers des fichiers temporaires qui seront téléchargés ensuite.</li>
                <li>Démarrage du service (Start Service)</li>
                <li>Lecture de l'output écrite dans le fichier temporaire (Read Request)</li>
                <li>Suppression du service (Delete Service) </li>
                <li>Fermeture de l’handle attribué (Close Handle Request)</li>
              </ol> 
              </div>


              <p className="tabulation">Psexec (développé par SysInternals), il s’agit d’un outil d’administration à distance de Windows, qui a longtemps été l’outil favori pour tous les mouvements latéraux dans un environnement Active Directory. Il utilise le protocole SMB pour se connecter à une machine distante et y lancer un exécutable. En principe, il crée un « named pipe » qui permet d’exécuter de manière interactive des commandes avec RemComSvc. En réalité il les exécute localement puis exporte les résultats à travers SMB. Bien qu’il soit encore utilisé de manière légitime pour effectuer des tâches d’administration il facilite grandement la tâche aux attaquants. </p>

              <p>Voici l’explication détaillée tirée du blog rapid7 : ”PSExec has a Windows Service image inside of its executable. It takes this service and deploys it to the Admin share on the remote machine. It then uses the DCE/RPC interface over SMB to access the Windows Service Control Manager API. It turns on the PSExec service on the remote machine. The PSExec service then creates a named pipe that can be used to send commands to the system.” </p>

              <a href="https://docs.microsoft.com/en-us/sysinternals/downloads/psexec">Documentation Microsoft Psexec</a><br/>
              <a href="https://blog.rapid7.com/2013/03/09/psexec-demystified/">Explications Psexec additionnelles</a><br/><br/>

              <strong>Détails des étapes de Psexec : </strong>
              Comparable à Smbexec mais diffère dans le fait qu’il upload toujours un fichier sur la machine distante. 

              <ol>
                <li>Création de psexecsvc.exe sur le share $ADMIN (Create Request File)</li>
                <li>Écriture sur psexcsv de la commande à exécuter sur le fichier local ou des data du binaire à uploader (Write Request) </li>
                <li>Connexion à SCMR via DCERPC (Bind Request)</li>
                <li>Récupération du context handle </li>
                <li>Création du service, chiffré sous Wireshark (Create Service Request)</li>
                <li>Fermeture du service (Close Service Handle Request)</li>
                <li>Commande (Open Service Request)</li>
                <li>Démarrage du service (Start Service Request)</li>
                <li>Requête le statut du service (Query Service Status Request)</li>
                <li>Création de PSEXESVC (Create Request File)</li>
                <li>Récupération d’information (Info Request/ IOCTL Request)</li>
                <li>Écriture des data (Write Request)</li>
                <li>Lecture des data (Read Request)</li>
                <li>Création du fichier pour stdin (Create Request)</li>
                <li>Création du fichier pour stdout (Create Request)</li>
                <li>Création du fichier pour stderr (Create Request)</li>
              </ol>
              Après chaque commande : écriture sur stdin (Write Request) et lecture sur stdout (Read Request) 
              <img id="flow" src={Flow} alt="flowgraph" />

              <h2 id="PTH">Pass The Hash (PTH)</h2>
              <p className="tabulation">L’utilisateur peut également choisir de s’authentifier en utilisant un hash de mot de passe (NTLMv2), cela permet tout ce qui est attaque du type Pass-The-Hash. 
              
              Les mécanismes d'authentification sont basés sur un mot de passe que la plupart du temps les utilisateurs ne doivent saisir qu'une seule et unique fois. Ce dernier sera hashé et c’est ce hash qui sera utilisé par la suite.  Ainsi pour un attaquant cela revient au même de connaître la valeur du hash ou bien le mot de passe lui-même. Une attaque Pass-The-Hash facilite grandement les intrusions dans un réseau dans la mesure où même les mots de passe d’une grande complexité peuvent être facilement contournés. 
              </p>

              <ul>
                <li> <a href="https://www.melani.admin.ch/melani/fr/home/documentation/rapports/rapportstechniques/attaques--pass-the-hash-.html ">documentation pass the hass</a></li>
                <li>   <a href="https://attack.stealthbits.com/pass-the-hash-attack-explained ">explications pass the hash</a></li>
              </ul>
             
              <p className="tabulation">Par ailleurs, les attaques Pass-The-Hash sont très difficiles à détecter au niveau du réseau car il est complexe de savoir quel utilisateur devrait être loggué sur telle machine et de pratiquer une politique de sécurité assez fiable pour savoir à tout moment quels comptes ont droit d’accès à telle ressource.</p>

              <h2>Null Session</h2>
              <p className="tabulation">Il s’agit d’une vulnérabilité classique dans les réseaux Windows qui consiste à se connecter en connexion anonyme à un partage réseau caché IPC$ (share réseau utilisé pour les communications interprocess). Cela permet ainsi de récupérer de nombreuses informations sur la configuration de la machine, les utilisateurs, les noms des partages réseau, et même de modifier des parties du registre de la machine distante.</p>

              <ul>
                <li><a href="https://sensepost.com/blog/2018/a-new-look-at-null-sessions-and-user-enumeration/">lien1</a></li>
                <li><a href="https://www.beyondsecurity.com/scan_pentest_network_vulnerabilities_null_session_availab lesmb">lien2</a></li>
                <li><a href="http://smallvoid.com/article/winnt-null-session.html">lien3</a></li>
                <li> <a href="https://www.youtube.com/watch?v=VvX7JHzzSA8">lien4</a></li>
              </ul>

              <p className="tabulation">Pour utiliser la nulle session dans notre outil, il faut changer un flag lors de la négociation de session (afin de rendre la connexion anonyme) et supprimer toutes les réponses au challenge.</p>
 
              Pour désactiver la nulle session sous Windows, il suffit de modifier le registre comme suit : <br/>
              HKEY\SYSTEM\CurrentControlSet\Control\Lsa: <br/> 
              – RestrictAnonymous = 1 <br/> 
              – Restrict AnonymousSAM = 1 <br/>
              – EveryoneIncludesAnonymous = 0 <br/><br/>

  
              <p>On peut également limiter ses accès aux partages réseau en ajoutant un champ <strong>RestrictNullSessAccess</strong>de valeur 1 dans la clé de registre suivante :<br/>
              <strong style={{'font-size':'9px'}}>HKLM\System\CurrentControlSet\Services\LanManServer\Parameters</strong>  
              </p>
              


              <h2>Bruteforce de mots de passe</h2>
              <p className="tabulation">Pour gérer le bruteforce de mots de passe au niveau de l’authentification SMB on a implémenté l'utilisation d'une liste de noms d’utilisateurs/mots de passe plutôt qu’un mot de passe unique afin de tester l’authentification pour une liste spécifique de cible. 
              Lorsque des identifiants valides sont trouvés ils sont automatiquement ajoutés dans la base de données qui devrait à terme recenser tous les identifiants trouvés sur le réseau au cours du pentest, y compris les identifiants dans les fichiers des partages réseaux (ce qui est arrive fréquemment).</p>

              <h2>La suite Eternal*</h2>
              
              MS17-010 contient les exploits développés par la NSA qui ciblent Microsoft Windows, ces exploits ont notamment été ré-implémentés dans les ransomware WannaCry et NotPetya. 

              <ol>
                <li>CVE-2017-0146 (EternalChampion/EternalSynergy) : exploite une race condition avec les Transaction requests</li>
                <li>CVE-2017-0143 (EternalRomance/EternalSynergy) : exploite une confusion de type entre WriteAndX et Transaction requests </li>
              </ol>

              Sous Metasploit : exploit/windows/smb/ms17_010_psexec

              <ul>
                <li>1. Le pare feu doit permettre le trafic SMB</li>  
                <li>2. La cible doit utiliser la version du protocole SMBv1</li>  
                <li>3. Il ne doit pas y avoir la mise à jour du patch de la MS17-010</li>  
                <li>4. La connexion anonyme à l’IPC$ et au named pipe doivent être autorisées</li> 
              </ul>

              <img id="eternalbluesuccess" src={EternalblueSuccess} alt="exploit eternalblue"/>

              <p className="tabulation">EternalBlue ne nécessite pas d’être authentifié. EternalRomance, EternalSynergy et EternalChampion permettent d’obtenir une session administrateur à partir d’un compte aux privilèges limités. 
              Dans le cadre du projet, EternalBlue a été implémenté en Rust afin de pouvoir l’intégrer dans l’outil. </p>

              <h2 id="smb">Server Message Block (SMB)</h2>
              <h3>Présentation</h3>
              <p className="tabulation">Il existe plusieurs versions de la suite protocolaire Microsoft SMB : SMB 1, SMB 2.0, SMB 2.1, SMB 3.0, SMB 3.0.2, SMB 3.1.1<br/>  Les versions SMB 2.X et SMB 3.X sont assez proches mais radicalement différents de la version SMB1. <br/>Ce projet s’est concentré sur l’implémentation de SMB2.1, le tableau suivant présente les versions du protocole SMB associées aux différents systèmes d’exploitation : </p>

              <p>SMB peut être implémenté sur le TCP ou via NETBIOS. Ce projet se concentre sur le SMB over TCP (Direct Hosted SMB). Les paquets seront craftés de manière à indiquer que le protocole est lancé over TCP avec un header qui précisera à chaque fois l’action à réaliser et donc la nature des data qui suivent. </p>

              <p>Pour notre projet nous nous sommes concentrés sur la version SMB2.1 utilisant le header SYNC packets, et uniquement du coté client. Pour se faire nous nous sommes inspirés du client smb d’Impacket ainsi que de la documentation de Windows. </p>

              <p>En mode sync, un thread lance une opération I/O et entre immédiatement dans une phase d’attente jusqu’à ce que la requête I/O soit achevée. </p>

              <p>Le header SMB (SYNC) se présente comme suit:</p>

              [Diagramme header SMB]
 
              <ul>
                <li>4 premiers octets : identification du protocole SMB2      SMB2:0x424d53fe </li>
                <li>2 suivants : taille du header</li>
                <li>2 octets : Credit Charge  0x0000 (valeur fournie par le client au serveur et limite le nombre de requêtes exceptionnelles qu’un client peut envoyer au serveur)</li>
                <li>2 octets : Channel Sequence 0x0000</li>
                <li>2 octets : Reserved, 0x0000</li>
                <li>2 octets : Command (l’un des paramètres les plus importants car il décrit le type de paquet qui va être envoyé) </li>
                <li>2 octets : Credits requested </li>
                <li>4 octets : flags<br/>- requête : 0x00000000 <br/>- réponse : 0x00000001</li>
                <li>8 octets : message ID <br/>    - incrémentation à partir de 0 pour chaque requête envoyée <br/> - logique de suivi au niveau paquets de la communication SMB</li>
                <li>4 octets : Process ID - 0x0000feff </li>
                <li>4 octets : Tree ID <br/> - 0x00 jusqu’à la requête tree connect  <br/> 
                - 0x01 puis égal à 1 après connexion</li>
                <li>8 octets : Session ID <br/>- 0x00 jusqu’à la requête session setup, après identifie la session</li>
                <li>16 octets : Signature ID <br/>  - utilisé si le paquet est signé </li>
              </ul>

              <a href="https://msdn.microsoft.com/en-us/library/cc246529.aspx">documentation source</a>
              <br/>
              <br/>
              <p className="tabulation">Pour les messages, il a fallu les crafter de zéro en s’inspirant de la documentation Microsoft et du code d’Impacket, voici les différents paquets relatifs au protocole SMB que l’on a pu implémenter au cours du projet : </p>

              <ul>
                <li>Negotiate: message initial, négociation pour l’authentification</li>
                <li>Session Setup: mécanisme authentification</li>
                <li>Tree Connect/Disconnect: demande de connexion à un Partage réseau</li>
                <li>Logoff: message pour la déconnexion </li>
                <li>Read: message de lecture de data </li>
                <li>Write: message d’écriture de data </li>
                <li>Create: message d’accès/de création/de suppression d’un fichier</li>
                <li>Query Directory: récupération d’information sur un dossier </li>
                <li>Get Info: récupération d’informations sur les fichiers et/ou autres objets </li>
              </ul>

              Grâce à ces paquets on a ainsi pu implémenter les fonctionnalités suivantes : 

              <ul>
                <li>Ouverture et fermeture d’une connexion SMB </li>
                <li> Authentification (combiné avec l’implémentation Windows GSS-API/NTLMSSP) → Login </li>
                <li>Connexion à un partage réseau </li>
                <li>Liste des partages réseau </li>
                <li>Déplacement dans les dossiers d’un partage </li>
                <li>Upload d’un fichier sur un partage </li>
                <li>Download d’un fichier présent sur un partage </li>
              </ul>

              <h3>Authentification</h3>

              Le graphe suivant donne une vue d’ensemble du processus d’authentification SMB2 (login) : 
              <br/>
              [Diagrammme authentification SMB2]
              <br/>

              <p>Dans le premier paquet le client reçoit le token GSS du serveur. Il s’agit d’un spnego qui est utilisé pour choisir le type d’authentification qui interviendra entre le client et le serveur.</p>

              <p>SPNEGO est une spécification standard définie dans Simple and Protected GSS-API Negotiation Mechanism, et est en charge de l’authentification permettant l'accès à une ressource sécurisée identifiée dans la requête HTTP.</p>

              Le spnego inclut les paramètres : 

              <ul>
                <li>mechtypes : qui décrit les mécanismes de sécurité disponibles </li>
                <li>mechtoken : le token relatif à la session </li>
                <li>d’autres informations</li>
              </ul>

              Dans le cas d’une session NTLM, le client va initier un nouveau spnego en envoyant un spnegoinit et un Negociate message.

              <br/>
              <br/>

              <a href="https://msdn.microsoft.com/en-us/library/cc246561.aspx ">https://msdn.microsoft.com/en-us/library/cc246561.aspx</a>
              <br/>
              <br/>

              <p className="tabulation">Pour ce qui est du projet l’implémentation a été largement inspirée dans un premier temps par la bibliothèque « WinAuth » en Rust afin de générer le challenge/response nécessaire à l’authentification, mais la décision a été prise par la suite de réécrire ce code afin que cela corresponde davantage à nos besoins. </p>

              <p>Pour le moment, l’authentification peut être faite localement, sur un contrôleur de domaine, via un mot de passe ou par Pass-The-Hash. Un bruteforce des users/passwords a également été implémenté il suffit de fournir une simple wordlist pour que les identifiants soient testés.</p>

              <ul>
                <li><a href="https://github.com/steffengy/winauth-rs">bibliothèque winaut</a></li>
                <li><a href="http://blog.gentilkiwi.com/tag/ntlm ">Doc NTLM</a></li>
              </ul>
              
              <br/>

              Lors d’une authentification NTLM il y a plusieurs possibilités, elle peut être gérée par : 

              <ul>
                <li>Pas d’authentification (Null authentication)</li>
                <li>LMv1 ou LMv2 : un simple hash de mots de passe clients</li>
                <li>NTLMv1 ou NTLMv2 : incluant un challenge du serveur (protection contre le rejeu) </li>
                <li>NTLM 2 : NTLMV1 amélioré </li>
              </ul>

              <p className="tabulation">Le choix est laissé au client. Les serveurs les plus anciens peuvent encore accepter LM, c’est pourquoi aujourd’hui la plupart des clients envoie nécessairement les deux, des réponses LM et NTLM. <br/> La configuration spécifique (des clients et des serveurs) dépend de certaines valeurs de clés de registre. Donc il n’y a pas moyen de savoir à l’avance (à l’exception d’une reconnaissance préalable des versions OS ou fingerprinting) quels types de réponses seront acceptées par le serveur. Cela explique pourquoi LM est encore envoyé malgré son faible niveau de sécurité. En particulier le choix entre NTLMv1 et NTLMv2 ne dépend pas des flags négociés. </p>

              Pour plus de détails : <br/>
              <a style={{"font-size":"9px"}} href="http://davenport.sourceforge.net/ntlm.html#type3MessageExample">http://davenport.sourceforge.net/ntlm.html#type3MessageExample</a>
              <br/>
              <br/>

              <p className="tabulation">NTLM a été largement supplanté par le protocole d’authentification Kerberos pour tout ce qui est authentification dans un domaine. C’est un procédé d’authentification plus moderne et robuste, il nécessite un Ticket Granting Server (TGS) pour fonctionner, généralement sur le Contrôleur de Domaine. Contrairement à NTLM, l’authentification Kerberos est séparée de SMB, et implique des intéractions entre le TGS et le service auquel on essaie d’accéder. Kerberos est stateless, ce qui permet des attaques comme le Golden Ticket. C’est un procédé d’authentification basé sur le schéma en Tiers-de-confiance, il ne peut pas être utilisé dans toutes les situations. Par exemple lorsque les serveurs ne font pas parti du domaine, ou pour des comptes locaux, ou pour l’accès à des ressources sur un domaine non fiable. NTLM continuera encore pour un moment à être le mécanisme d’authentification le plus utilisé. </p>

              <a href="https://blog. https://blog.varonis.fr/explication-de-lauthentificationkerberos/devensys.com/kerberos-principe-de-fonctionnement/">Principe Kerberos</a>
              <br/>
              <br/>

              <p className="tabulation">Pour la gestion de l’authentification, le paquet suivant est envoyé pour spécifier les versions SMB supportées par le client, ainsi que d’autres informations (signature requise par exemple) </p>
              <br/>
              [Diagramme Negociate Request]
              <br/>
              <br/>

              <p>Dans le paquet Negociate Response, une erreur est retournée si le statut n’est pas STATUT_SUCCESS. Généralement, le serveur envoie un negtokeninit dans un message spnego, et c’est au client de l’accepter ou d’en redemander un nouveau avec une session set up request.</p>

              <h3>Signature/ Chiffrement</h3>
        </div>
      </div>
      );
    }
  }

  export default SneakyMercury;  