# Guide Pratique & Checklist Complète de Déploiement : Fidelix DZ
### Configuration Clé-en-Main : Supabase, Vercel, Apple Developer, Google Wallet & BaridiMob

Ce document récapitule vos informations officielles réelles et vous donne la liste exhaustive de **tout ce qu'il vous faut pour lancer Fidelix Algérie en production à 100%**.

---

## 📌 1. VOS INFORMATIONS OFFICIELLES ENREGISTRÉES DANS LE SYSTÈME

- **Contact Support Téléphone / WhatsApp** : `0541 53 47 62` (`+213 541 53 47 62`)
  - *Lien direct WhatsApp* : `https://wa.me/213541534762`
- **Email Officiel Administrateur & Facturation** : `kazimehdi34@gmail.com`
- **Compte BaridiMob & CCP Officiel** :
  - **Numéro RIP BaridiMob (20 chiffres)** : `00799999004172668994`
  - **Organisme** : Algérie Poste / BaridiMob
  - **Mode de rapprochement** : Les commerçants effectuent leur virement instantané via BaridiMob ou bureau de poste, puis envoient la capture de reçu sur votre WhatsApp (`0541 53 47 62`) ou par email (`kazimehdi34@gmail.com`) pour activation immédiate de leur abonnement.

---

## 🚀 2. « QUOI D'AUTRE ? » : LA LISTE DES 6 ÉLÉMENTS CLÉS NÉCESSAIRES

Pour que la plateforme fonctionne en direct avec les vrais smartphones (génération des passes Wallet et base de données temps réel), voici exactement ce qu'il vous faut :

### A. 🗄️ Supabase (Base de Données PostgreSQL & Authentification)
1. Créer un projet gratuit ou Pro sur [supabase.com](https://supabase.com).
2. Récupérer dans *Project Settings > API* :
   - `NEXT_PUBLIC_SUPABASE_URL` (ex: `https://xyz.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clé publique pour le front-end)
   - `SUPABASE_SERVICE_ROLE_KEY` (clé privée pour les scripts backend sécurisés)
3. Exécuter le schéma SQL fourni dans le document technique {{DATA:DOCUMENT:DOCUMENT_15}} (tables `merchants`, `staff_users`, `wallet_passes`, `scan_transactions`, etc.).
4. Activer le stockage (*Supabase Storage Bucket*) pour héberger les logos des commerces (`logos`).

### B. 🌐 Vercel (Hébergement Front-End & API Edge)
1. Lier votre dépôt GitHub (ex: `fidelix-dz`) sur [vercel.com](https://vercel.com).
2. Configurer les variables d'environnement (Supabase + Apple + Google).
3. Connecter votre nom de domaine personnalisé (ex: `fidelix.dz` ou `fidelix.pro` acheté chez un registrar comme *Icosnet*, *Namesilo* ou *Cloudflare*).

### C. 🍏 Compte Apple Developer (Pour générer les passes Apple Wallet `.pkpass`)
*Indispensable pour que les iPhones ajoutent la carte dans Apple Wallet.*
1. S'inscrire au **Apple Developer Program** (99$/an sur [developer.apple.com](https://developer.apple.com)).
2. Créer un **Pass Type ID** (ex: `pass.dz.fidelix.card`).
3. Générer le **Certificat Pass Signing** (`.p12` ou `.pem`) et la clé privée associée.
4. Télécharger le certificat racine Apple (**WWDR G4**).
*Le backend Node.js / Vercel Serverless signe cryptographiquement chaque fichier `.pkpass` en 1 seconde à chaque adhésion d'un client.*

### D. 🤖 Google Wallet API (Pour les utilisateurs Android)
*Entièrement gratuit sans abonnement annuel.*
1. Aller sur **Google Pay & Wallet Console** via [Google Cloud Platform](https://console.cloud.google.com).
2. Créer un **Issuer Account** (ID Émetteur de passes Fidelix DZ).
3. Créer un **Service Account** avec les permissions *Google Wallet API* et télécharger la clé privée JSON (`service_account.json`).
4. Définir une classe de carte de fidélité (*LoyaltyClass*).

### E. 📲 Notifications Push (Pour réveiller la carte sur l'écran verrouillé à 0 DA)
1. **Apple APNs (Apple Push Notification service)** : Utilise votre clé d'authentification Apple APNs (`.p8`) pour envoyer des notifications silencieuses de mise à jour des tampons et des offres promotionnelles flash.
2. **Firebase Cloud Messaging (FCM)** ou mise à jour directe via l'API Google Wallet.

### F. 📄 Registre Légal & Fiscal Algérien (SARL / EURL ou Auto-entrepreneur DZ)
Pour facturer légalement les commerçants et signer des contrats avec des franchises :
- **NIF** (Numéro d'Identification Fiscale)
- **NIS** (Numéro d'Identification Statistique)
- **RC** (N° de Registre du Commerce algérien)
- Mention légale de conformité à la **Loi 18-07** relative à la protection des données personnelles (déjà intégrée sur vos pages).

---

## 🛠️ 3. FICHIER D'ENVIRONNEMENT TYPE (`.env.local`) À DÉPLOYER SUR VERCEL

```bash
# 1. Base de données & Auth (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsIn...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsIn...

# 2. Contact & Réglages Fidelix DZ
NEXT_PUBLIC_SUPPORT_PHONE="0541534762"
NEXT_PUBLIC_SUPPORT_EMAIL="kazimehdi34@gmail.com"
NEXT_PUBLIC_BARIDIMOB_RIP="00799999004172668994"

# 3. Certificats Apple Wallet
APPLE_PASS_TYPE_ID=pass.dz.fidelix.card
APPLE_TEAM_ID=XXXXXXXXXX
APPLE_PASS_CERT_BASE64=MIIG... # Certificat .p12 encodé en base64
APPLE_PASS_CERT_PASSWORD=votre_mot_de_passe

# 4. Google Wallet API
GOOGLE_ISSUER_ID=33880000000XXXXXX
GOOGLE_SERVICE_ACCOUNT_EMAIL=fidelix-wallet@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BA..."

# 5. Application URL
NEXT_PUBLIC_APP_URL=https://fidelix.pro/dz
```

Vos coordonnées sont désormais intégrées dans l'ensemble des écrans du projet et prêtes pour la production.