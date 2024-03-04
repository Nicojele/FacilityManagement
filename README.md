# Task Manegement Tool

## Inhalte

- [Genrelle Informationen](#generelle-informationen)
- [Technologien](#technoligien)
- [Application starten](#application-starten)
- [Create Migartions](#create-migrations)
- [Deploy on Vercel](#deploy-on-vercel)

## Generelle Informationen

Bei diesem Projekt handelt es sich um eine Anwendung zum Organisieren von Aufgaben.
Es soll dazu dienen die Notwendigkeit von Aufgaben besser handhaben zu können und Aufgaben zu verteilen.

## Technoligien
### NextJs
<https://nextjs.org/docs>
### React
<https://reactjs.org/docs/getting-started.html>

### PostgreSQL
<https://www.postgresql.org/docs/>

## Vorraussetzungen
### Docker
<https://www.docker.com/get-started>



## Application starten

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Öffne [http://localhost:3000](http://localhost:3000) mit deinem Browser um die Ergebnisse zu sehen.

Du kannst damit starten die `app/page.tsx` zu Bearbeiten. Die Seite updatet sich automisch.

## Create Migrations

Nutze den `docker-compose up` Befehl um die Benötigten Container zum erstellen der Migartions zu starten.

Stelle sicher das der befehl zum Seeden von Daten zur `Package.json` hinzugefügt ist.

Erstelle deine Migartions jetzt, benutze dafür den `npx prisma migarte dev` Befehl.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
