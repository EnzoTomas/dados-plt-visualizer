
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { DataProvider } from "@/components/DataProvider";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const { toast } = useToast();

  // Setup scroll animation
  useScrollAnimation();

  const handleDataImport = (importedData: string) => {
    console.log('Dados importados com sucesso');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <DataProvider>
          {({
            selectedPeriod,
            setSelectedPeriod,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            setCsvData,
            filteredData,
            aggregatedData,
            trendData,
            getLatestDataDate
          }) => (
            <>
              {/* Header */}
              <Header
                filteredData={filteredData}
                aggregatedData={aggregatedData}
                onDataImport={(data) => {
                  setCsvData(data);
                  handleDataImport(data);
                }}
                latestDataDate={getLatestDataDate()}
              />

              {/* Dashboard */}
              <Dashboard
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                filteredData={filteredData}
                aggregatedData={aggregatedData}
                trendData={trendData}
              />
            </>
          )}
        </DataProvider>
      </div>
    </div>
  );
};

export default Index;
