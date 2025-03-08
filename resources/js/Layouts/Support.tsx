
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHeadset, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function support(){

    let [displaySupport, setDisplaySupport] = useState(true);
    let [messages, setMessages] = useState([
         {"msg": "Hello. Please describe your query and one of our agents is going to approach you",
            "source": "auto"},
        {"msg": "Do you make shippings to Costa Rica?",
            "source": "user"},
        {"msg": "Please Wait, an agent is going to communicate with you soon...",
            "source": "auto"},
        {"msg": "Please Wait, an agent is going to communicate with you soon...",
            "source": "auto"},
        {"msg": "Hi, I'm John Doe and I will be attending your requests",
            "source": "auto"}
    ]);



    function toggleChatbox(){
        displaySupport = !displaySupport;
        setDisplaySupport(displaySupport);
    }

    console.log(messages)
    return(<>
    
        {(displaySupport)? <div id="supportChatbox">
            <div id="supportHeader">
                <div id="supportTitle"><FontAwesomeIcon icon={faUser} style={{'margin-right': '8px'}} /> Customer Support</div>
                <div onClick={() => {toggleChatbox();}}> <span id="supportCloseButton"><FontAwesomeIcon icon={faChevronDown} /></span></div>
            </div>
            <div id="supportBody">{
                messages.map((message:any) => (
                    <div className={`support-message message-${message.source}`}>
                        <div className="grid bubble-container"><span className="bubble">{message.msg}</span></div>
                    </div>
                ))
            }
            </div>
            <div className="flex justify-center">
            <hr></hr>
            </div>
            <div id="supportFooter">
 
                <textarea  placeholder="Type your message..."></textarea>
                <button id="sendButton" className="terciary-button"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </div> : <></>}
        
        {(!displaySupport)? <button id="customerSupportButton" onClick={() => {toggleChatbox();}} className="terciary-button"><FontAwesomeIcon icon={faHeadset} /> {(!displaySupport)? "Support (0)" : "Close"} </button> : <></>}
    </>);
}