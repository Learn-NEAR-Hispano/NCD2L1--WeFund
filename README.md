# WeFund
==================
> Proyecto realizado para el NCD Bootcamp NEAR Hispano.
## WeFund es un servicio que, a través de la blockchain, buscar fondeo para nuestros proyectos, además de que nos permite fondear proyectos de la comunidad y entre amigos.

# WeFund permite:
    1. Crear un nuevo proyecto, pudiendo recibir fondeo
    2. Consultar los proyectos públicos de la comunidad
    3. Agregar amigos
    4. Consultar los proyectos de un amigo
    5. Donar a proyectos públicos
    6. Donar a proyectos de amigos

## Pre-requisitos
1. node.js >=12 instalado (https://nodejs.org)
2. yarn instalado
    ```bash
    npm install --global yarn
    ```
3. instalar dependencias
    ```bash
    yarn install --frozen-lockfile
    ```
4. crear una cuenta de NEAR en [testnet](https://docs.near.org/docs/develop/basics/create-account#creating-a-testnet-account)   
5. instalar NEAR CLI
    ```bash
    yarn install --global near-cli
    ```
6. autorizar app para dar acceso a la cuenta de NEAR
    ```bash
    near login
    ```

### Clonar el Repositorio
```bash
git clone https://github.com/paul-cruz/WeFund
cd ConnectIoT
```

### Instalar y compilar el contrato
```bash
    yarn install
    yarn build:contract:debug
```

### Deployar el contrato
```bash
yarn dev:deploy:contract
```

### Instalar dependencias del frontend
```bash
    yarn install
```

### Ejecutar el frontend
```bash
    yarn start
```

## Correr comandos
Una vez deployado el contrato, usaremos el Account Id devuelto por la operacion para ejecutar los comandos, que será el account 
Id del contrato [será utilizado como CONTRACT_ACCOUNT_ID en los ejemplos de comandos]

Utilizaremos YOUR_ACCOUNT_ID para identificar el account Id que utilizamos para hacer las llamadas a los métodos.

Utilizaremos FRIEND_ACCOUNT_ID para identificar el account Id de algún amigo registrado en el servicio.

### Registrarse en el servicio
```bash
    near call CONTRACT_ACCOUNT_ID register '' --accountId YOUR_ACCOUNT_ID
```

### Crear un proyecto
```bash
    near call CONTRACT_ACCOUNT_ID createProject '{"name":"MyProject","description":"This is my project", "goal":20, "isPublic":True}' --accountId YOUR_ACCOUNT_ID
```
### Obtener los proyectos públicos
```bash
    near call CONTRACT_ACCOUNT_ID getPublicProjects '' --accountId YOUR_ACCOUNT_ID
```
### Obtener información de un solo proyecto público
```bash
    near call CONTRACT_ACCOUNT_ID getPublicProject '{"id":"MyProject"}' --accountId YOUR_ACCOUNT_ID
```
### Añadir a un amigo
```bash
    near call CONTRACT_ACCOUNT_ID addFriend '{"friendId": "FRIEND_ACCOUNT_ID"}' --accountId YOUR_ACCOUNT_ID
```
### Obtener los proyectos de un amigo
```bash
    near call CONTRACT_ACCOUNT_ID getFriendsProjects '{"friendId":"FRIEND_ACCOUNT_ID"}' --accountId YOUR_ACCOUNT_ID
```
### Obtener información de un solo proyecto de un amigo
```bash
    near call CONTRACT_ACCOUNT_ID getFriendsProject '{"friendId":"FRIEND_ACCOUNT_ID", "name":"ProjectFriend"}' --accountId YOUR_ACCOUNT_ID
```
### Donar a un proyecto público
```bash
    near call CONTRACT_ACCOUNT_ID donatePublicProject '{"name":"PublicProject"}' --accountId YOUR_ACCOUNT_ID --amount 10
```
### Donar a un proyecto de un amigo
```bash
    near call CONTRACT_ACCOUNT_ID donateFriendProject '{"friendId":"FRIEND_ACCOUNT_ID","name":"ProjectFriend"}' --accountId YOUR_ACCOUNT_ID --amount 10
```
### Obtener una lista de todas las personas registradas en el servicio
```bash
    near call CONTRACT_ACCOUNT_ID viewPeople '' --accountId YOUR_ACCOUNT_ID
```
### Obtener una lista de amigos
```bash
    near call CONTRACT_ACCOUNT_ID getFriends '' --accountId YOUR_ACCOUNT_ID
```

## Caso de uso:
### WeFund permite a los usuarios que recién inician con un proyecto y que necesitan financiamiento para el desarrollo del mismo, buscar esos fondos entre las personas de la comunidad que estén interesadas en el objetivo del mismo.