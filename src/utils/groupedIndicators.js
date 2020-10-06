// Indicators grouped by topic:
const groupedIndicators = [
  {
    label: "Demographics",
    options: [
      { id: "SP.POP.TOTL", label: "Population, total" },
      { id: "SP.POP.GROW", label: "Population growth (annual %)" },
      {
        id: "SP.DYN.LE00.IN",
        label: "Life expectancy at birth, total (years)",
      },
      { id: "SE.PRM.ENRL", label: "Primary education, pupils" },
    ],
  },
  {
    label: "Economics",
    options: [
      { id: "NY.GDP.MKTP.CD", label: "GDP (current US$)" },

      { id: "NY.GDP.MKTP.KD.ZG", label: "GDP growth (annual %)" },

      { id: "NY.GDP.PCAP.CD", label: "GDP per capita (current US$)" },

      {
        id: "BX.GSR.GNFS.CD",
        label: "Exports of goods and services (BoP, current US$)",
      },

      { id: "BN.CAB.XOKA.GD.ZS", label: "Current account balance (% of GDP)" },
    ],
  },
  {
    label: "Government",
    options: [
      { id: "CC.EST", label: "Control of Corruption: Estimate" },

      {
        id: "BI.EMP.PWRK.PB.ZS",
        label: "Public sector employment as a share of paid employment",
      },

      { id: "MS.MIL.XPND.GD.ZS", label: "Military expenditure (% of GDP)" },
    ],
  },
  {
    label: "Energy",
    options: [
      {
        id: "1.1_ACCESS.ELECTRICITY.TOT",
        label: "Access to electricity (% of total population)",
      },

      {
        id: "1.1_TOTAL.FINAL.ENERGY.CONSUM",
        label: "Total final energy consumption (TFEC)",
      },

      {
        id: "2.1_SHARE.TOTAL.RE.IN.TFEC",
        label: "Renewable energy consumption(% in TFEC)",
      },

      {
        id: "4.1.1_TOTAL.ELECTRICITY.OUTPUT",
        label: "Total electricity output (GWh)",
      },

      {
        id: "4.1.2_REN.ELECTRICITY.OUTPUT",
        label: "Renewable energy electricity output (GWh)",
      },

      {
        id: "4.1_SHARE.RE.IN.ELECTRICITY",
        label: "Renewable electricity (% in total electricity output)",
      },
    ],
  },
  {
    label: "Environment",
    options: [
      {
        id: "EN.ATM.CO2E.PC",
        label: "CO2 emissions (metric tons per capita)",
      },

      { id: "EN.ATM.CO2E.KT", label: "CO2 emissions (kt)" },

      { id: "AG.LND.FRST.ZS", label: "Forest area (% of land area)" },
    ],
  },
];

export default groupedIndicators;
