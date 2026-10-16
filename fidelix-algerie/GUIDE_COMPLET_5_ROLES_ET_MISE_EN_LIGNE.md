# 🇩🇿 GUIDE COMPLET FIDELIX ALGÉRIE (69 WILAYAS)
## Mise en Ligne, Gestion des Abonnements & Tutoriels pour les 5 Rôles

---

## 1. 👑 TUTORIEL POUR VOUS (PROPRIÉTAIRE / SUPER-ADMIN FIDELIX DZ)

### A. Comment mettre votre projet en ligne pour vos clients (15 minutes)
1. **Créer la Base de Données Supabase (Gratuit) :**
   - Créez un compte sur [supabase.com](https://supabase.com) et cliquez sur **New Project** (`fidelix-dz`).
   - Ouvrez **SQL Editor** et exécutez le script SQL de création des tables (`merchants`, `staff_users`, `wallet_passes`, `scan_transactions`).
   - Dans **Project Settings > API**, copiez votre `SUPABASE_URL` et votre clé `SUPABASE_ANON_KEY`.
2. **Héberger votre site gratuitement sur Vercel (HTTPS automatique) :**
   - Créez un compte sur [github.com](https://github.com) et déposez les fichiers de ce pack dans un dépôt `fidelix-dz`.
   - Connectez-vous sur [vercel.com](https://vercel.com), cliquez sur **Add New Project**, sélectionnez votre dépôt `fidelix-dz` et cliquez sur **Deploy**.
   - Dans **Vercel > Settings > Domains**, reliez votre nom de domaine (`fidelix.pro` ou `fidelix.dz`).

### B. Où et comment gérer les abonnements de vos commerçants ?
Vous avez **2 endroits complémentaires** pour gérer les abonnements (3 900 DA/mois ou 32 500 DA/an) :
1. **Depuis votre Console Web Super-Admin (Module 9 `👑 Admin Abonnements`) :**
   - Le commerçant s'inscrit sur le site en choisissant sa Wilaya parmi les **69 Wilayas (01 Adrar à 69 El Abiodh Sidi Cheikh)**. Il bénéficie de **30 jours d'essai gratuit** (`status = 'trial'`).
   - Pour passer en abonnement payant, il effectue un virement sur votre **RIP BaridiMob (`00799999004172668994`)** ou par CCP/CIB et vous envoie le reçu sur votre WhatsApp (`0541 53 47 62`) ou email (`kazimehdi34@gmail.com`).
   - Dans l'onglet **9. 👑 Admin Abonnements**, cliquez sur **« ✓ +1 Mois (3 900 DA) »** ou **« ★ +1 An (32 500 DA) »** : son statut passe en `Actif Payé`, sa date d'expiration est prolongée automatiquement et sa facture fiscale (TVA 19%) est émise.
   - Si un commerçant ne renouvelle pas à l'échéance, cliquez sur **« Suspendre »** : son Dashboard et son Scanner Caisse sont verrouillés jusqu'au paiement, mais les cartes et tampons de ses clients restent intégralement sauvegardés.
2. **Directement dans Supabase (`Table Editor > merchants`) :**
   - Vous pouvez aussi modifier la colonne `subscription_status` (`trial`, `active`, `suspended`) et `subscription_ends_at` en 1 clic depuis l'interface Supabase.

---

## 2. 👔 TUTORIEL POUR LE GÉRANT / COMMERÇANT
1. **Inscription & Configuration (3 minutes) :** Choisissez votre Wilaya (01 à 69), le nom de votre commerce et votre palier (ex: *10 tampons = 10ème Café Offert*).
2. **Personnalisation & Impression du Kit QR A5 :** Dans le **Studio Wallet (Onglet 4)**, personnalisez la couleur et l'icône de votre carte, cliquez sur **« Publier en direct »**, puis téléchargez et imprimez votre **Chevalet QR Comptoir A5**.
3. **Création des Codes PIN Serveurs :** Dans **Dashboard > Équipe & Codes PIN**, créez un code à 4 chiffres par employé (ex: Mehdi `#1428`, Samy `#8831`). Le bouclier anti-fraude empêche automatiquement de tamponner deux fois la même carte en moins de 30 minutes.
4. **Campagnes Push Flash (0 DA) :** Dans **Push Flash (Onglet 5)**, envoyez des offres instantanées sur l'écran verrouillé de vos clients (ex: *Offre Goûter Express 14h-17h*) sans payer aucun SMS.

---

## 3. 🔢 TUTORIEL POUR LE SERVEUR / CAISSIER
1. **Connexion rapide en caisse :** Ouvrez l'écran Connexion sur le smartphone ou la tablette de caisse, choisissez **Serveur (Code PIN)** et tapez votre code à 4 chiffres (ex: `1428`).
2. **Ajouter +1 tampon (0,4 seconde) :** Scannez le QR code présenté par le client sur son téléphone et appuyez sur **« ☕ Valider +1 Tampon »**. Un bip sonore confirme l'ajout.
3. **Débloquer la récompense (10/10) :** Lorsque le 10ème tampon est atteint, un écran doré **« 🎉 Palier Atteint en Caisse ! »** apparaît. Remettez la boisson offerte au client et appuyez sur **« Valider la Remise du Cadeau & Réinitialiser à 0/10 »**.
4. **En cas de coupure 4G :** Activez le bouton **Mode Hors-Ligne**. Les scans sont enregistrés localement et synchronisés dès le retour d'Internet.

---

## 4. 📱 TUTORIEL POUR LE CLIENT FINAL (CONSOMMATEUR)
1. **Zéro application à installer :** Scannez le QR code posé sur le comptoir du commerce avec l'appareil photo de votre iPhone ou Android.
2. **Ajout en 1 clic avec 1er tampon offert :** Entrez votre prénom et votre numéro mobile (`05 / 06 / 07`), puis appuyez sur **« Ajouter à Apple Wallet »** (iPhone) ou **« Ajouter à Google Wallet »** (Android). Votre carte apparaît avec le **1er tampon déjà validé**.
3. **Utilisation automatique :** Quand vous passez à moins de 150 mètres du commerce, la carte s'affiche toute seule sur votre écran verrouillé. Montrez-la au serveur à chaque passage.

---

## 5. 🌐 TUTORIEL POUR LE VISITEUR / PROSPECT COMMERÇANT
1. **Démonstration en direct :** Sur la page d'accueil, testez le bouton **« +1 Tampon (Démo) »** et **« Tester Push GPS »** sur le smartphone interactif.
2. **Simulation de rentabilité en Dinars :** Réglez les 3 curseurs du **Calculateur ROI** (clients/jour, ticket moyen en DA, hausse des revisites) pour calculer votre gain net mensuel.
3. **Essai gratuit 30 jours :** Cliquez sur **« Démarrer 30 jours offerts »**, sélectionnez votre Wilaya parmi les **69 Wilayas d'Algérie** et lancez immédiatement votre programme.
