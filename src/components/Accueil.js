import React from 'react';
import OpenClassrooms from "../img/openclassrooms.png"
import HTB from "../img/hackthebox.png"


class Accueil extends React.Component {

  
    render() {

      return (
        <div className="article">
          <h1>Le Hacking pour les Noobs</h1>
          <hr/>
          <p className="tabulation"><strong>La culture du Hacking</strong> n'a ni méthode type ni parcours spécifique, n'importe quelle voie est a priori possible pour commencer. Mais justement comment ne pas se perdre dans cette jungle de réponses que présente la fameuse question : <strong>Comment devenir un Hacker ?</strong></p> 

          <img id="hackerman_img" src="https://media.giphy.com/media/RyXVu4ZW454IM/giphy.gif" alt="Hackerman"/>

          <p className="tabulation">Pour commencer il faut de la volonté, beaucoup de volonté ! Il faut d'abord apprendre à apprendre... Ce n'est pas sans raison qu'on répondra <a href="https://fr.wikipedia.org/wiki/RTFM_(expression)">RTFM</a> sur les forums. <br/> Avant toute chose il faut bien comprendre les mécanismes mis en place, les technologies et les langages utilisés pour espèrer en détourner les usages ;)</p>

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

          <p className="tabulation">L'idée de ce genre de site c'est de se fixer des objectifs réalistes. Souvent le titre du chall donne un renseignement sur la vulnérabilité à exploiter, après suffit creuser, d'appronfondir le sujet. Et pour cela Google est ton ami ^^</p>

          <hr/>
          <br/>

          <p className="tabulation">Une fois entre 1000 et 2000 points sur Root-Me et vu le <strong>Top 10 OWASP</strong> (XSS, SQLI, ...)
          tu peux passer aux challenges de type "Réaliste" dans la catégorie éponyme sur Root-Me ou sur le très bon site : <a href="https://www.hackthebox.eu/">HackTheBox</a>.</p>

          <img id="hackthebox_img" src={HTB} alt="HackTheBox"/>

          <p className="tabulation">Ici, on retrouve un environnement complet par le biais de VMs à attaquer. </p> 
          <p className="tabulation">Sur HTB la méthodologie est toujours la même, à savoir obtenir d'abord un shell non privilégie (avec les droits d'un utilisateur) au moyen d'une vulnérabilité sur le serveur, puis effectuer une escalade de privilèges. <br/>Ce qui signifie réussir à obtenir les privilèges maximales sur le serveur, autrement dit devenir root sur Linux ou admin sur Windows. Congratulations tu peux "flag" la machine sur HackTheBox.</p>

          <br/>
          <hr/>
          <br/>

          <p className="tabulation">Après avoir rooter plusieurs machines HackTheBox, il serait intéressant de le faire dans un environnement réel, pour ça je recommande le métier de Pentester (ou Ethical Hacker) pour éviter de le faire "In the wild" et de s'attirer quelques problèmes ^^' ou à l'occasion de CTFs : <a href="https://ctftime.org/">Liste des CTFs à venir</a></p>

          <p className="tabulation">N'hésite pas non plus à participer aux événements de hacking en tout genre, ces rencontres te permettront de skill up tout en buvant des bières :) N'hésite pas non plus à share ce que tu apprends, et les noobs d'aujourd'hui seront peut être les pentesters de demain.</p>

          <p className="tabulation">Enfin la suite, d'un niveau bien plus avancé, est pour moi l'étude de domaines extrêmement intéressants du monde de l'infosec : <strong>Exploit</strong>, <strong>Reverse</strong> ou encore <strong>Hardware Hacking</strong>. Apprendre à dev son propre exploit de buffer overflow ou à reverse un Malware oO</p>

          <p className="tabulation">En parallèle de toute cette aventure, il y a des certifications comme la <a href="https://www.eccouncil.org/programs/certified-ethical-hacker-ceh-fr/" alt="lien CEH">CEH</a> (Certified Ethical Hacker) pour officialiser tes connaissances (QCM théorique) ou l'<a href="https://www.offensive-security.com/pwk-oscp/" alt="lien OSCP">OSCP</a> (examen pratique) plus pour le challenge.</p>
        </div>    
      );
    }
    
  }

  export default Accueil;  