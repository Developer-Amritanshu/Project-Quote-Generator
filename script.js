const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

function showLoadingSpinner(){
  loader.hidden = false
  quoteContainer.hidden = true
}

function hideLoadingSpinner (){
  if(!loader.hidden){
    quoteContainer.hidden=false
    loader.hidden=true
  }
}

//Get Quote from API
async function getQuote(){
  showLoadingSpinner()
  const proxyUrl ='https://cors-anywhere.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  try {
    const response = await fetch(proxyUrl + apiUrl)
    const data = await response.json()
    
    //If Author is empty or unknown
    if(data.quoteAuthor === ''){
      authorText.innerText = 'Unknown'
    }else{
      authorText.innerText = data.quoteAuthor
    }

    //If Quote length is more than 120 
    if(data.quoteText.length > 120) {
      quoteText.classList.add('long-quote')
    }else {
      quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = data.quoteText 
    hideLoadingSpinner()  
  }
  catch(err){
    getQuote()
  }
}

//Tweeter
function tweetQuote (){
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl,'_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click',getQuote)
twitterBtn.addEventListener('click',tweetQuote)

//On Load
getQuote()