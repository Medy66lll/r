# Architecture Full-Stack & Spécifications Techniques · Fidelix Algérie (Fidelix DZ)

Ce document constitue la documentation technique complète pour le déploiement full-stack de la plateforme **Fidelix Algérie** (système de cartes de fidélité dématérialisées pour **Apple Wallet** et **Google Wallet** sans application mobile pour les clients, avec back-office web et scanner pour commerçants).

---

## 1. Vue d'Ensemble de l'Architecture Système

```
                                      +---------------------------------------------+
                                      |          Clients Finaux (Consommateurs)     |
                                      |   - Safari iOS (Apple Wallet .pkpass)       |
                                      |   - Chrome Android (Google Wallet JWT API)  |
                                      +---------------------------------------------+
                                                             |
                                           [Scan QR Comptoir / Web Join]
                                                             v
+-------------------------------+             +---------------------------------------------+
|    Serveurs & Commerçants     |             |             API Gateway / Edge              |
|  - App Web PWA Commerçant     | ----------> |  - Nginx / Cloudflare (SSL, Rate Limiting)  |
|  - Scanner QR Caméra (Caisse) | (HTTPS/WSS) |  - Next.js 14 App Router (BFF & SSR)        |
+-------------------------------+             +---------------------------------------------+
                                                             |
                                      +---------------------------------------------+
                                      |         Backend Core API (Node.js / Go)      |
                                      |  - Auth & RBAC (Gérant, Serveur avec PIN)   |
                                      |  - Moteur de fidélité (Tampons & Récompenses)|
                                      |  - Générateur Apple Wallet (.pkpass)        |
                                      |  - Client Google Wallet REST API            |
                                      |  - Gestionnaire de Campagnes Push APNs/FCM  |
                                      |  - Facturation DZ (BaridiMob, CIB, Reçus)   |
                                      +---------------------------------------------+
                                           |                 |                |
                       +-------------------+                 |                +--------------------+
                       v                                     v                                     v
         +--------------------------+          +---------------------------+         +--------------------------+
         |    PostgreSQL 16 (OLTP)  |          |   Redis 7 (Cache & Queue) |         |   Stockage S3 / MinIO    |
         |  - Commerces & Employés  |          |  - Sessions & Cache caisse|         |  - Certificats Apple P12 |
         |  - Clients & Passes      |          |  - Queue de Push BullMQ   |         |  - Logos & Icônes Pass   |
         |  - Scans & Transactions  |          |  - Rate-limit anti-fraude |         |  - Factures PDF générées |
         +--------------------------+          +---------------------------+         +--------------------------+
```

---

## 2. Stack Technologique Recommandée

| Composant | Technologie | Justification |
| :--- | :--- | :--- |
| **Frontend / PWA** | Next.js 14, React 19, TailwindCSS, Lucide | PWA installable sur smartphones Android/iOS des serveurs, offline-ready pour caisse. |
| **Backend API** | Node.js (NestJS ou Fastify) ou Go (Golang) | Gestion asynchrone des flux de scans QR à haute fréquence et intégration Apple/Google. |
| **Base de Données** | PostgreSQL 16 + Prisma ORM | Intégrité relationnelle stricte (transactions financières, historique d'audit conforme loi DZ). |
| **Cache & Files d'attente** | Redis 7 + BullMQ | Gestion des envois massifs de notifications Push Flash et verrouillage anti-double scan. |
| **Génération Passes Apple** | Node-passbook / OpenSSL | Signature cryptographique PKCS#7 des manifestes `.pkpass` avec certificat Apple Developer. |
| **Passes Google** | `@google-cloud/wallet` | Génération de JWT signés via Service Account Google Cloud Wallet API. |
| **Passerelle Push** | APNs HTTP/2 (Apple) & Firebase Cloud Messaging (Google) | Réveil instantané de la carte sur l'écran de verrouillage du client sans SMS. |
| **Paiements Algérie** | Passerelle SATIM / CIB Web + Intégration Reçus BaridiMob | Rapprochement automatisé des virements CCP et transactions CIB locales. |

---

## 3. Schéma de Base de Données Relationnelle (PostgreSQL)

```sql
-- 1. Table des Établissements (Commerces Algérie)
CREATE TABLE merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name VARCHAR(150) NOT NULL,
    trade_name VARCHAR(150) NOT NULL, -- Ex: "Café El Hamma"
    slug VARCHAR(80) UNIQUE NOT NULL,
    nif VARCHAR(30),
    nis VARCHAR(30),
    rc_number VARCHAR(50),
    address_line TEXT,
    wilaya_code INT NOT NULL, -- 16 pour Alger
    phone_number VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),
    plan_tier VARCHAR(30) DEFAULT 'STARTER_DZ', -- 3900 DA / mois
    subscription_status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Configuration du Programme de Fidélité
CREATE TABLE loyalty_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    mechanic_type VARCHAR(30) DEFAULT 'STAMPS', -- 'STAMPS' ou 'POINTS'
    max_stamps_required INT DEFAULT 10,
    reward_title VARCHAR(150) NOT NULL, -- "1 Boisson chaude au choix"
    reward_commercial_value_da NUMERIC(10,2) DEFAULT 250.00,
    terms_conditions TEXT,
    primary_color VARCHAR(7) DEFAULT '#1b4332',
    accent_color VARCHAR(7) DEFAULT '#ff6600',
    logo_url TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. Utilisateurs & Personnel de Caisse (RBAC & Sécurité PIN)
CREATE TABLE staff_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'ADMIN', 'MANAGER', 'SERVER'
    email VARCHAR(150) UNIQUE,
    password_hash VARCHAR(255),
    pos_pin_code VARCHAR(4), -- Code PIN 4 chiffres pour le mode caisse rapide
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- 4. Clients Porteurs de Carte (Apple & Google Wallet)
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    phone_number VARCHAR(20), -- Format DZ "+213..."
    first_name VARCHAR(80),
    vip_status VARCHAR(20) DEFAULT 'STANDARD', -- 'STANDARD', 'VIP_GOLD'
    total_visits INT DEFAULT 0,
    total_spent_da NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Passes Wallet Dématérialisés
CREATE TABLE wallet_passes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    pass_type VARCHAR(20) NOT NULL, -- 'APPLE_WALLET' ou 'GOOGLE_WALLET'
    serial_number VARCHAR(100) UNIQUE NOT NULL, -- Identifiant unique scanné en caisse
    current_stamps INT DEFAULT 1,
    rewards_available INT DEFAULT 0,
    push_token TEXT, -- Token APNs ou Push Service Google
    device_library_id VARCHAR(100),
    auth_token VARCHAR(100) NOT NULL, -- Token sécurisé pour endpoints Apple REST
    is_installed BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Journal des Scans & Audit Caisse (Anti-Fraude)
CREATE TABLE scan_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id),
    wallet_pass_id UUID REFERENCES wallet_passes(id),
    staff_user_id UUID REFERENCES staff_users(id),
    action_type VARCHAR(30) NOT NULL, -- 'STAMP_ADDED', 'REWARD_CLAIMED', 'MANUAL_CREDIT'
    stamps_delta INT NOT NULL,
    purchase_amount_da NUMERIC(10,2),
    caisse_device_label VARCHAR(50), -- "Caisse #01"
    note TEXT,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Campagnes Push Flash
CREATE TABLE push_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id),
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    target_segment VARCHAR(50) DEFAULT 'ALL', -- 'ALL', 'INACTIVE_15D', 'CLOSE_TO_REWARD'
    total_recipients INT DEFAULT 0,
    delivered_count INT DEFAULT 0,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. Endpoints d'API Clés (REST & Apple Wallet Protocol)

### A. Protocole Officiel Apple Wallet (RFC / Apple Specification)
Les serveurs Fidelix doivent implémenter les 5 routes standards définies par Apple :
1. `POST /v1/devices/{deviceLibraryIdentifier}/registrations/{passTypeIdentifier}/{serialNumber}`
   - Enregistre l'appareil iOS et sauvegarde son pushToken pour envoyer des notifications lockscreen.
2. `GET /v1/devices/{deviceLibraryIdentifier}/registrations/{passTypeIdentifier}`
   - Liste les passes modifiés depuis une certaine date (`passesUpdatedSince`).
3. `GET /v1/passes/{passTypeIdentifier}/{serialNumber}`
   - Renvoie le bundle `.pkpass` mis à jour (avec le nouveau nombre de tampons) avec en-tête `If-Modified-Since`.
4. `DELETE /v1/devices/{deviceLibraryIdentifier}/registrations/{passTypeIdentifier}/{serialNumber}`
   - Détection de la suppression de la carte par l'utilisateur.
5. `POST /v1/log`
   - Reçoit les journaux d'erreurs éventuels provenant d'iOS Wallet.

### B. API Caisse & Scanner Serveur
1. `POST /api/v1/pos/scan`
   - **Payload** : `{ serialNumber: "ELH-9428-VIP", staffPin: "1428", action: "ADD_STAMP", amountDa: 250 }`
   - **Action** : 
     - Incrémente `current_stamps`.
     - Si `current_stamps == 10`, déclenche `rewards_available += 1` et reset le cycle.
     - Envoie immédiatement un silent push APNs / FCM pour actualiser la carte du client en direct.
   - **Réponse** : `{ success: true, customer: "Amine Benali", stamps: 9, maxStamps: 10, isReward: false }`
2. `POST /api/v1/pos/claim-reward`
   - Décrémente la récompense disponible et consigne l'opération dans le journal d'audit.

### C. API Campagnes Push Flash
1. `POST /api/v1/campaigns/send`
   - **Payload** : `{ title: "Pause café à Alger !", message: "1 pâtisserie achetée = 1 café offert", segment: "ALL" }`
   - **Traitement** : Ajout à la file Redis BullMQ pour traitement par lots (1 000 notifications / seconde sans bloquer le serveur web).

---

## 5. Intégrations Spécifiques au Marché Algérien

1. **Numérotation Téléphonique DZ** : Validation normalisée E.164 (`+213 (5|6|7)XX XX XX XX`) avec fallback par OTP SMS ou lien WhatsApp instantané.
2. **Facturation & Régularisation Fiscale** :
   - Génération automatisée des factures PDF avec mentions obligatoires (NIF, NIS, N° Registre de Commerce, TVA 19%).
   - Réconciliation des reçus BaridiMob via numéro d'opération CCP / RIP algérien.
3. **Protection des Données (Loi DZ 18-07)** :
   - Consentement explicite lors du scan comptoir.
   - Chiffrement AES-256 des numéros de téléphone et anonymisation sur demande.

---

## 6. Guide de Déploiement Cloud (Docker & Kubernetes / VPS)

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    image: fidelix-dz-core:latest
    restart: always
    environment:
      - DATABASE_URL=postgresql://fidelix_user:${DB_PASSWORD}@postgres:5432/fidelix_db
      - REDIS_URL=redis://redis:6379
      - APPLE_PASS_TYPE_ID=pass.dz.fidelix.card
      - APPLE_TEAM_ID=${APPLE_TEAM_ID}
      - GOOGLE_WALLET_ISSUER_ID=${GOOGLE_ISSUER_ID}
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=fidelix_db
      - POSTGRES_USER=fidelix_user
      - POSTGRES_PASSWORD=${DB_PASSWORD}

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

Ce socle technique est prêt pour une mise en œuvre industrielle par votre équipe d'ingénierie logicielle.