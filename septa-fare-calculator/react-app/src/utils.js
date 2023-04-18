
// Sort of like a thunk
export default async function getFares() {
    const res = await fetch("/fares.json");
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