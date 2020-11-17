import path from "path";
import url from "url";
import { app, ipcMain } from "electron";
import is from "electron-is";
import { menubar, Menubar } from "menubar";
import { autoUpdater } from "electron-updater";
import DMX from "dmx";
import { rootStore } from "../models";
import { onSnapshot } from "mobx-state-tree";

autoUpdater.checkForUpdatesAndNotify();

let mb: Menubar;

app.commandLine.appendSwitch("ignore-certificate-errors");

let dmxAddress = rootStore.settings.dmxAddress;
let disconnect = () => {};
function connectToDMX() {
  disconnect();
  const dmx = new DMX();
  const universe = dmx.addUniverse("fog", "dmxking-ultra-dmx-pro", dmxAddress);
  const handleDMX = (_event: any, arg: any) => {
    console.log('SENDING TO DMX', arg);
    universe.update(arg);
  };
  console.log('Listening to DMX');
  ipcMain.on("dmx", handleDMX);
  disconnect = () => {
    ipcMain.off("dmx", handleDMX);
  };
}

if (dmxAddress) {
  connectToDMX();
  onSnapshot(rootStore, (nextSnapshot) => {
    if (dmxAddress !== nextSnapshot.settings.dmxAddress) {
      dmxAddress = nextSnapshot.settings.dmxAddress;
      connectToDMX();
    }
  });
}

app.on("ready", () => {
  mb = menubar({
    index: is.dev()
      ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      : url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true,
        }),
    icon: path.resolve(__dirname, "truwuTemplate.png"),
    tooltip: "truwu",
    browserWindow: {
      //   transparent: true,
      //   resizable: false,
      //   fullscreenable: false,
      width: 500,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    },
    showOnAllWorkspaces: false,
    preloadWindow: true,
  });

  mb.on("after-create-window", () => {
    if (is.dev()) {
      mb.window?.webContents.openDevTools({ mode: "undocked" });
    }
  });

  mb.on("after-show", () => {
    mb.tray.setImage(path.resolve(__dirname, "Truwu.png"));
  });
});

app.on("window-all-closed", (event: Event) => {
  app.dock.hide();
  event.preventDefault();
});
