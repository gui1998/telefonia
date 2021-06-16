# oniqtelefonia

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build

firebase login 

firebase deploy --only hosting

```

### Lints and fixes files
```
npm run lint
```

### Config rules firebase
```
{
  "rules": {
    ".read": "true",  
    ".write": "auth.uid != null",
      "historico" :{
        ".write": "true",
        ".read": "auth.uid != null"
      }
    }
}
```

### Create and Set file name ".env.local" with firebase variables
```
# Credenciais do Firebase
VUE_APP_API_KEY=
VUE_APP_AUTH_DOMAIN=
VUE_APP_DATABASE_URL=
VUE_APP_PROJECT_ID=
VUE_APP_STORAGE_BUCKET=
VUE_APP_MESSAGING_SENDER_ID=

```
