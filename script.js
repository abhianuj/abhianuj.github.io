const holder= document.getElementById('holder');
const inputField = document.getElementById('typeOnThis');
const header = document.getElementById('header');
const cli= document.getElementById("cli");
const inputDiv = document.getElementById("inputDiv");
const cliContent = document.getElementById("cliContent");
const labelPath = document.getElementById('path');

/*
    header, mimize, maximize and default settings
*/
//making holder good to work with
holder.style.height="400px"
const defaultHolder= function(height, width){
    holder.style.height= height;
    holder.style.width= width;
}
holder.addEventListener('click', function(e){
    let target = e.target.id;
    
    //focus on input field whever the terminal is clicked
    inputField.focus();
    
    //maximize and minimize
    if(target=="minimize"){
        if(holder.style.height=="400px"){
            defaultHolder("44px","200px");
        } else {
            defaultHolder("400px","700px");
        }
    } else if(target=="maximize"){
        if(holder.style.height=="400px"){
            defaultHolder("500px","900px");
        } else{
            defaultHolder("400px","700px");
        }
    } else if(target=="close"){
        alert("Administrator privilages required!")
    }
})


/*
    reading cli inputs and responding correctly
*/
//input field valiadtion and response
let history=[];
//i and k are used fro navigating in history when arrows are clicked
let i=-1;
let k=i;
let currentPath={
    currPath: path.textContent,
    text: ''
};

//the object setting for a match
let work = {
    "--help": function(){
        cliContent.innerHTML+= '<ul id="help"><li><span>path :</span> Display current directory</li><li><span>cat FILENAME :</span> Open the file with name FILENAME</li><li><span>cd DIRECTORY :</span> Move to the specified Directory or "cd .." to move back</li><li><span>ls :</span> Show files and folders in the current directory</li><li><span>history :</span> Shows your command history</li><li><span>clear: </span>Clears the terminal.</li></ul>';
    },
    history: function(){
        let allHistory='';
        history.forEach(function(h){
            allHistory+='<div> ' + h + '</div>';
        })
        cliContent.innerHTML += allHistory;
    },
    ls: function(currentPath){
        if(currentPath.currPath=="root"){
            cliContent.innerHTML += '<div class="ls"><span>about.txt</span><span class="folder">skills</span><span>contact.txt</span><span class="folder">projects</span></div>';
        } else if(currentPath.currPath=="root/skills"){
            cliContent.innerHTML +=  '<div class="ls"><span>profecient.txt</span><span>familiar.txt</span</div>';
        } else if(currentPath.currPath="root/projects"){
            cliContent.innerHTML += '<div class="ls"><span>Calculator.txt</span><span>AttendanceManager.txt</span><span>CustomerManager.txt</span><span>TrackMyCrypto.txt</span></div>';
        }
    },
    cd: function(currentPath){
        //setting path
        let pathSet = function(p){
        currentPath.currPath = p;
        cliContent.innerHTML += '<br>';
        path.textContent=currentPath.currPath;
        }

        if(currentPath.currPath.split('/')[0]=="root"){
            if(currentPath.text.split(' ')[1]=="skills"){
                pathSet("root/skills");
            } else if(currentPath.text.split(' ')[1]=="projects"){
                pathSet("root/projects");
            }else if(currentPath.text.split(' ')[1]==".."){
                 if(currentPath.currPath=="root"){
                     cliContent.innerHTML +='<div>Error: You are already in the root!</div>';
                 } else{
                     pathSet("root");
                 }
            }else {
                cliContent.innerHTML +='<div>Error: Folder not found!</div>';
            }
        }
    },
    cat: function(currentPath){
        if(currentPath.currPath=="root"){
            if(currentPath.text.split(' ')[1]=="about.txt"){
                cliContent.innerHTML += '<div> Hello, I am Abhijeet and I am a cs guy who is passionate about web, data science and hacking. I love to do everything from scratch. Teaching is one of my hobbies. Currently I am a scholar at SAP labs.</div>';
            }else if(currentPath.text.split(' ')[1]=="contact.txt"){
                cliContent.innerHTML += '<div>Abhijeet Kumar<br>Address: Ranchi, Jharkhand, INDIA.<br>Phone no.: +91 7004784764<br>Email: abhi.anuj100@gmail.com</div>';
            }else {
                cliContent.innerHTML += '<div>Error: File not found!</div>';
            }
        }else if(currentPath.currPath=="root/skills"){
            if(currentPath.text.split(' ')[1]=="proficient.txt"){
                cliContent.innerHTML += '<ul><li>HTML5/CSS3</li><li>javaScript</li><li>C++</li><li>Java</li><li>Python</li></ul>';
            }else if(currentPath.text.split(' ')[1]=="familiar.txt"){
                cliContent.innerHTML += '<ul><li>Bash</li><li>Git</li><li>Node.js</li><li>Open UI5</li><li>PWA</li></ul>';
            } else{
                cliContent.innerHTML += '<div>Error: File not found!</div>';
            }
        } else if(currentPath.currPath=="root/projects"){
            if(currentPath.text.split(' ')[1]=="Calculator.txt"){
                cliContent.innerHTML += '<div>It is a simple pwa(progressive web app) calculator using html css and javascript.<a href="https://calculateall10.netlify.app/"> Visit...</a></div>';
            } else if(currentPath.text.split(' ')[1]=="AttendanceManager.txt"){
                cliContent.innerHTML += '<div>It is a simple pwa which helps in managing attendance. It works offline once pwa is installed. Add your first name and attendance perecentage criteria. Click on "+" button to add subjects. Click on the subject name to make attendance. To reset the app click on a very small circle on the top right corner. (Disclamer! This project is only meant for mobile devices so make sure to switch to inspect before visiting the link) <a href="https://modest-goodall-6cdde7.netlify.app/">Visit...</a></div>';
            } else if(currentPath.text.split(' ')[1]=="CustomerManager.txt"){
                cliContent.innerHTML += '<div>A customer managment app made with node.js for companies providing certification as a service. It helps to maintain and search for certificate expiry of clients.<a href="https://github.com/abhianuj/divineblue-customerManagment">Visit...</a></div>';
            } else if(currentPath.text.split(' ')[1]=="TrackMyCrypto.txt"){
                cliContent.innerHTML += '<div>A small mobile(no desktop support) website which can fetch price details. and convert price of a cryptocurrency in given currency. (Disclamer! This a mobile supported app so make sure to switch to inspect elemnt then to mobile view before viewing the app) <a href="https://fetchcrypto.netlify.app/">Visit...</a></div>';
            } else {
                
            }
        }
    },
    clear: function(){
        cliContent.innerHTML = "(☞ﾟ∀ﾟ)☞ Welcome to the cli! type '--help' to get started<br> ";
    },
    path: function(currentPath){
        cliContent.innerHTML += '<div>' + currentPath.currPath + '</div>'
    }
};


inputField.addEventListener('keyup', function(e){
    if(e.keyCode === 13){
        
        //getting the input value and setting history
        currentPath.text = inputField.value;
        if(inputField.value!=''&&inputField.value!=' '){
            history.push(currentPath.text);
            //i and k are used for naviagting in history when arrows are clicked
            i+=1;
        }
        k=i;
        //initial setting
        let flag=true;
        let previousCommand='<span class="label">' + currentPath.currPath + ' <span class="arrow"> > </span></span>';
        
        
        //setting partial content
        cliContent.innerHTML += previousCommand + currentPath.text;
        
        
        for(const item in work){
            if(currentPath.text.split(' ')[0]==item){
                work[item](currentPath);
                flag=false;
            }
        }
        if(flag){
            cliContent.innerHTML += '<div>Error: Command not found!</div>';
        }
        
        //making input field empty
        inputField.value='';
        //scrolling to bottom
        holder.scrollTop = holder.scrollHeight;
    } 
    //arrow keys up and dwon
    else if(e.keyCode === 38){
        if(k>-1){
            inputField.value=history[k];
            k-=1;
        }
    } else if(e.keyCode === 40){
        if(k<i){
            k+=1;
            inputField.value=history[k];
        }
    }
})