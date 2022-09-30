function timer(){

    const btn = document.querySelector('#btn-change');
    const label = document.querySelector('.label-toggle')
    const timerDisplay = document.querySelector('#timer');
    let timer = 0;
    let timerRun = 0;
    let audio = new Audio('./assets/music/music_alert.mp3');

    function getHoursSeconds(sec){
        const data = new Date(sec * 1000);
        console.log(data.toLocaleTimeString('pt-BR',{
            timeZone: 'UTC'
        }))
        return data.toLocaleTimeString('pt-BR',{
            timeZone: 'UTC'
        })
    }

    function startTime (){
        timerRun = setInterval(function(){
            if(timer == 0){
                clearInterval(timerRun);
                audio.play();
                displayBlink(true)
            }else{
                timer--;
                timerDisplay.value = (getHoursSeconds(timer));  
            }

        }, 1000)
    }

    function zeroTime (){
        timer = 0;
        timerDisplay.value = '00:00:00';
    }

    function startButton(){
        startTime();
        label.innerHTML = 'Parar';
        displayBlink(false); 
    }

    function stopButton(){
        clearInterval(timerRun);
        label.innerHTML = 'Iniciar';
        audio.pause();
        audio.currentTime = 0;
        timer != 0 ? displayBlink(true) : displayBlink(false);
    }

    function convertHour(timer){
        timer = timer.replace(/[^0-9]/g, '');
        let hora = Number(timer.substring(0,2));
        let min = Number(timer.substring(2,4));
        let sec = Number(timer.substring(4,6));

        hora = hora * 60 * 60;
        min = min * 60;
        return hora + min + sec;
    }
    
    function displayBlink(boolean){
        boolean ? timerDisplay.classList.add('stop') : timerDisplay.classList.remove('stop');
    }
    
    timerDisplay.addEventListener('blur' , () => {
      timer = convertHour(timerDisplay.value);
      console.log(timer);
    });

    document.addEventListener('click' , (e) =>{
        const element = e.target
        if(element.classList.contains('zero')){
            clearInterval(timerRun);
            zeroTime();
            stopButton();
        }
    })

    btn.addEventListener("change" , ({target}) =>{
        target.checked ? startButton() : stopButton();
    })

    document.addEventListener("keydown" , (e)=>{
        if(e.key === 'i') startButton();
        if(e.key === 'p') stopButton();
    })

}

timer();






