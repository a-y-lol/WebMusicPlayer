import anime from"./anime.es.js";import audio from"./audio.js";const playBtn=document.querySelector("div#play-icon"),playBtnImg=document.querySelector("div#play-icon").querySelector("img"),nextBtn=document.querySelector("div#forward-icon").querySelector("img"),prevBtn=document.querySelector("div#backward-icon").querySelector("img"),musicControlsDivs=document.querySelectorAll("div.music-controls-divs"),autoPlayDiv=document.querySelector("div#autoplay-div"),loopDiv=document.querySelector("div#loop-div"),shuffleDiv=document.querySelector("div#shuffle-div"),progressNowSpan=document.querySelector("span#progress-now-span"),progressDurationSpan=document.querySelector("span#progress-duration-span"),progressBar=document.querySelector("div.progress-bar"),musicList=document.querySelector("div.music-list"),musicArtImg=document.querySelector("img.music-art-img"),musicTitle=document.querySelector("div.music-title"),musicTitleSpan=document.querySelector("span#music-title-span"),musicArtistSpan=document.querySelector("span#music-artist-span"),musicResSpan=document.querySelector("span#music-res-span"),musicInputFile=document.querySelector("input#music-input-file");function buildTrack(file,id,imgSrc,trackTitle,trackArtist){imgSrc=`
    <div class="tracks" id="track-${id}">

        <div class="track-thumbnail">
            <img id="track-thumbnail-img-${id}" class="track-thumbnail-img" src="${imgSrc}" alt="">
        </div>

        <div class="track-info">

            <div class="track-info-container">
                <div class="track-title-container">
                    <div class="track-title">
                        <span id="track-title-span-${id}" class="track-title-span">${trackTitle}</span>
                    </div>
                    <div class="track-artist">
                        <span id="track-artist-span-${id}" class="track-artist-span">${trackArtist}</span>
                    </div>
                </div>
            </div>

        </div>

    </div>`;musicList.innerHTML+=imgSrc;let musicTitles=document.querySelectorAll("div.track-title"),tracks=document.querySelectorAll("div.tracks");musicTitles.forEach(title=>{title.addEventListener("mouseover",()=>{title.scrollTo({left:title.scrollWidth,behavior:"smooth"})}),title.addEventListener("mouseleave",()=>{title.scrollTo({left:0,behavior:"smooth"})})}),tracks.forEach(track=>{track.addEventListener("mouseover",()=>{anime.remove(track),anime({targets:track,scale:1.008,duration:600,elasticity:400})}),track.addEventListener("mouseleave",()=>{anime.remove(track),anime({targets:track,scale:1,duration:600,elasticity:400})}),track.addEventListener("mousedown",()=>{anime.remove(track),anime({targets:track,scale:.98,duration:600,elasticity:400})}),track.addEventListener("mouseup",()=>{anime.remove(track),anime({targets:track,scale:1,duration:600,elasticity:400,after:()=>{tracks.forEach(track=>{track.classList.remove("active-track")}),track.classList.add("active-track");var trackID=track.id.split("-")[1];6<trackID?musicList.scrollTo({top:musicList.scrollHeight,behavior:"smooth"}):trackID<6&&musicList.scrollTo({top:0,behavior:"smooth"}),musicTitle.id="title-"+trackID,musicArtImg.src=track.querySelector("img").src,musicTitleSpan.textContent=track.querySelector("span.track-title-span").textContent,musicArtistSpan.textContent=track.querySelector("span.track-artist-span").textContent,musicResSpan.textContent=file.name.slice(file.name.lastIndexOf(".")+1,file.name.length).toUpperCase(),audio(musicInputFile.files[trackID],!0)}})})})}function playAudio(audioElement){playBtnImg.src="assets/icons/pause-fill.svg",audioElement.play()}function pauseAudio(audioElement){playBtnImg.src="assets/icons/play-fill.svg",audioElement.pause()}function playBtnControl(audioElement,play=!1){audioElement.addEventListener("loadeddata",()=>{let times=0;(play?playAudio:pauseAudio)(audioElement),document.addEventListener("keydown",e=>{"Space"===e.code?play?(times=0,pauseAudio(audioElement),play=!1):(times+=1)%2!=0?(times=1,playAudio(audioElement)):times%2==0&&(times=0,pauseAudio(audioElement)):"ArrowRight"===e.code?audioElement.currentTime+=2.5:"ArrowLeft"===e.code&&(audioElement.currentTime-=2.5)}),playBtnImg.addEventListener("click",()=>{play?(times=0,pauseAudio(audioElement),play=!1):(times+=1)%2!=0?(times=1,playAudio(audioElement)):times%2==0&&(times=0,pauseAudio(audioElement))}),navigator.mediaSession.setActionHandler("play",()=>{play?(times=0,pauseAudio(audioElement),play=!1):(times+=1)%2!=0&&(times=1,playAudio(audioElement))}),navigator.mediaSession.setActionHandler("pause",()=>{play?(times=0,pauseAudio(audioElement),play=!1):(times+=1)%2==0&&(times=0,pauseAudio(audioElement))})})}function triggerMouseEvent(node,eventType){eventType=new MouseEvent(eventType);try{node.dispatchEvent(eventType)}catch(e){}}function trackControl(trackElement){triggerMouseEvent(trackElement,"mouseup")}function nextTrack(){var musicTitleID=document.querySelector("div.music-title").id.split("-")[1];if(musicTitleID<musicInputFile.files.length-1){musicTitleID=parseInt(musicTitleID)+1;trackControl(document.querySelector("div#track-"+musicTitleID))}else{let nextTrackElement=document.querySelector("div#track-0");trackControl(nextTrackElement)}}function prevTrack(){if(0<document.querySelector("div.music-title").id.split("-")[1]){let musicTitleID=document.querySelector("div.music-title").id.split("-")[1];var prevMusicTitleID=parseInt(musicTitleID)-1;trackControl(document.querySelector("div#track-"+prevMusicTitleID))}else{let prevMusicTitleID=document.querySelectorAll("div.tracks").length-1,prevTrackElement=document.querySelector("div#track-"+prevMusicTitleID);trackControl(prevTrackElement)}}function progressNow(audioElement,times,isList=!1){if(isList?(autoPlayDiv.style.display="flex",loopDiv.style.display="none",shuffleDiv.style.display="flex"):(loopDiv.style.display="flex",autoPlayDiv.style.display="flex",autoPlayDiv.style.opacity="0"),1<times)try{clearInterval(progressInterval),clearInterval(progressBarInterval)}catch(error){console.log(error)}playBtnControl(audioElement),globalThis.progressInterval=setInterval(()=>{var timeNow=audioElement.currentTime,minutes=Math.floor(timeNow/60);let seconds=Math.floor(timeNow-60*minutes);seconds=seconds<=9?"0"+seconds:seconds,progressNowSpan.textContent=minutes+":"+seconds},500),globalThis.progressBarInterval=setInterval(()=>{var duration=audioElement.duration,durationMinutes=Math.floor(duration/60);let durationSeconds=Math.floor(duration-60*durationMinutes);durationSeconds=durationSeconds<=9?"0"+durationSeconds:durationSeconds,isNaN(durationMinutes)||isNaN(durationSeconds)?progressDurationSpan.textContent="0:00":progressDurationSpan.textContent=durationMinutes+":"+durationSeconds;durationMinutes=audioElement.currentTime;let progressPercentage=durationMinutes/duration*100;var duration=progressPercentage.toString()+"%";if(progressBar.style.width=duration,durationMinutes>=audioElement.duration){const autoPlayDivClass=autoPlayDiv.classList,shuffleDivClass=shuffleDiv.classList,loopDivClass=loopDiv.classList;isList&&autoPlayDivClass.contains("active-div")?shuffleDivClass.contains("active-div")?(duration=Math.floor(Math.random()*musicInputFile.files.length),trackControl(document.querySelector("div#track-"+duration))):nextBtn.click():!isList&&loopDivClass.contains("active-div")?(audioElement.currentTime=0,clearInterval(progressInterval),clearInterval(progressBarInterval),playAudio(audioElement),progressNow(audioElement,times=1,isList=!1)):isList||loopDivClass.contains("active-div")?isList&&(playBtnImg.src="assets/icons/play-fill.svg",clearInterval(progressInterval),clearInterval(progressBarInterval),playBtn.addEventListener("click",()=>{playAudio(audioElement),progressNow(audioElement,times=1,isList=!0)})):(audioElement.currentTime=0,clearInterval(progressInterval),clearInterval(progressBarInterval),pauseAudio(audioElement),playBtnImg.src="assets/icons/play.svg",playBtn.addEventListener("click",()=>{playAudio(audioElement),progressNow(audioElement,times=1,isList=!1)}))}},500)}musicControlsDivs.forEach(div=>{div.addEventListener("mouseover",()=>{anime.remove(div),anime({targets:div,scale:1.01,duration:600,elasticity:400})}),div.addEventListener("mouseleave",()=>{anime.remove(div),anime({targets:div,scale:1,duration:600,elasticity:400})}),div.addEventListener("mousedown",()=>{anime.remove(div),anime({targets:div,scale:.98,duration:600,elasticity:400})}),div.addEventListener("mouseup",()=>{anime.remove(div),anime({targets:div,scale:1,duration:600,elasticity:400})}),div.addEventListener("click",()=>{div.classList.toggle("active-div")})}),playBtn.addEventListener("mouseover",()=>{anime({targets:playBtn,scale:1.02,duration:700,elasticity:400})}),playBtn.addEventListener("mouseleave",()=>{anime({targets:playBtn,scale:1,duration:600,elasticity:400})}),playBtn.addEventListener("mousedown",()=>{anime({targets:playBtn,scale:.975,duration:600,elasticity:400})}),playBtn.addEventListener("mouseup",()=>{anime({targets:playBtn,scale:1,duration:600,elasticity:400})}),nextBtn.addEventListener("click",()=>{nextTrack()}),prevBtn.addEventListener("click",()=>{prevTrack()}),navigator.mediaSession.setActionHandler("nexttrack",()=>{nextTrack()}),navigator.mediaSession.setActionHandler("previoustrack",()=>{prevTrack()});export{progressNow,buildTrack,playAudio,pauseAudio,playBtnControl};