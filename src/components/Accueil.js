import React from 'react';
import OpenClassrooms from "../img/openclassrooms.png"
import HTB from "../img/hackthebox.png"


class Accueil extends React.Component {

  
    render() {

      return (
        <div className="article">
          <h1>Le Hacking pour les Noobs</h1>
          <hr/>
          <p className="tabulation">Pas de parcours spécifique tout est possible pour commencer. Mais justement comment ne pas se perdre dans cette jungle de réponses sur la fameuse question : <strong>Comment devenir un Hacker ?</strong></p> 

          <img id="hackerman_img" src="https://media.giphy.com/media/RyXVu4ZW454IM/giphy.gif" alt="Hackerman"/>

          <p className="tabulation">Pour commencer il faut de la volonté, beaucoup de volonté ! Il faut d'abord apprendre à apprendre... Ce n'est pas sans raison qu'on répond <a href="https://fr.wikipedia.org/wiki/RTFM_(expression)">RTFM</a> (<strong>Read The Fuckin' Manual</strong> = démerde toi avec la doc ^^) sur les forums. <br/> Avant toute chose il faut bien comprendre les mécanismes, les technologies et les langages utilisés pour espèrer en détourner leurs usages &#128520;</p>

          <p className="tabulation">Il n'existe pas de chemin particulier mais une base de connaissances en informatique est nécessaire avant de démarrer dans la sécu, sous peine de n'être qu'un vulgaire <strong>script kiddie</strong>... <br/><br/> Pour les plus noobs d'entre vous je vous renvoie vers ce site oh combien formateur : 
          <a href="https://openclassrooms.com/fr/" alt="lien openclassrooms"><img id="openclassrooms_img" src={OpenClassrooms} alt="openclassrooms" /></a>
          </p>

          <div id="openclassrooms">
          Voici pour moi, les chapitres pour s'initier :  <br/><br/>
            <ul>
              <li>La base de la base : <a href="https://openclassrooms.com/fr/courses/1946386-comprendre-le-web/2212820-introduction">Comprendre le Web</a></li>
              <li>Poursuivre sur : <a href="https://openclassrooms.com/fr/courses/1603881-apprenez-a-creer-votre-site-web-avec-html5-et-css3/">HTML/CSS</a>, <a href="https://openclassrooms.com/fr/courses/2984401-apprenez-a-coder-avec-javascript">le langage Javascript</a> et <a href="https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript">JS adapté au web</a> (plus complet)</li>
              <li>Un hacker c'est un mec à capuche qui tape des commandes sur un fond noir, pour comprendre <br/>ces étranges commandes rien de tel que : <a href="https://openclassrooms.com/fr/courses/43538-reprenez-le-controle-a-laide-de-linux/exercises/141">Reprenez le contrôle à l'aide de Linux !</a> </li>
              <li>Découvrir comment automatiser des tâches : <a href="https://openclassrooms.com/fr/courses/235344-apprenez-a-programmer-en-python/exercises/179">Apprenez à programmer en Python</a></li>
              <li>Et les fondamentaux de la programmation : <a href="https://openclassrooms.com/fr/courses/19980-apprenez-a-programmer-en-c/6760501-entrainez-vous-a-ameliorer-le-jeu-du-plus-ou-moins">Apprenez à programmer en C</a> (langage plus bas niveau)</li>
            </ul>
            En parallèle du <strong>Web</strong> et de la <strong>Programmation</strong>, je vous invite à appréhender les notions du <strong>Réseau</strong> : <br/><br/>

            <ul>
              <li>Comprendre les mécanismes de communication : <a href="https://openclassrooms.com/fr/courses/857447-apprenez-le-fonctionnement-des-reseaux-tcp-ip">Le fonctionnement des réseaux TCP/IP</a></li>
              </ul>
            </div> 

          <br/>
          <hr/>
          <br/>

          <p className="tabulation">Ça y est, tu comprends les concepts de client/serveur ? Les requêtes Web n'ont plus de secret pour toi ? Et le modèle OSI ? Tu sais te débrouiller sur Linux et coder un Snake en Python ou un labyrinthe en C ? Non, vraiment ? Ok, alors toutes mes félicitations pour la next step tu vas ENFIN rentrer dans le monde merveilleux du <strong>hacking</strong>. </p>

          <img id="anonymous_img" src="https://media.giphy.com/media/UqxVRm1IaaIGk/giphy.gif" alt="anonymous gif"/>
          
          <p>Car à présent passons aux sites de challenges : <a href="https://www.root-me.org/">Root-Me</a> et <a href="https://www.newbiecontest.org/">Newbie Contest</a></p>

          <p className="tabulation">L'idée de ce genre de site c'est de se fixer des objectifs réalistes avec le titre du chall comme indice sur la vulnérabilité à exploiter, après suffit creuser, d'appronfondir le sujet. Google est ton ami &#128521;</p>

          <p>Voici une liste des challenges par lesquels commencer dans les catégories <strong>Web-Server</strong> et <strong>Web-Client</strong>:</p> 
            <ul>
              <li>HTML Code source</li>
              <li>Javascript – Authentification</li>
              <li>Javascript – Source</li>
              <li>HTML Boutons désactivés</li>
              <li>Mot de passe faible</li>
              <li>HTTP - Directory indexing</li>
              <li>Directory Traversal</li>
              <li>HTTP-POST</li>
              <li>FTP - Authentification</li>
              <li>Telnet - Authentification</li>
              <li>XSS Stocké 1</li>
              <li>SQLI</li>
            </ul>
        

          <br/>
          <hr/>
          <br/>

          <p className="tabulation">Une fois entre 1000 et 2000 points sur Root-Me et découvert le <strong>Top 10 OWASP</strong> (XSS, SQLI, ...)
          tu peux passer aux challenges de type "Réaliste" dans la catégorie éponyme sur Root-Me ou sur le très bon site : <a href="https://www.hackthebox.eu/">HackTheBox</a>.</p>

          <img id="hackthebox_img" src={HTB} alt="HackTheBox"/>

          <p className="tabulation">Ici, on retrouve un environnement complet par le biais de VMs à attaquer. </p> 
          <p className="tabulation">Sur HTB la méthodologie est toujours la même, obtenir d'abord un shell non privilégie (avec les droits d'un utilisateur) au moyen d'une vulnérabilité, puis effectuer une escalade de privilèges pour devenir <strong>root</strong> (ou admin sur Windows). Congratulations tu peux "flag" la machine.</p>

          <br/>
          <hr/>
          <br/>

          <p className="tabulation">Après avoir rooter plusieurs machines HackTheBox, pour le faire dans un environnement réel il existe le métier de <strong>Pentester</strong> (ou Ethical Hacker) cela évite de le faire "In the wild" et de s'attirer quelques ennuis &#128517; ou bien à l'occasion de CTFs : <a href="https://ctftime.org/">Liste des CTFs à venir</a></p>

          <p className="tabulation">N'hésite pas non plus à participer aux confs ou events de hacking en tout genre, ces rencontres te permettront de skill up tout en buvant des bières 	&#127866;&#128518; N'hésite pas non plus à share ce que tu apprends pour que les noobs d'aujourd'hui soient peut être les pentesters de demain.</p>

          <p className="tabulation">Enfin l'ultime étape de ta formation, d'un niveau bien plus avancé, est pour moi l'étude de domaines extrêmement intéressants du monde de l'infosec : <strong>Exploit</strong>, <strong>Reverse</strong> ou encore le<strong>Hardware Hacking</strong>. Apprendre à dev son propre exploit de buffer overflow, à hacker une radio ou à reverse un Malware oO</p>

          <p className="tabulation">En parallèle de toute cette aventure, il y a des certifications comme la <a href="https://www.eccouncil.org/programs/certified-ethical-hacker-ceh-fr/" alt="lien CEH">CEH</a> (Certified Ethical Hacker) pour officialiser tes connaissances (QCM théorique) ou l'<a href="https://www.offensive-security.com/pwk-oscp/" alt="lien OSCP">OSCP</a> (examen pratique) beaucoup plus challengeant.</p>
          <br/>
        </div>    
      );
    }
    
  }

  export default Accueil;  