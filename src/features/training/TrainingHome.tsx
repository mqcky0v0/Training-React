import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilePen, List } from "lucide-react";
import { useState } from "react";
import { TrainingList } from "./TrainigList";
import { TrainingRegister } from "./TrainingRegister";

export const TrainingHome = () => {
  const [tabIndex, setTabIndex] = useState("trainingList");
  return (
    <div className="p-2">
      <Tabs value={tabIndex} onValueChange={setTabIndex}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="trainingList">
            <List size={14} className="mr-2" />
            TrainingList
          </TabsTrigger>
          <TabsTrigger value="trainingRegister">
            <FilePen size={14} className="mr-2" />
            TrainingRegister
          </TabsTrigger>
        </TabsList>
        <TabsContent value="trainingList">
          <TrainingList />
        </TabsContent>
        <TabsContent value="trainingRegister">
          <TrainingRegister />
        </TabsContent>
      </Tabs>
    </div>
  );
};
