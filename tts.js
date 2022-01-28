// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

/**
 * Globala variabler.
 */
let loadedVoices = false
let synth = window.speechSynthesis
let voice 

/**
 * Kalla denna funktion för att ladda in alla röster
 * eftersom webbläsaren brukar vara seg med det.
 * - Karar
 */
function loadVoices() {
  // Försök att ladda in rösterna.
  const vGet = synth.getVoices()

  /**
   * Webbläsaren har ännu inte kunnat hitta rösterna,
   * kör om funktionen om 100 millisekunder. (Rekursion)
   */
  if (vGet.length === 0) {
    setTimeout(function () {
      loadVoices() // Rekursion
    }, 100)
  } else {
    /**
     * Webbläsaren har laddat in rösterna.
     */

    /**
     * "voice" globala variabeln ska använda sig av default rösten.
     * Detta går att ändra så att rösten använder sig av något annat. 
     */
    voice = vGet.find(function (voice) {
      // Exempel logik att få en annorlunda röst att läsa upp texten.
      return voice.lang === "en-GB"
      // return voice.default === true
    })

    /** 
     * Globala variabeln "loadedVoices" som var false ska nu bli true,
     * eftersom rösterna är laddade in.
     */
    loadedVoices = true

    // console.log(vGet, voice)

    runTts('Text to Speech enabled.')
  }
}

loadVoices()

function runTts(text, wait = false) {
  /**
   * Använd globala variabeln "loadedVoices" för att se om
   * rösterna är laddade in, annars avbryt funktionen tidigt.
   */
  if (loadVoices === false) {
    return
  }

  /**
   * Om TTS redan talar, avbryt TTS.
   */
  if (synth.speaking === true) {
    /**
     * Om wait är true, vänta 100ms och kör funktionen igen.
     * Ultra simpel. - Karar
     */
    if (wait) {
      return setTimeout(() => runTts(text, true), 100)
    }

    synth.cancel()
  }

  // SpeechSynthesisUtterance förbereder ett uttal.
  const utterance = new SpeechSynthesisUtterance(text)

  /** 
   * Ändra rösten på uttalet med den globala variabeln "voice"
   * som vi angav ovan på rad 35.
   */
  utterance.voice = voice

  // TTS
  synth.speak(utterance)
}
