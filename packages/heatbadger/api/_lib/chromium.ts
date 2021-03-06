import { launch, Browser, LaunchOptions } from "puppeteer-core";
import chromeAws from "chrome-aws-lambda";
import { isDev } from "./utils";

export async function createBrowser(): Promise<Browser> {
  const defaults: LaunchOptions = {
    defaultViewport: {
      deviceScaleFactor: 1,
      hasTouch: false,
      width: 900,
      height: 350,
      isLandscape: true,
      isMobile: false,
    }
  };
  let options: LaunchOptions = {};

  if (isDev()) {
    options = {
      ...defaults,
      ...{
        args: [],
        executablePath: lookupChrome(),
        headless: true,
      }
    };
  } else {
    options = {
      ...defaults,
      ...{
        args: chromeAws.args,
        executablePath: await chromeAws.executablePath,
        headless: chromeAws.headless,
      }
    };
  }

  // Extra fonts
  chromeAws.font('https://rawcdn.githack.com/rsms/inter/378ab05866aab4cb0d71a5f502961d6a54da0770/docs/font-files/Inter-Regular.woff2');
  chromeAws.font('https://rawcdn.githack.com/rsms/inter/378ab05866aab4cb0d71a5f502961d6a54da0770/docs/font-files/Inter-SemiBold.woff2');
  chromeAws.font('https://rawcdn.githack.com/rsms/inter/378ab05866aab4cb0d71a5f502961d6a54da0770/docs/font-files/Inter-Bold.woff2');

  return await launch(options);
}

function lookupChrome(): string {
  if (process.platform === 'win32') {
    return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  }

  if (process.platform === 'darwin') {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }

  return 'google-chrome';
}
