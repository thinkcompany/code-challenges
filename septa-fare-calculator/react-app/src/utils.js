
// Modeled after a Redux thunk:
export default async function getFares() {
    const res = await fetch("/fares.json");
    // Assuming there would be equivalent queries to get these types
    // For now just going to tack it onto the fetch from the json file.
    let data = {
        times: ["Weekdays", "Evenings/Weekend", "Anytime"],
        purchaseLocations: ["Onboard", "Station Kiosk"]
    };

    if (res.ok) {
        let zoneInfo = await res.json();
        data = {...data, ...zoneInfo}
    } 
    return data;
}
