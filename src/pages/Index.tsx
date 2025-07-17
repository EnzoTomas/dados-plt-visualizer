
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { DataProvider } from "@/components/DataProvider";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { TabNavigation } from "@/components/TabNavigation";

import { StratificationDashboard } from "@/components/StratificationDashboard";
import { useFinalData } from "@/hooks/useFinalData";
import { useProcessedFinalData } from "@/hooks/useProcessedFinalData";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('inicio');
  
  // Setup scroll animation
  useScrollAnimation();
  
  // Load final data for stratification
  const { finalData } = useFinalData();
  const processedFinalData = useProcessedFinalData(finalData);

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

              {/* Tab Navigation */}
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Dashboard Content */}
              {activeTab === 'inicio' && (
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
              )}

              {activeTab === 'estratificacao' && (
                <StratificationDashboard
                  selectedPeriod={selectedPeriod}
                  onPeriodChange={setSelectedPeriod}
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  finalData={processedFinalData}
                />
              )}
            </>
          )}
        </DataProvider>
      </div>
    </div>
  );
};

export default Index;
