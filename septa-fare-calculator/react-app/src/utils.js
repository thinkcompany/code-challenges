
// Sort of like a thunk
export default async function getFares() {
    const res = await fetch("/fares.json");
    let data = {
        times: ["weekday", "evening_weekend", "anytime"],
        purchaseLocations: ["onboard_purchases", "advance_purchase"]
    };

    if (res.ok) {
        let zoneInfo = await res.json();
        data = {...data, ...zoneInfo}
    } 
    return data;
}