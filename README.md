# ProbaIT-LSAC

O aplicatie web a carei scop este colectarea opinilor din cadrul departementului IT.

## Arhitectura

Aplicatia a fost construita pe stackul MERN.

### Front-end

Front-endul este structurat in 6 componente:

- NavbarMain
- PopupButton
- PopupForm
- HeaderText
- Poll
- FooterMain

#### Navbarmain

Este navbarul paginii. Contine logoul site-ului care este tot o data un buton de "mergi la inceput".
Contine si butoanele de Register si Login, respectiv de Create Poll si Logout si le schimba dinamic in functie de starea utilizatorului (logat sau nelogoat).
Navbarul este sticky, astfel ca utilizatorul poate interactiona cu el oriunde se afla pe pagina.

#### PopupButton

Butoanele de Register si Login, respectiv de Create Poll si Logout sunt componente de acest fel. Primesc drept props numele butonului pe care vrem sa il randeze si in functie de acesta fiecare va avea o functionalitate diferita.
Pentru Logout se sterg informatiile salvate in local storage, iar pentru celelalte se afiseaza un popup corespunzator numelui

#### PopupForm

In functie de PopupButton-ul apasat va aparea o componenta PopupForm pentru a completa formurarul de register, login sau creare de opinatator5000

#### HeaderText

Contine motivatia din spatele aplicatiei si mascota unui programator. Nu e mereu despre cat de repede te misti, ci despre cat de repede si bine gandesti.

#### FooterMain

Locul in care poti afla mai multe despre LSAC

#### Poll

Componenta are rolul de a incarca dinamic opiniatoarele5000 aflate in baza de date si de a oferi functionalitatea de opinare si stergere asupra acestora.

### Back-end

In backend sunt implementate api call-urile care ofera functionalitatea dorita aplicatiei si anume:

- Inregistrarea si logarea utilizatorilor (verificarea credentialelor introduse, validarea emailului acesta acceptand doar adrese de tipul @gmail.com)
- Stocarea credentialelor acesotra intr-un mod sigur intr-o baza de date prin criptarea parolelor
- Verificarea utilizatorilor logati prin generarea jwt-urilor
- Operatii CRUD pe baza de date cu tot cu validarea requesturilor trimise de catre utilizatori si verificarea accesului lor la informatiile stocate (i.e. nu poti modifica opiniatoarele5000 ale altor utilizatori, nu poti vota daca nu esti logat, etc.)

### Design

- Textul de pe header are shadow pentru a putea fi mai lizibil cand fundalul se comprima
- Pollurile se afiseaza pe o singura coloana atunci cand ecranul nu permite 2 coloane
- Navbarul este responsive la dimensiuniile ecranului utilizatorului acesta transformand butoanele intr-un meniu de tip hamburger
- Butoanele de Vote si Delete apar doar la utilizatorii care au acces la aceste functionalitati (i.e. cei logati, respectiv cei care detin poll-ul)
- Elementele care apar (poll-uri, pop-upuri) sunt responsive la schimbarile dimensiunilor view-portului
