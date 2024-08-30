import { Allotment } from "allotment"
import 'allotment/dist/style.css';

import Header from "./components/Header";
import MaterailWapper from "./components/Materail";
import EditArea from "./components/Editor";
import Setting from "./components/Setting";
import { useComponetsStore } from "@/store/Editor";
import Preview from "./components/Preview";

const LowCodeEditor = () => {
  const { mode } = useComponetsStore()
  return (
    <div className="h-[100vh]">
      <Header />
      {mode === 'edit' ? <Allotment className="h-[calc(100vh-60px)]">
        <Allotment.Pane preferredSize={240} maxSize={500} minSize={200}>
          <MaterailWapper />
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting />
        </Allotment.Pane>
      </Allotment> : <Preview />}
    </div>
  )
}
export default LowCodeEditor