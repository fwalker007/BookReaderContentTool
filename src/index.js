import React from "react";
import ReactDOM from "react-dom";

import Toolbar from "polotno/toolbar/toolbar";
import Workspace from "polotno/canvas/workspace";
import { SidePanel } from "polotno/side-panel/side-panel";
import { createStore } from "polotno/model/store";

import { Preview } from "./preview";

import { observer } from 'mobx-react-lite';
// import our own icon
import FaShapes from '@meronex/icons/fa/FaShapes';


import { InputGroup } from "@blueprintjs/core";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";

import { getImageSize } from "polotno/utils/image";

// import all default sections
// we will not use all of them in the demo
// just to show what we have
import {
  TextSection,
  ElementsSection,
  UploadSection,
  BackgroundSection,
  SizeSection
} from "polotno/side-panel/side-panel";
//
import { SectionTab } from "polotno/side-panel/tab-button";
import { ImagesGrid } from "polotno/side-panel/images-grid";
// import our own icon
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";

const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: "ed6TbPdjZc8yF8dhFxlC"
});

// make global for debug
window.store = store;

store.setSize(300, 460);

store.addPage({
background: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTY5OTZ8MHwxfHNlYXJjaHwyfHxwYXR0ZXJufGVufDB8fHx8MTYyMTY3NTA4NQ&ixlib=rb-1.2.1&q=80&w=1080"
});

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

store.activePage.addElement({
  type: "image",
  src: "https://dev-encantos-app-us-east-1.s3.amazonaws.com/bookCreatorImages/Spread_01_Pinpon.png",
  width:200,
  height:200,
  x: 50,
  y: 150 
});

store.addPage({
  background: 'grey', // default is "white"
});

store.activePage.addElement({
  type: "text",
  text: "my first page",
  x: 50,
  y: 100,
  fontSize: 30,
  width: 200,
  align: "center",
  fontFamily: "Amatic SC",  
  fill: 'white',
});

const MyPanel = ({ store }) => {
  return (
    <div>
       <SidePanel store={store} sections={sections} defaultSection="photos" />
    </div>
  );
};


export const PhotosPanel = observer(({ store }) => {
  const [images, setImages] = React.useState([]);

  async function loadImages() {
    // here we should implement your own API requests
    setImages([]);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // for demo images are hard coded
    // in real app here will be something like JSON structure
    setImages([
      { url: "https://dev-encantos-app-us-east-1.s3.amazonaws.com/bookCreatorImages/bush_07.png" },
      { url: "https://dev-encantos-app-us-east-1.s3.amazonaws.com/bookCreatorImages/hill.png" },
      { url: "https://dev-encantos-app-us-east-1.s3.amazonaws.com/bookCreatorImages/Spread_01_house.png" },
      { url: "https://dev-encantos-app-us-east-1.s3.amazonaws.com/bookCreatorImages/Spread_01_Pinpon.png" },
      { url: "https://dev-encantos-app-us-east-1.s3.amazonaws.com/bookCreatorImages/Spread_06_Bed.png" },
      { url: "https://bookcontent.s3.amazonaws.com/TT_World+Map_Design_Japan+v2.jpg" },

    ]);
  } 

  React.useEffect(() => {
    loadImages();
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onChange={(e) => {
          loadImages();
        }}
        style={{
          marginBottom: "20px"
        }}
      />
      <p>Encantos images: </p>
      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image, { x, y }) => {
          const { width, height } = await getImageSize(image.url);
          store.activePage.addElement({
            type: "image",
            src: image.url,
            width,
            height,
            x,
            y
          });
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  );
});

// define the new custom section
const СustomPhotos = {
  name: "photos",
  Tab: (props) => (
    <SectionTab name="Images" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: PhotosPanel
};

// we will have just two sections
const sections = [
  TextSection,
  СustomPhotos,
  ElementsSection,
  UploadSection,
  BackgroundSection,
  // we will replace default resize with our own
  SizeSection
];

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
        <MyPanel store={store} />
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
