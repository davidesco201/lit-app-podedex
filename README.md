# lit-app
# PokeDex API

Esta es una aplicación para gestionar y visualizar información de Pokémon utilizando una API.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- json-server

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/pokedex-api.git
    cd pokedex-api
    ```

2. Actualiza los módulos de Node:
    ```bash
    npm install
    ```

## Ejecución

### Cliente

Para correr la parte del cliente, utiliza el siguiente comando:
```bash
npm run dev 
```


#### Servidor JSON
Para correr el servidor JSON, utiliza el siguiente comando:
```bash
json-server -w pokemons.json -p 3002
```

#### Uso
Una vez que ambos servidores estén corriendo, puedes acceder a la aplicación en tu navegador en http://localhost:3000 y a la API en http://localhost:3002.

#### Licencia
Este proyecto está bajo la Licencia MIT.