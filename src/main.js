    const play=document.getElementById("play");
    const img=document.querySelector("img");
    const music=document.querySelector("audio");
    const artist=document.getElementById("artist");
    const title=document.getElementById("title");
    const prev=document.getElementById("prev");
    const next=document.getElementById("next");

    let progress=document.getElementById("progress");
    let total_duration=document.getElementById("duration");
    let current_Time=document.getElementById("current_Time");

    const progress_div=document.getElementById("progress_div");

    // songlist-----later to be modified by backend/api source
    const songs=[{
            name:"audio1",
            title:"I want you back",
            artist:"The Jackson 5",
        },
        {
            name:"audio2",
            title:"One call away",
            artist:"Charlie Puth",
        },     
        
        {
            name:"audio3",
            title:"Can't Stop",
            artist:"Red Hot Chilli Peppers", 
        },
        {
            name:"audio4",
            title:"Wherever you are",
            artist:"Kodaline", 
        },

        {
            name:"audio5",
            title:"Rajaz",
            artist:"Camel",
        },
        {
            name:"audio6",
            title:"Skyfall",
            artist:"Adele",
        },



    ];


    let isPlaying=false;

    // function to play music
    const playMusic=()=>{
        isPlaying=true;
        music.play();
        play.classList.replace('fa-play', 'fa-pause');        
        img.classList.add("ani");
        img.classList.remove("paused");
        // img.style.animation="rotatePlayer 3s steps(10000) infinite";
    };

    //function to pause music
    const pauseMusic=()=>{
        isPlaying=false;
        music.pause();
        play.classList.replace('fa-pause', 'fa-play');
        img.classList.add("paused");
        // img.style.animation="";
    };
    

    play.addEventListener("click", ()=>{
        isPlaying? pauseMusic(): playMusic();
    });

    //changing the song data
    const loadSong=(songs)=>{
        title.textContent=songs.title;
        artist.textContent=songs.artist;
        music.src="/music/"+songs.name+".mp3";
        img.src="/image/"+songs.name+".png";

    };

    songIndex=0;
    
    const nextSong=()=>{
        songIndex=(songIndex+1)%songs.length;
        loadSong(songs[songIndex]);
        // img.classList.toggle("paused");
        playMusic();
        
    };



    const previousSong=()=>{
        songIndex=(songIndex-1 +songs.length)%songs.length;
        loadSong(songs[songIndex]);
        // img.classList.toggle("paused");
        playMusic();
        
    };

    // progress javascript
    music.addEventListener('timeupdate', (event) =>{
        // console.log(event);
        const {currentTime, duration}=event.srcElement;
        let progress_time=(currentTime/duration)*100;
        progress.style.width=`${progress_time}%`;
    

        // current duration counter
        let min_duration=Math.floor(duration/60);
        let sec_duration=Math.floor(duration%60);
        let tot_duration=`${min_duration}:${sec_duration}`;

        if(duration){
        total_duration.textContent=`${tot_duration}`;
            }

        // current duration counter
        let min_currentTime=Math.floor(currentTime/60);
        let sec_currentTime=Math.floor(currentTime%60);

        
        if(sec_currentTime<10){
            sec_currentTime=`0${sec_currentTime}`;

        }        
        let tot_currentTime=`${min_currentTime}:${sec_currentTime}`;
        current_Time.textContent=`${tot_currentTime}`;
    });

    progress_div.addEventListener('click', (event)=>{
        const {duration}=music; 
        let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
        console.log(move_progress);
        
        music.currentTime=move_progress;
    });



    // to next song if current ends
    music.addEventListener('ended', nextSong);      
    
    
    next.addEventListener('click', nextSong);    
    prev.addEventListener('click', previousSong);

    
