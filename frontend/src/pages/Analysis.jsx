import { useLocation } from "react-router-dom";
import MatchScore from "../components/MatchScore";
import GapList from "../components/GapList";
import Suggestions from "../components/Suggestions";

export default function Analysis() {
  const { state } = useLocation();
  const analysis = state?.analysis;

  if (!analysis) {
  return (
    <div className="p-6 text-center text-gray-600">
      No analysis data available. Please analyze a resume first.
    </div>
  );
}


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Resume Match Analysis
      </h1>

      <MatchScore score={analysis.matchScore} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <GapList
          title="Missing Tools"
          items={analysis.missingTools}
        />
        <GapList
          title="Missing Technical Abilities"
          items={analysis.missingAbilities}
        />
      </div>

      <Suggestions suggestions={analysis.suggestions} />
    </div>
  );
}
