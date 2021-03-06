To navigate the API:

List of indicators:
https://api.worldbank.org/v2/indicator?format=json

List of countries:
https://api.worldbank.org/v2/country?format=json

List of regions:
https://api.worldbank.org/v2/region?format=json

Info about the indicator(add --> its id at the end):
https://api.worldbank.org/v2/indicator/NY.GDP.MKTP.CD?format=json

Data of all countries for a given indicator (add --> "country/all" just after "v2/"):
https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json

Data of a specific indicator and a specific country (change "all" to the id of the country):
https://api.worldbank.org/v2/country/chn/indicator/SP.POP.TOTL?format=json

Data of a specific indicator and several specific countries (where "all" was written, delete it and write all the ids of the countries you want separated by commas):
https://api.worldbank.org/v2/country/chn;bra/indicator/DPANUSSPB?format=json
More countries can be added by writing more semicolons(;) and the corresponding ISO 3 code for the chosen country. The link presents arrays of data for each country for the chosen indicator concatenated. Personally, I don't like how data is organized for this request.
Note: if data for a country doesn't appear, it may be because there's no data to show for that country given your specifications.

Data of all countries for a given indicator, but only for a specific date (add --> "&date=" + dateYouWant):
https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&date=2003

For some indicators, there's also data by month, in such a case, add --> "&date=" + dateYouWant + "M" + monthNumber:
https://api.worldbank.org/v2/country/chn;bra/indicator/DPANUSSPB?date=2012M01