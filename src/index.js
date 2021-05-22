import React from "react";
import ReactDOM from "react-dom";

import Toolbar from "polotno/toolbar/toolbar";
import Workspace from "polotno/canvas/workspace";
import { SidePanel } from "polotno/side-panel/side-panel";
import { createStore } from "polotno/model/store";

import { Preview } from "./preview";

import { observer } from 'mobx-react-lite';
// import existing section
import { TextSection } from 'polotno/side-panel/side-panel';
// import default tab component
import { SectionTab } from 'polotno/side-panel/tab-button';
// import our own icon
import FaShapes from '@meronex/icons/fa/FaShapes';


const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: "ed6TbPdjZc8yF8dhFxlC"
});

// make global for debug
window.store = store;

store.setSize(300, 460);

store.addPage();
store.activePage.addElement({
  type: "text",
  text: "My First Book",
  x: 50,
  y: 100,
  fontSize: 30,
  width: 200,
  align: "center",
  fontFamily: "Amatic SC"
});

store.activePage.addElement({
  type: "text",
  text: "by Francine Walker",
  x: 50,
  y: 350,
  fontSize: 20,
  width: 200,
  align: "center",
  fontFamily: "Amatic SC"
});

store.addPage();
store.activePage.addElement({
  type: "text",
  text: "my first page",
  x: 50,
  y: 100,
  fontSize: 30,
  width: 200,
  align: "center",
  fontFamily: "Amatic SC"
});

// define the new custom section
const CustomSection1 = {
  name: 'custom1 ',
  Tab: (props) => (
    <SectionTab name="Custom 1" {...props}>
      <FaShapes icon="new-text-box" />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    return (
      <div>
        <p>Here we will define our own custom tab.</p>
        <p>Elements on the current page: {store.activePage?.children.length}</p>
      </div>
    );
  }),
};

// we will have just two sections
const sections = [CustomSection1, TextSection];

const App = ({ store }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw"
      }}
    >
      <div style={{ width: "400px", height: "100%", display: "flex" }}>
        <SidePanel store={store} sections={sections} defaultSection="custom" />
      </div>
      <div
        style={{
          display: "flex",
          height: "100%",
          margin: "auto",
          flex: 1,
          flexDirection: "column",
          position: "relative"
        }}
      >
        <Toolbar store={store} />
        <Workspace store={store} />
        <Preview store={store} />
      </div>
    </div>
  );
};

ReactDOM.render(<App store={store} />, document.getElementById("root"));
