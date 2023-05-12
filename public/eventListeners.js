window.onload = function(){
  const btn = document.querySelector('#BackToTopButton');

  window.onscroll = () =>{
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      btn.className = 'show';
      console.log('sd')
    } else {
      btn.className = '';
    }
  };
  
  btn.addEventListener('click', (e) =>{
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
  })
  
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', ()=>{
        if(mobileMenu.classList[2].localeCompare('hidden') != -1){
            mobileMenu.className = mobileMenu.classList[0]+' '+mobileMenu.classList[1]+' '+'block';
        }
        else if(mobileMenu.classList[2].localeCompare('block') != -1){
            mobileMenu.className = mobileMenu.classList[0]+' '+mobileMenu.classList[1]+' '+'hidden';
        }
    });

    const vidWrapper = document.querySelector('div.player');
const myVid = vidWrapper.querySelector('video.player__video');

// controls
const controlPlay = vidWrapper.querySelector('.player__button');
const controlFullScreen = vidWrapper.querySelector('.player__fullscreen');
const controlProgress = vidWrapper.querySelector('.progress');
const progressBar = vidWrapper.querySelector('.progress__filled');

// events
var drag;
var grap;

myVid.addEventListener('click', toggleVideo);
controlPlay.addEventListener('click', toggleVideo);
controlFullScreen.addEventListener('click', goFullScreen);
controlProgress.addEventListener('mouseover', function(){drag = true});
controlProgress.addEventListener('mouseout', function(){drag = false; grap = false});
controlProgress.addEventListener('mousedown', function(){grap = drag});
controlProgress.addEventListener('mouseup', function(){grap = false});
controlProgress.addEventListener('click', updateCurrentPos);
controlProgress.addEventListener('mousemove', function(e){ if(drag && grap){updateCurrentPos(e)}});

var progression;

// functions
function toggleVideo() {
  if (myVid.paused) {
    myVid.play();
    controlPlay.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    updateProgress();
    progression = window.setInterval(updateProgress, 200);
  } else {
    myVid.pause();
    controlPlay.innerHTML = `<i class="fa-solid fa-play"></i>`;
    clearInterval(progression);
  };
}
function goFullScreen(){
  console.dir(myVid);
  if(myVid.webkitSupportsFullscreen) myVid.webkitEnterFullScreen();
}
function updateProgress() {
  var progress = myVid.currentTime / myVid.duration;
  progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + '%';

  if ((Math.floor(progress * 1000) / 10) == 100){
    controlPlay.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
}
function updateCurrentPos(e){
  // offset of the progress bar / video wrapper width
  var newProgress = (e.clientX - vidWrapper.offsetLeft) / vidWrapper.clientWidth;
  progressBar.style.flexBasis = Math.floor(newProgress * 1000) / 10 + '%';
  myVid.currentTime = newProgress * myVid.duration;
}
}