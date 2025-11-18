"use client";

import { Header } from "@/components/Base/Header/Header.component";
import { Button, RoundButton } from "@/components/Button/Button.component";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { MinimalArrowIcon } from "@/assets/MinimalArrow.icon";
import { PriceInfoCard } from "./cards/PriceInfoCard.component";
import { Carousel } from "./Carousel.component";
import { Clouds } from "./Clouds.component";
import { SwapCard } from "./cards/SwapCard.component";
import { TradingView } from "./TradingView.component";
import { CountdownCard } from "./CountdownCard.component";
import HeadlessDialog from "@/components/Base/HeadlessDialog";

const PredictionPageContent = ({
  showChart,
  setShowChart,
}: {
  showChart: boolean;
  setShowChart: (value: boolean) => void;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: false,
    startIndex: 3,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className="z-10 relative h-full grid grid-rows-[auto, 1fr]">
        <div className="flex flex-col md:flex-row px-5 md:px-10 items-center justify-center md:justify-between gap-5">
          <div className="w-full hidden md:flex">
            <PriceInfoCard />
          </div>
          <div className="md:hidden xl:flex">
            <CountdownCard />
          </div>
          <div className="hidden md:flex w-full justify-end">
            <SwapCard />
          </div>
        </div>

        <div className="grid grid-rows-[min-content]">
          <Carousel emblaRef={emblaRef} />

          <div className="flex w-full justify-between pt-2 px-5 md:pt-0 md:pb-5">
            <RoundButton className="embla__prev" onClick={scrollPrev}>
              <MinimalArrowIcon className="w-6" />
            </RoundButton>

            <Button color="green" className="uppercase !max-h-14" onClick={() => setShowChart(!showChart)}>
              {showChart ? "Hide Chart" : "Reveal Chart"}
            </Button>

            <RoundButton className="embla__next" onClick={scrollNext}>
              <div className="rotate-180">
                <MinimalArrowIcon className="w-6" />
              </div>
            </RoundButton>
          </div>
        </div>
      </div>
      <Clouds />
    </>
  );
};

const PricePredictionView = () => {
  const [showChart, setShowChart] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState({
    riskAcknowledgment: false,
    betaAcknowledgment: false,
  });

  useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem("hasAcceptedTerms");
    if (!hasAcceptedTerms) {
      setIsDialogOpen(true);
    }
  }, []);

  const closeDialog = () => {
    if (termsAccepted.riskAcknowledgment && termsAccepted.betaAcknowledgment) {
      localStorage.setItem("hasAcceptedTerms", "true");
      setIsDialogOpen(false);
    }
  };

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setTermsAccepted((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <main className="relative min-h-svh overflow-hidden grid grid-rows-[auto,1fr,auto]">
      <Header />
      <PredictionPageContent showChart={showChart} setShowChart={setShowChart} />
      {showChart && (
        <div className="mt-10 h-80 bg-white">
          <TradingView id="tradingview_chart" symbol="BTCUSD" />
        </div>
      )}
      <HeadlessDialog isOpen={isDialogOpen} onClose={() => {}} title={"This Product is in Beta."}>
        <div className="flex flex-col gap-4">
          <p>Once you enter a position, you cannot cancel or adjust it.</p>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="riskAcknowledgment"
              checked={termsAccepted.riskAcknowledgment}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>
              I acknowledge that using this product is at my own risk, and I am responsible for any losses resulting
              from my actions.
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="betaAcknowledgment"
              checked={termsAccepted.betaAcknowledgment}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>
              I understand that this product is still in Beta, and by participating, I accept the associated risks.
            </span>
          </label>
          <Button
            onClick={closeDialog}
            disabled={!termsAccepted.riskAcknowledgment || !termsAccepted.betaAcknowledgment}
            className="mt-4"
          >
            Confirm
          </Button>
        </div>
      </HeadlessDialog>
    </main>
  );
};

export default PricePredictionView;
