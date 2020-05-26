export function convertMapboxToLocation (mapboxResult) {
  const neighborhoodObject = mapboxResult.context.find(c => c.id.includes('neighborhood'))
  const postcodeObject = mapboxResult.context.find(c => c.id.includes('postcode'))
  const placeObject = mapboxResult.context.find(c => c.id.includes('place'))
  const regionObject = mapboxResult.context.find(c => c.id.includes('region'))
  const countryObject = mapboxResult.context.find(c => c.id.includes('country'))

  let city = placeObject ? placeObject.text : mapboxResult.place_type[0] === 'place' ? mapboxResult.text : ''

  let addressNumber = '', addressStreet = ''
  if (mapboxResult.properties.address) {
    // For Points of Interest and landmarks Mapbox annoyingly stores the address in a single string inside properties
    addressNumber = mapboxResult.properties.address.split(" ")[0]
    addressStreet = mapboxResult.properties.address.split(" ")[1]
  } else if (mapboxResult.place_type[0] === 'address') {
    addressStreet = mapboxResult.text
    addressNumber = mapboxResult.address
  }

  return {
    accuracy: mapboxResult.properties.accuracy,
    addressNumber,
    addressStreet,
    bbox: mapboxResult.bbox ? [{ lng: mapboxResult.bbox[0], lat: mapboxResult.bbox[1] }, { lng: mapboxResult.bbox[2], lat: mapboxResult.bbox[3] }] : [],
    center: { lng: mapboxResult.center[0], lat: mapboxResult.center[1] },
    city,
    country: countryObject && countryObject.short_code,
    fullText: mapboxResult.place_name,
    // geometry: [Point]
    // locality
    neighborhood: neighborhoodObject && neighborhoodObject.text,
    region: regionObject && regionObject.text,
    postcode: postcodeObject && postcodeObject.text
    // wikidata: String
  }
}
