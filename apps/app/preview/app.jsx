/* global DesignCanvas, DCSection, DCArtboard,
   SelectorScreen, DashboardScreen, RegisterScreen, TimelineScreen,
   MedicationsScreen, DoctorsScreen, PatientDetailScreen,
   TimelineDetailScreen, MedicationDetailScreen, ProfileScreen,
   LanguageSheetScreen */

const App = () => (
  <DesignCanvas
    title="CuidaBox · App preview"
    subtitle="Recreación visual fiel de las 11 pantallas — sin Next.js, sin backend"
  >
    <DCSection id="onboarding" title="Onboarding & home">
      <DCArtboard id="selector" label="01 · Selector" width={390} height={844}>
        <SelectorScreen />
      </DCArtboard>
      <DCArtboard id="dashboard" label="02 · Dashboard" width={390} height={844}>
        <DashboardScreen />
      </DCArtboard>
      <DCArtboard id="register" label="03 · Registrar (IA)" width={390} height={844}>
        <RegisterScreen />
      </DCArtboard>
    </DCSection>

    <DCSection id="main-tabs" title="Tabs principales">
      <DCArtboard id="history" label="04 · Historia" width={390} height={844}>
        <TimelineScreen />
      </DCArtboard>
      <DCArtboard id="meds" label="05 · Medicación" width={390} height={844}>
        <MedicationsScreen />
      </DCArtboard>
      <DCArtboard id="doctors" label="06 · Doctores" width={390} height={844}>
        <DoctorsScreen />
      </DCArtboard>
      <DCArtboard id="profile" label="10 · Perfil" width={390} height={844}>
        <ProfileScreen />
      </DCArtboard>
    </DCSection>

    <DCSection id="details" title="Pantallas de detalle">
      <DCArtboard id="patient-detail" label="07 · Detalle paciente" width={390} height={844}>
        <PatientDetailScreen />
      </DCArtboard>
      <DCArtboard id="timeline-detail" label="08 · Detalle evento" width={390} height={844}>
        <TimelineDetailScreen />
      </DCArtboard>
      <DCArtboard id="med-detail" label="09 · Detalle med." width={390} height={844}>
        <MedicationDetailScreen />
      </DCArtboard>
    </DCSection>

    <DCSection id="overlays" title="Sheets & overlays">
      <DCArtboard id="lang-sheet" label="11 · Selector de idioma" width={390} height={844}>
        <LanguageSheetScreen />
      </DCArtboard>
    </DCSection>
  </DesignCanvas>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
