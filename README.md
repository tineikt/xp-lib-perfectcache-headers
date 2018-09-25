# xp-lib-pck


## Setting up reference to this lib in your own project
1. Add lib as a dependency to your **build.gradle** file
```
dependencies {
	include 'com.github.tineikt:xp-lib-pck'
}
```

2. Add response filter to your `site.xml`
```xml
<site>
	...
	<filters>
		<response-filter name="perfect-cache" order="10"/>
	</filters>
</site>
```

## Usage
Require it in your JavaScript code.

```javascript
import { pck } from '/lib/tineikt/perfect-cache-keys';
```

Create a new perfect cache key object.
```javascript
const cacheHeaders = new pck(name);
```
`name` should be something unique for the complete request. If used in a part we could use the path to the component.

We can then populate this cache by adding relations to it in our controller.
```javascript
cacheHeaders.add(content._id);
cacheHeaders.add(content.data.conRelatedContents);
```

Then all we have to do is make sure we return the headers in the response.

```javascript
const headers = cacheHeaders.getHeader();
return {
	headers,
	body: freemarker.render(viewFile, model)
};
```

## Methods

### getProductData(productId, lang)

**productId** *(string | number)* product id of product in Riversand

**lang (optional)** *(string)* language of response, available values are **nb (default)** and **en**

**NOTE:** English language support is only partially supported in Riversand, so alot of attributes may be filtered out since they are missing or not-translated in Riversand

### Usage
```javascript
riversand.getProductData(4152);
riversand.getProductData(4152, 'en');
```

## Returns
```json
{
	"itemId": "4152",
	"values": {
		"Coop_Nummer": "5763958",
		"Dager_Disp_Detaljist": "38",
		"Dager_Disp_Grossist": "0",
		"Dager_Disp_TINE": "75",
		"Detaljert_Produktbeskrivelse": "YT er en serie treningsmat og -drikke utviklet av TINE i samarbeid med ernæringsfysiologer ved Toppidrettssenteret. YT Sportsdrikk gir deg påfyll av væske, karbohydrater og elektrolytter som bidrar til å opprettholde energi og væskebalanse under lange og harde treningsøkter. Den finnes i to smaker: sitrus og appelsin.",
		"Ingredienser": "vann, sukrose, maltodekstrin, naturlig aroma, surhetsregulerende middel (sitronsyre, trinatriumsitrat), stabilisator (pektin), natriumklorid, konserveringsmiddel (kaliumsorbat), mineraler (kalium, kalsium, magnesium)",
		"M3_Artikkelgruppe": "3080",
		"M3_Artikkelnr": "4152",
		"M3_Artikkeltype": "300",
		"M3_Beskrivelse": "YT Sportsdr Sitrus 1/2l",
		"M3_EAN_Dpak": "7038010415210",
		"M3_EAN_Fpak": "7038010041525",
		"M3_EAN_Tpak": "7038011415219",
		"M3_Grunnpris": "17,21",
		"M3_Navn": "1/2 L  YT SPORTSDR.SITRUS",
		"Maal_Antall_Dpak_pr_Tpak": "72",
		"Maal_Antall_Fpak_i_bredde_pr_Dpak": "3",
		"Maal_Antall_Fpak_i_dybde_pr_Dpak": "4",
		"Maal_Antall_Fpak_i_hoyde_pr_Dpak": "1",
		"Maal_Antall_Fpak_pr_Dpak": "12",
		"Maal_Bredde_Dpak": "20,2",
		"Maal_Bredde_Fpak": "6,5",
		"Maal_Bredde_Tpak": "80",
		"Maal_Bruttovekt_Dpak": "6,61",
		"Maal_Bruttovekt_Fpak": "0,551",
		"Maal_Bruttovekt_Tpak": "495,92",
		"Maal_Dybde_Dpak": "27",
		"Maal_Dybde_Fpak": "6,5",
		"Maal_Dybde_Tpak": "120",
		"Maal_Hoyde_Dpak": "23,3",
		"Maal_Hoyde_Fpak": "23",
		"Maal_Hoyde_Tpak": "108,2",
		"Maal_Nettovekt_Dpak": "6,096",
		"Maal_Nettovekt_Fpak": "0,508",
		"Maal_Nettovekt_Tpak": "438,912",
		"Maal_Pakketype_Dpak": "CS,KASSE, ESKE",
		"Maal_Pakketype_Fpak": "BO,FLASKE, PLASTFLASKE",
		"Maal_Pakketype_Tpak": "201,ISO 1 - 1/1 EURO pall med dim. 80 x 120 cm",
		"Marked_Datostemplet": "Ja",
		"Marked_Emballasje": "1/2 liter, flaske",
		"Marked_Ingredienser": "vann, sukrose, maltodekstrin, naturlig aroma, surhetsregulerende middel (sitronsyre, trinatriumsitrat), stabilisator (pektin), natriumklorid, konserveringsmiddel (kaliumsorbat), mineraler (kalium, kalsium, magnesium)",
		"Marked_Lignende_Artikler": "4146",
		"Marked_Nyhet_Til_Dato": "09.02.2012",
		"Marked_Oppbevaring": "Kan uåpnet oppbevares ved romtemperatur.",
		"Marked_Samlet_Varenavn": "YT Sportsdrikk Sitrus",
		"Merkevare": "110,YT",
		"Naeringsinnhold_100g": "energi 102 kJ (24  kcal), fett 0 g, -hvorav  mettede fettsyrer 0 g, karbohydrat 6,0 g, -hvorav  sukkerarter 4,0 g, protein 0 g, salt 0,2 g",
		"Navn": "YT® Sportsdrikk Sitrus 1/2 liter",
		"PS_Fremstempling": "120",
		"PS_Holdbarhet_total": "113",
		"PS_Kontrolltid": "7",
		"ProdSpes_Blomsten": "Nei",
		"ProdSpes_Debio": "Nei",
		"ProdSpes_EU_okologi": "Nei",
		"ProdSpes_Energy_Star": "Nei",
		"ProdSpes_FSC": "Nei",
		"ProdSpes_Fairtrade": "Nei",
		"ProdSpes_Krav": "Nei",
		"ProdSpes_MSC": "Nei",
		"ProdSpes_Naering_Kommentar": "Salt er beregnet ved følgende formel: Salt = Natrium x 2,5",
		"ProdSpes_Naering_tabell": "<tabledata> <nutrients> <name>YT Sportsdrikk med sitrussmak</name>  <nutrient name=\"energi\"> 102 kJ (24 kcal) </nutrient>  <nutrient name=\"fett\"> 0 g </nutrient>  <nutrient name=\"-hvorav mettede fettsyrer\"> 0 g </nutrient>  <nutrient name=\"karbohydrat\"> 6,0 g </nutrient>  <nutrient name=\"-hvorav sukkerarter\"> 4,0 g </nutrient>  <nutrient name=\"protein\"> 0 g </nutrient>  <nutrient name=\"salt\"> 0,2 g flaske energi 510 kJ (120 kcal) </nutrient>  <nutrient name=\"fett\"> 0 g </nutrient>  <nutrient name=\"-hvorav mettede fettsyrer\"> 0 g </nutrient>  <nutrient name=\"karbohydrat\"> 30 g </nutrient>  <nutrient name=\"-hvorav sukkerarter\"> 20 g </nutrient>  <nutrient name=\"protein\"> 0 g </nutrient>  <nutrient name=\"salt\"> 1 g </nutrient>  </nutrients> </tabledata>",
		"ProdSpes_Navn": "YT Sportsdrikk med sitrussmak",
		"ProdSpes_Nokkelhullet": "Nei",
		"ProdSpes_Nyt_Norge": "Nei",
		"ProdSpes_Pant": "Ja",
		"ProdSpes_Svanen": "Nei",
		"ProdSpes_TCO": "Nei",
		"Prodspes_Nr": "P1851",
		"Produktbeskrivelse": "YT® Sportsdrikk er en blanding av vann, karbohydrater og elektrolytter som hjelper deg å opprettholde intensiteten på treningsøkten. Væsken rehydrerer, karbohydratene gir næring til musklene, mens elektrolyttene bidrar til å gjenopprette væskebalansen. Den gode kombinasjonen av karbohydrater og salter bidrar i tillegg til at væsken raskere tas opp i kroppen. YT® Sportsdrikk kommer i friske smaker som er lette å drikke.",
		"Salgskatalog_nivaa1": "S1_020,Sportsdrikk",
		"Soekeord": "YT Sportsdrikk Sitrus trening ernæring kosthold",
		"Status": "20",
		"TS_ENVA_varegruppe_Dpak": "3069,SPORT/ENERGIDRIKKER FLYTENDE",
		"TS_EPD_varenr": "2525194",
		"TS_Egenskaper": "1/2L",
		"TS_GLN": "7080000366668,TINE SA",
		"TS_Genmodifisert": "Nei",
		"TS_Pantekode_Fpak": "7070456000018,1,00",
		"TS_Produktnavn": "YT SPORTSDRIKK SITRUS",
		"TS_Temp_max": "4",
		"TS_Temp_min": "0",
		"TS_Temperaturkrav": "Ja",
		"TS_Varemerketekst": "TINE"
	}
}
```
