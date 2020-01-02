import React from 'react';
import ActiveDirectoryImg from "../img/active_directory.png"
import Laps from "../img/laps.png"

class ActiveDirectory extends React.Component {
    render() {
      return (
        <div className="article">
          <h1>Active Directory</h1>
          <hr/>
          <p className="tabulation">Cible privilégiée des cyber-attaques depuis plusieurs années en raison de son usage dans le monde entier, sa compromission entraîne une prise de contrôle totale du système d'information. <br/><br/>
          
          La méthodologie d'un pentest interne dans un environnement Active Directory se base sur des vecteurs d'attaques biens connus que nous présenterons dans cet article.<br/><br/>
          
          La solution à terme pourrait être la migration des technologies vers le Cloud qui forcera peut être à l'avenir les organisations à repenser l'architecture et la sécurité des comptes de leurs infrastructures. 
          </p><br/>

          <h2>Qu'est-ce que l'Active Directory ?</h2>

          <img id="activedirectory_img" src={ActiveDirectoryImg} alt="logo active directory"/>

          <div className="tabulation">Depuis Windows 2000 Microsoft offre une solution de gestion des ressources internes pour les entreprises : <strong>Active Directory Domain Services (ADDS)</strong> qui est un annuaire proposant des services de 3 catégories :
            <ul>
              <li>Authentification (via le protole Kerberos)</li>
              <li>Annuaire (via le protocole LDAP)</li>
              <li>Collection de services (stratégies de groupes, gestion des droits, DNS)</li>
            </ul>
          </div>

          <p className="tabulation">Au sein d'un réseau interne l'annuaire est garant de l'identité d'une personne, mais n'a cependant pas vocation à autoriser l'accès ou non d'un individu à une ressource.

          L'AD peut être faire la jonction entre plusieurs services : base de comptes pour un service Radius, authentification applicative par proxy LDAP, intégrer des machines via Kerberos, etc</p>
          <br/><hr/><br/>

          <h2>Les avantages des services de domaine Active Directory</h2>

          Pour l’administration de base des utilisateurs et ordinateurs réseau, l’utilisation d’AD DS présente plusieurs avantages :

          <ul>
            <li>Personnalisation de l'organisation des données de façon à répondre aux besoins de l'entreprise</li>
            <li>Gestion AD DS à partir de n’importe quel ordinateur du réseau</li>
            <li>Réplication et redondance (si un contrôleur de domaine tombe en panne, un autre DC récupère la charge)</li>
            <li>Gestion centralisée des droits d’accès au réseau</li>
          </ul>

          <p>Par son rôle central et stratégique, l'AD est un élément crucial au coeur de l'infrastructure qui influe donc sur toute la sécurité du SI.
          </p>   

          <br/><hr/><br/>

          <h2>Comment sécuriser un environnement Active Directory ?</h2>
          <p>
            - Configurer <strong>LAPS</strong>, c'est une solution de Microsoft permettant d'assurer une rotation des mots de passe des comptes administrateurs locaux sur les workstations et les serveurs. Cela garantit un niveau de sécurité minimal sur les postes.<br/><br/>

            <img id="laps" src={Laps} alt="schéma LAPS"/>

            - Utiliser des mots de passes robustes pour les comptes de services. Il existe des <strong>Managed Service Accounts</strong> qui offrent une couche de sécurité supplémentaires au sein de l'AD mais en pratique encore beaucoup de sociétés continuent de se servir de comptes utilisateurs standards afin de manager leurs services.<br/><br/>

            - Filtrer les communications entre les machines. Après la compromission d'une première machine, un attaquant va tenter d'effectuer des mouvements latéraux dans le réseau. Pour cela il va essayer de spread les mots de passe déjà récupérés. Il faut donc veiller à ce que les comptes de services n'utilisent pas les mêmes mots de passe, et contrôler et restreindre les communications entre les machines afin de contenir une éventuelle attaque. Une bonne pratique est aussi d'utiliser le firewall embarqué de Windows pour bloquer certains protocoles et collecter les logs vers un serveur central à cet effet du genre de Splunk.<br/><br/>

            - Ne pas utiliser les groupes <strong>Built-in</strong> fournis par défaut par l'AD. Ils permettent de nombreux privilèges, par exemple les membres du groupe "backup operators" peuvent réaliser une sauvegarde de la base <strong>NTDS.dit</strong><br/><br/>

            - Auditer régulièrement l'Active Directory au moyen de solutions telles que <strong>PingCastel</strong> (cartographie du niveau de sécurité à un instant T) ou <strong>Alsid</strong> (surveillance et détections d'attaques sur l'AD)<br/><br/>

            - Prévoir un <strong>Plan de Continuité d'Activité</strong> (PCA) pour être prêt à toutes éventualités (versions papier, sauvegardes, formation du personnel).
          </p>
        </div>  
      );
    }
  }


  export default ActiveDirectory;