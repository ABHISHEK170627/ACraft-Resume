"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";
import { ScoreMeter } from "components/Resume/ScoreMeter";

export default function Create() {
  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-3">
            <ResumeForm />
          </div>
          <div className="col-span-3 flex flex-col">
            <div className="px-6 py-2 bg-white border-b border-gray-200 shadow-sm">
              <ScoreMeter />
            </div>
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}
