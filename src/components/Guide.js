import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  h1: {
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    paddingTop: "15px",
  },
}));
const Guide = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="md" component="div">
        <Typography
          className={classes.h1}
          component="h1"
          variant="h3"
          align="center"
        >
          Poradnik konsumenta
        </Typography>
        <div>
          <Typography component="p" variant="h6" color="textPrimary">
            W tym poradniku znajdziesz wszystkie najważniejsze informacje, które
            pomogą ci dokonać wyboru przy zakupie nowego procesora oraz karty
            graficznej.
          </Typography>
        </div>
        <div>
          <Typography
            className={classes.h1}
            component="h2"
            align="center"
            variant="h3"
          >
            Procesory
          </Typography>
          <Typography component="p" variant="h6" color="textPrimary">
            Od dłuższego czasu rynek procesorów zdominowany jest przez dwie
            marki - Intel oraz AMD. Przez większość tego okresu Intel jakością
            swoich produktów był daleko przed swoim konkurentem i uznawany był
            za lepszą markę. Przez ostatnie kilka lat AMD znacznie odrobiło
            zaległości, co więcej niedawno nawet wyprzedziło technologicznie
            Intel i posiada bardziej interesującą ofertę. Oprócz znakomitej
            wydajnośći procesory AMD posiadają znacząco mniejsze zużycie prądu
            co przekłada się na niższe koszty eksploatacji oraz niższe
            temparatury pracy procesora. Dlatego aby pozostać konkurencyjnym
            Intel w ostatnim czasie znacząco obniżył ceny swoich produktów,
            które już od dłuższego czasu skierowane są głównie dla graczy.
          </Typography>
          <div className={classes.accordion}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="p" variant="h5" color="textPrimary">
                  Wybór procesora
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="p" variant="h6" color="textPrimary">
                  Przed zakupem procesora należy zadać sobie pytanie do czego
                  głównie będziemy wykorzystywać nasz komputer. Za najprostszy
                  wskaźnik wyznaczający klasę procesora można uznać liczbę
                  rdzeni, która determinuje jego moc oraz cenę. Z uwagi na
                  zastosowanie można wyodrębnić 3 podstawowe grupy podziału
                  procesorów:
                  <ol>
                    <li>
                      4 rdzenie - Jest to obecnie najniższa liczba rdzeni
                      oferowana przez producentów we współczesnych modelach
                      procesorów. Tego typu urządzenia kosztują maksymalnie
                      ok.700 zł i najlepiej sprawdzają się tam gdzie silny
                      procesor nie jest wymagany. Procesor 4 rdzeniowy świetnie
                      sprawdzi się w biurze czy w domowym komputerze
                      wykorzystywanym do podstawowych czynności. Będzie on
                      również w stanie obsłużyć większość współczesnych gier
                      komputerowych. Reprezentanci tej serii to AMD Ryzen serii
                      3 oraz Intel Core-I3.
                    </li>
                    <li>
                      6-8 rdzeni - Procesory z tak zwanej średniej półki,
                      chociaż ich cena może czasem osiągać nawet 2000zł. Jednak
                      za typowy przedział w zależności od wydajności można uznać
                      od 800 zł do 1600 zł. Zdecydowanie najczęstszy wybór wśród
                      graczy, zapewniający świetną wydajność w grach
                      komputerowych. Warto zaznaczyć, że budowa systemu opartego
                      na procesorze Intela jest przeważnie bardziej kosztowna z
                      uwagi na droższe płyty główne. Reprezentanci tej kategorii
                      to AMD Ryzen serii 5 i 7, Intel Core I5 oraz Intel Core
                      I7.
                    </li>
                    <li>
                      10+ rdzeni - Zastosowań dla takiego procesora jest wiele,
                      jednak biorąc pod uwagę ich bardzo wysoką cenę najlepiej
                      sprawdzą się w zadaniach profesjonalnych jak renderowanie
                      obrazu czy przetwarzanie plików o bardzo dużym rozmiarze.
                      W tej kategorii AMD poczyniło niesamowite postępy i w
                      kwestii wydajności nie ma sobie równych. Tę kategorię
                      można podzielic na dwie mniejsze a tą główną i bardziej
                      dostępna cenowo są procesory bardziej przystosowane do
                      pracy w komputerach osobistych osiagające również
                      niesamowitą wydajność w grach komputerowych. Są to AMD
                      Ryzen serii 9 oraz Intel Core I9, których cena oscyluje od
                      2000 zł do ok. 4000 zł.
                    </li>
                  </ol>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="p" variant="h5" color="textPrimary">
                  Obecna sytuacja na rynku procesorów
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="p" variant="h6" color="textPrimary">
                  Obecna sytuacja na rynku procesorów jest dobra. Zdecydowana
                  większość modeli jest dostępna w sklepach i jest sprzedawna w
                  cenach bliskich do tych sugerowanych przez producentów.
                  Problemy występują głównie w segmencie procesorów 4
                  rdzeniowych po stronie AMD. Przez duże zainteresowanie
                  najnowszymi jednostkami AMD ich dostępność jest słaba a cena
                  mało atrakcyjna. Na ten moment najlepszym wyborem będą
                  procesory Intel Core I3 z 10 lub 11 generacji,lub starsze
                  modele AMD Ryzen 3 z 1 lub 2 generacji.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div>
          <Typography
            className={classes.h1}
            component="h2"
            align="center"
            variant="h3"
          >
            Karty graficzne
          </Typography>
          <Typography component="p" variant="h6" color="textPrimary">
            Karta graficzna w odróżnieniu od procesora jest opcjonalnym
            komponentem a bez niego możliwa jest praca komputera a jak sama
            nazwa wskazuje jej podstawym zadaniem jest generowanie obrazu. Karty
            graficzne dzielą się na dwa typy :
            <ul>
              <li>
                Zintegrowane, czyli takie, które nierozłącznie połączone są z
                procesorem. Oferują minimalną wydajność a korzystanie z nich
                pozwala jedynie na podstawowe czynności wykonywane na
                komputerze.
              </li>
              <li>
                Dedykowane, czyli takie, które są osobnym komponentem komputera.
                Już nawet najtańsze modele oferują wydajność lepszą od kart
                zintegrowanych a zakres ich wykorzystania jest bardzo szeroki.
              </li>
            </ul>
            Rynek dedykowanych kart graficznych jest niestety o wiele bardziej
            skomplikowany od rynku procesorów. Za produkcję chipów do kart
            odpowiadają dwie firmy - AMD oraz Nvidia, jednak rzadko kiedy
            odpowiadają one za produkcję całych kart a produkowane przez nie
            jednostki nazywane są referencyjnymi i mają bardzo ograniczony
            nakład. Przestrzegając specyfikacji wymaganej przez tych dwóch
            producentów do produkcji pozostałej ilości włączone są firmy trzecie
            takie jak MSI, Asus czy Gigabyte, które oferują swoje rozwiązania w
            zakresie wyglądu, układu chłodzenia czy w niewielkim zakresie mocy
            karty. W ten sposób jeden chip produkowany przez Nvidię czy AMD może
            mieć nawet ponad 10 modeli różniących się wyglądem, jakością, ceną i
            wydajnością. Przy wyborze wybranego modelu warto kierować się
            recenzjami, które wskażą najlepiej wykonane modele w swojej
            kategorii.
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography component="p" variant="h5" color="textPrimary">
                Wybór karty graficznej
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="p" variant="h6" color="textPrimary">
                W przypadku kart graficznych niemożliwe jest wskazanie jednej
                konkretnej cechy sprzętowej, która pozwoliłaby na klasyfikację
                sprzętu a jedynym możliwym wyznacznikiem jest po prostu cena.
                Niestety na niekorzyść klienta, w ostatnich latach niezależnie
                od sytuacji na rynku ceny kart idą w górę a z generacji na
                generację przychodzi nam płacić coraz więcej za sprzęt w tej
                samej klasie. Sugerowany podział jest subiektywny i
                odzwierciedla opinię autora:
                <ol>
                  <li>
                    Do 1200 zł - Jest to pułap wejściowy na rynku kart
                    graficznych. Za tą cenę nie dostaniemy niestety za wiele.
                    Oferowane karty posiadają stosunkowo niską wydajność i
                    nadają się do mniej wymagających gier w rozdzielczościach do
                    Full HD. Użytek w pozostałych celach jest niezalecany.
                  </li>
                  <li>
                    Od 1000 do 3000 zł - W tym przedziale cenowym znajdziemy
                    zdecydowaną większość wszystkich dostępnych modeli.
                    Przezaczenie odpowiednio wysokiej kwoty w tych widełkach
                    pozwoli na rozgrywkę w rozdzielczościach do WQHD (1440p) przy
                    zachowaniu wysokiej wydajności. Karty z tego przedziału
                    pozwolą również na średnio obciążające czynności jak różnego
                    rodzaju obliczenia naukowe, symulacje matematyczne czy
                    przetwarzanie obrazu.
                  </li>
                  <li>
                    3000 zł + - Karty z tego przedziału to najwyższa półka,
                    przeznaczone głównie do zastosowań profesjonalnych oraz
                    najbardziej wymagających gier w rozdzielczościach do 4K.
                    Decydując się na zakup karty w tej cenie warto zadać sobie
                    pytanie czy na pewno jej potrzebujemy, jeżeli nie
                    wykorzystujemy karty graficznej do bardzo wymagających zadań
                    odpowiedź prawdopodobnie brzmi "nie".
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography component="p" variant="h5" color="textPrimary">
                Sytuacja na rynku kart graficznych
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="p" variant="h6" color="textPrimary">
                Obecna sytuacja na rynku kart graficznych jest bardzo zła,
                niektórzy uważają, że jest najgorsza w historii. Ponad 90%
                modeli jest niedostępna w wolnej sprzedaży sklepowej a ceny na
                rynku wtórnym przekraczają dwukrotność a nawet trzykrotność
                oryginalnej ceny. Dla przeciętnego klienta planującego zakup w
                rozsądnej cenie jakikolwiek zakup o ile w ogóle istnieje jego
                możliwość jest stanowczo odradzany.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Guide;
