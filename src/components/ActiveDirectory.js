import React from 'react';
import ActiveDirectoryImg from "../img/active_directory.png"
import Laps from "../img/laps.png"

class ActiveDirectory extends React.Component {
    render() {
      return (
        <div className="article">
          <h1>Active Directory</h1>
          <hr/>
          <p className="tabulation">Cible privilégiée des cyber-attaques depuis plusieurs années en raison de son usage dans le monde entier, sa compromission peut entraîner une prise de contrôle totale du SI d'une entreprise.
          </p><br/>

          <h2>Qu'est-ce que l'Active Directory ?</h2>

          <img id="activedirectory_img" src={ActiveDirectoryImg} alt="logo active directory"/>

          <div>Depuis Windows 2000 Microsoft offre une solution de gestion des ressources internes pour les entreprises : <strong>Active Directory Domain Services (ADDS)</strong>, proposant des services de 3 types :
            <ul>
              <li>Authentification (via le protocole Kerberos)</li>
              <li>Annuaire (via le protocole LDAP)</li>
              <li>Collection de services (stratégies de groupes, gestion des droits, DNS)</li>
            </ul>
          </div>

          <p className="tabulation">Au sein d'un réseau interne l'annuaire est garant de l'identité d'une personne mais n'a pas vocation à autoriser l'accès ou non d'un individu à une ressource.
          L'AD est donc la pièce centrale qui fait la jonction entre plusieurs services.</p>
          <br/><hr/><br/>

          <h2>Les avantages de ses services</h2>

          L'Active Directory présente plusieurs avantages :

          <ul>
            <li>La personnalisation de l'organisation des données répondant aux besoins de l'entreprise</li>
            <li>La gestion depuis n’importe quel ordinateur du réseau</li>
            <li>Le système de réplication et redondance (si un DC tombe en panne, un autre récupère la charge)</li>
            <li>La gestion centralisée des droits d’accès au réseau</li>
          </ul>

          <p>Par son rôle central et stratégique, l'AD est un élément crucial au coeur de l'infrastructure qui influe donc sur toute la sécurité du SI.
          </p>   

          <br/><hr/><br/>

          <h2>Comment sécuriser un environnement AD ?</h2>
          <p>
            - Configurer <strong>LAPS</strong> : solution de Microsoft assurant une rotation des mots de passe des comptes administrateurs locaux sur les workstations et les serveurs.<br/><br/>

            <img id="laps" src={Laps} alt="schéma LAPS"/>

            - Mettre des mots de passes robustes pour les comptes de services. Il existe des <strong>Managed Service Accounts</strong> avec une couche de sécurité supplémentaires mais en pratique encore beaucoup de sociétés continuent de se servir de comptes utilisateurs standards afin de manager leurs services.<br/><br/>

            - Filtrer les communications entre les machines. Après la compromission initiale, un attaquant va tenter des mouvements latéraux dans le réseau avec les mots de passe déjà récupérés. Il faut donc veiller à ce que les comptes de services n'utilisent pas les mêmes mots de passe, et contrôler les communications entre les machines afin de contenir une éventuelle attaque. Une bonne pratique est aussi de collecter les logs vers un serveur central du genre <strong>Splunk</strong>.<br/><br/>

            - Eviter d'utiliser les groupes <strong>Built-in</strong> fournis par défaut par l'AD. Ils donnent des droits inutiles, par exemple le groupe "backup operators" peut réaliser une sauvegarde de la base <strong>NTDS.dit</strong><br/><br/>

            - Auditer régulièrement l'Active Directory au moyen de solutions telles que <strong>PingCastel</strong> (niveau de sécurité à un instant T) ou <strong>Alsid</strong> (détection d'attaques)<br/><br/>

            - Prévoir un <strong>Plan de Continuité d'Activité</strong> (PCA) pour anticiper toutes éventualités (versions papier, sauvegardes, formation du personnel).
          </p>
        </div>  
      );
    }
  }


  export default ActiveDirectory;