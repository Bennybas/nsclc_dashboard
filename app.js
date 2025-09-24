// Enhanced Chryselys NSCLC Healthcare Intelligence Platform JavaScript
class EnhancedChryselsysDashboard {
  constructor() {
    this.currentTheme = 'light';
    this.currentSection = 'patient-analysis';
    this.charts = {};
    this.dashboardData = null;
    
    // Chryselys Brand Color Palette
    this.colors = {
      bronze: '#c98b27',
      ateneoBlue: '#004567',
      paleCerulean: '#9bc0e2',
      weldonBlue: '#8295ae',
      // Distinct colors for pie charts to ensure differentiation
      pieChart: {
        primary: '#c98b27',    // Vibrant red
        secondary: '#3498DB',  // Bright blue
        tertiary: '#004567'    // Fresh green
      },
      chartColors: ['#c98b27', '#004567', '#9bc0e2', '#8295ae', '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
      sources: {
        iqvia: '#9bc0e2',
        healthverity: '#004567',
        komodo: '#c98b27'
      }
    };

    this.init();
  }

  async init() {
    try {
      await this.loadEnhancedData();
      this.setupEventListeners();
      this.setupThemeToggle();
      
      // Initialize with landing page
      this.showLandingPage();
      
      console.log('✅ Enhanced Chryselys Dashboard initialized successfully');
    } catch (error) {
      console.error('❌ Dashboard initialization error:', error);
      this.initializeFallbackData();
      this.showLandingPage();
    }
  }

  async loadEnhancedData() {
    // Force using internal static data only; do not fetch external sources
    this.initializeFallbackData();
  }

  initializeFallbackData() {
    this.dashboardData = {
      hcp_hco_metrics: {
        // Using Dx claims for Fill Rate & Anomaly charts
        hcp_fill_anomaly: {
          // Fill rate % for Referring vs Rendering HCPs
          referring: { iqvia: 40.23, healthverity: 24.4, komodo: 12.54 },
          rendering: { iqvia: 90.28, healthverity: 64.96, komodo: 79.56 },
          // Anomaly %: HCP role showing HCO classification (ref/rendering identified_as_hco)
          anomalies: {
            referring: { iqvia: 0.76, healthverity: 1.17, komodo: 0.08 },
            rendering: { iqvia: 2.98, healthverity: 6.32, komodo: 0.0 }
          }
        },
        hco_fill_anomaly: {
          // Fill rate % for Billing vs Facility HCOs
          billing: { iqvia: 72.64, healthverity: 60.78, komodo: 87.63 },
          facility: { iqvia: 18.56, healthverity: 16.65, komodo: 0.48 },
          // Anomaly %: HCO role showing HCP classification (billing/facility identified_as_hcp)
          anomalies: {
            billing: { iqvia: 26.03, healthverity: 59.86, komodo: 25.81 },
            facility: { iqvia: 15.65, healthverity: 19.4, komodo: 12.95 }
          }
        },
        // Top Rendering Specialties by patient count – combined list across sources
        top_rendering_specialties: [
          { name: 'INTERNAL MEDICINE', iqvia: 556229, healthverity: 784255, komodo: 890182 },
          { name: 'RADIOLOGY', iqvia: 440994, healthverity: 657961, komodo: 739941 },
          { name: 'NURSE PRACTITIONER', iqvia: 286344, healthverity: 387988, komodo: 474340 },
          { name: 'PATHOLOGY', iqvia: 238719, healthverity: 360088, komodo: 475247 },
          { name: 'FAMILY MEDICINE', iqvia: 206223, healthverity: 317221, komodo: 355428 },
          { name: 'PHYSICIAN ASSISTANT', iqvia: 137489, healthverity: 206215, komodo: 275588 },
          { name: 'HOSPITALIST', iqvia: 108407, healthverity: 179594, komodo: 222078 },
          { name: 'SURGERY', iqvia: 95387, healthverity: 150132, komodo: 182390 },
          { name: 'ANESTHESIOLOGY', iqvia: 94889, healthverity: 115148, komodo: 213572 },
          { name: 'THORACIC SURGERY', iqvia: 91643, healthverity: 230367, komodo: 265510 }
        ],
        // Top Referring Specialties by patient count
        top_referring_specialties: [
          { name: 'INTERNAL MEDICINE', iqvia: 526393, healthverity: 651754, komodo: 687968 },
          { name: 'FAMILY MEDICINE', iqvia: 208377, healthverity: 245619, komodo: 229521 },
          { name: 'NURSE PRACTITIONER', iqvia: 188992, healthverity: 205843, komodo: 202362 },
          { name: 'RADIOLOGY', iqvia: 196108, healthverity: 182950, komodo: 178030 },
          { name: 'THORACIC SURGERY', iqvia: 87510, healthverity: 148833, komodo: 166993 },
          { name: 'EMERGENCY MEDICINE', iqvia: 114413, healthverity: 120914, komodo: 113885 },
          { name: 'PHYSICIAN ASSISTANT', iqvia: 94953, healthverity: 105811, komodo: 113116 },
          { name: 'HOSPITALIST', iqvia: 83118, healthverity: 80897, komodo: 81642 },
          { name: 'SURGERY', iqvia: 79160, healthverity: 74850, komodo: 89677 },
          { name: 'PATHOLOGY', iqvia: 47111, healthverity: 51110, komodo: 53602 }
        ],
        // Top Prescriber Specialties (paid only) by patient count
        top_prescriber_specialties: [
          { name: 'INTERNAL MEDICINE', iqvia: 83036, healthverity: 102956, komodo: 97688 },
          { name: 'NURSE PRACTITIONER', iqvia: 15301, healthverity: 19225, komodo: 19912 },
          { name: 'PHYSICIAN ASSISTANT', iqvia: 5605, healthverity: 7332, komodo: 7488 },
          { name: 'SPECIALIST', iqvia: 2076, healthverity: 2291, komodo: 1928 },
          { name: 'STUDENT IN TRAINING', iqvia: 553, healthverity: 728, komodo: 820 },
          { name: 'CLINICAL NURSE SPECIALIST', iqvia: 356, healthverity: 647, komodo: 426 },
          { name: 'FAMILY MEDICINE', iqvia: 347, healthverity: 1501, komodo: 0 },
          { name: 'OPHTHALMOLOGY', iqvia: 272, healthverity: 926, komodo: 423 },
          { name: 'PSYCHIATRY & NEUROLOGY', iqvia: 187, healthverity: 501, komodo: 311 },
          { name: 'GENERAL PRACTICE', iqvia: 52, healthverity: 174, komodo: 611 }
        ],
        // Top Billing NPIs by patient count (union across sources)
        top_billing_npis: [
          { npi: '1013973866', iqvia: 47272, healthverity: 61668, komodo: 65433 }, // CARIS MPI INC
          { npi: '1447437355', iqvia: 50814, healthverity: 50814, komodo: 65308 }, // NEOGENOMICS
          { npi: '1811944101', iqvia: 17549, healthverity: 18960, komodo: 18362 }, // TEXAS ONCOLOGY PA
          { npi: '1780653618', iqvia: 12382, healthverity: 12778, komodo: 15306 }, // H LEE MOFFITT
          { npi: '1720688054', iqvia: 11698, healthverity: 9283, komodo: 12311 }, // FOUNDATION MEDICINE INC
          { npi: '1679525919', iqvia: 11549, healthverity: 15365, komodo: 18440 }, // CLEVELAND CLINIC FOUNDATION
          { npi: '1760590962', iqvia: 10266, healthverity: 11876, komodo: 40372 }, // FL CANCER SPEC RI
          { npi: '1184045619', iqvia: 0, healthverity: 18699, komodo: 26451 }, // GUARDANT HEALTH
          { npi: '1932145778', iqvia: 4857, healthverity: 8219, komodo: 10236 }, // QUEST INCORPORATED
          { npi: '1891731626', iqvia: 6358, healthverity: 4270, komodo: 9929 } // QUEST CLINICAL LABS
        ],
        // Top Facility NPIs by patient count (union across sources)
        top_facility_npis: [
          { npi: '1447437355', iqvia: 26820, healthverity: 47610, komodo: 0 }, // NEOGENOMICS
          { npi: '1811944101', iqvia: 11586, healthverity: 9899, komodo: 3407 }, // TEXAS ONCOLOGY PA
          { npi: '1780653618', iqvia: 7942, healthverity: 11880, komodo: 0 }, // MOFFITT HOSPITAL INC
          { npi: '1679525919', iqvia: 4612, healthverity: 7993, komodo: 0 }, // CLEVELAND CLINIC
          { npi: '1720688054', iqvia: 4740, healthverity: 5609, komodo: 0 }, // TEMPUS/FOUNDATION entries
          { npi: '1740733708', iqvia: 3913, healthverity: 5609, komodo: 0 },
          { npi: '1003878539', iqvia: 3737, healthverity: 7855, komodo: 0 },
          { npi: '1841251394', iqvia: 3434, healthverity: 0, komodo: 2302 },
          { npi: '1740269299', iqvia: 3188, healthverity: 0, komodo: 2151 },
          { npi: '1508147810', iqvia: 4033, healthverity: 0, komodo: 2301 }
        ]
      },
      patient_volumes: {
        komodo: 966185,
        healthverity: 908031,
        iqvia: 595839
      },
      procedure_codes: {
        top_5: [
          { code: 'J9045', description: 'Carboplatin Administration', patients: 856432, percentage: 34.7 },
          { code: 'J9271', description: 'Pembrolizumab (Keytruda)', patients: 642185, percentage: 26.0 },
          { code: 'J9267', description: 'Paclitaxel Administration', patients: 518734, percentage: 21.0 },
          { code: 'J9355', description: 'Trastuzumab Deruxtecan', patients: 289456, percentage: 11.7 },
          { code: 'J9173', description: 'Durvalumab (Imfinzi)', patients: 163278, percentage: 6.6 }
        ],
        drug_classes: {
          chemotherapy: 42,
          immunotherapy: 28,
          targeted: 15,
          supportive: 15
        }
      },
      diagnosis_codes: {
        top_5: [
          { code: 'C78.00', description: 'Primary NSCLC', patients: 1115843, percentage: 45.2 },
          { code: 'C78.01', description: 'Metastatic NSCLC', patients: 711456, percentage: 28.8 },
          { code: 'C78.02', description: 'Stage IV NSCLC', patients: 385032, percentage: 15.6 },
          { code: 'C78.03', description: 'Unspecified NSCLC', patients: 177840, percentage: 7.2 },
          { code: 'C77.2', description: 'Secondary Malignancy', patients: 79056, percentage: 3.2 }
        ],
        categories: {
          primary: 45.2,
          metastatic: 28.8,
          anatomical: 15.6,
          histology: 10.4
        }
      },
      other_metrics: {
        top_products_mx_rx: {
          iqvia: { 
            labels: ['PARAPLATIN','KEYTRUDA','TAXOL','VP-16','OPDIVO','PLATINOL-AQ','ALIMTA','AVASTIN','IMFINZI','TECENTRIQ'], 
            mx: [306860,165368,142731,85512,70578,64023,67627,45588,51442,44853], 
            rx: [4191,4223,1931,9588,3004,8487,1785,7538,1895,0] // Note: Only 9 Rx products for IQVIA, TECENTRIQ has no Rx value in table, so 0
          },
          healthverity: { 
            labels: ['PARAPLATIN','KEYTRUDA','TAXOL','VP-16','OPDIVO','PLATINOL-AQ','ALIMTA','AVASTIN','IMFINZI','TECENTRIQ'], 
            mx: [383886,213708,183693,107755,88487,90668,67051,77380,64473,56793], 
            rx: [25953,23478,11873,10766,10455,9832,8180,7649,6303,0] // TECENTRIQ has no Rx value, so 0
          },
          komodo: { 
            labels: ['PARAPLATIN','KEYTRUDA','TAXOL','VP-16','OPDIVO','PLATINOL-AQ','ALIMTA','AVASTIN','IMFINZI','TECENTRIQ'], 
            mx: [437839,240307,205597,122064,100090,98125,81031,73824,73073,64997], 
            rx: [15673,10177,7613,11396,6665,8882,4871,7850,3976,0] // TECENTRIQ has no Rx value, so 0
          }
        },
        top_products_combined: {
          labels: [
            'PARAPLATIN',
            'KEYTRUDA',
            'TAXOL',
            'VP-16',
            'OPDIVO',
            'PLATINOL-AQ',
            'ALIMTA',
            'AVASTIN',
            'IMFINZI',
            'TECENTRIQ'
          ],
          iqvia: [309253, 167639, 143926, 87287, 71607, 64562, 68778, 46100, 52098, 45479],
          healthverity: [390307, 221139, 186976, 110920, 90175, 92172, 71129, 78248, 65914, 58113],
          komodo: [440791, 242462, 207641, 123876, 101107, 98823, 84393, 74317, 73734, 65614]
        },
        top_products_yoy: {
          years: ['2021','2022','2023','2024','2025'],
          iqvia: {
            products: [
              {
                name: 'TAGRISSO',
                patient_counts: [11044, 11961, 11962, 14836, 13398],
                claim_counts: [78429, 86712, 87753, 106328, 52182]
              },
              {
                name: 'ALECENSA',
                patient_counts: [2061, 2260, 2300, 2620, 2415],
                claim_counts: [16345, 17595, 17537, 19625, 9193]
              },
              {
                name: 'GILOTRIF',
                patient_counts: [1044, 1049, 1054, 1048, 688],
                claim_counts: [5229, 5661, 5333, 5305, 2314]
              },
              {
                name: 'TARCEVA',
                patient_counts: [893, 754, 573, 567, 320],
                claim_counts: [5764, 4910, 3699, 3085, 1113]
              },
              {
                name: 'MEKINIST',
                patient_counts: [714, 679, 125, 4, 0],
                claim_counts: [3366, 3175, 149, 4, 0]
              },
              {
                name: 'KEYTRUDA',
                patient_counts: [711, 844, 848, 982, 631],
                claim_counts: [3909, 4521, 5045, 5596, 2418]
              },
              {
                name: 'TAFINLAR',
                patient_counts: [695, 662, 670, 660, 440],
                claim_counts: [3275, 3272, 3132, 3144, 1396]
              },
              {
                name: 'LORBRENA',
                patient_counts: [602, 734, 812, 1096, 1069],
                claim_counts: [3619, 4713, 5218, 7223, 4049]
              },
              {
                name: 'XALKORI',
                patient_counts: [588, 507, 360, 345, 264],
                claim_counts: [4049, 3438, 2439, 2352, 1011]
              },
              {
                name: 'TABRECTA',
                patient_counts: [570, 648, 682, 804, 623],
                claim_counts: [2408, 3135, 3158, 4052, 2019]
              }
            ]
          },
          healthverity: {
            products: [
              {
                name: 'TAGRISSO',
                patient_counts: [10928, 10202, 10826, 11829, 9714],
                claim_counts: [73601, 73294, 76590, 79555, 37786]
              },
              {
                name: 'KEYTRUDA',
                patient_counts: [6773, 7744, 4202, 5284, 2175],
                claim_counts: [31196, 35758, 22448, 22754, 6594]
              },
              {
                name: 'PARAPLATIN',
                patient_counts: [4559, 4980, 4139, 3659, 1398],
                claim_counts: [15171, 16654, 12147, 10914, 3127]
              },
              {
                name: 'ALIMTA',
                patient_counts: [2186, 1839, 587, 181, 51],
                claim_counts: [9567, 7133, 1953, 386, 83]
              },
              {
                name: 'TAXOL',
                patient_counts: [2077, 2151, 1839, 1520, 519],
                claim_counts: [8844, 8893, 6748, 5390, 1323]
              },
              {
                name: 'ALECENSA',
                patient_counts: [1965, 2094, 2185, 2301, 1905],
                claim_counts: [14098, 15869, 15806, 15403, 7119]
              },
              {
                name: 'VP-16',
                patient_counts: [1664, 1807, 1536, 1321, 462],
                claim_counts: [10478, 11714, 9793, 7435, 1742]
              },
              {
                name: 'GILOTRIF',
                patient_counts: [1245, 1184, 1194, 1258, 756],
                claim_counts: [6373, 6628, 5621, 6460, 2838]
              },
              {
                name: 'IMFINZI',
                patient_counts: [1081, 1249, 1397, 1338, 847],
                claim_counts: [7407, 7816, 7304, 6177, 2548]
              },
              {
                name: 'TARCEVA',
                patient_counts: [1024, 939, 751, 618, 342],
                claim_counts: [5426, 4943, 3868, 2992, 1109]
              }
            ]
          },
          komodo: {
            products: [
              {
                name: 'TAGRISSO',
                patient_counts: [10925, 10721, 11475, 14018, 10252],
                claim_counts: [77519, 80688, 87989, 104453, 41743]
              },
              {
                name: 'PARAPLATIN',
                patient_counts: [2407, 2771, 2577, 2444, 949],
                claim_counts: [8725, 10076, 9017, 8349, 2632]
              },
              {
                name: 'KEYTRUDA',
                patient_counts: [2194, 2421, 2468, 2335, 1387],
                claim_counts: [13765, 15268, 15698, 15185, 5523]
              },
              {
                name: 'ALECENSA',
                patient_counts: [2126, 2342, 2485, 2821, 2170],
                claim_counts: [16495, 18675, 19842, 21759, 8679]
              },
              {
                name: 'TAXOL',
                patient_counts: [1241, 1336, 1311, 1092, 376],
                claim_counts: [5349, 6266, 5444, 4138, 1120]
              },
              {
                name: 'ALIMTA',
                patient_counts: [1215, 1030, 339, 119, 38],
                claim_counts: [5666, 4482, 1432, 228, 94]
              },
              {
                name: 'TARCEVA',
                patient_counts: [1177, 992, 787, 761, 326],
                claim_counts: [7009, 5984, 4851, 3899, 1128]
              },
              {
                name: 'GILOTRIF',
                patient_counts: [1111, 1147, 1130, 1107, 636],
                claim_counts: [6062, 6589, 6447, 6699, 2381]
              },
              {
                name: 'VP-16',
                patient_counts: [920, 1027, 934, 880, 320],
                claim_counts: [5525, 6642, 6404, 5972, 1725]
              },
              {
                name: 'MEKINIST',
                patient_counts: [839, 846, 167, 8, 2],
                claim_counts: [4284, 4348, 218, 13, 2]
              }
            ]
          }
        },
        claims_status_split: {
          iqvia: {
            paid: { pt_cnt: 91377, clms_cnt: 1224052 },
            rejected: { pt_cnt: 55500, clms_cnt: 187042 },
            reversed: { pt_cnt: 30869, clms_cnt: 86251 }
          },
          healthverity: {
            paid: { pt_cnt: 140609, clms_cnt: 1735189 }
          },
          komodo: {
            paid: { pt_cnt: 109721, clms_cnt: 1603917 },
            rejected: { pt_cnt: 66499, clms_cnt: 412558 },
            reversed: { pt_cnt: 65597, clms_cnt: 399800 }
          }
        },
        mb_codes_provided_vs_visible: {
          labels: ['Rx', 'Dx', 'Px'],
          provided: {
            iqvia: [119, 77, 689],
            healthverity: [119, 77, 689],
            komodo: [119, 77, 689]
          },
          visible: {
            iqvia: [91, 60, 379],
            healthverity: [115, 63, 498],
            komodo: [106, 68, 417]
          }
        },
        top_diagnosis_codes: {
          labels: [
            'C3490',
            'C3491',
            'C3411',
            'C7951',
            'C3492',
            'C3412',
            'C7931',
            'C771',
            'C7800',
            'C3431'
          ],
          iqvia: [
            483011,  // C3490
            211521,  // C3491
            196538,  // C3411
            189530,  // C7951
            160308,  // C3492
            153223,  // C3412
            145389,  // C7931
            127582,  // C771
            115671,  // C7800
            114460   // C3431
          ],
          healthverity: [
            764778,  // C3490
            383501,  // C3491
            314213,  // C3411
            285510,  // C7951
            294520,  // C3492
            245201,  // C3412
            210649,  // C7931
            230625,  // C771
            230096,  // C7800
            191152   // C3431
          ],
          komodo: [
            800195,  // C3490
            393908,  // C3491
            335235,  // C3411
            298830,  // C7951
            300837,  // C3492
            262049,  // C3412
            219917,  // C7931
            235137,  // C771
            223328,  // C7800
            203486   // C3431
          ]
        },
        top_procedure_codes: {
          labels: [
            'J9045',  // INJECTION, CARBOPLATIN, 50 MG
            'J9271',  // INJECTION, PEMBROLIZUMAB, 1 MG
            'J9267',  // INJECTION, PACLITAXEL, 1 MG
            'J9181',  // INJECTION, ETOPOSIDE, 10 MG
            'J9299',  // INJECTION, NIVOLUMAB, 1 MG
            'J9060',  // INJECTION, CISPLATIN, POWDER OR SOLUTION, 10 MG
            '32663',  // LUNG LOBECTOMY
            'J9173',  // INJECTION, DURVALUMAB, 10 MG
            'J9035',  // INJECTION, BEVACIZUMAB, 10 MG
            'J9171',  // INJECTION, DOCETAXEL, 1 MG
            'J9022'   // INJECTION, ATEZOLIZUMAB, 10 MG (only in IQVIA/Komodo)
          ],
          iqvia: [
            306711, // J9045
            165319, // J9271
            142485, // J9267
            85193,  // J9181
            70545,  // J9299
            63936,  // J9060
            0,      // 32663 (not present in IQVIA)
            49143,  // J9173
            43250,  // J9035
            40597,  // J9171
            43625   // J9022
          ],
          healthverity: [
            383663, // J9045
            213592, // J9271
            183243, // J9267
            107237, // J9181
            88404,  // J9299
            90551,  // J9060
            89706,  // 32663
            61839,  // J9173
            64920,  // J9035
            56352,  // J9171
            0       // J9022 (not present in HV)
          ],
          komodo: [
            437522, // J9045
            240117, // J9271
            205150, // J9267
            121660, // J9181
            100007, // J9299
            97990,  // J9060
            92074,  // 32663
            70000,  // J9173
            62764,  // J9035
            56352,  // J9171 (using HV value, but Komodo has 62751 for J9022, so J9171 should be 0 if not present)
            62751   // J9022
          ]
        },
        payer_split: {
          dx: {
            labels: ['Commercial', 'Medicare', 'Medicaid', 'Other', 'NULL'],
            iqvia: [22953412, 21049281, 4697701, 225459, 10369755],
            healthverity: [18049151, 39976858, 10558199, 1585792, 4748101],
            komodo: [16938543, 56212426, 9197276, 666369, 9000841]
          },
          px: {
            labels: ['Commercial', 'Medicare', 'Medicaid', 'Other', 'NULL'],
            iqvia: [4166476, 4178523, 855716, 42130, 10372],
            healthverity: [3300094, 7362815, 2147055, 348535, 915218],
            komodo: [2629358, 8437043, 1361673, 110980, 1365145]
          },
          rx: {
            labels: ['Commercial', 'Medicare', 'Medicaid', 'Other', 'NULL'],
            iqvia: [624573, 507765, 82230, 9354, 156],
            healthverity: [449189, 273377, 241666, 2718, 902528],
            komodo: [535495, 767793, 160167, 11055, 130292]
          }
        }
      },
      provider_data: {
        specialties: {
          oncology: 42,
          pulmonology: 28,
          internal_medicine: 18,
          hematology: 8,
          other: 4
        },
        npi_completeness: {
          billing: 85,
          rendering: 82,
          prescriber: 75,
          facility: 28
        }
      },
      demographics: {
        gender_distribution: {
          iqvia: {
          'F': 299131,
          'M': 296613,
          'U': 95
          },
          healthverity: {
            'F': 464628,
            'M': 442215,
            'U': 1188
          },
          komodo: {
            'F': 487136,
            'M': 469665,
            'U': 9172,
            'NULL': 212
          }
        },
        age_distribution: {
          iqvia: {
          '0-17': 651,
          '18-24': 646,
          '25-59': 57394,
          '60-74': 254634,
          '75+': 194635,
          'NULL': 87879
        },
          healthverity: {
            '0-17': 1027,
            '18-24': 1005,
            '25-59': 99940,
            '60-74': 417587,
            '75+': 388454,
            'NULL': 18
          },
          komodo: {
            '0-17': 884,
            '18-24': 861,
            '25-59': 93232,
            '60-74': 422789,
            '75+': 446744,
            'NULL': 1675
          }
        },
        geographic_distribution: {
          healthverity: {
            'CA': 77361, 'FL': 75492, 'NY': 67650, 'TX': 56566, 'OH': 51269,
            'MI': 44258, 'PA': 43277, 'IL': 35761, 'GA': 26555, 'NJ': 26369,
            'IN': 25171, 'KY': 22556, 'NC': 21928, 'TN': 20439, 'VA': 20099,
            'AZ': 18404, 'MO': 17452, 'WA': 16883, 'SC': 15847, 'MN': 15633,
            'WI': 15586, 'AL': 14405, 'LA': 13691, 'MA': 13336, 'MD': 12723,
            'CT': 11892, 'OK': 10166, 'CO': 9822, 'AR': 9558, 'IA': 9363,
            'MS': 8110, 'WV': 7991, 'OR': 7863, 'KS': 7636, 'NV': 6670,
            'ME': 6256, 'NM': 4148, 'NE': 4108, 'ID': 3675, 'DE': 3550,
            'NH': 3238, 'HI': 3079, 'MT': 2810, 'SD': 2551, 'UT': 2469,
            'RI': 2379, 'PR': 2124, 'ND': 2096, 'WY': 1270, 'VT': 1086,
            'AK': 989, 'DC': 793, 'PW': 182, 'VI': 103, 'AE': 8, 'AA': 2, 'AP': 1
          },
          komodo: {
            'FL': 82436, 'CA': 74228, 'NY': 66687, 'PA': 51866, 'OH': 49597,
            'TX': 48576, 'MI': 43852, 'IL': 35049, 'MA': 29313, 'TN': 28880,
            'NJ': 28318, 'GA': 24453, 'IN': 24224, 'AZ': 22853, 'NC': 22191,
            'VA': 21656, 'WI': 19588, 'KY': 19288, 'WA': 19233, 'SC': 18570,
            'MO': 16620, 'AL': 16266, 'MN': 15416, 'MD': 15042, 'LA': 14643,
            'CT': 13929, 'AR': 13755, 'WV': 10748, 'IA': 9708, 'OR': 9602,
            'KS': 8971, 'MS': 8683, 'OK': 8558, 'ME': 8397, 'CO': 8124,
            'NV': 7078, 'NE': 5879, 'NH': 5776, 'UT': 5025, 'DE': 4251,
            'NM': 3697, 'VT': 3049, 'HI': 2824, 'ID': 2646, 'SD': 2632,
            'RI': 2496, 'MT': 2452, 'ND': 1353, 'DC': 1279, 'AK': 1157,
            'PR': 1099, 'WY': 1060
          },
          iqvia: {} // No data for IQVIA
        }
      },
      temporal_trends: {
        monthly_2024: {
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          values: [45000, 47000, 52000, 48000, 51000, 49000, 53000, 55000, 52000]
        },
        yearly: {
          years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
          komodo: [158000, 148000, 142000, 138000, 134000, 131000, 129000, 127000],
          healthverity: [145000, 134000, 128000, 122000, 118000, 115000, 113000, 111000],
          iqvia: [95000, 88000, 82000, 79000, 75000, 73000, 71000, 70000]
        }
      },
      market_basket: {
        code_coverage: {
          rx: 85,
          dx: 78,
          px: 72
        },
        top_ndcs: [
          { ndc: '0003-0045-11', description: 'Carboplatin 150mg', utilization: 856432 },
          { ndc: '0006-3828-10', description: 'Keytruda 100mg', utilization: 642185 },
          { ndc: '0003-0267-20', description: 'Paclitaxel 30mg', utilization: 518734 },
          { ndc: '0469-0355-01', description: 'Enhertu 100mg', utilization: 289456 },
          { ndc: '0310-0173-01', description: 'Imfinzi 120mg', utilization: 163278 }
        ]
      },
      treatment_data: {
        utilization_trends: {
          paraplatin: [306860, 383886, 437839],
          keytruda: [165368, 213708, 240307],
          taxol: [142731, 183693, 205597]
        },
        competitive_landscape: {
          immunotherapy: 45,
          chemotherapy: 35,
          targeted: 20
        }
      },
      claims_data: {
        status_distribution: {
          iqvia: { paid: 82, rejected: 12, reversed: 6 },
          healthverity: { paid: 100, rejected: 0, reversed: 0 },
          komodo: { paid: 66, rejected: 17, reversed: 17 }
        },
        types: {
          dx: {
            IQVIA: 47490854,
            HEALTHVERITY: 66499023,
            KOMODO: 90432525
          },
          px: {
            IQVIA: 8659323,
            HEALTHVERITY: 11480361,
            KOMODO: 13011942
          },
          rx: {
            IQVIA: 1224052,
            HEALTHVERITY: 1735189,
            KOMODO: 1603917
          }
        },
      },
      
      new_patients_trends: {
        yoy: {
          years: ['2017','2018','2019','2020','2021','2022','2023','2024','2025'],
          iqvia:     [163511, 79328, 73855, 63308, 60090, 55971, 50906, 38690, 10180],
          komodo:    [248515,126997,120305,103958,102271, 95916, 87963, 65177, 15083],
          healthverity:[225554,120580,112695, 94359, 95559, 90556, 86920, 67095, 14713]
        },
        mom: {
          2021: {
            months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            iqvia:     [5080,4732,5711,5373,4971,5318,4988,4990,4824,4834,4702,4567],
            komodo:    [8747,8020,9646,9406,8733,8943,8617,8411,8086,8257,7875,7530],
            healthverity:[8259,7399,9048,8746,7935,8394,7950,7871,7750,7757,7401,7049]
          },
          2022: {
            months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            iqvia:     [4779,4483,5343,4787,4853,4677,4345,5117,4488,4600,4364,4135],
            komodo:    [8176,7715,9047,8165,8358,8127,7445,8593,7794,7907,7478,7111],
            healthverity:[7691,7376,8560,7702,7860,7765,7008,8159,7299,7435,7046,6655]
          },
          2023: {
            months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            iqvia:     [4684,4268,4952,4165,4437,4484,3905,4636,3936,4192,3847,3400],
            komodo:    [8099,7543,8481,7489,7943,7701,6786,7789,6841,7058,6497,5736],
            healthverity:[8046,7190,8193,7119,8174,7622,6654,7625,6713,7126,6516,5942]
          },
          2024: {
            months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            iqvia:     [3815,3257,3196,3458,3385,3155,3282,3380,3161,3299,2641,2661],
            komodo:    [6379,5822,5583,5925,5805,5244,5548,5473,5120,5609,4430,4239],
            healthverity:[6897,5950,5827,6149,5823,5415,5793,5697,5061,5524,4537,4422]
          },
          2025: {
            months: ['Jan','Feb','Mar','Apr','May'],
            iqvia:     [3080,2463,2304,1746,587],
            komodo:    [4683,3755,3427,2454,764],
            healthverity:[4980,3769,3228,2077,659]
          }
        }
      },
      
      prevalence_patients_trends: {
        yoy: {
          years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
          komodo: [248515, 313293, 351269, 364532, 377453, 383024, 383571, 337040],
          healthverity: [225554, 291073, 327033, 332459, 346595, 356477, 363674, 340549],
          iqvia: [163511, 200494, 216536, 219452, 218917, 217220, 209682, 190861]
        },
        mom: {
          2025: {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            komodo: [143190, 134301, 133815, 127096, 114461],
            healthverity: [148247, 141524, 140720, 131197, 106511],
            iqvia: [88420, 84923, 85464, 84741, 79936]
          },
          2024: {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            komodo: [168107, 155743, 145760, 151869, 151368, 146188, 149581, 148685, 146259, 152918, 144866, 142654],
            healthverity: [171850, 161074, 150474, 153331, 152601, 147540, 151977, 152678, 150284, 155215, 146418, 146825],
            iqvia: [103386, 93886, 84125, 89115, 89396, 86709, 89033, 88806, 87547, 90439, 85898, 86429]
          },
          2023: {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            komodo: [185697, 180556, 188240, 182862, 187663, 185311, 179393, 184851, 179526, 183280, 179220, 168791],
            healthverity: [172760, 168067, 176337, 170816, 175865, 173493, 168852, 174941, 170055, 173814, 169892, 163903],
            iqvia: [105796, 103385, 107929, 104664, 107015, 105880, 103174, 107296, 104098, 106250, 104799, 101441]
          },
          2022: {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            komodo: [179540, 175882, 185643, 181657, 182815, 184577, 178878, 186429, 183681, 183901, 182777, 180045],
            healthverity: [165758, 162127, 171294, 167131, 168896, 171447, 165918, 172797, 169916, 169683, 168766, 166408],
            iqvia: [108148, 105510, 110637, 107522, 108096, 109204, 106010, 110096, 107822, 108156, 108011, 104834]
          },
          2021: {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            komodo: [178826, 175321, 186886, 183796, 180774, 186393, 183079, 183610, 183964, 182173, 181263, 179524],
            healthverity: [160288, 156578, 168574, 165333, 162870, 168247, 165874, 166300, 166919, 166346, 165461, 164297],
            iqvia: [108149, 105455, 112302, 110089, 107876, 111007, 109294, 109749, 109892, 108987, 108199, 108063]
          }
        }
      }      
    };
  }

  setupEventListeners() {
    console.log('🔧 Setting up enhanced event listeners...');
    
    // Landing page to dashboard navigation
    const exploreBtn = document.getElementById('explore-analysis-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => this.showDashboard());
    }

    // Back to landing button
    const backBtn = document.getElementById('back-to-landing');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.showLandingPage());
    }

    // Navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
      const section = tab.getAttribute('data-section');
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchSection(section);
      });
    });

    // Export buttons
    const exportBtns = document.querySelectorAll('.export-btn');
    exportBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const chartId = btn.getAttribute('data-chart');
        this.exportChart(chartId);
      });
    });

    // Window resize handler
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // New Patients Trends Toggle Listeners
    const newPatientsYoY = document.getElementById('newPatientsYoY');
    const newPatientsMoM = document.getElementById('newPatientsMoM');
    const newPatientsYearFilter = document.getElementById('newPatientsYearFilter');
    const newPatientsYearDropdownBtn = document.getElementById('newPatientsYearDropdownBtn');
    const newPatientsYearDropdownMenu = document.getElementById('newPatientsYearDropdownMenu');

    if (newPatientsYoY && newPatientsMoM) {
      newPatientsYoY.addEventListener('click', () => this.toggleNewPatientsView('yoy'));
      newPatientsMoM.addEventListener('click', () => this.toggleNewPatientsView('mom'));
    }

    if (newPatientsYearDropdownBtn && newPatientsYearDropdownMenu) {
      newPatientsYearDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const visible = newPatientsYearDropdownMenu.style.display === 'block';
        newPatientsYearDropdownMenu.style.display = visible ? 'none' : 'block';
      });
      document.addEventListener('click', (e) => {
        if (!newPatientsYearDropdownMenu.contains(e.target) && e.target !== newPatientsYearDropdownBtn) {
          newPatientsYearDropdownMenu.style.display = 'none';
        }
      });
      newPatientsYearDropdownMenu.querySelectorAll('input.year-checkbox[name="newPatientsYears"]').forEach(cb => {
        cb.addEventListener('change', () => {
          this.updateNewPatientsChart();
          this.updateYearDropdownLabel('newPatientsYearDropdownBtn', 'newPatientsYears');
        });
      });
      this.updateYearDropdownLabel('newPatientsYearDropdownBtn', 'newPatientsYears');
    }

    // Prevalence Patients Trends Toggle Listeners
    const prevalenceYoY = document.getElementById('prevalenceYoY');
    const prevalenceMoM = document.getElementById('prevalenceMoM');
    const prevalenceYearFilter = document.getElementById('prevalenceYearFilter');
    const prevalenceYearDropdownBtn = document.getElementById('prevalenceYearDropdownBtn');
    const prevalenceYearDropdownMenu = document.getElementById('prevalenceYearDropdownMenu');

    if (prevalenceYoY && prevalenceMoM) {
      prevalenceYoY.addEventListener('click', () => this.togglePrevalenceView('yoy'));
      prevalenceMoM.addEventListener('click', () => this.togglePrevalenceView('mom'));
    }

    if (prevalenceYearDropdownBtn && prevalenceYearDropdownMenu) {
      prevalenceYearDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const visible = prevalenceYearDropdownMenu.style.display === 'block';
        prevalenceYearDropdownMenu.style.display = visible ? 'none' : 'block';
      });
      document.addEventListener('click', (e) => {
        if (!prevalenceYearDropdownMenu.contains(e.target) && e.target !== prevalenceYearDropdownBtn) {
          prevalenceYearDropdownMenu.style.display = 'none';
        }
      });
      prevalenceYearDropdownMenu.querySelectorAll('input.year-checkbox[name="prevalenceYears"]').forEach(cb => {
        cb.addEventListener('change', () => {
          this.updatePrevalenceChart();
          this.updateYearDropdownLabel('prevalenceYearDropdownBtn', 'prevalenceYears');
        });
      });
      this.updateYearDropdownLabel('prevalenceYearDropdownBtn', 'prevalenceYears');
    }

    // Gender/Age Distribution toggle functionality removed - now using separate charts

    console.log('✅ Enhanced event listeners setup complete');
  }
  updateYearDropdownLabel(buttonId, checkboxName) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    const checked = Array.from(document.querySelectorAll(`input.year-checkbox[name="${checkboxName}"]:checked`));
    if (checked.length === 0) {
      btn.textContent = 'Select Years';
    } else if (checked.length <= 2) {
      btn.textContent = checked.map(cb => cb.value).sort().join(', ');
    } else {
      btn.textContent = `${checked.length} years`;
    }
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) {
      console.warn('❌ Theme toggle button not found');
      return;
    }
    
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      
      console.log(`🎨 Theme switched to: ${this.currentTheme}`);
      
      // Update chart colors for new theme
      setTimeout(() => {
        this.updateChartThemes();
      }, 100);
    });
    
    console.log('✅ Theme toggle setup complete');
  }

  showLandingPage() {
    const landingPage = document.getElementById('landing-page');
    const mainDashboard = document.getElementById('main-dashboard');
    
    if (landingPage && mainDashboard) {
      landingPage.classList.remove('hidden');
      mainDashboard.classList.add('hidden');
      console.log('📄 Showing landing page');
    }
  }

  showDashboard() {
    const landingPage = document.getElementById('landing-page');
    const mainDashboard = document.getElementById('main-dashboard');
    
    if (landingPage && mainDashboard) {
      landingPage.classList.add('hidden');
      mainDashboard.classList.remove('hidden');
      
      // Initialize charts after dashboard is shown
      setTimeout(() => {
        this.initializeAllCharts();
        this.animateProgressBars();
      }, 300);
      
      console.log('📊 Showing main dashboard');
    }
  }

  switchSection(sectionId) {
    console.log(`🔄 Switching to section: ${sectionId}`);
    
    try {
      // Update navigation tabs
      const navTabs = document.querySelectorAll('.nav-tab');
      navTabs.forEach(tab => {
        tab.classList.remove('active');
      });
      
      const activeTab = document.querySelector(`[data-section="${sectionId}"]`);
      if (activeTab) {
        activeTab.classList.add('active');
      }

      // Update content sections
      const sections = document.querySelectorAll('.content-section');
      sections.forEach(section => {
        section.classList.remove('active');
      });
      
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active');
      }

      this.currentSection = sectionId;

      // Resize charts after section switch
      setTimeout(() => {
        this.resizeCharts();
      }, 150);
      
      console.log(`✅ Successfully switched to section: ${sectionId}`);
      
    } catch (error) {
      console.error('❌ Error switching sections:', error);
    }
  }

  getSingleItemLegendClickHandler(title = '') {
    return (e, legendItem, legend) => {
      const ci = legend.chart;
      const chartType = ci.config.type;
  
      if (chartType === 'doughnut' || chartType === 'pie') {
        // Handle doughnut/pie (slice toggle)
        const clickedIndex = legendItem.index;
        const total = ci.data.labels.length;
        const visibleIndices = [];
        for (let i = 0; i < total; i++) {
          if (ci.getDataVisibility(i)) visibleIndices.push(i);
        }
  
        const onlyThisVisible = visibleIndices.length === 1 && visibleIndices[0] === clickedIndex;
  
        if (onlyThisVisible) {
          // Restore all slices
          for (let i = 0; i < total; i++) {
            if (!ci.getDataVisibility(i)) ci.toggleDataVisibility(i);
          }
        } else {
          // Show only clicked slice
          for (let i = 0; i < total; i++) {
            const shouldBeVisible = i === clickedIndex;
            const currentlyVisible = ci.getDataVisibility(i);
            if (shouldBeVisible && !currentlyVisible) ci.toggleDataVisibility(i);
            if (!shouldBeVisible && currentlyVisible) ci.toggleDataVisibility(i);
          }
        }
      } else {
        // Handle bar/line (dataset toggle)
        const clickedDatasetIndex = legendItem.datasetIndex;
        const total = ci.data.datasets.length;
        const visibleDatasets = [];
        for (let i = 0; i < total; i++) {
          if (ci.isDatasetVisible(i)) visibleDatasets.push(i);
        }
  
        const onlyThisVisible = visibleDatasets.length === 1 && visibleDatasets[0] === clickedDatasetIndex;
  
        if (onlyThisVisible) {
          // Restore all datasets
          for (let i = 0; i < total; i++) {
            if (!ci.isDatasetVisible(i)) ci.show(i);
          }
        } else {
          // Show only clicked dataset
          for (let i = 0; i < total; i++) {
            if (i === clickedDatasetIndex) {
              ci.show(i);
            } else {
              ci.hide(i);
            }
          }
        }
      }
  
      ci.update();
    };
  }
  
  

  initializeAllCharts() {
    console.log('📊 Initializing all enhanced charts...');
    
    try {
      // Patient Analysis Charts
      this.createPatientVolumeChart();
      this.createClaimsTypeChart();
      this.createGenderDistributionChart();
      this.createAgeDistributionBySourceChart();
      this.initializeDistributionToggle();
      this.createNewPatientsTrendsChart();
      this.createPrevalencePatientsTrendsChart();
      
      // HCP/HCO Metrics Charts
      this.createHcpRenderingChartGrouped();
      this.createHcpReferringChart();
      this.createTopRenderingSpecialtiesChart();
      this.createTopReferringSpecialtiesChart();
      this.createTopPrescriberSpecialtiesChart();
      this.createHcoFillrateChartGrouped();
      this.createHcoFacilityChart();
      this.createTopBillingNpiChart();
      this.createTopFacilityNpiChart();
      
      // Diagnosis Analysis Charts
      this.createOtherMetricsCharts();
      
      // Provider Landscape Charts
      this.createProviderSpecialtyChart();
      this.createNPICompletenessChart();
      
      // Demographics Charts
      this.createAgeDistributionChart();
      this.createGeographicMap();
      
      // Treatment Landscape Charts
      this.createTreatmentTrendsChart();
      this.createCompetitiveChart();
      
      // Temporal Trends Charts
      this.createMonthlyTrendsChart();
      this.createYearlyTrendsChart();
      
      // Market Basket Charts
      this.createCodeCoverageChart();
      this.createNDCUtilizationChart();
      
      // Data Quality Charts
      this.createClaimsStatusChart();
      this.createReliabilityChart();
      
      console.log('✅ All enhanced charts initialized');
    } catch (error) {
      console.error('❌ Chart initialization error:', error);
    }
  }
  

  // Patient Analysis Charts
  createPatientVolumeChart() {
    const ctx = document.getElementById('patientVolumeChart');
    if (!ctx) return;

    const data = this.dashboardData?.patient_volumes || {
      komodo: 966185,
      healthverity: 908031,
      iqvia: 595839
    };

    if (this.charts.patientVolume) {
      this.charts.patientVolume.destroy();
    }

    this.charts.patientVolume = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Komodo', 'HealthVerity', 'IQVIA'],
        datasets: [{
          data: [data.komodo, data.healthverity, data.iqvia],
          backgroundColor: [this.colors.bronze, this.colors.ateneoBlue, this.colors.paleCerulean],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...this.getDoughnutChartOptions('Patient Volume Distribution'),
        plugins: {
          legend: {
            onClick: this.getSingleItemLegendClickHandler('Patient Volume Distribution')
          }
        }
      }
    });
  }


  createClaimsTypeChart() {
    const container = document.getElementById('claimsTypeTableContainer');
    if (!container) return;

    const types = this.dashboardData?.claims_data?.types || {
      dx: { IQVIA: 0, HEALTHVERITY: 0, KOMODO: 0 },
      px: { IQVIA: 0, HEALTHVERITY: 0, KOMODO: 0 },
      rx: { IQVIA: 0, HEALTHVERITY: 0, KOMODO: 0 }
    };

    const rows = [
      { label: 'Diagnosis Claims (DX)', key: 'dx', icon: '🧪' },
      { label: 'Procedure Claims (PX)', key: 'px', icon: '🗂️' },
      { label: 'Prescription Claims (RX)', key: 'rx', icon: '💊' }
    ];
    const cols = [
      { label: 'IQVIA', key: 'IQVIA', color: this.colors.sources.iqvia },
      { label: 'HealthVerity', key: 'HEALTHVERITY', color: this.colors.sources.healthverity },
      { label: 'Komodo', key: 'KOMODO', color: this.colors.sources.komodo }
    ];

    // Clear old
    container.innerHTML = '';

    // Build table element
    const table = document.createElement('table');
    table.className = 'claims-table';

    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const thEmpty = document.createElement('th');
    thEmpty.textContent = 'Claim Type';
    headerRow.appendChild(thEmpty);

    cols.forEach(c => {
      const th = document.createElement('th');
      th.textContent = c.label;
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Body
    const tbody = document.createElement('tbody');

    rows.forEach((r) => {
      const tr = document.createElement('tr');

      const tdLabel = document.createElement('td');
      tdLabel.className = 'claims-type-label';
      tdLabel.textContent = `${r.icon} ${r.label}`;
      tr.appendChild(tdLabel);

      cols.forEach(c => {
        const td = document.createElement('td');
        td.style.textAlign = 'center';

        const value = types[r.key]?.[c.key] ?? 0;
        const pill = document.createElement('div');
        pill.className = 'claim-pill source-' + c.label.toLowerCase().replace(/\s+/g,'');
        pill.innerHTML = `<span class="marker"></span><span>${value.toLocaleString()}</span>`;
        td.appendChild(pill);
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    const wrap = document.createElement('div');
    wrap.className = 'claims-table-wrap';
    wrap.appendChild(table);
    container.appendChild(wrap);
  }

  // Gender Distribution Chart by Data Source
  createGenderDistributionChart() {
    const ctx = document.getElementById('genderDistributionChart');
    if (!ctx) return;

    const data = this.dashboardData?.demographics?.gender_distribution || {};
    
    if (this.charts.genderDistribution) {
      this.charts.genderDistribution.destroy();
    }

    // Create datasets for each data source
    const datasets = [];
    const dataSources = ['komodo', 'healthverity', 'iqvia'];
    const sourceColors = [this.colors.bronze, this.colors.ateneoBlue, this.colors.paleCerulean];
    const sourceLabels = ['Komodo', 'HealthVerity', 'IQVIA'];

    dataSources.forEach((source, index) => {
      const sourceData = data[source] || {};
      datasets.push({
        label: sourceLabels[index],
          data: [
          sourceData['F'] || 0,
          sourceData['M'] || 0,
          sourceData['U'] || 0,
          sourceData['NULL'] || 0
        ],
        backgroundColor: sourceColors[index],
          borderWidth: 2,
          borderColor: '#ffffff'
      });
    });

    this.charts.genderDistribution = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Female', 'Male', 'Unknown', 'NULL'],
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            onClick: this.getSingleItemLegendClickHandler('Gender Distribution')
          },
          title: {
            display: true,
            text: 'Gender Distribution by Data Source'
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Gender'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Patient Count'
            }
          }
        }
      }
    });
  }

  // Age Distribution Chart by Data Source
  createAgeDistributionBySourceChart() {
    const ctx = document.getElementById('ageDistributionBySourceChart');
    if (!ctx) return;

    const data = this.dashboardData?.demographics?.age_distribution || {};
    
    if (this.charts.ageDistributionBySource) {
      this.charts.ageDistributionBySource.destroy();
    }

    // Create datasets for each data source
    const datasets = [];
    const dataSources = ['komodo','healthverity','iqvia'];
    const sourceColors = [this.colors.bronze, this.colors.ateneoBlue, this.colors.paleCerulean];
    const sourceLabels = ['Komodo', 'HealthVerity', 'IQVIA'];

    dataSources.forEach((source, index) => {
      const sourceData = data[source] || {};
      datasets.push({
        label: sourceLabels[index],
        data: [
          sourceData['0-17'] || 0,
          sourceData['18-24'] || 0,
          sourceData['25-59'] || 0,
          sourceData['60-74'] || 0,
          sourceData['75+'] || 0,
          sourceData['NULL'] || 0
        ],
        backgroundColor: sourceColors[index],
        borderWidth: 2,
        borderColor: '#ffffff'
      });
    });

    this.charts.ageDistributionBySource = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['0-17', '18-24', '25-59', '60-74', '75+', 'Unknown'],
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            onClick: this.getSingleItemLegendClickHandler('Age Distribution')
          },
          title: {
            display: true,
            text: 'Age Distribution by Data Source'
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Age Group'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Patient Count'
            }
          }
        }
      }
    });
  }

  // Initialize Distribution Chart Toggle
  initializeDistributionToggle() {
    const genderToggle = document.getElementById('genderToggle');
    const ageToggle = document.getElementById('ageToggle');
    const title = document.getElementById('distributionChartTitle');
    const genderChart = document.getElementById('genderDistributionChart');
    const ageChart = document.getElementById('ageDistributionBySourceChart');
    
    if (!genderToggle || !ageToggle || !title || !genderChart || !ageChart) return;

    // Set initial state (Gender is default)
    this.distributionViewMode = 'gender';
    
    // Add event listeners
    genderToggle.addEventListener('click', () => {
      if (this.distributionViewMode === 'gender') return;
      
      this.distributionViewMode = 'gender';
      genderToggle.classList.add('active');
      ageToggle.classList.remove('active');
      title.textContent = 'Gender Distribution by Data Source';
      genderChart.style.display = 'block';
      ageChart.style.display = 'none';
      
      // Ensure gender chart is created if not already
      if (!this.charts.genderDistribution) {
        this.createGenderDistributionChart();
      }
    });
    
    ageToggle.addEventListener('click', () => {
      if (this.distributionViewMode === 'age') return;
      
      this.distributionViewMode = 'age';
      ageToggle.classList.add('active');
      genderToggle.classList.remove('active');
      title.textContent = 'Age Distribution by Data Source';
      genderChart.style.display = 'none';
      ageChart.style.display = 'block';
      
      // Ensure age chart is created if not already
      if (!this.charts.ageDistributionBySource) {
        this.createAgeDistributionBySourceChart();
      }
    });
  }

  // New Patients Trends Chart
  createNewPatientsTrendsChart() {
    const ctx = document.getElementById('newPatientsTrendsChart');
    if (!ctx) return;

    // Initialize with YoY data
    this.newPatientsViewMode = 'yoy';
    this.updateNewPatientsChart();
  }

  updateNewPatientsChart() {
    const ctx = document.getElementById('newPatientsTrendsChart');
    if (!ctx) return;

    const data = this.dashboardData?.new_patients_trends || {};
    
    if (this.charts.newPatientsTrends) {
      this.charts.newPatientsTrends.destroy();
    }

    let chartData, labels, title;

    if (this.newPatientsViewMode === 'yoy') {
      const yoyData = data.yoy || {};
      labels = yoyData.years || [];
      title = 'New Patients Trends - Year over Year';
      chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Komodo',
            data: yoyData.komodo || [],
            borderColor: this.colors.bronze,
            backgroundColor: this.colors.bronze + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          },
          {
            label: 'HealthVerity',
            data: yoyData.healthverity || [],
            borderColor: this.colors.ateneoBlue,
            backgroundColor: this.colors.ateneoBlue + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          },
          {
            label: 'IQVIA',
            data: yoyData.iqvia || [],
            borderColor: this.colors.paleCerulean,
            backgroundColor: this.colors.paleCerulean + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }
        ]
      };
    } else {
      // Read checked years from checkbox menu
      const checked = Array.from(document.querySelectorAll('input.year-checkbox[name="newPatientsYears"]:checked'));
      let selectedYears = checked.map(cb => cb.value);
      if (!selectedYears || selectedYears.length === 0) {
        selectedYears = ['2025'];
      }

      // Sort years ascending for correct chronological order
      selectedYears.sort();

      const concatenatedMonths = [];
      const komodoValues = [];
      const hvValues = [];
      const iqviaValues = [];

      selectedYears.forEach(year => {
        const momDataYear = data.mom?.[year] || {};
        const months = momDataYear.months || [];
        const komodo = momDataYear.komodo || [];
        const hv = momDataYear.healthverity || [];
        const iqvia = momDataYear.iqvia || [];

        months.forEach((m, idx) => {
          concatenatedMonths.push(`${m}-${year}`);
          komodoValues.push(komodo[idx] ?? null);
          hvValues.push(hv[idx] ?? null);
          iqviaValues.push(iqvia[idx] ?? null);
        });
      });

      labels = concatenatedMonths;
      title = `New Patients Trends - MoM (${selectedYears.join(', ')})`;
      chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Komodo',
            data: komodoValues,
            borderColor: this.colors.bronze,
            backgroundColor: this.colors.bronze + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          },
          {
            label: 'HealthVerity',
            data: hvValues,
            borderColor: this.colors.ateneoBlue,
            backgroundColor: this.colors.ateneoBlue + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          },
          {
            label: 'IQVIA',
            data: iqviaValues,
            borderColor: this.colors.paleCerulean,
            backgroundColor: this.colors.paleCerulean + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }
        ]
      };
    }

    this.charts.newPatientsTrends = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        ...this.getLineChartOptions(title, 'Patient Count'),
        plugins: {
          legend: {
            display: true,
            position: 'top',
            onClick: this.getSingleItemLegendClickHandler('New Patients Trends')
          }
        }
      }
  
    });
  }

  toggleNewPatientsView(mode) {
    this.newPatientsViewMode = mode;
    
    // Update toggle buttons
    const yoyBtn = document.getElementById('newPatientsYoY');
    const momBtn = document.getElementById('newPatientsMoM');
    const yearFilter = document.getElementById('newPatientsYearFilter');
    
    if (yoyBtn && momBtn) {
      yoyBtn.classList.toggle('active', mode === 'yoy');
      momBtn.classList.toggle('active', mode === 'mom');
    }
    
    if (yearFilter) {
      yearFilter.style.display = mode === 'mom' ? 'block' : 'none';
    }
    
    // Update chart
    this.updateNewPatientsChart();
  }

  // Prevalence Patients Trends Chart
  createPrevalencePatientsTrendsChart() {
    const ctx = document.getElementById('prevalencePatientsTrendsChart');
    if (!ctx) return;

    // Initialize with YoY data
    this.prevalenceViewMode = 'yoy';
    this.updatePrevalenceChart();
  }

  updatePrevalenceChart() {
    const ctx = document.getElementById('prevalencePatientsTrendsChart');
    if (!ctx) return;

    const data = this.dashboardData?.prevalence_patients_trends || {};
    
    if (this.charts.prevalencePatientsTrends) {
      this.charts.prevalencePatientsTrends.destroy();
    }

    let chartData, labels, title;

    if (this.prevalenceViewMode === 'yoy') {
      const yoyData = data.yoy || {};
      labels = yoyData.years || [];
      title = 'Prevalence Patients Trends - Year over Year';
      chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Komodo',
            data: yoyData.komodo || [],
            borderColor: this.colors.bronze,
            backgroundColor: this.colors.bronze + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          },
          {
            label: 'HealthVerity',
            data: yoyData.healthverity || [],
            borderColor: this.colors.ateneoBlue,
            backgroundColor: this.colors.ateneoBlue + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          },
          {
            label: 'IQVIA',
            data: yoyData.iqvia || [],
            borderColor: this.colors.paleCerulean,
            backgroundColor: this.colors.paleCerulean + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }
        ]
      };
    } else {
      // Read checked years from checkbox menu
      const checked = Array.from(document.querySelectorAll('input.year-checkbox[name="prevalenceYears"]:checked'));
      let selectedYears = checked.map(cb => cb.value);
      if (!selectedYears || selectedYears.length === 0) {
        selectedYears = ['2025'];
      }

      selectedYears.sort();

      const concatenatedMonths = [];
      const komodoValues = [];
      const hvValues = [];
      const iqviaValues = [];

      selectedYears.forEach(year => {
        const momDataYear = data.mom?.[year] || {};
        const months = momDataYear.months || [];
        const komodo = momDataYear.komodo || [];
        const hv = momDataYear.healthverity || [];
        const iqvia = momDataYear.iqvia || [];

        months.forEach((m, idx) => {
          concatenatedMonths.push(`${m}-${year}`);
          komodoValues.push(komodo[idx] ?? null);
          hvValues.push(hv[idx] ?? null);
          iqviaValues.push(iqvia[idx] ?? null);
        });
      });

      labels = concatenatedMonths;
      title = `Prevalence Patients Trends - MoM (${selectedYears.join(', ')})`;
      chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Komodo',
            data: komodoValues,
            borderColor: this.colors.bronze,
            backgroundColor: this.colors.bronze + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          },
          {
            label: 'HealthVerity',
            data: hvValues,
            borderColor: this.colors.ateneoBlue,
            backgroundColor: this.colors.ateneoBlue + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          },
          {
            label: 'IQVIA',
            data: iqviaValues,
            borderColor: this.colors.paleCerulean,
            backgroundColor: this.colors.paleCerulean + '20',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }
        ]
      };
    }

    this.charts.prevalencePatientsTrends = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
      ...this.getLineChartOptions(title, 'Patient Count'),
      plugins: {
        legend: {
          display: true,
          position: 'top',
          onClick: this.getSingleItemLegendClickHandler('Prevalence Patients Trends')
        }
      }
    }
  
    });
  }

  togglePrevalenceView(mode) {
    this.prevalenceViewMode = mode;
    
    // Update toggle buttons
    const yoyBtn = document.getElementById('prevalenceYoY');
    const momBtn = document.getElementById('prevalenceMoM');
    const yearFilter = document.getElementById('prevalenceYearFilter');
    
    if (yoyBtn && momBtn) {
      yoyBtn.classList.toggle('active', mode === 'yoy');
      momBtn.classList.toggle('active', mode === 'mom');
    }
    
    if (yearFilter) {
      yearFilter.style.display = mode === 'mom' ? 'block' : 'none';
    }
    
    // Update chart
    this.updatePrevalenceChart();
  }

  // Procedure Analysis 
  createProcedureCodesChart() {
    const ctx = document.getElementById('procedureCodesChart');
    if (!ctx) return;

    const data = this.dashboardData?.procedure_codes?.top_5 || [];
    
    if (this.charts.procedureCodes) {
      this.charts.procedureCodes.destroy();
    }

    this.charts.procedureCodes = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => `${item.code}\n${item.description.substring(0, 15)}...`),
        datasets: [{
          label: 'Patient Count',
          data: data.map(item => item.patients),
          backgroundColor: this.colors.chartColors.slice(0, 5),
          borderColor: this.colors.chartColors.slice(0, 5),
          borderWidth: 1
        }]
      },
      options: this.getBarChartOptions('Top 5 Procedure Codes', 'Patient Count')
    });
  }

  createDrugClassChart() {
    const ctx = document.getElementById('drugClassChart');
    if (!ctx) return;

    const data = this.dashboardData?.procedure_codes?.drug_classes || {
      chemotherapy: 42,
      immunotherapy: 28,
      targeted: 15,
      supportive: 15
    };

    if (this.charts.drugClass) {
      this.charts.drugClass.destroy();
    }

    this.charts.drugClass = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Chemotherapy', 'Immunotherapy', 'Targeted Therapy', 'Supportive Care'],
        datasets: [{
          data: [data.chemotherapy, data.immunotherapy, data.targeted, data.supportive],
          backgroundColor: [this.colors.bronze, this.colors.ateneoBlue, this.colors.paleCerulean, this.colors.weldonBlue],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: this.getDoughnutChartOptions('Drug Class Distribution')
    });
  }

  // HCP/HCO Metrics Charts (source-wise color coding)
  createHcpRenderingChartGrouped() {
    const ctx = document.getElementById('hcpRenderingChartGrouped');
    if (!ctx) return;

    if (this.charts.hcpRendering) this.charts.hcpRendering.destroy();

    // Chart 1: NPI Fill Rate Comparison (DX/PX/RX)
    const labels = ['DX Ref %', 'DX Ren %', 'PX Ref %', 'PX Ren %', 'RX %'];

    // Percentages by source
    const iqvia = [40.23, 90.28, 51.31, 93.38, 99.75];
    const hv = [24.4, 64.96, 20.11, 73.5, 79.55];
    const komodo = [12.54, 79.56, 24.66, 88.4, 96.16];

    // Counts for tooltip context (where available)
    const counts = {
      iqvia: {
        dx_ref: 87548031, dx_ren: 196453363,
        px_ref: 5426392, px_ren: 9874659,
        rx_ref: undefined
      },
      hv: {
        dx_ref: 21737922, dx_ren: 57882657,
        px_ref: 3202204, px_ren: 11706450,
        rx_ref: 1601176
      },
      komodo: {
        dx_ref: 55826765, dx_ren: 354210593,
        px_ref: 3905994, px_ren: 14001386,
        rx_ref: 1556459
      }
    };

    this.charts.hcpRenderingGrouped = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'IQVIA', data: iqvia, backgroundColor: this.colors.sources.iqvia, borderColor: this.colors.sources.iqvia },
          { label: 'HealthVerity', data: hv, backgroundColor: this.colors.sources.healthverity, borderColor: this.colors.sources.healthverity },
          { label: 'Komodo', data: komodo, backgroundColor: this.colors.sources.komodo, borderColor: this.colors.sources.komodo }
        ]
      },
      options: {
        ...this.getBarChartOptions('NPI Fill Rate Comparison (DX/PX/RX) – Source-wise', 'Percentage (%)'),
        plugins: {
          ...this.getBarChartOptions('', '').plugins,
          legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('NPI Fill Rate Comparison (DX/PX/RX) – Source-wise') },
          tooltip: {
            callbacks: {
              label: (context) => {
                const datasetLabel = context.dataset.label || '';
                const idx = context.dataIndex; // 0 DX Ref, 1 DX Ren, 2 PX Ref, 3 PX Ren, 4 RX
                const pct = context.parsed.y;
                const c = counts;
                let extra = '';
                const keyMap = ['dx_ref', 'dx_ren', 'px_ref', 'px_ren', 'rx_ref'];
                const key = keyMap[idx];
                if (datasetLabel === 'IQVIA' && counts.iqvia[key]) extra = ` (npi: ${counts.iqvia[key].toLocaleString()})`;
                if (datasetLabel === 'HealthVerity' && counts.hv[key]) extra = ` (npi: ${counts.hv[key].toLocaleString()})`;
                if (datasetLabel === 'Komodo' && counts.komodo[key]) extra = ` (npi: ${counts.komodo[key].toLocaleString()})`;
                return `${datasetLabel}: ${pct}%${extra}`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Per-source HCP Fill Rate Comparison (DX/PX/RX) – IQVIA
  createHcpRenderingChartIqvia() {
    const ctx = document.getElementById('hcpRenderingChartIqvia');
    if (!ctx) return;

    if (this.charts.hcpRenderingIqvia) this.charts.hcpRenderingIqvia.destroy();

    const labels = ['DX Ref %', 'DX Ren %', 'PX Ref %', 'PX Ren %', 'RX %'];
    const data = [40.23, 90.28, 51.31, 93.38, 99.75];
    const counts = { dx_ref: 87548031, dx_ren: 196453363, px_ref: 5426392, px_ren: 9874659, rx_ref: undefined };

    this.charts.hcpRenderingIqvia = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'IQVIA', data, backgroundColor: this.colors.sources.iqvia, borderColor: this.colors.sources.iqvia }
        ]
      },
      options: {
        ...this.getBarChartOptions('NPI Fill Rate Comparison (DX/PX/RX) – IQVIA', 'Percentage (%)'),
        plugins: {
          ...this.getBarChartOptions('', '').plugins,
          legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('NPI Fill Rate Comparison (DX/PX/RX) – HealthVerity') },
          tooltip: {
            callbacks: {
              label: (context) => {
                const idx = context.dataIndex;
                const pct = context.parsed.y;
                const keyMap = ['dx_ref', 'dx_ren', 'px_ref', 'px_ren', 'rx_ref'];
                const key = keyMap[idx];
                const val = counts[key];
                const extra = val ? ` (npi: ${val.toLocaleString()})` : '';
                return `IQVIA: ${pct}%${extra}`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Per-source HCP Fill Rate Comparison (DX/PX/RX) – HealthVerity
  createHcpRenderingChartHv() {
    const ctx = document.getElementById('hcpRenderingChartHv');
    if (!ctx) return;

    if (this.charts.hcpRenderingHv) this.charts.hcpRenderingHv.destroy();

    const labels = ['DX Ref %', 'DX Ren %', 'PX Ref %', 'PX Ren %', 'RX %'];
    const data = [24.4, 64.96, 20.11, 73.5, 79.55];
    const counts = { dx_ref: 21737922, dx_ren: 57882657, px_ref: 3202204, px_ren: 11706450, rx_ref: 1601176 };

    this.charts.hcpRenderingHv = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'HealthVerity', data, backgroundColor: this.colors.sources.healthverity, borderColor: this.colors.sources.healthverity }
        ]
      },
      options: {
        ...this.getBarChartOptions('NPI Fill Rate Comparison (DX/PX/RX) – HealthVerity', 'Percentage (%)'),
        plugins: {
          ...this.getBarChartOptions('', '').plugins,
          legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('NPI Fill Rate Comparison (DX/PX/RX) – Komodo') },
          tooltip: {
            callbacks: {
              label: (context) => {
                const idx = context.dataIndex;
                const pct = context.parsed.y;
                const keyMap = ['dx_ref', 'dx_ren', 'px_ref', 'px_ren', 'rx_ref'];
                const key = keyMap[idx];
                const val = counts[key];
                const extra = val ? ` (npi: ${val.toLocaleString()})` : '';
                return `HealthVerity: ${pct}%${extra}`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Per-source HCP Fill Rate Comparison (DX/PX/RX) – Komodo
  createHcpRenderingChartKomodo() {
    const ctx = document.getElementById('hcpRenderingChartKomodo');
    if (!ctx) return;

    if (this.charts.hcpRenderingKomodo) this.charts.hcpRenderingKomodo.destroy();

    const labels = ['DX Ref %', 'DX Ren %', 'PX Ref %', 'PX Ren %', 'RX %'];
    const data = [12.54, 79.56, 24.66, 88.4, 96.16];
    const counts = { dx_ref: 55826765, dx_ren: 354210593, px_ref: 3905994, px_ren: 14001386, rx_ref: 1556459 };

    this.charts.hcpRenderingKomodo = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Komodo', data, backgroundColor: this.colors.sources.komodo, borderColor: this.colors.sources.komodo }
        ]
      },
      options: {
        ...this.getBarChartOptions('NPI Fill Rate Comparison (DX/PX/RX) – Komodo', 'Percentage (%)'),
        plugins: {
          ...this.getBarChartOptions('', '').plugins,
          legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('NPI Fill Rate Comparison (DX/PX/RX) – IQVIA') },
          tooltip: {
            callbacks: {
              label: (context) => {
                const idx = context.dataIndex;
                const pct = context.parsed.y;
                const keyMap = ['dx_ref', 'dx_ren', 'px_ref', 'px_ren', 'rx_ref'];
                const key = keyMap[idx];
                const val = counts[key];
                const extra = val ? ` (npi: ${val.toLocaleString()})` : '';
                return `Komodo: ${pct}%${extra}`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  createHcpReferringChart() {
    const ctx = document.getElementById('hcpReferringChart');
    if (!ctx) return;

    if (this.charts.hcpReferring) this.charts.hcpReferring.destroy();

    // Chart 2: HCP vs HCO Identification Split (DX/PX/RX)
    const labels = [
      'DX Ref HCP %', 'DX Ref HCO %', 'DX Ren HCP %', 'DX Ren HCO %',
      'PX Ref HCP %', 'PX Ref HCO %', 'PX Ren HCP %', 'PX Ren HCO %',
      'RX HCP %', 'RX HCO %'
    ];

    // Percentages (HCO inferred as 100 - HCP where needed)
    const iqvia = [
      99.24, 100 - 99.24, 97.02, 100 - 97.02,
      99.13, 100 - 99.13, 97.27, 100 - 97.27,
      99.58, 100 - 99.58
    ];
    const hv = [
      98.83, 100 - 98.83, 93.68, 100 - 93.68,
      98.79, 100 - 98.79, 91.87, 100 - 91.87,
      96.91, 100 - 96.91
    ];
    const komodo = [
      99.92, 100 - 99.92, 100, 0,
      99.5, 100 - 99.5, 100, 0,
      100, 0
    ];

    // Counts for tooltip context (HCP where available)
    const counts = {
      iqvia: {
        dx_ref_hcp: 490571, dx_ref_hco: 3750, dx_ren_hcp: 618451, dx_ren_hco: 19000,
        px_ref_hcp: 101106, px_ren_hcp: 52208,
        rx_hcp: undefined
      },
      hv: {
        dx_ref_hcp: 496413, dx_ref_hco: 5875, dx_ren_hcp: 754760, dx_ren_hco: 50884,
        px_ref_hcp: 96635, px_ren_hcp: 62851,
        rx_hcp: 25841
      },
      komodo: {
        dx_ref_hcp: 497015, dx_ref_hco: 393, dx_ren_hcp: 837975, dx_ren_hco: 0,
        px_ref_hcp: 107100, px_ren_hcp: 89683,
        rx_hcp: 21014
      }
    };

    this.charts.hcpReferring = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'IQVIA', data: iqvia, backgroundColor: this.colors.sources.iqvia, borderColor: this.colors.sources.iqvia },
          { label: 'HealthVerity', data: hv, backgroundColor: this.colors.sources.healthverity, borderColor: this.colors.sources.healthverity },
          { label: 'Komodo', data: komodo, backgroundColor: this.colors.sources.komodo, borderColor: this.colors.sources.komodo }
        ]
      },
      options: {
        ...this.getBarChartOptions('HCP vs HCO Identification Split (DX/PX/RX)', 'Percentage (%)'),
        plugins: {
          ...this.getBarChartOptions('', '').plugins,
          legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('HCP vs HCO Identification Split (DX/PX/RX)') },
          tooltip: {
            callbacks: {
              label: (context) => {
                const idx = context.dataIndex;
                const datasetLabel = context.dataset.label || '';
                const pct = context.parsed.y;
                const c = counts;
                const keyMap = [
                  'dx_ref_hcp','dx_ref_hco','dx_ren_hcp','dx_ren_hco',
                  'px_ref_hcp','px_ref_hco','px_ren_hcp','px_ren_hco',
                  'rx_hcp','rx_hco'
                ];
                const key = keyMap[idx];
                let extra = '';
                const val = datasetLabel === 'IQVIA' ? c.iqvia[key]
                  : datasetLabel === 'HealthVerity' ? c.hv[key]
                  : c.komodo[key];
                if (val !== undefined) extra = ` (npi: ${val.toLocaleString()})`;
                return `${datasetLabel}: ${pct}%${extra}`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  createHcoFillrateChartGrouped() {
    const ctx = document.getElementById('hcoFillrateChartGrouped');
    if (!ctx) return;

    if (this.charts.hcoFillrateGrouped) this.charts.hcoFillrateGrouped.destroy();

    const labels = ['DX Ref HCO %', 'DX Ren HCO %', 'PX Ref HCO %', 'PX Ren HCO %', 'RX HCO %'];

    const iqvia = [0.76, 2.98, 0.87, 2.73, 0.42];
    const hv = [1.17, 6.32, 1.21, 8.13, 3.09];
    const komodo = [0.08, 0, 0.5, 0, 0];

    const counts = {
      iqvia: { dx_ref: 3750, dx_ren: 19000, px_ref: 891, px_ren: 1464, rx: 78 },
      hv: { dx_ref: 5875, dx_ren: 50884, px_ref: 1182, px_ren: 5560, rx: 825 },
      komodo: { dx_ref: 393, dx_ren: undefined, px_ref: 540, px_ren: undefined, rx: undefined }
    };

    this.charts.hcoFillrateGrouped = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'IQVIA – Identified as HCO', data: iqvia, backgroundColor: this.colors.sources.iqvia, borderColor: this.colors.sources.iqvia },
          { label: 'HealthVerity – Identified as HCO', data: hv, backgroundColor: this.colors.sources.healthverity, borderColor: this.colors.sources.healthverity },
          { label: 'Komodo – Identified as HCO', data: komodo, backgroundColor: this.colors.sources.komodo, borderColor: this.colors.sources.komodo }
        ]
      },
      options: {
        ...this.getBarChartOptions('HCO Identification (DX/PX/RX) – Source-wise', 'Percentage (%)'),
        plugins: {
          ...this.getBarChartOptions('', '').plugins,
          legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('HCO Identification (DX/PX/RX) – Source-wise') },
          tooltip: {
            callbacks: {
              label: (context) => {
                const datasetLabel = context.dataset.label || '';
                const idx = context.dataIndex;
                const pct = context.parsed.y;
                const keyMap = ['dx_ref', 'dx_ren', 'px_ref', 'px_ren', 'rx'];
                const key = keyMap[idx];
                let extra = '';
                if (datasetLabel.startsWith('IQVIA') && counts.iqvia[key] !== undefined) extra = ` (npi: ${counts.iqvia[key].toLocaleString()})`;
                if (datasetLabel.startsWith('HealthVerity') && counts.hv[key] !== undefined) extra = ` (npi: ${counts.hv[key].toLocaleString()})`;
                if (datasetLabel.startsWith('Komodo') && counts.komodo[key] !== undefined) extra = ` (npi: ${counts.komodo[key].toLocaleString()})`;
                return `${datasetLabel}: ${pct}%${extra}`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  createHcoFacilityChart() {
    const ctx = document.getElementById('hcoFacilityChart');
    if (!ctx) return;

    const metrics = this.dashboardData?.hcp_hco_metrics?.hco_fill_anomaly;
    if (!metrics) return;

    if (this.charts.hcoFacility) this.charts.hcoFacility.destroy();

    const labels = ['Fill Rate %', 'Anomaly %'];
    const iqvia = [metrics.facility.iqvia, metrics.anomalies.facility.iqvia];
    const hv = [metrics.facility.healthverity, metrics.anomalies.facility.healthverity];
    const komodo = [metrics.facility.komodo, metrics.anomalies.facility.komodo];

    this.charts.hcoFacility = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'IQVIA', data: iqvia, backgroundColor: this.colors.sources.iqvia, borderColor: this.colors.sources.iqvia },
          { label: 'HealthVerity', data: hv, backgroundColor: this.colors.sources.healthverity, borderColor: this.colors.sources.healthverity },
          { label: 'Komodo', data: komodo, backgroundColor: this.colors.sources.komodo, borderColor: this.colors.sources.komodo }
        ]
      },
      options: {
        ...this.getBarChartOptions('HCO Facility Metrics', 'Percentage (%)'),
        plugins: { ...this.getBarChartOptions('', '').plugins, legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('HCO Facility Metrics') } }
      }
    });
  }

  createTopRenderingSpecialtiesChart() {
    const container = document.getElementById('topRenderingSpecialtiesChart');
    if (!container) return;

    const rows = this.dashboardData?.hcp_hco_metrics?.top_rendering_specialties || [];
    if (this.charts.topRenderingSpecialties) {
      this.charts.topRenderingSpecialties.destroy?.();
      this.charts.topRenderingSpecialties = undefined;
    }

    const sources = ['IQVIA', 'HealthVerity', 'Komodo'];
    const tableWrap = document.createElement('div');
    tableWrap.className = 'claims-table-wrap';
    const table = document.createElement('table');
    table.className = 'claims-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const thLabel = document.createElement('th');
    thLabel.textContent = 'Specialty';
    headerRow.appendChild(thLabel);
    sources.forEach(s => {
      const th = document.createElement('th');
      th.textContent = s;
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    rows.forEach(r => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.className = 'claims-type-label';
      tdName.textContent = r.name;
      tr.appendChild(tdName);

      const vals = [r.iqvia, r.healthverity, r.komodo];
      const sourceKeys = ['iqvia','healthverity','komodo'];
      vals.forEach((v, idx) => {
        const td = document.createElement('td');
        td.style.textAlign = 'center';
        const pill = document.createElement('div');
        pill.className = 'claim-pill source-' + (sourceKeys[idx]);
        pill.innerHTML = `<span class="marker"></span><span>${(v ?? 0).toLocaleString()}</span>`;
        td.appendChild(pill);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    container.parentElement.replaceChild(tableWrap, container);
  }

  createTopReferringSpecialtiesChart() {
    const container = document.getElementById('topReferringSpecialtiesChart');
    if (!container) return;

    const rows = this.dashboardData?.hcp_hco_metrics?.top_referring_specialties || [];
    if (this.charts.topReferringSpecialties) {
      this.charts.topReferringSpecialties.destroy?.();
      this.charts.topReferringSpecialties = undefined;
    }

    const sources = ['IQVIA', 'HealthVerity', 'Komodo'];
    const tableWrap = document.createElement('div');
    tableWrap.className = 'claims-table-wrap';
    const table = document.createElement('table');
    table.className = 'claims-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const thLabel = document.createElement('th');
    thLabel.textContent = 'Specialty';
    headerRow.appendChild(thLabel);
    sources.forEach(s => {
      const th = document.createElement('th');
      th.textContent = s;
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    rows.forEach(r => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.className = 'claims-type-label';
      tdName.textContent = r.name;
      tr.appendChild(tdName);

      const vals = [r.iqvia, r.healthverity, r.komodo];
      const sourceKeys = ['iqvia','healthverity','komodo'];
      vals.forEach((v, idx) => {
        const td = document.createElement('td');
        td.style.textAlign = 'center';
        const pill = document.createElement('div');
        pill.className = 'claim-pill source-' + (sourceKeys[idx]);
        pill.innerHTML = `<span class=\"marker\"></span><span>${(v ?? 0).toLocaleString()}</span>`;
        td.appendChild(pill);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    container.parentElement.replaceChild(tableWrap, container);
  }

  createTopPrescriberSpecialtiesChart() {
    const ctx = document.getElementById('topPrescriberSpecialtiesChart');
    if (!ctx) return;
    const rows = this.dashboardData?.hcp_hco_metrics?.top_prescriber_specialties || [];
    if (this.charts.topPrescriberSpecialties) this.charts.topPrescriberSpecialties.destroy();

    const labels = rows.map(r => r.name);
    const iqvia = rows.map(r => r.iqvia);
    const hv = rows.map(r => r.healthverity);
    const komodo = rows.map(r => r.komodo);

    this.charts.topPrescriberSpecialties = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [
        { label: 'IQVIA', data: iqvia, backgroundColor: this.colors.sources.iqvia },
        { label: 'HealthVerity', data: hv, backgroundColor: this.colors.sources.healthverity },
        { label: 'Komodo', data: komodo, backgroundColor: this.colors.sources.komodo }
      ] },
      options: { ...this.getBarChartOptions('Top Prescriber Specialties by Patient Count', 'Patients'), indexAxis: 'y', plugins: { ...this.getBarChartOptions('', '').plugins, legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('Top Prescriber Specialties by Patient Count') } } }
    });
  }

  createTopBillingNpiChart() {
    const container = document.getElementById('topBillingNpiChart');
    if (!container) return;

    const rows = this.dashboardData?.hcp_hco_metrics?.top_billing_npis || [];
    if (this.charts.topBillingNpi) {
      this.charts.topBillingNpi.destroy?.();
      this.charts.topBillingNpi = undefined;
    }

    const sources = ['IQVIA', 'HealthVerity', 'Komodo'];
    const tableWrap = document.createElement('div');
    tableWrap.className = 'claims-table-wrap';
    const table = document.createElement('table');
    table.className = 'claims-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const thLabel = document.createElement('th');
    thLabel.textContent = 'Billing NPI';
    headerRow.appendChild(thLabel);
    sources.forEach(s => {
      const th = document.createElement('th');
      th.textContent = s;
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    rows.forEach(r => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.className = 'claims-type-label';
      tdName.textContent = r.npi;
      tr.appendChild(tdName);

      const vals = [r.iqvia, r.healthverity, r.komodo];
      const sourceKeys = ['iqvia','healthverity','komodo'];
      vals.forEach((v, idx) => {
        const td = document.createElement('td');
        td.style.textAlign = 'center';
        const pill = document.createElement('div');
        pill.className = 'claim-pill source-' + (sourceKeys[idx]);
        pill.innerHTML = `<span class=\"marker\"></span><span>${(v ?? 0).toLocaleString()}</span>`;
        td.appendChild(pill);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    container.parentElement.replaceChild(tableWrap, container);
  }

  createTopFacilityNpiChart() {
    const container = document.getElementById('topFacilityNpiChart');
    if (!container) return;

    const rows = this.dashboardData?.hcp_hco_metrics?.top_facility_npis || [];
    if (this.charts.topFacilityNpi) {
      this.charts.topFacilityNpi.destroy?.();
      this.charts.topFacilityNpi = undefined;
    }

    const sources = ['IQVIA', 'HealthVerity', 'Komodo'];
    const tableWrap = document.createElement('div');
    tableWrap.className = 'claims-table-wrap';
    const table = document.createElement('table');
    table.className = 'claims-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const thLabel = document.createElement('th');
    thLabel.textContent = 'Facility NPI';
    headerRow.appendChild(thLabel);
    sources.forEach(s => {
      const th = document.createElement('th');
      th.textContent = s;
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    rows.forEach(r => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.className = 'claims-type-label';
      tdName.textContent = r.npi;
      tr.appendChild(tdName);

      const vals = [r.iqvia, r.healthverity, r.komodo];
      const sourceKeys = ['iqvia','healthverity','komodo'];
      vals.forEach((v, idx) => {
        const td = document.createElement('td');
        td.style.textAlign = 'center';
        const pill = document.createElement('div');
        pill.className = 'claim-pill source-' + (sourceKeys[idx]);
        pill.innerHTML = `<span class=\"marker\"></span><span>${(v ?? 0).toLocaleString()}</span>`;
        td.appendChild(pill);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    container.parentElement.replaceChild(tableWrap, container);
  }

  // Diagnosis Analysis Charts
  createOtherMetricsCharts() {
    this.createTopProductsMxRxCharts();
    this.createTopProductsCombinedChart();
    this.createTopProductsYoyCharts();
    this.createClaimsStatusSplit();
    this.createMbCodesProvidedVsVisible();
    this.createTopDiagnosisCodes();
    this.createTopProcedureCodes();
    this.createPatientSplitByPayer();
  }

  createTopProductsMxRxCharts() {
    const data = this.dashboardData?.other_metrics?.top_products_mx_rx;
    if (!data) return;
    
    // Brand colors for specific drugs
    const brandColors = {
      'PARAPLATIN': '#005587',
      'KEYTRUDA': '#007378',
      'TAXOL': '#490A3D',
      'VP-16': '#00314D',
      'OPDIVO': '#184D90',
      'PLATINOL-AQ': '#003366',
      'ALIMTA': '#28B463',
      'AVASTIN': '#61367C',
      'IMFINZI': '#A50935',
      'TECENTRIQ': '#004976'
    };
    
    const canvas = document.getElementById('topProductsLineChart');
    if (!canvas) return;
    
    // Initialize with Mx data (default)
    this.mxRxViewMode = 'mx';
    this.createLineChart(canvas, data, brandColors, 'mx');
    
    // Initialize toggle functionality
    this.initializeMxRxToggle();
  }
  
  createLineChart(canvas, data, brandColors, dataType) {
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (this.charts['topProductsLineChart']) {
      this.charts['topProductsLineChart'].destroy();
    }
    
    // Sources on X-axis
    const sources = ['IQVIA', 'HealthVerity', 'Komodo'];
    const sourceData = [data.iqvia, data.healthverity, data.komodo];
    
    // Helper: convert hex or rgb to rgba with given alpha
    const toRgba = (color, alpha) => {
      if (!color) return `rgba(99, 102, 241, ${alpha})`;
      if (color.startsWith('rgb')) {
        return color.replace(/rgba?\(([^)]+)\)/, (m, inner) => {
          const parts = inner.split(',').map(s => s.trim());
          const [r, g, b] = parts;
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        });
      }
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Create datasets for each drug
    const datasets = data.iqvia.labels.map((drug, index) => {
      const drugData = sources.map((source, sourceIndex) => {
        const sourceInfo = sourceData[sourceIndex];
        return sourceInfo[dataType][index];
      });
      
      const baseColor = brandColors[drug.toUpperCase()] || this.getRandomColor();
      return {
        label: drug,
        data: drugData,
        borderColor: toRgba(baseColor, 0.6),
        backgroundColor: toRgba(baseColor, 0.15),
        borderWidth: 2,
        pointBackgroundColor: toRgba(baseColor, 0.35),
        pointBorderColor: toRgba(baseColor, 0.6),
        fill: false,
        tension: 0.1
      };
    });
    
    const chart = new Chart(ctx, {
      type: 'line',
        data: {
        labels: sources,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Top 10 Products by Patient Count – ${dataType.toUpperCase()}`,
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          subtitle: {
            display: true,
            text: 'Click legend to show individual lines • Use "Show All" button to reset',
            font: {
              size: 12,
              style: 'italic'
            },
            color: '#666'
          },
          legend: {
            display: true,
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 20,
              boxWidth: 12,
              boxHeight: 12
            },
            onClick: (e, legendItem, legend) => {
              const chart = legend.chart;
              const index = legendItem.datasetIndex;
              
              // Hide all datasets first
              chart.data.datasets.forEach((dataset, i) => {
                chart.getDatasetMeta(i).hidden = true;
              });
              
              // Show only the clicked dataset
              chart.getDatasetMeta(index).hidden = false;
              
              chart.update();
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Data Sources'
            },
            grid: {
              display: true
            }
          },
          y: {
            title: {
              display: true,
              text: 'Patient Count'
            },
            beginAtZero: true,
            grid: {
              display: true
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
    
    this.charts['topProductsLineChart'] = chart;
  }
  
  getRandomColor() {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Initialize Mx vs Rx Chart Toggle
  initializeMxRxToggle() {
    const mxBtn = document.getElementById('mxBtn');
    const rxBtn = document.getElementById('rxBtn');
    const showAllBtn = document.getElementById('showAllBtn');
    const title = document.getElementById('mxRxChartTitle');
    
    if (!mxBtn || !rxBtn || !showAllBtn || !title) return;

    // Set initial state (Mx is default)
    this.mxRxViewMode = 'mx';
    
    // Add event listeners
    mxBtn.addEventListener('click', () => {
      if (this.mxRxViewMode === 'mx') return;
      
      this.mxRxViewMode = 'mx';
      mxBtn.classList.add('active');
      rxBtn.classList.remove('active');
      title.textContent = 'Top 10 Products by Patient Count – Mx';
      this.updateLineChart('mx');
    });
    
    rxBtn.addEventListener('click', () => {
      if (this.mxRxViewMode === 'rx') return;
      
      this.mxRxViewMode = 'rx';
      rxBtn.classList.add('active');
      mxBtn.classList.remove('active');
      title.textContent = 'Top 10 Products by Patient Count – Rx';
      this.updateLineChart('rx');
    });
    
    showAllBtn.addEventListener('click', () => {
      const chart = this.charts['topProductsLineChart'];
      if (chart) {
        // Show all datasets
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).hidden = false;
        });
        chart.update();
      }
    });
  }
  
  updateLineChart(dataType) {
    const data = this.dashboardData?.other_metrics?.top_products_mx_rx;
    if (!data) return;
    
    // Brand colors for specific drugs
    const brandColors = {
      'PARAPLATIN': '#005587',
      'KEYTRUDA': '#007378',
      'TAXOL': '#490A3D',
      'VP-16': '#00314D',
      'OPDIVO': '#184D90',
      'PLATINOL-AQ': '#003366',
      'ALIMTA': '#28B463',
      'AVASTIN': '#61367C',
      'IMFINZI': '#A50935',
      'TECENTRIQ': '#004976'
    };
    
    const canvas = document.getElementById('topProductsLineChart');
    if (!canvas) return;
    
    this.createLineChart(canvas, data, brandColors, dataType);
  }

  createTopProductsCombinedChart() {
    const ctx = document.getElementById('topProductsCombined'); if (!ctx) return;
    const data = this.dashboardData?.other_metrics?.top_products_combined; if (!data) return;
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          { label: 'IQVIA', data: data.iqvia, backgroundColor: this.colors.sources.iqvia },
          { label: 'HealthVerity', data: data.healthverity, backgroundColor: this.colors.sources.healthverity },
          { label: 'Komodo', data: data.komodo, backgroundColor: this.colors.sources.komodo }
        ]
      },
      options: { ...this.getBarChartOptions('Top 10 Products – Combined (Mx + Rx)', 'Patients'), plugins: { ...this.getBarChartOptions('', '').plugins, legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('Top 10 Products – Combined (Mx + Rx)') } } }
    });
  }

  createTopProductsYoyCharts() {
    const data = this.dashboardData?.other_metrics?.top_products_yoy;
    if (!data) return;

    // Brand colors for specific drugs - consistent across all data sources
    const brandColors = {
      'PARAPLATIN': '#005587',    // Blue
      'KEYTRUDA': '#007378',      // Teal/green
      'TAXOL': '#490A3D',         // Purple/violet
      'VP-16': '#00314D',         // Navy
      'OPDIVO': '#184D90',        // Royal blue
      'PLATINOL-AQ': '#003366',   // Blue/gray (primary)
      'ALIMTA': '#28B463',        // Bright teal green
      'AVASTIN': '#61367C',       // Purple
      'IMFINZI': '#A50935',       // Maroon
      'TECENTRIQ': '#004976'      // Deep blue
    };

    // Fallback colors for drugs not in brand colors list
    const fallbackColors = [
      '#FF6B6B', // Coral red
      '#4ECDC4', // Turquoise
      '#45B7D1', // Sky blue
      '#96CEB4', // Mint green
      '#FFEAA7', // Soft yellow
      '#DDA0DD', // Plum
      '#98D8C8', // Seafoam
      '#F7DC6F', // Golden yellow
      '#BB8FCE', // Light purple
      '#85C1E9'  // Light blue
    ];

    // Helper to get fallback color for drugs not in brand colors
    const getFallbackColor = (index) => {
      return fallbackColors[index % fallbackColors.length];
    };

    const makeLine = (elId, sourceData, baseColor, sourceName) => {
      const ctx = document.getElementById(elId);
      if (!ctx) return;
      const products = (sourceData.products || []).slice(0, 5); // Only top 5 products
      if (!products.length) return;

      // Assign colors to products - use brand colors when available, fallback colors otherwise
      const palette = products.map((product, idx) => {
        const upperName = product.name.toUpperCase();
        return brandColors[upperName] || getFallbackColor(idx);
      });

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.years,
          datasets: products.map((product, idx) => ({
            label: product.name,
            data: product.patient_counts,
            borderColor: palette[idx],
            backgroundColor: palette[idx] + '20',
            borderWidth: 3,
            tension: 0.35,
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: palette[idx],
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          }))
        },
        options: {
          ...this.getLineChartOptions(`YoY Trend – Top 5 Products (${sourceName})`, 'Patients'),
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'start',
              onClick: this.getSingleItemLegendClickHandler(`YoY Trend – Top 5 Products (${sourceName})`),
              labels: {
                usePointStyle: false,
                padding: 15,
                font: {
                  size: 12,
                  family: 'Roboto, sans-serif'
                },
                color: '#374151',
                boxWidth: 20,
                boxHeight: 3,
                generateLabels: function(chart) {
                  const original = Chart.defaults.plugins.legend.labels.generateLabels;
                  const labels = original.call(this, chart);
                  
                  // Customize the legend labels to show proper line colors
                  labels.forEach((label, index) => {
                    const dataset = chart.data.datasets[index];
                    if (dataset) {
                      label.fillStyle = dataset.borderColor;
                      label.strokeStyle = dataset.borderColor;
                      label.lineWidth = 3;
                    }
                  });
                  
                  return labels;
                }
              }
            }
          }
        }
      });
      
      return chart;
    };

    // Create all charts and store references
    this.charts.topProductsYoyIqvia = makeLine('topProductsYoyIqvia', data.iqvia, this.colors.sources.iqvia, 'IQVIA');
    this.charts.topProductsYoyHv = makeLine('topProductsYoyHv', data.healthverity, this.colors.sources.healthverity, 'HealthVerity');
    this.charts.topProductsYoyKomodo = makeLine('topProductsYoyKomodo', data.komodo, this.colors.sources.komodo, 'Komodo');
  }


  createClaimsStatusSplit() {
    const ctx = document.getElementById('claimsStatusSplit'); if (!ctx) return;
    const s = this.dashboardData?.other_metrics?.claims_status_split; if (!s) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Paid','Rejected','Reversed'],
        datasets: [
          { 
            label: 'IQVIA', 
            data: [
              s.iqvia.paid?.pt_cnt || 0, 
              s.iqvia.rejected?.pt_cnt || 0, 
              s.iqvia.reversed?.pt_cnt || 0
            ], 
            backgroundColor: this.colors.sources.iqvia 
          },
          { 
            label: 'HealthVerity', 
            data: [
              s.healthverity.paid?.pt_cnt || 0, 
              s.healthverity.rejected?.pt_cnt || 0, 
              s.healthverity.reversed?.pt_cnt || 0
            ], 
            backgroundColor: this.colors.sources.healthverity 
          },
          { 
            label: 'Komodo', 
            data: [
              s.komodo.paid?.pt_cnt || 0, 
              s.komodo.rejected?.pt_cnt || 0, 
              s.komodo.reversed?.pt_cnt || 0
            ], 
            backgroundColor: this.colors.sources.komodo 
          }
        ]
      },
      options: { 
        ...this.getBarChartOptions('Claims Status Split – Paid vs Rejected vs Reversed', 'Patient Count'), 
        plugins: { 
          ...this.getBarChartOptions('', '').plugins, 
          legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('Claims Status Split – Paid vs Rejected vs Reversed') } 
        }, 
        scales: { y: { beginAtZero: true } } 
      }
    });
  }

  createMbCodesProvidedVsVisible() {
    const ctx = document.getElementById('mbCodesProvidedVsVisible'); if (!ctx) return;
    const data = this.dashboardData?.other_metrics?.mb_codes_provided_vs_visible; if (!data) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,  
        datasets: [
          { label: 'Provided (IQVIA)', data: data.provided.iqvia, backgroundColor: this.shadeColor(this.colors.sources.iqvia, -10) },
          { label: 'Visible (IQVIA)', data: data.visible.iqvia, backgroundColor: this.colors.sources.iqvia },
          { label: 'Provided (HV)', data: data.provided.healthverity, backgroundColor: this.shadeColor(this.colors.sources.healthverity, -10) },
          { label: 'Visible (HV)', data: data.visible.healthverity, backgroundColor: this.colors.sources.healthverity },
          { label: 'Provided (Komodo)', data: data.provided.komodo, backgroundColor: this.shadeColor(this.colors.sources.komodo, -10) },
          { label: 'Visible (Komodo)', data: data.visible.komodo, backgroundColor: this.colors.sources.komodo }
        ]
      },
      options: { ...this.getBarChartOptions('MB Codes Provided vs Visible in Data', 'Count'), plugins: { ...this.getBarChartOptions('', '').plugins, legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('MB Codes Provided vs Visible in Data') } } }
    });
  }

  createTopDiagnosisCodes() {
    const ctx = document.getElementById('topDiagnosisCodes'); if (!ctx) return;
    const data = this.dashboardData?.other_metrics?.top_diagnosis_codes; if (!data) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          { label: 'IQVIA', data: data.iqvia, backgroundColor: this.colors.sources.iqvia },
          { label: 'HealthVerity', data: data.healthverity, backgroundColor: this.colors.sources.healthverity },
          { label: 'Komodo', data: data.komodo, backgroundColor: this.colors.sources.komodo }
        ]
      },
      options: { ...this.getBarChartOptions('Top Diagnosis Codes – Patient Count', 'Patients'), indexAxis: 'y', plugins: { ...this.getBarChartOptions('', '').plugins, legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('Top Diagnosis Codes – Patient Count') } } }
    });
  }

  createTopProcedureCodes() {
    const ctx = document.getElementById('topProcedureCodes'); if (!ctx) return;
    const data = this.dashboardData?.other_metrics?.top_procedure_codes; if (!data) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          { label: 'IQVIA', data: data.iqvia, backgroundColor: this.colors.sources.iqvia },
          { label: 'HealthVerity', data: data.healthverity, backgroundColor: this.colors.sources.healthverity },
          { label: 'Komodo', data: data.komodo, backgroundColor: this.colors.sources.komodo }
        ]
      },
      options: { ...this.getBarChartOptions('Top Procedure Codes – Patient Count', 'Patients'), indexAxis: 'y', plugins: { ...this.getBarChartOptions('', '').plugins, legend: { display: true, position: 'top', onClick: this.getSingleItemLegendClickHandler('Top Procedure Codes – Patient Count') } } }
    });
  }

  createPatientSplitByPayer() {
    const data = this.dashboardData?.other_metrics?.payer_split;
    if (!data) return;
    
    const canvas = document.getElementById('payerSplitLineChart');
    if (!canvas) return;
    
    // Initialize with DX data (default)
    this.payerViewMode = 'dx';
    this.createPayerLineChart(canvas, data, 'dx');
    
    // Initialize toggle functionality
    this.initializePayerSplitToggle();
  }
  
  createPayerLineChart(canvas, data, dataType) {
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (this.charts['payerSplitLineChart']) {
      this.charts['payerSplitLineChart'].destroy();
    }
    
    // Sources on X-axis
    const sources = ['IQVIA', 'HealthVerity', 'Komodo'];
    const sourceData = [data[dataType]?.iqvia || [], data[dataType]?.healthverity || [], data[dataType]?.komodo || []];
    const labels = data[dataType]?.labels || ['Commercial', 'Medicare', 'Medicaid', 'Other', 'NULL'];
    
    // Create datasets for each payer type
    const datasets = labels.map((payer, index) => {
      const payerData = sources.map((source, sourceIndex) => {
        return sourceData[sourceIndex][index] || 0;
      });
      
      // Different colors for each payer type
      const payerColors = {
        'Commercial': '#1F77B4',
        'Medicare': '#FF7F0E', 
        'Medicaid': '#2CA02C',
        'Other': '#D62728',
        'NULL': '#9467BD'
      };
      
      return {
        label: payer,
        data: payerData,
        borderColor: payerColors[payer] || this.getRandomColor(),
        backgroundColor: payerColors[payer] || this.getRandomColor(),
        borderWidth: 2,
        fill: false,
        tension: 0.1
      };
    });
    
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sources,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Patient Split by Payer Type – ${dataType.toUpperCase()}`,
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          subtitle: {
            display: true,
            text: 'Click legend to show individual lines • Use "Show All" button to reset',
            font: {
              size: 12,
              style: 'italic'
            },
            color: '#666'
          },
          legend: {
            display: true,
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 20,
              boxWidth: 12,
              boxHeight: 12,
              onClick: this.getSingleItemLegendClickHandler(`Patient Split by Payer Type – ${dataType.toUpperCase()}`)
            },
            onClick: (e, legendItem, legend) => {
              const chart = legend.chart;
              const index = legendItem.datasetIndex;
              
              // Hide all datasets first
              chart.data.datasets.forEach((dataset, i) => {
                chart.getDatasetMeta(i).hidden = true;
              });
              
              // Show only the clicked dataset
              chart.getDatasetMeta(index).hidden = false;
              
              chart.update();
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Data Sources'
            },
            grid: {
              display: true
            }
          },
          y: {
            title: {
              display: true,
              text: 'Patient Count'
            },
            beginAtZero: true,
            grid: {
              display: true
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
    
    this.charts['payerSplitLineChart'] = chart;
  }

  // Toggle for Patient Split by Payer
  initializePayerSplitToggle() {
    const dxBtn = document.getElementById('payerDxBtn');
    const pxBtn = document.getElementById('payerPxBtn');
    const rxBtn = document.getElementById('payerRxBtn');
    const showAllBtn = document.getElementById('payerShowAllBtn');
    const title = document.getElementById('payerSplitTitle');
    
    if (!dxBtn || !pxBtn || !rxBtn || !showAllBtn || !title) return;

    // Set initial state (DX is default)
    this.payerViewMode = 'dx';
    
    // Add event listeners
    dxBtn.addEventListener('click', () => {
      if (this.payerViewMode === 'dx') return;
      
      this.payerViewMode = 'dx';
      dxBtn.classList.add('active');
      pxBtn.classList.remove('active');
      rxBtn.classList.remove('active');
      title.textContent = 'Patient Split by Payer Type – DX';
      this.updatePayerLineChart('dx');
    });
    
    pxBtn.addEventListener('click', () => {
      if (this.payerViewMode === 'px') return;
      
      this.payerViewMode = 'px';
      pxBtn.classList.add('active');
      dxBtn.classList.remove('active');
      rxBtn.classList.remove('active');
      title.textContent = 'Patient Split by Payer Type – PX';
      this.updatePayerLineChart('px');
    });
    
    rxBtn.addEventListener('click', () => {
      if (this.payerViewMode === 'rx') return;
      
      this.payerViewMode = 'rx';
      rxBtn.classList.add('active');
      dxBtn.classList.remove('active');
      pxBtn.classList.remove('active');
      title.textContent = 'Patient Split by Payer Type – RX';
      this.updatePayerLineChart('rx');
    });
    
    showAllBtn.addEventListener('click', () => {
      const chart = this.charts['payerSplitLineChart'];
      if (chart) {
        // Show all datasets
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).hidden = false;
        });
        chart.update();
      }
    });
  }
  
  updatePayerLineChart(dataType) {
    const data = this.dashboardData?.other_metrics?.payer_split;
    if (!data) return;
    
    const canvas = document.getElementById('payerSplitLineChart');
    if (!canvas) return;
    
    this.createPayerLineChart(canvas, data, dataType);
  }

  shadeColor(hex, percent) {
    const f = parseInt(hex.slice(1), 16), t = percent < 0 ? 0 : 255, p = Math.abs(percent) / 100,
      R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    const to = (c) => Math.round((t - c) * p + c);
    return '#' + (0x1000000 + (to(R) << 16) + (to(G) << 8) + to(B)).toString(16).slice(1);
  }

  // Provider Landscape Charts
  createProviderSpecialtyChart() {
    const ctx = document.getElementById('providerSpecialtyChart');
    if (!ctx) return;

    const data = this.dashboardData?.provider_data?.specialties || {
      oncology: 42,
      pulmonology: 28,
      internal_medicine: 18,
      hematology: 8,
      other: 4
    };

    if (this.charts.providerSpecialty) {
      this.charts.providerSpecialty.destroy();
    }

    this.charts.providerSpecialty = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Oncology', 'Pulmonology', 'Internal Medicine', 'Hematology', 'Other'],
        datasets: [{
          data: [data.oncology, data.pulmonology, data.internal_medicine, data.hematology, data.other],
          backgroundColor: this.colors.chartColors.slice(0, 5),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: this.getDoughnutChartOptions('Provider Specialty Distribution')
    });
  }

  createNPICompletenessChart() {
    const ctx = document.getElementById('npiCompletenessChart');
    if (!ctx) return;

    const data = this.dashboardData?.provider_data?.npi_completeness || {
      billing: 85,
      rendering: 82,
      prescriber: 75,
      facility: 28
    };

    if (this.charts.npiCompleteness) {
      this.charts.npiCompleteness.destroy();
    }

    this.charts.npiCompleteness = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Billing NPI', 'Rendering NPI', 'Prescriber NPI', 'Facility NPI'],
        datasets: [{
          label: 'Completeness (%)',
          data: [data.billing, data.rendering, data.prescriber, data.facility],
          backgroundColor: this.colors.chartColors.slice(0, 4),
          borderColor: this.colors.chartColors.slice(0, 4),
          borderWidth: 1
        }]
      },
      options: this.getBarChartOptions('NPI Completeness by Type', 'Completeness (%)')
    });
  }

  // Demographics Charts
  createAgeDistributionChart() {
    const ctx = document.getElementById('ageDistributionChart');
    if (!ctx) return;

    const data = this.dashboardData?.demographics?.age_distribution || {};

    if (this.charts.ageDistribution) {
      this.charts.ageDistribution.destroy();
    }

    // Create datasets for each data source
    const datasets = [];
    const dataSources = ['komodo', 'healthverity', 'iqvia'];
    const sourceColors = [this.colors.bronze, this.colors.ateneoBlue, this.colors.paleCerulean];
    const sourceLabels = ['Komodo', 'HealthVerity', 'IQVIA'];

    dataSources.forEach((source, index) => {
      const sourceData = data[source] || {};
      datasets.push({
        label: sourceLabels[index],
        data: [
          sourceData['0-17'] || 0,
          sourceData['18-24'] || 0,
          sourceData['25-59'] || 0,
          sourceData['60-74'] || 0,
          sourceData['75+'] || 0,
          sourceData['NULL'] || 0
        ],
        backgroundColor: sourceColors[index],
        borderWidth: 1
      });
    });

    this.charts.ageDistribution = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['0-17', '18-24', '25-59', '60-74', '75+', 'Unknown'],
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Age Distribution Analysis by Data Source'
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Age Group'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Patient Count'
            }
          }
        }
      }
    });
  }

  createGeographicMap() {
    const mapContainer = document.getElementById('geographicMap');
    if (!mapContainer) return;

    // Destroy existing map if it exists
    if (this.geographicMap) {
      this.geographicMap.remove();
    }

    const data = this.dashboardData?.demographics?.geographic_distribution || {};

    // Create the map centered on the US
    this.geographicMap = L.map('geographicMap').setView([39.8283, -98.5795], 4);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.geographicMap);

    // State coordinates mapping (using state abbreviations)
    const stateCoordinates = {
      'AL': [32.806671, -86.791130], 'AK': [61.370716, -152.404419], 'AZ': [33.729759, -111.431221],
      'AR': [34.969704, -92.373123], 'CA': [36.116203, -119.681564], 'CO': [39.059811, -105.311104],
      'CT': [41.597782, -72.755371], 'DE': [39.318523, -75.507141], 'FL': [27.766279, -81.686783],
      'GA': [33.040619, -83.643074], 'HI': [21.094318, -157.498337], 'ID': [44.240459, -114.478828],
      'IL': [40.349457, -88.986137], 'IN': [39.790942, -86.147685], 'IA': [42.011539, -93.210526],
      'KS': [38.526600, -96.726486], 'KY': [37.668140, -84.670067], 'LA': [31.169546, -91.867805],
      'ME': [44.323535, -69.765261], 'MD': [39.063946, -76.802101], 'MA': [42.230171, -71.530106],
      'MI': [43.326618, -84.536095], 'MN': [45.694454, -93.900192], 'MS': [32.741646, -89.678696],
      'MO': [38.572954, -92.189283], 'MT': [46.921925, -110.454353], 'NE': [41.125370, -98.268082],
      'NV': [38.313515, -117.055374], 'NH': [43.452492, -71.563896], 'NJ': [40.298904, -74.521011],
      'NM': [34.840515, -106.248482], 'NY': [42.165726, -74.948051], 'NC': [35.630066, -79.806419],
      'ND': [47.528912, -99.784012], 'OH': [40.388783, -82.764915], 'OK': [35.565342, -96.928917],
      'OR': [44.572021, -122.070938], 'PA': [40.590752, -77.209755], 'RI': [41.680893, -71.51178],
      'SC': [33.856892, -80.945007], 'SD': [44.299782, -99.438828], 'TN': [35.747845, -86.692345],
      'TX': [31.968598, -99.901813], 'UT': [40.150032, -111.862434], 'VT': [44.045876, -72.710686],
      'VA': [37.769337, -78.169968], 'WA': [47.400902, -121.490494], 'WV': [38.349497, -81.633294],
      'WI': [44.268543, -89.616508], 'WY': [42.755966, -107.302490], 'DC': [38.907192, -77.036873],
      'PR': [18.220833, -66.590149], 'VI': [18.335765, -64.896335], 'AE': [0, 0], 'AA': [0, 0], 'AP': [0, 0], 'PW': [0, 0]
    };

    // State name mapping for display
    const stateNames = {
      'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
      'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
      'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
      'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
      'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
      'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
      'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
      'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
      'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
      'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
      'DC': 'District of Columbia', 'PR': 'Puerto Rico', 'VI': 'Virgin Islands'
    };

    // Get all unique states from both data sources
    const allStates = new Set([
      ...Object.keys(data.healthverity || {}),
      ...Object.keys(data.komodo || {})
    ]);

    // Collect all counts to determine min/max for gradient (from both sources)
    const allCounts = [];
    allStates.forEach(state => {
      const healthverityCount = data.healthverity[state] || 0;
      const komodoCount = data.komodo[state] || 0;
      if (healthverityCount > 0) allCounts.push(healthverityCount);
      if (komodoCount > 0) allCounts.push(komodoCount);
    });

    const maxCount = Math.max(...allCounts);
    const minCount = Math.min(...allCounts);

    // Create bubble heat map markers for both data sources
    allStates.forEach(state => {
      const coords = stateCoordinates[state];
      if (coords && coords[0] !== 0) { // Skip invalid coordinates
        const healthverityCount = data.healthverity[state] || 0;
        const komodoCount = data.komodo[state] || 0;

        // Calculate positions for adjacent markers (side by side)
        const offset = 0.4; // degrees - increased for better separation
        const healthverityCoords = [coords[0], coords[1] - offset]; // Left side
        const komodoCoords = [coords[0], coords[1] + offset]; // Right side
        
        // Create HealthVerity bubble (left side)
        if (healthverityCount > 0) {
          // Calculate bubble size based on count
          const minRadius = 8;
          const maxRadius = 35;
          const radius = minRadius + ((healthverityCount - minCount) / (maxCount - minCount)) * (maxRadius - minRadius);
          
          // Calculate color intensity based on count for HealthVerity (blue gradient)
          const intensity = (healthverityCount - minCount) / (maxCount - minCount);
          const bubbleColor = this.getColorForIntensity(intensity);
          
          const healthverityMarker = L.circleMarker(healthverityCoords, {
            radius: radius,
            fillColor: bubbleColor,
            color: '#ffffff',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.7
          });
          
          // Add count label inside the bubble
          const healthverityLabel = L.marker(healthverityCoords, {
            icon: L.divIcon({
              className: 'map-count-label',
              html: `<div style="
                background: transparent;
                color: ${healthverityCount > maxCount * 0.5 ? '#ffffff' : '#333333'};
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                line-height: 1;
                text-shadow: ${healthverityCount > maxCount * 0.5 ? '1px 1px 2px rgba(0,0,0,0.8)' : '1px 1px 2px rgba(255,255,255,0.8)'};
                pointer-events: none;
              ">${healthverityCount > 999 ? (healthverityCount/1000).toFixed(1) + 'k' : healthverityCount}</div>`,
              iconSize: [radius * 2, radius * 2],
              iconAnchor: [radius, radius]
            })
          });
          
          // Add popup for HealthVerity marker
          healthverityMarker.bindPopup(`
            <div style="text-align: center; min-width: 180px;">
              <h4 style="margin: 0 0 8px 0; color: #1a365d;">${stateNames[state] || state}</h4>
              <div style="display: flex; align-items: center; justify-content: center; margin: 8px 0;">
                <div style="width: 16px; height: 16px; background: ${this.colors.ateneoBlue}; border-radius: 50%; margin-right: 8px;"></div>
                <span style="color: ${this.colors.ateneoBlue}; font-weight: bold; font-size: 16px;">HealthVerity: ${healthverityCount.toLocaleString()}</span>
              </div>
              <div style="font-size: 11px; color: #718096; margin-top: 8px;">
                Bubble size and color intensity represent patient count
              </div>
            </div>
          `);
          
          healthverityMarker.addTo(this.geographicMap);
          healthverityLabel.addTo(this.geographicMap);
        }
        
        // Create Komodo bubble (right side)
        if (komodoCount > 0) {
          // Calculate bubble size based on count
          const minRadius = 8;
          const maxRadius = 35;
          const radius = minRadius + ((komodoCount - minCount) / (maxCount - minCount)) * (maxRadius - minRadius);
          
          // Calculate color intensity based on count for Komodo (bronze/orange gradient)
          const intensity = (komodoCount - minCount) / (maxCount - minCount);
          const bubbleColor = this.getColorForKomodoIntensity(intensity);
          
          const komodoMarker = L.circleMarker(komodoCoords, {
            radius: radius,
            fillColor: bubbleColor,
            color: '#ffffff',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.7
          });
          
          // Add count label inside the bubble
          const komodoLabel = L.marker(komodoCoords, {
            icon: L.divIcon({
              className: 'map-count-label',
              html: `<div style="
                background: transparent;
                color: ${komodoCount > maxCount * 0.5 ? '#ffffff' : '#333333'};
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                line-height: 1;
                text-shadow: ${komodoCount > maxCount * 0.5 ? '1px 1px 2px rgba(0,0,0,0.8)' : '1px 1px 2px rgba(255,255,255,0.8)'};
                pointer-events: none;
              ">${komodoCount > 999 ? (komodoCount/1000).toFixed(1) + 'k' : komodoCount}</div>`,
              iconSize: [radius * 2, radius * 2],
              iconAnchor: [radius, radius]
            })
          });
          
          // Add popup for Komodo marker
          komodoMarker.bindPopup(`
            <div style="text-align: center; min-width: 180px;">
              <h4 style="margin: 0 0 8px 0; color: #1a365d;">${stateNames[state] || state}</h4>
              <div style="display: flex; align-items: center; justify-content: center; margin: 8px 0;">
                <div style="width: 16px; height: 16px; background: ${this.colors.bronze}; border-radius: 50%; margin-right: 8px;"></div>
                <span style="color: ${this.colors.bronze}; font-weight: bold; font-size: 16px;">Komodo: ${komodoCount.toLocaleString()}</span>
              </div>
              <div style="font-size: 11px; color: #718096; margin-top: 8px;">
                Bubble size and color intensity represent patient count
              </div>
            </div>
          `);
          
          komodoMarker.addTo(this.geographicMap);
          komodoLabel.addTo(this.geographicMap);
        }
      }
    });

    // Add simple data source legend only
    this.addSimpleDataSourceLegend();
  }

  addSimpleDataSourceLegend() {
    // Remove existing legend if it exists
    const existingLegend = document.querySelector('.map-legend');
    if (existingLegend) {
      existingLegend.remove();
    }

    // Create simple data source legend
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'map-legend');
      div.style.cssText = `
        background: rgba(255, 255, 255, 0.95);
        padding: 12px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        font-family: 'Roboto', sans-serif;
        font-size: 12px;
        min-width: 150px;
        border: 1px solid #e2e8f0;
      `;
      
      div.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px; color: #2d3748; text-align: center;">Data Sources</div>
        <div style="display: flex; align-items: center; margin: 4px 0;">
          <div style="width: 12px; height: 12px; background: #004567; border-radius: 50%; margin-right: 8px; border: 2px solid #ffffff;"></div>
          <span style="color: #4a5568;">HealthVerity (Blue Gradient)</span>
        </div>
        <div style="display: flex; align-items: center; margin: 4px 0;">
          <div style="width: 12px; height: 12px; background: #e68a00; border-radius: 50%; margin-right: 8px; border: 2px solid #ffffff;"></div>
          <span style="color: #4a5568;">Komodo (Bronze Gradient)</span>
        </div>
        <div style="display: flex; align-items: center; margin: 4px 0;">
          <div style="width: 12px; height: 12px; background: #c0ddfa; border-radius: 50%; margin-right: 8px; border: 2px solid #ffffff;"></div>
        <span style="color: #4a5568;">Iqvia - No Data Available</span>
        </div>

        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #718096; text-align: center;">
          Bubble size & color intensity = patient count
        </div>
      `;
      
      return div;
    };
    
    legend.addTo(this.geographicMap);
  }

  getColorForIntensity(intensity) {
    // HealthVerity gradient anchored on #004567 (distinct from IQVIA #e2e8f0)
    const colors = [
      '#99b3bf', // light tint (kept distinct from IQVIA gray)
      '#7a9aa8',
      '#5c8191',
      '#3e697a',
      '#255063',
      '#1b4a60',
      '#12455c',
      '#0a4058',
      '#053b53',
      '#004567'  // base brand color
    ];
    
    const index = Math.floor(intensity * (colors.length - 1));
    return colors[index];
  }

  getColorForKomodoIntensity(intensity) {
    // Create a color gradient from light bronze/orange to dark bronze for Komodo
    const colors = [
      '#fff4e6', // Light bronze
      '#ffe0b3', 
      '#ffcc80',
      '#ffb84d',
      '#ffa31a',
      '#e68a00', // Medium bronze
      '#cc7a00',
      '#b36b00', // Dark bronze
      '#995c00',
      '#804d00'  // Very dark bronze
    ];
    
    const index = Math.floor(intensity * (colors.length - 1));
    return colors[index];
  }

  addMapLegendWithSources(maxPatients, minPatients) {
    const legend = L.control({position: 'bottomright'});
    
    legend.onAdd = function(map) {
      const div = L.DomUtil.create('div', 'map-legend');
      div.style.background = 'white';
      div.style.padding = '12px';
      div.style.borderRadius = '8px';
      div.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      div.style.fontSize = '12px';
      div.style.minWidth = '180px';
      
      const colors = [
        '#e6f3ff', '#b3d9ff', '#80bfff', '#4da6ff', '#1a8cff',
        '#0066cc', '#004d99', '#003366', '#001a33', '#000d1a'
      ];
      
      let html = '<h4 style="margin: 0 0 8px 0; color: #1a365d;">Patient Count</h4>';
      
      for (let i = colors.length - 1; i >= 0; i--) {
        const value = minPatients + (maxPatients - minPatients) * (i / (colors.length - 1));
        html += `
          <div style="display: flex; align-items: center; margin: 2px 0;">
            <div style="width: 12px; height: 12px; background: ${colors[i]}; margin-right: 8px; border-radius: 2px;"></div>
            <span>${Math.round(value).toLocaleString()}+</span>
          </div>
        `;
      }
      
      html += '<hr style="margin: 8px 0; border: none; border-top: 1px solid #e2e8f0;">';
      html += '<h5 style="margin: 0 0 6px 0; color: #1a365d;">Data Sources</h5>';
      html += `
        <div style="display: flex; align-items: center; margin: 2px 0;">
          <div style="width: 12px; height: 12px; background: #0066cc; margin-right: 8px; border-radius: 2px;"></div>
          <span>HealthVerity</span>
        </div>
        <div style="display: flex; align-items: center; margin: 2px 0;">
          <div style="width: 12px; height: 12px; background: #D2691E; margin-right: 8px; border-radius: 2px;"></div>
          <span>Komodo</span>
        </div>
      `;
      
      div.innerHTML = html;
      return div;
    };
    
    legend.addTo(this.geographicMap);
  }

  // Treatment Landscape Charts
  createTreatmentTrendsChart() {
    const ctx = document.getElementById('treatmentTrendsChart');
    if (!ctx) return;

    const data = this.dashboardData?.treatment_data?.utilization_trends || {
      paraplatin: [306860, 383886, 437839],
      keytruda: [165368, 213708, 240307],
      taxol: [142731, 183693, 205597]
    };

    if (this.charts.treatmentTrends) {
      this.charts.treatmentTrends.destroy();
    }

    this.charts.treatmentTrends = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['IQVIA', 'HealthVerity', 'Komodo'],
        datasets: [
          {
            label: 'PARAPLATIN',
            data: data.paraplatin,
            borderColor: this.colors.bronze,
            backgroundColor: this.colors.bronze + '20',
            borderWidth: 3,
            tension: 0.4
          },
          {
            label: 'KEYTRUDA',
            data: data.keytruda,
            borderColor: this.colors.ateneoBlue,
            backgroundColor: this.colors.ateneoBlue + '20',
            borderWidth: 3,
            tension: 0.4
          },
          {
            label: 'TAXOL',
            data: data.taxol,
            borderColor: this.colors.paleCerulean,
            backgroundColor: this.colors.paleCerulean + '20',
            borderWidth: 3,
            tension: 0.4
          }
        ]
      },
      options: this.getLineChartOptions('Treatment Utilization Trends', 'Patient Count')
    });
  }

  createCompetitiveChart() {
    const ctx = document.getElementById('competitiveChart');
    if (!ctx) return;

    const data = this.dashboardData?.treatment_data?.competitive_landscape || {
      immunotherapy: 45,
      chemotherapy: 35,
      targeted: 20
    };

    if (this.charts.competitive) {
      this.charts.competitive.destroy();
    }

    this.charts.competitive = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Immunotherapy', 'Chemotherapy', 'Targeted Therapy'],
        datasets: [{
          data: [data.immunotherapy, data.chemotherapy, data.targeted],
          backgroundColor: [this.colors.bronze, this.colors.ateneoBlue, this.colors.paleCerulean],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: this.getDoughnutChartOptions('Competitive Landscape')
    });
  }

  // Temporal Trends Charts
  createMonthlyTrendsChart() {
    const ctx = document.getElementById('monthlyTrendsChart');
    if (!ctx) return;

    const data = this.dashboardData?.temporal_trends?.monthly_2024 || {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      values: [45000, 47000, 52000, 48000, 51000, 49000, 53000, 55000, 52000]
    };

    if (this.charts.monthlyTrends) {
      this.charts.monthlyTrends.destroy();
    }

    this.charts.monthlyTrends = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.months,
        datasets: [{
          label: 'Monthly Incidence',
          data: data.values,
          borderColor: this.colors.bronze,
          backgroundColor: this.colors.bronze + '20',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6
        }]
      },
      options: this.getLineChartOptions('Monthly Incidence Patterns 2024', 'Patient Count')
    });
  }

  createYearlyTrendsChart() {
    const ctx = document.getElementById('yearlyTrendsChart');
    if (!ctx) return;

    const data = this.dashboardData?.temporal_trends?.yearly || {
      years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      komodo: [158000, 148000, 142000, 138000, 134000, 131000, 129000, 127000],
      healthverity: [145000, 134000, 128000, 122000, 118000, 115000, 113000, 111000],
      iqvia: [95000, 88000, 82000, 79000, 75000, 73000, 71000, 70000]
    };

    if (this.charts.yearlyTrends) {
      this.charts.yearlyTrends.destroy();
    }

    this.charts.yearlyTrends = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.years,
        datasets: [
          {
            label: 'Komodo',
            data: data.komodo,
            borderColor: this.colors.bronze,
            backgroundColor: this.colors.bronze + '20',
            borderWidth: 3,
            tension: 0.4
          },
          {
            label: 'HealthVerity',
            data: data.healthverity,
            borderColor: this.colors.ateneoBlue,
            backgroundColor: this.colors.ateneoBlue + '20',
            borderWidth: 3,
            tension: 0.4
          },
          {
            label: 'IQVIA',
            data: data.iqvia,
            borderColor: this.colors.paleCerulean,
            backgroundColor: this.colors.paleCerulean + '20',
            borderWidth: 3,
            tension: 0.4
          }
        ]
      },
      options: this.getLineChartOptions('Yearly Trends 2017-2024', 'Patient Count')
    });
  }

  // Market Basket Charts
  createCodeCoverageChart() {
    const ctx = document.getElementById('codeCoverageChart');
    if (!ctx) return;

    const data = this.dashboardData?.market_basket?.code_coverage || {
      rx: 85,
      dx: 78,
      px: 72
    };

    if (this.charts.codeCoverage) {
      this.charts.codeCoverage.destroy();
    }

    this.charts.codeCoverage = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Rx Codes', 'Dx Codes', 'Px Codes'],
        datasets: [{
          label: 'Coverage Percentage (%)',
          data: [data.rx, data.dx, data.px],
          backgroundColor: [this.colors.bronze, this.colors.ateneoBlue, this.colors.paleCerulean],
          borderColor: [this.colors.bronze, this.colors.ateneoBlue, this.colors.paleCerulean],
          borderWidth: 1
        }]
      },
      options: this.getBarChartOptions('Code Coverage by Category', 'Coverage (%)')
    });
  }

  createNDCUtilizationChart() {
    const ctx = document.getElementById('ndcUtilizationChart');
    if (!ctx) return;

    const data = this.dashboardData?.market_basket?.top_ndcs || [];

    if (this.charts.ndcUtilization) {
      this.charts.ndcUtilization.destroy();
    }

    this.charts.ndcUtilization = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => `${item.ndc}`),
        datasets: [{
          label: 'Utilization Count',
          data: data.map(item => item.utilization),
          backgroundColor: this.colors.chartColors.slice(0, 5),
          borderColor: this.colors.chartColors.slice(0, 5),
          borderWidth: 1
        }]
      },
      options: {
        ...this.getBarChartOptions('Most Utilized NDC Codes', 'Utilization Count'),
        indexAxis: 'y' // This makes it a horizontal bar chart
      }
    });
  }

  // Data Quality Charts
  createClaimsStatusChart() {
    const ctx = document.getElementById('claimsStatusChart');
    if (!ctx) return;

    const data = this.dashboardData?.claims_data?.status_distribution || {
      iqvia: { paid: 82, rejected: 12, reversed: 6 },
      healthverity: { paid: 100, rejected: 0, reversed: 0 },
      komodo: { paid: 66, rejected: 17, reversed: 17 }
    };

    if (this.charts.claimsStatus) {
      this.charts.claimsStatus.destroy();
    }

    this.charts.claimsStatus = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['IQVIA', 'HealthVerity', 'Komodo'],
        datasets: [
          {
            label: 'Paid Claims (%)',
            data: [data.iqvia.paid, data.healthverity.paid, data.komodo.paid],
            borderColor: this.colors.bronze,
            backgroundColor: this.colors.bronze + '20',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Rejected Claims (%)',
            data: [data.iqvia.rejected, data.healthverity.rejected, data.komodo.rejected],
            borderColor: this.colors.ateneoBlue,
            backgroundColor: this.colors.ateneoBlue + '20',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Reversed Claims (%)',
            data: [data.iqvia.reversed, data.healthverity.reversed, data.komodo.reversed],
            borderColor: this.colors.weldonBlue,
            backgroundColor: this.colors.weldonBlue + '20',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: this.getLineChartOptions('Claims Status Distribution', 'Percentage (%)')
    });
  }

  createReliabilityChart() {
    const ctx = document.getElementById('reliabilityChart');
    if (!ctx) return;

    if (this.charts.reliability) {
      this.charts.reliability.destroy();
    }

    // Use a simple bar chart instead of radar chart for better compatibility
    this.charts.reliability = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Data Completeness', 'Accuracy', 'Timeliness', 'Consistency', 'Validity'],
        datasets: [
          {
            label: 'IQVIA',
            data: [85, 88, 92, 89, 87],
            backgroundColor: this.colors.bronze + '80',
            borderColor: this.colors.bronze,
            borderWidth: 1
          },
          {
            label: 'HealthVerity',
            data: [92, 94, 89, 91, 93],
            backgroundColor: this.colors.ateneoBlue + '80',
            borderColor: this.colors.ateneoBlue,
            borderWidth: 1
          },
          {
            label: 'Komodo',
            data: [90, 86, 91, 88, 89],
            backgroundColor: this.colors.paleCerulean + '80',
            borderColor: this.colors.paleCerulean,
            borderWidth: 1
          }
        ]
      },
      options: this.getBarChartOptions('Source Reliability Metrics', 'Score')
    });
  }

  // Chart Options Methods
  getLineChartOptions(title, yAxisLabel) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          color: this.currentTheme === 'dark' ? '#e8eaed' : '#004567',
          font: { size: 14, weight: 'bold' }
        },
        legend: {
          position: 'top',
          labels: {
            color: this.currentTheme === 'dark' ? '#e8eaed' : '#004567',
            font: { weight: '500', size: 11 }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { 
            color: this.currentTheme === 'dark' ? '#9bc0e2' : '#8295ae',
            font: { size: 11 }
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: this.currentTheme === 'dark' ? 'rgba(155, 192, 226, 0.1)' : 'rgba(130, 149, 174, 0.2)' },
          ticks: { 
            color: this.currentTheme === 'dark' ? '#9bc0e2' : '#8295ae',
            font: { size: 11 }
          },
          title: {
            display: !!yAxisLabel,
            text: yAxisLabel,
            color: this.currentTheme === 'dark' ? '#e8eaed' : '#004567',
            font: { size: 12 }
          }
        }
      }
    };
  }

  getBarChartOptions(title, yAxisLabel) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          color: this.currentTheme === 'dark' ? '#e8eaed' : '#004567',
          font: { size: 14, weight: 'bold' }
        },
        legend: { 
          display: false 
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { 
            color: this.currentTheme === 'dark' ? '#9bc0e2' : '#8295ae',
            font: { size: 10 }
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: this.currentTheme === 'dark' ? 'rgba(155, 192, 226, 0.1)' : 'rgba(130, 149, 174, 0.2)' },
          ticks: { 
            color: this.currentTheme === 'dark' ? '#9bc0e2' : '#8295ae',
            font: { size: 11 }
          },
          title: {
            display: !!yAxisLabel,
            text: yAxisLabel,
            color: this.currentTheme === 'dark' ? '#e8eaed' : '#004567',
            font: { size: 12 }
          }
        }
      }
    };
  }

  getDoughnutChartOptions(title) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          color: this.currentTheme === 'dark' ? '#e8eaed' : '#004567',
          font: { size: 14, weight: 'bold' }
        },
        legend: {
          position: 'bottom',
          labels: {
            color: this.currentTheme === 'dark' ? '#e8eaed' : '#004567',
            font: { weight: '500', size: 11 },
            padding: 10
          }
        }
      }
    };
  }

  exportChart(chartId) {
    const chart = this.charts[chartId];
    if (!chart) {
      console.warn(`❌ Chart not found for export: ${chartId}`);
      return;
    }

    try {
      const canvas = chart.canvas;
      const link = document.createElement('a');
      link.download = `chryselys-enhanced-${chartId}-chart.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(`✅ Chart exported: ${chartId}`);
    } catch (error) {
      console.error('❌ Export error:', error);
    }
  }

  updateChartThemes() {
    Object.values(this.charts).forEach(chart => {
      if (chart && chart.options) {
        const isDark = this.currentTheme === 'dark';
        
        if (chart.options.plugins.title) {
          chart.options.plugins.title.color = isDark ? '#e8eaed' : '#004567';
        }
        
        if (chart.options.plugins.legend && chart.options.plugins.legend.labels) {
          chart.options.plugins.legend.labels.color = isDark ? '#e8eaed' : '#004567';
        }
        
        chart.update('none');
      }
    });
    
    console.log(`✅ Chart themes updated for ${this.currentTheme} mode`);
  }

  animateProgressBars() {
    setTimeout(() => {
      const progressBars = document.querySelectorAll('.progress-fill');
      console.log(`🎬 Animating ${progressBars.length} progress bars`);
      
      progressBars.forEach((bar, index) => {
        const finalWidth = bar.style.width || bar.getAttribute('data-width') || '0%';
        bar.style.width = '0%';
        
        setTimeout(() => {
          bar.style.transition = 'width 1s ease-out';
          bar.style.width = finalWidth;
        }, index * 200 + 500);
      });
    }, 1000);
  }

  resizeCharts() {
    Object.values(this.charts).forEach((chart, index) => {
      if (chart && typeof chart.resize === 'function') {
        try {
          chart.resize();
        } catch (error) {
          console.warn(`Chart resize error for chart ${index}:`, error);
        }
      }
    });
  }

  handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resizeCharts();
    }, 250);
  }
}

// Initialize Enhanced Dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing Enhanced Chryselys Dashboard...');
  window.enhancedChryselsysDashboard = new EnhancedChryselsysDashboard();
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

console.log('🎯 Enhanced Chryselys NSCLC Healthcare Intelligence Platform loaded');
console.log('🎨 Brand colors: Chinese Bronze, Ateneo Blue, Pale Cerulean, Weldon Blue');
console.log('📊 Features: Landing page, Enhanced analytics, Procedure/Diagnosis insights, Provider analysis');
console.log('🔧 Enhanced capabilities: Temporal trends, Market basket analysis, Strategic intelligence');