export const environment = {
  production: false,
  backend: {
      //baseURL:'https://localhost:7259/webapi' 
      baseURL: 'http://172.31.64.209:81/webapi'
  },
 
  azureAD:{       //DEV
      clientId: "bcf827c8-3375-4d08-bbe8-97904aeaa70e",
      authority: "https://login.microsoftonline.com/e965d998-e73c-4e72-bcf8-a71ea98810e7",
      redirectUri: 'http://localhost:4200/login',
      postLogoutRedirectUri: 'http://localhost:4200/',
      mainWindowRedirectUri:'http://localhost:4200/login',
      scopes: ['user.read'],
      defaultFlag: 'flag-icon flag-icon-in mr-2', //flag-icon flag-icon-ar mr-2
      defaultLanguage: 'en-US'
  }
};