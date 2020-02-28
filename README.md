# Gym Virtual Websitesi

Gym Virtual websitesi uygulaması AdonisJS framework üzerine inşaa edilmiştir. MongodDB ile veri depolaması yapılmaktadır.

## Gereksinimler & Kurulum Adımları

#### Gereksinimler

-   NodeJs (v10.2.0)
-   NPM (v6.4.1)
-   MongoDB (v4.0.3)
-   Adonis CLI (4.0)

#### MongoDB Konfigursayonu

Dosya Yolu:  ***/usr/local/etc/mongod.conf*** (macOS)

```bash
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb
net:
  bindIp: 127.0.0.1
security:
  authorization: enabled
```

#### MongoDB Kullanıcı Oluşturma

```bash
mongo

use gymvirtualdb

db.createUser({
    user   : "gymroot",
	pwd    : "gympass",
	roles  : [
		{
			role     : "readWrite",
			db       : "gymvirtualdb"
		},
		{
			role     : "dbAdmin",
			db       : "gymvirtualdb"
		}
	]
});

exit

brew services restart monodb

mongo -port 27017 -u gymroot -p gympass -authenticationDatabase gymvirtualdb

db.admins.insert({
    "username" : "gymvirtual",
    "password" : "$2a$10$Xl6a9Tdrl9pgtQrOc/b0huH1k11/BNsIRs4vvI2yCeEZJGyND/3/i",
    "roles" : [
        "admin"
    ],
    "created_at" : ISODate("2019-07-04T18:37:53.476+0000"),
    "updated_at" : ISODate("2019-07-04T18:37:53.476+0000"),
    "deleted_at" : null
});
```

#### Kurulum Adımları

```bash
git clone https://gitlab.com/naylalabs/web/gymvirtural-web.git
cd gymvirtual

npm install | yarn install

adonis serve --dev
```

#### Sayfa Listesi

| Sayfa        | View                          | Controller            | URL            |
| ------------ | ----------------------------- | --------------------- | -------------- |
| Mainpage     | views/main.edge               | MainController        |  /             |
| Retos        | view/main/pages/retos/        | RetoController        |  /retos        |
| Nutricions   | view/main/pages/nutricions/   | NutricionController   |  /nutricions   |
| Consultas    | view/main/pages/consultas/    | ConsultaController    |  /consultas    |
| Plannes      | view/main/pages/plannnes/     | PlanController        |  /plannes      |
| Rutinas      | view/main/pages/rutinas/      | RutinaController      |  /rutinas      |
| Aprendizajes | view/main/pages/aprendizajes/ | AprendizajeController |  /aprendizajes |
| Calendarios  | view/main/pages/calendarios/  | CalendarioController  |  /calendarios  |

#### Migration Listesi

Canlı sunucu üzerinde kullanılacak DB bağlantı bilgileri.

-   Veritabanı: **_gymvirtualdb_**
-   Kullanıcı Adı: **_gymroot_**
-   Parola: **_gympass_**

| Migaration | Tablo                    |
| ---------- | ------------------------ |
| nutricion  |  gymvirtualdb.nutricions |
