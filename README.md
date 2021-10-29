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
