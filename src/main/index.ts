import path from "path";
import url from "url";
import { app, ipcMain } from "electron";
import is from "electron-is";
import { menubar, Menubar } from "menubar";
import { autoUpdater } from "electron-updater";
import DMX from "dmx";

autoUpdater.checkForUpdatesAndNotify();

let mb: Menubar;

app.commandLine.appendSwitch("ignore-certificate-errors");

const dmx = new DMX();
// TODO: Move the configuration of this to settings.
const universe = dmx.addUniverse(
  "fog",
  "dmxking-ultra-dmx-pro",
  "/dev/cu.usbserial-6A4W21TF"
);
ipcMain.on("dmx", (_event, arg) => {
  universe.update(arg);
});

ipcMain.on("notify", () => {
  mb.tray.setImage(path.resolve(__dirname, "TruwuActive.png"));
});

app.on("ready", () => {
  mb = menubar({
    index: is.dev()
      ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      : url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true,
        }),
    icon: path.resolve(__dirname, "Truwu.png"),
    tooltip: "UwU",
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
    // preloadWindow: true,
  });

  mb.on("after-create-window", () => {
    // if (is.dev()) {
    mb.window?.webContents.openDevTools({ mode: "undocked" });
    // }
  });

  mb.on("after-show", () => {
    mb.tray.setImage(path.resolve(__dirname, "Truwu.png"));
  });
});

app.on("window-all-closed", (event: Event) => {
  app.dock.hide();
  event.preventDefault();
});
