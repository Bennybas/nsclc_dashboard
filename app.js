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
      chartColors: ['#c98b27', '#004567', '#9bc0e2', '#8295ae', '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545']
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
    try {
      const response = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/a901944e9fc52bd758836726dc8d48da/69003a6d-ee36-4631-b917-03b59e1b0c2a/5014bbbc.json');
      if (response.ok) {
        this.dashboardData = await response.json();
        console.log('📊 Enhanced dashboard data loaded successfully');
      } else {
        throw new Error('Failed to load enhanced dashboard data');
      }
    } catch (error) {
      console.warn('⚠️ Using fallback data:', error.message);
      this.initializeFallbackData();
    }
  }

  initializeFallbackData() {
    this.dashboardData = {
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
        age_distribution: {
          '0-17': 0.1,
          '18-24': 0.1,
          '25-59': 9.6,
          '60-74': 43.8,
          '75+': 46.4
        },
        top_states: [
          { state: 'California', patients: 310000 },
          { state: 'Texas', patients: 285000 },
          { state: 'Florida', patients: 267000 },
          { state: 'New York', patients: 245000 },
          { state: 'Pennsylvania', patients: 198000 },
          { state: 'Illinois', patients: 187000 },
          { state: 'Ohio', patients: 165000 },
          { state: 'Georgia', patients: 142000 },
          { state: 'North Carolina', patients: 134000 },
          { state: 'Michigan', patients: 128000 }
        ]
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
          medical: 65,
          pharmacy: 35
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

    console.log('✅ Enhanced event listeners setup complete');
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

  initializeAllCharts() {
    console.log('📊 Initializing all enhanced charts...');
    
    try {
      // Patient Analysis Charts
      this.createPatientVolumeChart();
      this.createClaimsTypeChart();
      
      // Procedure Analysis Charts
      this.createProcedureCodesChart();
      this.createDrugClassChart();
      
      // Diagnosis Analysis Charts
      this.createDiagnosisCodesChart();
      this.createDiagnosisCategoryChart();
      this.createCodingConsistencyChart();
      this.createPrevalenceRatesChart();
      
      // Provider Landscape Charts
      this.createProviderSpecialtyChart();
      this.createNPICompletenessChart();
      
      // Demographics Charts
      this.createAgeDistributionChart();
      this.createGeographicChart();
      
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
      options: this.getDoughnutChartOptions('Patient Volume Distribution')
    });
  }

  createClaimsTypeChart() {
    const ctx = document.getElementById('claimsTypeChart');
    if (!ctx) return;

    const data = this.dashboardData?.claims_data?.types || {
      medical: 65,
      pharmacy: 35
    };

    if (this.charts.claimsType) {
      this.charts.claimsType.destroy();
    }

    this.charts.claimsType = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Medical Claims', 'Pharmacy Claims'],
        datasets: [{
          data: [data.medical, data.pharmacy],
          backgroundColor: [this.colors.ateneoBlue, this.colors.weldonBlue],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: this.getDoughnutChartOptions('Claims Type Distribution')
    });
  }

  // Procedure Analysis Charts
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

  // Diagnosis Analysis Charts
  createDiagnosisCodesChart() {
    const ctx = document.getElementById('diagnosisCodesChart');
    if (!ctx) return;

    const data = this.dashboardData?.diagnosis_codes?.top_5 || [];
    
    if (this.charts.diagnosisCodes) {
      this.charts.diagnosisCodes.destroy();
    }

    this.charts.diagnosisCodes = new Chart(ctx, {
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
      options: {
        ...this.getBarChartOptions('Top 5 Diagnosis Codes', 'Patient Count'),
        indexAxis: 'y' // This makes it a horizontal bar chart
      }
    });
  }

  createDiagnosisCategoryChart() {
    const ctx = document.getElementById('diagnosisCategoryChart');
    if (!ctx) return;

    const data = this.dashboardData?.diagnosis_codes?.categories || {
      primary: 45.2,
      metastatic: 28.8,
      anatomical: 15.6,
      histology: 10.4
    };

    if (this.charts.diagnosisCategory) {
      this.charts.diagnosisCategory.destroy();
    }

    this.charts.diagnosisCategory = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Primary NSCLC', 'Metastatic', 'Anatomical', 'Histology'],
        datasets: [{
          data: [data.primary, data.metastatic, data.anatomical, data.histology],
          backgroundColor: [this.colors.bronze, this.colors.ateneoBlue, this.colors.paleCerulean, this.colors.weldonBlue],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: this.getDoughnutChartOptions('Diagnosis Category Breakdown')
    });
  }

  createCodingConsistencyChart() {
    const ctx = document.getElementById('codingConsistencyChart');
    if (!ctx) return;

    if (this.charts.codingConsistency) {
      this.charts.codingConsistency.destroy();
    }

    this.charts.codingConsistency = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['IQVIA', 'HealthVerity', 'Komodo'],
        datasets: [{
          label: 'Coding Consistency Score',
          data: [89, 94, 91],
          borderColor: this.colors.bronze,
          backgroundColor: this.colors.bronze + '20',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 8
        }]
      },
      options: this.getLineChartOptions('Coding Consistency Across Sources', 'Consistency Score (%)')
    });
  }

  createPrevalenceRatesChart() {
    const ctx = document.getElementById('prevalenceRatesChart');
    if (!ctx) return;

    const data = this.dashboardData?.diagnosis_codes?.categories || {
      primary: 45.2,
      metastatic: 28.8,
      anatomical: 15.6,
      histology: 10.4
    };

    if (this.charts.prevalenceRates) {
      this.charts.prevalenceRates.destroy();
    }

    this.charts.prevalenceRates = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Primary NSCLC', 'Metastatic', 'Anatomical', 'Histology'],
        datasets: [{
          label: 'Prevalence Rate (%)',
          data: [data.primary, data.metastatic, data.anatomical, data.histology],
          backgroundColor: this.colors.chartColors.slice(0, 4),
          borderColor: this.colors.chartColors.slice(0, 4),
          borderWidth: 1
        }]
      },
      options: this.getBarChartOptions('Prevalence Rates by Category', 'Percentage (%)')
    });
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

    const data = this.dashboardData?.demographics?.age_distribution || {
      '0-17': 0.1,
      '18-24': 0.1,
      '25-59': 9.6,
      '60-74': 43.8,
      '75+': 46.4
    };

    if (this.charts.ageDistribution) {
      this.charts.ageDistribution.destroy();
    }

    this.charts.ageDistribution = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Percentage of Patients (%)',
          data: Object.values(data),
          backgroundColor: this.colors.chartColors.slice(0, 5),
          borderColor: this.colors.chartColors.slice(0, 5),
          borderWidth: 1
        }]
      },
      options: this.getBarChartOptions('Age Distribution Analysis', 'Percentage (%)')
    });
  }

  createGeographicChart() {
    const ctx = document.getElementById('geographicChart');
    if (!ctx) return;

    const data = this.dashboardData?.demographics?.top_states || [];

    if (this.charts.geographic) {
      this.charts.geographic.destroy();
    }

    this.charts.geographic = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.state),
        datasets: [{
          label: 'Patient Count',
          data: data.map(item => item.patients),
          backgroundColor: this.colors.chartColors,
          borderColor: this.colors.chartColors,
          borderWidth: 1
        }]
      },
      options: {
        ...this.getBarChartOptions('Top 10 States by Patient Count', 'Patient Count'),
        indexAxis: 'y' // This makes it a horizontal bar chart
      }
    });
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