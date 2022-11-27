import { useLoaderData } from "@remix-run/react";
import FaresCalculator from "~/components/FaresCalculator";
import { getStoredFares } from "~/data/fares";
import styles from '~/styles/fares-calculator.css';

export default function Index() {
    const {info, zones} = useLoaderData();
    const calculateCost = (zone, fareType, purchaseType, trips) => {
        const zoneHasTrip = zones.filter((z) => {
            return z.zone == zone && z.fares.find((f) => f.type === fareType && f.purchase === purchaseType);
        });
        if (zoneHasTrip.length === 0) {
            // TODO: Throw error to catch and display in form
            return "-";
        }
        const zoneTrip = zones.find(z => z.zone == zone).fares.find(f => f.type === fareType && f.purchase === purchaseType);

        // TODO: implement logic for anytime trips more than 10
        // TODO: include backend validation for trip rides more than 10 (OR allow more than 10 and add calculation)
        return `$${zoneTrip.type === "anytime" ? zoneTrip.price.toFixed() : (zoneTrip.price * trips).toFixed()}`;
    };

  return (
      <main>
          <FaresCalculator
              title="Regional Rail Fares"
              info={info}
              zones={zones}
              calculateCost={calculateCost}>
          </FaresCalculator>
      </main>
  );
}

export async function loader() {
    const faresData = await getStoredFares();
    return faresData;
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}
