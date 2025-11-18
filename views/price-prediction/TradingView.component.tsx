import { useEffect } from "react";

import Script from "next/script";

const tradingViewListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, "TradingView", {
      configurable: true,
      set(value) {
        this.tv = value;
        resolve(value);
      },
    }),
  );

const initializeTradingView = (TradingViewObj: any, opts: any) => {
  let timezone = "Etc/UTC";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    // noop
  }
  /* eslint-disable new-cap */
  /* eslint-disable no-new */
  // @ts-ignore
  return new TradingViewObj.widget({
    // Advanced Chart Widget uses the legacy embedding scheme,
    // an id property should be specified in the settings object
    id: opts.container_id,
    autosize: true,
    height: "100%",
    symbol: "BINANCE:BTCUSD",
    interval: "5",
    timezone,
    theme: "light",
    style: "1",
    locale: "en-US",
    toolbar_bg: "#f1f3f6",
    enable_publishing: false,
    allow_symbol_change: true,
    hide_side_toolbar: false,
    enabled_features: ["header_fullscreen_button"],
    ...opts,
  });
};

export const TradingView = ({ id, symbol }: { id: string; symbol: string }) => {
  useEffect(() => {
    const opts: any = {
      container_id: id,
      symbol,
    };
    const tv = (window as any).tv;

    if (tv) {
      initializeTradingView(tv, opts);
    } else {
      tradingViewListener().then((tv) => {
        initializeTradingView(tv, opts);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, symbol]);

  return (
    <div>
      <Script src="https://s3.tradingview.com/tv.js" strategy="lazyOnload" id="tv.js" />
      <div id={id} />
    </div>
  );
};
