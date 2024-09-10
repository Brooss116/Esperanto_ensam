# Esperanto

L'objectif du projet est de créer une plateforme web de mise en relation entre les professionnels de la santé et les chercheurs. Ses principales fonctionnalités comprennent:

- Création de profil
- Mise en relation
- Proposition
- Recherche

L'idée est de faciliter la collaboration, l'échange de connaissances et le développement de projet dans le secteur de la santé.

## Technologies et frameworks
Voici les principales dépendances et langages que vous devez connaître pour contribuer à ce projet.

##### Backend :
- [Typescript](https://www.typescriptlang.org/docs/)
- [NodeJS](https://nodejs.org/en/docs)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server)
- [SQL - Sequelize ORM](https://sequelize.org/docs/v6/getting-started/)

##### Frontend :
- [Typescript](https://www.typescriptlang.org/docs/)
- [React](https://legacy.reactjs.org/docs/getting-started.html)
- [React Router](https://reactrouter.com/en/main)
- [Apollo Client](https://www.apollographql.com/docs/react/)

## Prérequis
Tout d'abord, vous devez installer globalement les dépendances suivantes :

- [Docker](https://www.docker.com/products/docker-desktop/) (latest)
- [Node.js](https://nodejs.org/en/) (v18.x.x)
- [Mysql] (test.com) (latest)

# Importation du projet

Clone du repot 

```bash

git clone https://github.com/Brooss116/pjt_esperanto.git

```
Rentre dans le repertoire du projet 

```bash

cd pjt_esperanto
```

# Lancement Esperanto Backend

## Installation

Créé une base de donnée `MySQL` :

```sql
CREATE DATABASE `esperanto`;
```

Rentrer dans le repertoire back : 

```bash

cd back
```

Dans le répertoire `back/`, il faut installer les dépendances :

```bash

npm install
```

Puis installer [pnpm](https://pnpm.io/fr/) et lancer l'installation des packages: 

```bash
  npm install -g pnpm
  pnpm i
```

Créer un fichier d'environnement `back/.env`

```bash
touch .env
open .env
```

Et y ajouter ces variables :

```dotenv
# MySQL Database settings
DATABASE_NAME="esperanto"
DATABASE_USER="root"
DATABASE_PASSWORD="password" #MDP definie à l'installation de sql
DATABASE_HOST="localhost"
DATABASE_PORT="3306"
```

Créer les tables de la base de donnée :

```bash
npm run sync-database
```

Ajouter des données de test, cela peut prendre 2 ou 3 minutes (optionnel) :

```bash
npm run import-fake-data
```

## Dev

Lancer le serveur Appolo :

- Pour Linux
```bash
npm run dev
```

- Pour Mac
```bash
npm run dev-alt
```

- Pour Windows
```bash
npm run dev-windows
```

# Lancement Esperanto Front 

## Installation

Rentrer dans le repertoire `front/` :

```bash

cd front
```


Installer les packages :

```bash
pnpm i

```

## Dev

Lancer le front : 


```bash

pnpm dev
```




