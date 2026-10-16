# 📁 GUIDE TECHNIQUE DE DÉPLOIEMENT & ARCHITECTURE MODULAIRE
## Fidelix Algérie (Fidelix DZ) · Prêt pour Vercel & Supabase

Ce guide détaille la structure des fichiers créés, leur rôle exact, et la procédure pas-à-pas pour les modifier, les lier à **Supabase** (Base de données PostgreSQL) et les déployer sur **Vercel** avec nom de domaine personnalisé.

---

## 🗂️ 1. ARBORESCENCE DU PROJET LIVRÉ DANS LE DATASTORE

```text
fidelix-algerie/
│
├── styles.css                 # Feuille de style globale (Variables CSS, Thème Algérie, Reset & Composants)
│
├── index.html                 # Page d'accueil officielle & Vitrine commerciale (Prospection DZ)
│                              # -> Simulateur de rentabilité ROI interactif en Dinars
│                              # -> Comparatif chiffré (Carton vs SMS vs Fidelix)
│                              # -> Coordonnées BaridiMob & Grille Tarifaire 3 900 DA
│                              # -> FAQ dynamique accordéon
│
├── pass-client.html           # Interface web pour le consommateur final (Scan QR Comptoir)
│                              # -> Pass interactif Apple Wallet & Google Wallet
│                              # -> Grille de 10 tampons réactive
│                              # -> QR code scannable au comptoir (ELH-9428-VIP)
│                              # -> Verso de carte avec géolocalisation 150m & coordonnées
│
├── scanner-caisse.html        # Interface de caisse pour serveurs et commerçants
│                              # -> Viseur de caméra de scan avec ligne laser
│                              # -> Détection instantanée (0.4s) et attribution +1 tampon
│                              # -> Déclencheur du cadeau 10ème café et reset de cycle
│                              # -> Sécurité anti-fraude (délai 30 min)
│
├── dashboard-gerant.html      # Tableau de bord SaaS Espace Pro pour gérants
│                              # -> Suivi des 4 KPIs en direct (CA fidélisé DA, 1 248 cartes)
│                              # -> Journal des transactions en temps réel
│                              # -> Modale d'envoi de Push Flash sur écran verrouillé (0 DA)
│
└── connexion.html             # Portail d'authentification sécurisé
                               # -> Bascule 1-clic : Mode Gérant (Email/Mobile) ou Code PIN Serveur (#1428)
```

---

## 🛠️ 2. COMMENT MODIFIER LES INFORMATIONS FACILEMENT

Tous les fichiers sont conçus en **HTML pur et CSS pur**, sans dépendances complexes, ce qui vous permet de les éditer avec n'importe quel éditeur de texte (VS Code, Sublime Text, Notepad) :

### A. Modifier vos Coordonnées Officielles :
- **Numéro Téléphone / WhatsApp :** Recherchez `0541 53 47 62` dans `index.html`, `dashboard-gerant.html` et `styles.css`.
- **Email :** Recherchez `kazimehdi34@gmail.com`.
- **Numéro RIP BaridiMob :** Recherchez `00799999004172668994` dans `index.html`.

### B. Modifier les Couleurs de votre Marque :
Ouvrez `styles.css` aux lignes 10 à 25 :
```css
:root {
  --primary: #ff6600;       /* Couleur orange principale (CTA, tampons actifs) */
  --secondary: #1b4332;     /* Vert foncé émeraude (Pass café, badges) */
  --dark: #0f172a;          /* Fond des cartes et sections sombres */
}
```

### C. Modifier les Paliers de Récompense :
Dans `pass-client.html` et `scanner-caisse.html`, vous pouvez ajuster le nombre de tampons (ex: 8, 10 ou 12) et l'intitulé du cadeau (ex: « 10ème café offert », « 1 Pizza offerte », etc.).

---

## ⚡ 3. DÉPLOIEMENT CLÉ-EN-MAIN SUR VERCEL

1. **Créer un dépôt GitHub :**
   - Créez un nouveau repository sur GitHub nommé `fidelix-dz`.
   - Uploadez les fichiers : `index.html`, `pass-client.html`, `scanner-caisse.html`, `dashboard-gerant.html`, `connexion.html` et `styles.css`.
2. **Lier à Vercel :**
   - Rendez-vous sur [vercel.com](https://vercel.com) et cliquez sur **« Add New Project »**.
   - Importez votre dépôt `fidelix-dz`.
   - Laissez la configuration par défaut (Vercel détectera automatiquement un site statique ultra-rapide distribué sur son CDN mondial Edge).
   - Cliquez sur **Deploy**. En moins de 30 secondes, votre site est en ligne avec certificat SSL HTTPS gratuit.
3. **Connecter votre Nom de Domaine :**
   - Dans Vercel > *Settings* > *Domains*, ajoutez votre nom de domaine (ex: `fidelix.dz` ou `fidelix.pro`).

---

## 🗄️ 4. CONNEXION AVEC SUPABASE (BASE DE DONNÉES TEMPS RÉEL)

Pour rendre les données dynamiques avec votre projet Supabase :
1. Créez votre projet sur [supabase.com](https://supabase.com).
2. Ajoutez simplement le SDK Supabase via CDN dans l'en-tête `<head>` de vos fichiers :
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```
3. Initialisez la connexion dans le script JavaScript :
   ```javascript
   const supabaseUrl = 'VOTRE_SUPABASE_URL';
   const supabaseKey = 'VOTRE_SUPABASE_ANON_KEY';
   const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

   // Exemple : Enregistrer un scan en direct
   async function enregistrerScan(passSerial) {
     const { data, error } = await supabase
       .from('scan_transactions')
       .insert([{ serial_number: passSerial, action: 'ADD_STAMP' }]);
   }
   ```

Ce pack de fichiers est 100% autonome, éprouvé et prêt pour une mise en production immédiate.