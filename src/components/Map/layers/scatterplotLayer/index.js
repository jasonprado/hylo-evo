import { ScatterplotLayer } from '@deck.gl/layers'
import { POST_TYPES } from 'store/models/Post'
import { hexToRgb } from 'util/index'

export function createScatterplotLayerFromPosts (posts, onHover, onClick) {
  return createScatterplotLayer(posts.filter(post => post.locationObject && post.locationObject.center)
    .map(post => {
      return {
        id: post.id,
        type: post.type,
        message: post.title,
        summary: post.details,
        color: hexToRgb(POST_TYPES[post.type].primaryColor),
        coordinates: [parseFloat(post.locationObject.center.lng), parseFloat(post.locationObject.center.lat)]
      }
    }), onHover, onClick)
}

export function createScatterplotLayerFromMembers (members, onHover, onClick) {
  return createScatterplotLayer(members.filter(member => member.locationObject && member.locationObject.center)
    .map(member => {
      return {
        id: member.id,
        type: 'member',
        message: 'Member: ' + member.name,
        color: '#2A4059',
        coordinates: [parseFloat(member.locationObject.center.lng), parseFloat(member.locationObject.center.lat)]
      }
    }), onHover, onClick)
}

export function createScatterplotLayer (data, onHover, onClick) {
  return new ScatterplotLayer({
    id: `scatterplot-posts-layer`,
    data,
    getPosition: d => d.coordinates,
    getRadius: 10,
    radiusMinPixels: 5,
    radiusMaxPixels: 12,
    getFillColor: (d) => d.color,
    // Enable picking
    pickable: true,
    // Update app state
    onHover,
    onClick
  })
}