import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilePen, List } from "lucide-react";
import { useState } from "react";
import { SampleList } from "./SampleList";
import { SmapleRegister } from "./SampleRegister";

export const Smaple1Home = () => {
  const [tabIndex, setTabIndex] = useState("sampleList");
  return (
    <div className="p-2">
      <Tabs value={tabIndex} onValueChange={setTabIndex}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="sampleList">
            <List size={14} className="mr-2" />
            SampleList
          </TabsTrigger>
          <TabsTrigger value="sampleRegister">
            <FilePen size={14} className="mr-2" />
            SampleRegister
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sampleList">
          <SampleList />
        </TabsContent>
        <TabsContent value="sampleRegister">
          <SmapleRegister setTabIndex={setTabIndex} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
