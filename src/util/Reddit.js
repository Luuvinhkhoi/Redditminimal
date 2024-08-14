let accessToken='';
let accessTokenPromise = null;
const clientID='_0vS7pgZaaFSQwvR30whUw'
const redirectUrl="http://localhost:3000"
const clientSecret = 'ek1E9ckl47MCZ47slfvnOlqbOq3qtA'
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const state = generateRandomString(16)
let Reddit = {
    async getAccessToken() {
      if(accessToken){
        return accessToken
      }
      if (!accessTokenPromise) {
        accessTokenPromise = (async () => {
          const stateInURL = window.location.href.match(/state=([^&]*)/);
          const codeInURL = new URLSearchParams(window.location.search).get('code');
          if (codeInURL && stateInURL) {
              const code = codeInURL;
              console.log(code)
              const response = await fetch('https://www.reddit.com/api/v1/access_token', {
                  method: 'POST',
                  headers: {
                      'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret),
                      'Content-Type':'application/x-www-form-urlencoded'
                  },
                  body: new URLSearchParams({
                      grant_type: 'authorization_code',
                      code: code,
                      redirect_uri: redirectUrl
                  })
              });
              const data= await response.json()
              if (data.access_token) {
                  accessToken = data.access_token;
                  return accessToken;
              } else {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('code');
                  url.searchParams.delete('state');
                  window.history.replaceState(null, null, url.toString());
                  console.log('Failed to get access token from code');
              }
          } else {
                  const redirect = `https://www.reddit.com/api/v1/authorize?client_id=${encodeURIComponent(clientID)}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent('mysubreddits,vote,read')}`;
                  console.log(redirect)
                  window.location = redirect;
          }
        })()
      }
      return accessTokenPromise;
    },
    async home (){
      await this.getAccessToken();
      console.log(accessToken)
      if(accessToken){
        return fetch('https://oauth.reddit.com/r/all/hot',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          if(response.ok){
            return response.json()
          }
          console.log(response)
          throw new Error(`Request failed with ${response.status}`)
        }, networkError => {
          console.log(networkError.message)
        }).then(jsonReponse => {
          console.log(jsonReponse)
          if(!jsonReponse){
            console.error('Response error')
          }
          return jsonReponse
        })
      }
    },
    async fetchSubReddit(){
      await this.getAccessToken()
      console.log(`YOYOYO${accessToken}`)
      if(accessToken){
        return fetch('https://oauth.reddit.com/r/home/rising',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          if(response.ok){
            return response.json()
          }
          console.log(response)
          throw new Error(`Request failed with ${response.status}`)
        }, networkError => {
          console.log(networkError.message)
        }).then(jsonReponse => {
          console.log(jsonReponse)
          if(!jsonReponse){
            console.error('Response error')
          }
          return jsonReponse
        })
      }
    },
    getComment(){

    }
}
export default Reddit