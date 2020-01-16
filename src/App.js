import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./components/Sidebar";
import Accueil from "./components/Accueil";
import Pentest from "./components/Pentest";
import ActiveDirectory from "./components/ActiveDirectory";
import Ntlm from "./components/Ntlm";
import Smb from "./components/Smb";
import Kerberos from "./components/Kerberos";
import SneakyMercury from "./components/SneakyMercury";
import Redteam from "./components/Redteam";
import HackerManifesto from "./components/HackerManifesto";
import Footer from './components/Footer';
import ScrollUpButton from "react-scroll-up-button";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import {Animated} from "react-animated-css";
import opening from './img/hacker.jpg'
import opening_min from './img/hacker_min.png'
import opening_medium from './img/hacker_medium.png'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "accueil",
            open_close: true,
            loading: true
        };

        this.childHandler = this.childHandler.bind(this)
    }

    childHandler(dataFromChild) {
        this.setState({page: dataFromChild});
    } 


    render() {
        if(this.state.loading){
            setTimeout(function(){this.setState({open_close:false});}.bind(this),2500);  // wait 2,5 seconds for  inversing open/close loading page

           setTimeout(function(){this.setState({loading:false});}.bind(this),5000);  // wait 5 seconds for completely hiding loading page

            return (
                <div>     
                    <Animated animationIn="fadeIn" animationInDuration={2500} animationOut="fadeOut" animationOutDuration={2500} isVisible={this.state.open_close}>               
                        <img id="loading" src={opening_min} srcSet={`${opening} 300w, ${opening_medium} 768w, ${opening} 1280w`} style= {{width:'100%'}} alt="Loading page" />
                    </Animated>
                </div>
            );
        }

        return (
            <Router>
                <div id="App">
                    {/* <Search/> */}
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} action={this.childHandler}/>
                    
                    <div id="page-wrap">
                        <div className={(this.state.page)}>
                            {this.state.page === 'accueil' && <Accueil/>}
                            {this.state.page === 'pentest' && <Pentest/>}
                            {this.state.page === 'activedirectory' && <ActiveDirectory/>}
                            {this.state.page === 'ntlm' && <Ntlm/>}
                            {this.state.page === 'smb' && <Smb/>}
                            {this.state.page === 'kerberos' && <Kerberos/>}
                            {this.state.page === 'sneakymercury' && <SneakyMercury/>}
                            {this.state.page === 'redteam' && <Redteam/>}
                            {this.state.page === 'hackermanifesto' && <HackerManifesto/>}
                        </div>
                    </div>
                    <Footer/>
                    <ScrollUpButton/>
                </div> 
            </Router>
        );
    }
}

export default App;
